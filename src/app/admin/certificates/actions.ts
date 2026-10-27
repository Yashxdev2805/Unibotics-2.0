"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logAuditEvent } from "@/lib/db/audit";
import { generateCertificateCode } from "@/lib/security/certificateCode";
import { generateCertificatePdf } from "@/lib/certificates/pdfGenerator";
import { uploadCertificatePdf, createSignedCertificateUrl } from "@/lib/certificates/storage";

async function verifySuperAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: memberships } = await supabase
    .from("memberships")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "super_admin")
    .eq("approved", true);

  if (!memberships || memberships.length === 0) {
    throw new Error("Forbidden: Super Admin privilege required.");
  }

  return user;
}

/**
 * Bulk issues verifiable certificates for all attended participants in a completed booking.
 */
export async function issueCertificatesForBooking(bookingId: string) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  // 1. Fetch Booking and Workshop Info
  const { data: booking, error: bError } = await adminClient
    .from("bookings")
    .select(`
      id,
      institute_name,
      city,
      status,
      workshops (title, days),
      institutes (name, city)
    `)
    .eq("id", bookingId)
    .single();

  if (bError || !booking) {
    return { success: false, error: "Booking record could not be loaded." };
  }

  // Type safe joins
  const joinedWs = Array.isArray(booking.workshops) ? booking.workshops[0] : booking.workshops;
  const joinedInst = Array.isArray(booking.institutes) ? booking.institutes[0] : booking.institutes;

  const workshopTitle = joinedWs?.title || "Technical Workshop Program";
  const workshopDays = joinedWs?.days || 5;
  const instituteName = booking.institute_name || joinedInst?.name || "Academic Campus";
  const campusCity = booking.city || joinedInst?.city || "India";

  // 2. Fetch Participants
  const { data: participants, error: pError } = await adminClient
    .from("participants")
    .select("id, full_name, email")
    .eq("booking_id", bookingId);

  if (pError || !participants || participants.length === 0) {
    return { success: false, error: "No participants found in this booking cohort." };
  }

  // 3. Fetch Attendance records for this booking's sessions
  const { data: sessions } = await adminClient
    .from("sessions")
    .select("id")
    .eq("booking_id", bookingId);

  const sessionIds = (sessions || []).map((s) => s.id);
  let attendedParticipantIds = new Set<string>();

  if (sessionIds.length > 0) {
    const { data: attendance } = await adminClient
      .from("attendance")
      .select("participant_id, present")
      .in("session_id", sessionIds);

    (attendance || []).forEach((a) => {
      if (a.present) attendedParticipantIds.add(a.participant_id);
    });
  }

  // 4. Fetch Already Issued Certificates to prevent duplicate generation
  const { data: existingCerts } = await adminClient
    .from("certificates")
    .select("participant_id")
    .eq("booking_id", bookingId);

  const alreadyIssuedIds = new Set((existingCerts || []).map((c) => c.participant_id));

  // Determine eligible candidates
  // If attendance was recorded, only issue for attended participants; otherwise issue for all cohort members
  const candidates = participants.filter((p) => {
    if (alreadyIssuedIds.has(p.id)) return false;
    if (attendedParticipantIds.size > 0) {
      return attendedParticipantIds.has(p.id);
    }
    return true;
  });

  if (candidates.length === 0) {
    return {
      success: true,
      issuedCount: 0,
      message: "All eligible participants already have issued certificates.",
    };
  }

  let issuedCount = 0;
  const issuedCodes: string[] = [];

  // Generate credentials sequentially to stay within memory limits
  for (const candidate of candidates) {
    const publicCode = generateCertificateCode();
    const now = new Date();

    try {
      const pdfBytes = await generateCertificatePdf({
        publicCode,
        holderName: candidate.full_name,
        workshopTitle,
        workshopDays,
        instituteName,
        city: campusCity,
        issuedAt: now,
      });

      const storagePath = `${bookingId}/${publicCode}.pdf`;
      await uploadCertificatePdf(pdfBytes, storagePath);

      const { error: insertError } = await adminClient
        .from("certificates")
        .insert({
          public_code: publicCode,
          participant_id: candidate.id,
          booking_id: bookingId,
          holder_name: candidate.full_name,
          workshop_title: workshopTitle,
          status: "valid",
          pdf_path: storagePath,
          issued_at: now.toISOString(),
        });

      if (!insertError) {
        issuedCount++;
        issuedCodes.push(publicCode);
      }
    } catch (err) {
      console.error(`Error issuing certificate for ${candidate.full_name}:`, err);
    }
  }

  // Audit Log
  await logAuditEvent({
    actorId: user.id,
    action: "BULK_ISSUE_CERTIFICATES",
    entity: "certificates",
    entityId: bookingId,
    details: {
      bookingId,
      issuedCount,
      eligibleCandidates: candidates.length,
      issuedCodes,
    },
  });

  revalidatePath("/admin/certificates");
  revalidatePath(`/admin/bookings/${bookingId}`);
  revalidatePath("/verify");
  revalidatePath("/admin");

  return {
    success: true,
    issuedCount,
    totalEligible: candidates.length,
    message: `Successfully issued ${issuedCount} verifiable certificates.`,
  };
}

/**
 * Revokes a certificate with a mandatory reason.
 */
export async function revokeCertificate(certificateId: string, reason: string) {
  const user = await verifySuperAdmin();

  if (!reason.trim() || reason.trim().length < 5) {
    return { success: false, error: "A descriptive revocation reason is mandatory (min 5 characters)." };
  }

  const adminClient = getAdminClient();
  const { error } = await adminClient
    .from("certificates")
    .update({
      status: "revoked",
      revoked_at: new Date().toISOString(),
      revoked_reason: reason.trim(),
    })
    .eq("id", certificateId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "REVOKE_CERTIFICATE",
    entity: "certificates",
    entityId: certificateId,
    details: { reason: reason.trim() },
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/verify");
  return { success: true };
}

/**
 * Reinstates a revoked certificate.
 */
export async function reinstateCertificate(certificateId: string) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("certificates")
    .update({
      status: "valid",
      revoked_at: null,
      revoked_reason: null,
    })
    .eq("id", certificateId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "REINSTATE_CERTIFICATE",
    entity: "certificates",
    entityId: certificateId,
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/verify");
  return { success: true };
}

/**
 * Generates a 60-second signed download URL for an authorized admin.
 */
export async function getAdminSignedUrl(certificateId: string) {
  await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { data: cert, error } = await adminClient
    .from("certificates")
    .select("pdf_path, public_code")
    .eq("id", certificateId)
    .single();

  if (error || !cert || !cert.pdf_path) {
    return { signedUrl: null, error: "Certificate PDF path not found." };
  }

  return await createSignedCertificateUrl(cert.pdf_path, 60);
}
