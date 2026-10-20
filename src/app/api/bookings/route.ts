import { NextResponse, type NextRequest } from "next/server";
import { bookingRequestSchema } from "@/lib/validation/schemas";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { getAdminClient } from "@/lib/db/admin";
import { createClient } from "@/lib/db/server";

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 1. IP Rate Limiting
    const rateCheck = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many booking requests from this IP address. Please retry in a few minutes.",
          },
        },
        { status: 429 }
      );
    }

    // 2. Body Validation
    const body = await request.json();
    const validation = bookingRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_FAILED",
            message: validation.error.errors[0]?.message || "Invalid booking parameters",
            details: validation.error.errors,
          },
        },
        { status: 400 }
      );
    }

    const {
      workshopId,
      workshopSlug,
      requesterName,
      requesterEmail,
      requesterPhone,
      instituteName,
      city,
      venueType,
      studentCount,
      preferredDates,
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

    const adminClient = getAdminClient();

    // 4. Resolve Workshop UUID
    let targetWorkshopId = workshopId;
    if (!targetWorkshopId && workshopSlug) {
      const { data: ws } = await adminClient
        .from("workshops")
        .select("id")
        .eq("slug", workshopSlug)
        .maybeSingle();

      if (ws) {
        targetWorkshopId = ws.id;
      }
    }

    if (!targetWorkshopId) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "NOT_FOUND",
            message: "Specified workshop module could not be found in active catalogue.",
          },
        },
        { status: 404 }
      );
    }

    // 5. Check if Caller has an Active Session
    let requesterId: string | null = null;
    try {
      const serverSupabase = await createClient();
      const {
        data: { user },
      } = await serverSupabase.auth.getUser();
      if (user) {
        requesterId = user.id;
      }
    } catch {
      // Unauthenticated visitor submission is completely valid
    }

    // 6. Ingest Booking via Service Role
    const { data: booking, error: insertError } = await adminClient
      .from("bookings")
      .insert({
        workshop_id: targetWorkshopId,
        requester_id: requesterId,
        requester_name: requesterName,
        requester_email: requesterEmail,
        requester_phone: requesterPhone,
        institute_name: instituteName,
        city,
        venue_type: venueType || null,
        student_count: studentCount || null,
        preferred_dates: preferredDates || null,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Database insert error in /api/bookings:", insertError);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INTERNAL",
            message: "Could not create workshop booking record.",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: {
          id: booking.id,
          message:
            "Workshop RFP registered. Our academic coordinator will verify dates and dispatch a formal quotation within 1 to 2 working days.",
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error in POST /api/bookings:", err);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INTERNAL",
          message: "Internal server error occurred while processing workshop booking.",
        },
      },
      { status: 500 }
    );
  }
}
