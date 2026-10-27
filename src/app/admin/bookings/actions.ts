"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logAuditEvent } from "@/lib/db/audit";

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

export async function updateBookingStatus(
  bookingId: string,
  newStatus: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled"
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", bookingId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "UPDATE_BOOKING_STATUS",
    entity: "bookings",
    entityId: bookingId,
    details: { newStatus },
  });

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function updateBookingFinancials(
  bookingId: string,
  quotedPrice: number | null,
  paymentStatus: "unpaid" | "partial" | "paid",
  notes: string | null
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("bookings")
    .update({
      quoted_price: quotedPrice,
      payment_status: paymentStatus,
      notes: notes || null,
    })
    .eq("id", bookingId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "UPDATE_BOOKING_FINANCIALS",
    entity: "bookings",
    entityId: bookingId,
    details: { quotedPrice, paymentStatus, notes },
  });

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}

export async function createSession(
  bookingId: string,
  startDate: string,
  endDate: string,
  venue: string
) {
  const user = await verifySuperAdmin();

  if (new Date(endDate) < new Date(startDate)) {
    return { success: false, error: "Session End Date cannot precede Start Date." };
  }

  const adminClient = getAdminClient();
  const { data: session, error } = await adminClient
    .from("sessions")
    .insert({
      booking_id: bookingId,
      start_date: startDate,
      end_date: endDate,
      venue: venue.trim() || null,
      status: "planned",
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "CREATE_SESSION",
    entity: "sessions",
    entityId: session.id,
    details: { bookingId, startDate, endDate, venue },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true, sessionId: session.id };
}

export async function updateSessionStatus(
  sessionId: string,
  bookingId: string,
  status: "planned" | "done" | "cancelled"
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("sessions")
    .update({ status })
    .eq("id", sessionId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "UPDATE_SESSION_STATUS",
    entity: "sessions",
    entityId: sessionId,
    details: { bookingId, status },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}

export async function assignMentorToSession(
  sessionId: string,
  bookingId: string,
  mentorUserId: string
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  // Attempt insert into session_mentors.
  // Note: PostgreSQL trigger `session_mentors_conflict` raises an exception if mentor overlaps.
  const { error } = await adminClient
    .from("session_mentors")
    .insert({
      session_id: sessionId,
      user_id: mentorUserId,
    });

  if (error) {
    // Intercept PostgreSQL trigger exception message gracefully
    if (
      error.message?.includes("overlapping session") ||
      error.message?.includes("check_mentor_conflict") ||
      error.details?.includes("overlapping session")
    ) {
      return {
        success: false,
        error: "SCHEDULING CONFLICT: This mentor is already assigned to another active session that overlaps with these dates.",
      };
    }
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "ASSIGN_SESSION_MENTOR",
    entity: "session_mentors",
    entityId: sessionId,
    details: { bookingId, mentorUserId },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}

export async function removeMentorFromSession(
  sessionId: string,
  bookingId: string,
  mentorUserId: string
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("session_mentors")
    .delete()
    .eq("session_id", sessionId)
    .eq("user_id", mentorUserId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "REMOVE_SESSION_MENTOR",
    entity: "session_mentors",
    entityId: sessionId,
    details: { bookingId, mentorUserId },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}

export async function addParticipant(
  bookingId: string,
  fullName: string,
  email?: string
) {
  const user = await verifySuperAdmin();

  if (!fullName.trim()) {
    return { success: false, error: "Participant full name is required." };
  }

  const adminClient = getAdminClient();
  const { error } = await adminClient
    .from("participants")
    .insert({
      booking_id: bookingId,
      full_name: fullName.trim(),
      email: email?.trim() || null,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "ADD_PARTICIPANT",
    entity: "participants",
    details: { bookingId, fullName, email },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}

export async function bulkImportParticipants(
  bookingId: string,
  csvContent: string
) {
  const user = await verifySuperAdmin();

  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { success: false, error: "No valid rows found in CSV input." };
  }

  // Parse lines: Name, Email (optional)
  const rowsToInsert: { booking_id: string; full_name: string; email: string | null }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    // Skip header line if detected
    if (i === 0 && (rawLine.toLowerCase().includes("name") || rawLine.toLowerCase().includes("email"))) {
      continue;
    }

    const parts = rawLine.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
    const name = parts[0];
    const email = parts[1] || null;

    if (name && name.length >= 2) {
      rowsToInsert.push({
        booking_id: bookingId,
        full_name: name,
        email: email && email.includes("@") ? email : null,
      });
    }
  }

  if (rowsToInsert.length === 0) {
    return { success: false, error: "Could not parse any valid participant names from the input." };
  }

  const adminClient = getAdminClient();
  const { error } = await adminClient
    .from("participants")
    .insert(rowsToInsert);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "BULK_IMPORT_PARTICIPANTS",
    entity: "participants",
    details: { bookingId, importedCount: rowsToInsert.length },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true, count: rowsToInsert.length };
}

export async function deleteParticipant(
  participantId: string,
  bookingId: string
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("participants")
    .delete()
    .eq("id", participantId)
    .eq("booking_id", bookingId);

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "DELETE_PARTICIPANT",
    entity: "participants",
    entityId: participantId,
    details: { bookingId },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}

export async function setParticipantAttendance(
  sessionId: string,
  participantId: string,
  bookingId: string,
  present: boolean
) {
  const user = await verifySuperAdmin();
  const adminClient = getAdminClient();

  const { error } = await adminClient
    .from("attendance")
    .upsert({
      session_id: sessionId,
      participant_id: participantId,
      present,
      marked_by: user.id,
    }, { onConflict: "session_id, participant_id" });

  if (error) {
    return { success: false, error: error.message };
  }

  await logAuditEvent({
    actorId: user.id,
    action: "SET_ATTENDANCE",
    entity: "attendance",
    details: { sessionId, participantId, present },
  });

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { success: true };
}
