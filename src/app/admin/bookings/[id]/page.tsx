import { notFound } from "next/navigation";
import { getAdminClient } from "@/lib/db/admin";
import BookingDetailClient, {
  type BookingDetail,
  type SessionRecord,
  type MentorProfile,
  type ParticipantRecord,
  type AttendanceRecord,
} from "./BookingDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Manage RFP ${id.substring(0, 8)} | Unibotics Admin`,
  };
}

export default async function AdminBookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = getAdminClient();

  // 1. Fetch Primary Booking Record
  const { data: rawBooking } = await supabase
    .from("bookings")
    .select(`
      *,
      workshops (id, title, slug, days, audience),
      institutes (id, name, city)
    `)
    .eq("id", id)
    .maybeSingle();

  if (!rawBooking) {
    notFound();
  }

  // Format booking
  const booking: BookingDetail = {
    id: rawBooking.id,
    workshop_id: rawBooking.workshop_id,
    workshop_title: rawBooking.workshops?.title,
    workshop_slug: rawBooking.workshops?.slug,
    workshop_days: rawBooking.workshops?.days,
    workshop_audience: rawBooking.workshops?.audience || [],
    institute_id: rawBooking.institute_id,
    institute_name: rawBooking.institute_name || rawBooking.institutes?.name || null,
    requester_id: rawBooking.requester_id,
    requester_name: rawBooking.requester_name,
    requester_email: rawBooking.requester_email,
    requester_phone: rawBooking.requester_phone,
    city: rawBooking.city || rawBooking.institutes?.city || null,
    venue_type: rawBooking.venue_type,
    student_count: rawBooking.student_count,
    preferred_dates: rawBooking.preferred_dates,
    status: rawBooking.status,
    quoted_price: rawBooking.quoted_price,
    payment_status: rawBooking.payment_status,
    notes: rawBooking.notes,
    created_at: rawBooking.created_at,
  };

  // 2. Fetch Sessions for this Booking
  const { data: rawSessions } = await supabase
    .from("sessions")
    .select("id, booking_id, start_date, end_date, venue, status")
    .eq("booking_id", id)
    .order("start_date", { ascending: true });

  const sessionIds = (rawSessions || []).map((s) => s.id);

  // 3. Fetch Assigned Mentors for each Session
  const sessionMentorsMap: Record<string, { user_id: string; full_name: string }[]> = {};

  if (sessionIds.length > 0) {
    const { data: rawSM } = await supabase
      .from("session_mentors")
      .select("session_id, user_id")
      .in("session_id", sessionIds);

    const userIds = Array.from(new Set((rawSM || []).map((sm) => sm.user_id)));
    const profileMap: Record<string, string> = {};

    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      (profiles || []).forEach((p) => {
        profileMap[p.id] = p.full_name || "Assigned Mentor";
      });
    }

    (rawSM || []).forEach((sm) => {
      if (!sessionMentorsMap[sm.session_id]) {
        sessionMentorsMap[sm.session_id] = [];
      }
      sessionMentorsMap[sm.session_id].push({
        user_id: sm.user_id,
        full_name: profileMap[sm.user_id] || "Assigned Mentor",
      });
    });
  }

  const sessions: SessionRecord[] = (rawSessions || []).map((s) => ({
    id: s.id,
    booking_id: s.booking_id,
    start_date: s.start_date,
    end_date: s.end_date,
    venue: s.venue,
    status: s.status,
    mentors: sessionMentorsMap[s.id] || [],
  }));

  // 4. Fetch Available Mentors (team_member or super_admin)
  const { data: rawMembers } = await supabase
    .from("memberships")
    .select("user_id, role")
    .in("role", ["team_member", "super_admin"])
    .eq("approved", true);

  const mentorUserIds = Array.from(new Set((rawMembers || []).map((m) => m.user_id)));
  let mentors: MentorProfile[] = [];

  if (mentorUserIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, phone")
      .in("id", mentorUserIds);

    const roleMap: Record<string, string> = {};
    (rawMembers || []).forEach((m) => {
      roleMap[m.user_id] = m.role;
    });

    mentors = (profiles || []).map((p) => ({
      id: p.id,
      full_name: p.full_name || "Unibotics Lead",
      phone: p.phone,
      role: roleMap[p.id] || "team_member",
    }));
  }

  // 5. Fetch Participants Roster
  const { data: rawParticipants } = await supabase
    .from("participants")
    .select("id, booking_id, full_name, email, created_at")
    .eq("booking_id", id)
    .order("created_at", { ascending: true });

  const participants: ParticipantRecord[] = (rawParticipants || []).map((p) => ({
    id: p.id,
    booking_id: p.booking_id,
    full_name: p.full_name,
    email: p.email,
    created_at: p.created_at,
  }));

  // 6. Fetch Attendance Records
  let attendance: AttendanceRecord[] = [];
  if (sessionIds.length > 0) {
    const { data: rawAtt } = await supabase
      .from("attendance")
      .select("session_id, participant_id, present")
      .in("session_id", sessionIds);

    attendance = (rawAtt || []).map((a) => ({
      session_id: a.session_id,
      participant_id: a.participant_id,
      present: a.present,
    }));
  }

  return (
    <BookingDetailClient
      booking={booking}
      sessions={sessions}
      mentors={mentors}
      participants={participants}
      attendance={attendance}
    />
  );
}
