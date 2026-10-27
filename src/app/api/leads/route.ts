import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation/schemas";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { getAdminClient } from "@/lib/db/admin";
import { sendLeadNotifications } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
  try {
    // Extract Client IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 1. IP Rate Limiting Check (5 per 10 mins)
    const rateCheck = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many enquiries submitted from this IP address. Please retry in a few minutes.",
          },
        },
        { status: 429 }
      );
    }

    // 2. Validate Request Body with Zod
    const body = await request.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_FAILED",
            message: validation.error.errors[0]?.message || "Invalid submission parameters",
            details: validation.error.errors,
          },
        },
        { status: 400 }
      );
    }

    const {
      name,
      organisation,
      instituteType,
      city,
      phone,
      email,
      need,
      message,
      consent,
      turnstileToken,
    } = validation.data;

    // 3. Cloudflare Turnstile Bot Defense
    const isBotChallengeValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isBotChallengeValid) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "CAPTCHA_FAILED",
            message: "Anti-bot challenge verification failed. Please refresh the page and retry.",
          },
        },
        { status: 400 }
      );
    }

    // 4. Ingest Lead via Admin Client (RLS bypass with server privilege separation)
    const supabase = getAdminClient();
    const { data: insertedLead, error: insertError } = await supabase
      .from("leads")
      .insert({
        name,
        organisation: organisation || null,
        institute_type: instituteType,
        city,
        phone,
        email,
        need,
        message: message || null,
        status: "new",
        consent_given: consent,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Database insert error in /api/leads:", insertError);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INTERNAL",
            message: "Could not save your enquiry to our database. Please contact us directly via email.",
          },
        },
        { status: 500 }
      );
    }

    // 5. Fire-and-forget notification dispatch
    sendLeadNotifications({
      name,
      email,
      organisation,
      need,
      city,
      phone,
      message,
    }).catch((err) => console.error("Email notification error:", err));

    return NextResponse.json(
      {
        ok: true,
        data: {
          id: insertedLead.id,
          message: "Institutional enquiry received successfully. Our team will contact you within 1 to 2 working days.",
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error in POST /api/leads:", err);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INTERNAL",
          message: "An unexpected server error occurred while processing your request.",
        },
      },
      { status: 500 }
    );
  }
}
