import { getAdminClient } from "@/lib/db/admin";
import CalendarClient, { type CalendarSessionItem } from "./CalendarClient";

export const metadata = {
  title: "Operations Calendar & Sessions | Unibotics Admin",
  description: "Chronological schedule of workshop sessions across colleges, ITIs, and ATL schools.",
};

export default async function AdminCalendarPage() {
  const supabase = getAdminClient();

  // 1. Fetch All Sessions
  const { data: rawSessions, error } = await supabase
    .from("sessions")
    .select(`
      id,
      booking_id,
      start_date,
      end_date,
      venue,
      status,
      bookings (
        id,
        institute_name,
        city,
        student_count,
        workshops (
          title,
          days
        )
      )
    `)
    .order("start_date", { ascending: true });

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch operational calendar: {error.message}
      </div>
    );
  }

  interface JoinedCalendarSession {
    id: string;
    booking_id: string;
    start_date: string;
    end_date: string;
    venue: string | null;
    status: "planned" | "done" | "cancelled";
    bookings?: {
      id: string;
      institute_name: string | null;
      city: string | null;
      student_count: number | null;
      workshops?: {
        title: string;
        days: number;
      } | null;
    } | null;
  }

  const sessionList = (rawSessions as unknown as JoinedCalendarSession[]) || [];
  const sessionIds = sessionList.map((s) => s.id);

  // 2. Fetch Assigned Mentors
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

  // Format CalendarSessionItem list
  const sessions: CalendarSessionItem[] = sessionList.map((s) => {
    const booking = s.bookings;
    const ws = booking?.workshops;

    return {
      id: s.id,
      booking_id: s.booking_id,
      start_date: s.start_date,
      end_date: s.end_date,
      venue: s.venue,
      status: s.status,
      workshop_title: ws?.title || "Robotics Training Workshop",
      workshop_days: ws?.days || 5,
      institute_name: booking?.institute_name || "Campus Cohort",
      city: booking?.city || "India",
      student_count: booking?.student_count || null,
      mentors: sessionMentorsMap[s.id] || [],
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          MASTER SCHEDULE • OPERATIONS CALENDAR
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Academic Operations Calendar</h1>
        <p className="text-xs text-slate-400 mt-1">
          Chronological timeline of all on-campus sessions, lab venues, and assigned mentor deployments.
        </p>
      </div>

      <CalendarClient sessions={sessions} />
    </div>
  );
}
