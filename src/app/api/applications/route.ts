import { NextResponse, type NextRequest } from "next/server";
import { applicationSchema } from "@/lib/validation/schemas";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { getAdminClient } from "@/lib/db/admin";

export async function POST(request: NextRequest) {
  try {
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
            message: "Too many applications submitted from this IP address. Please retry later.",
          },
        },
        { status: 429 }
      );
    }

    // 2. Body Validation with Zod
    const body = await request.json();
    const validation = applicationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_FAILED",
            message: validation.error.errors[0]?.message || "Invalid application payload",
            details: validation.error.errors,
          },
        },
        { status: 400 }
      );
    }

    const {
      applicantType,
      name,
      email,
      phone,
      organisation,
      details,
      consent,
      turnstileToken,
    } = validation.data;

    // 3. Anti-Bot Defense
    const isBotChallengeValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isBotChallengeValid) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "CAPTCHA_FAILED",
            message: "Anti-bot verification failed. Please reload and retry.",
          },
        },
        { status: 400 }
      );
    }

    // 4. Ingest Application via Service Role (Admin Client)
    const supabase = getAdminClient();
    const { data: insertedApp, error: insertError } = await supabase
      .from("applications")
      .insert({
        applicant_type: applicantType,
        name,
        email,
        phone,
        organisation: organisation || null,
        details: details || {},
        status: "pending",
        consent_given: consent,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Database error in /api/applications:", insertError);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INTERNAL",
            message: "Could not save your application to our registry.",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: {
          id: insertedApp.id,
          message:
            "Application successfully registered. Our technical review committee evaluates submissions weekly.",
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error in /api/applications:", err);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INTERNAL",
          message: "Internal server error occurred while processing application.",
        },
      },
      { status: 500 }
    );
  }
}
