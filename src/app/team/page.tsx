import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logout } from "@/app/login/actions";
import MentorSessionsClient, { type MentorSessionItem } from "./MentorSessionsClient";
import {
  Briefcase,
  Calendar,
  LogOut,
  ShieldCheck,
  User,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  Cpu,
  Wrench,
  GraduationCap,
} from "lucide-react";

export const metadata = {
  title: "Engineering Team & Field Mentors | Unibotics India",
  description:
    "Meet the robotics engineers, curriculum leads, and ATL architects delivering hands-on technical education across India.",
};

// Public verified team members (Section 12: No member shown without recorded photo consent)
const publicTeamMembers = [
  {
    name: "Yash Sharma",
    role: "Director of Engineering & Hardware Architect",
    specialization: "Robotics Kinematics & ATL P1-P4 Lab Systems",
    bio: "Leads technical delivery and hardware commissioning for institutional innovation labs across North India. Specializes in embedded firmware and high-reliability lab testbeds.",
    credentials: "B.Tech Robotics • Certified Lab Architect",
    initials: "YS",
  },
  {
    name: "Rohit Verma",
    role: "Senior Embedded Systems Mentor",
    specialization: "IoT Telemetry, ESP32 & Autonomous Ground Vehicles",
    bio: "Conducts intensive 5-day and 7-day applied engineering bootcamps for university and polytechnic cohorts with over 4,000+ mentored students.",
    credentials: "M.Tech Embedded Systems • Field Lead",
    initials: "RV",
  },
  {
    name: "Pooja Chhabra",
    role: "STEM Curriculum & Pedagogy Specialist",
    specialization: "NEP 2020 Experiential Frameworks & Faculty Training",
    bio: "Designs classroom-tested project blueprints for Atal Tinkering Labs and conducts multi-day train-the-trainer workshops for secondary school science faculty.",
    credentials: "M.Sc Applied Electronics • Curriculum Lead",
    initials: "PC",
  },
  {
    name: "Aman Deep Singh",
    role: "UAV & Drone Systems Engineer",
    specialization: "Autonomous Flight Controllers & Micro-Aviation",
    bio: "Directs aerial robotics workshops, aerodynamics calibration, and competitive quadcopter build sprints across college technical symposiums.",
    credentials: "Aeronautical Systems Specialist • Senior Mentor",
    initials: "AS",
  },
];

export default async function TeamPage(props: {
  searchParams?: Promise<{ view?: string }>;
}) {
  const searchParams = await props.searchParams;
  const requestedView = searchParams?.view;

  const cookieStore = await cookies();
  const hasAuthToken = cookieStore.getAll().some((c) => c.name.includes("-auth-token"));

  let user = null;
  let isAuthorizedMentor = false;

  if (hasAuthToken) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      const { data: memberships } = await supabase
        .from("memberships")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["team_member", "super_admin"])
        .eq("approved", true);

      if (memberships && memberships.length > 0) {
        isAuthorizedMentor = true;
      }
    }
  }

  // If user is a verified mentor and specifically requested workspace or is signed in without forcing directory:
  const showWorkspace = isAuthorizedMentor && requestedView !== "directory";

  // If showing mentor field workspace, load sessions data
  let sessions: MentorSessionItem[] = [];
  let mentorName = "Technical Mentor";

  if (showWorkspace && user) {
    const adminClient = getAdminClient();

    const { data: profile } = await adminClient
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .maybeSingle();

    mentorName = profile?.full_name || user.email?.split("@")[0] || "Technical Mentor";

    const { data: rawAssignments } = await adminClient
      .from("session_mentors")
      .select(`
        session_id,
        sessions (
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
            requester_name,
            requester_email,
            requester_phone,
            student_count,
            workshops (
              title,
              days
            )
          )
        )
      `)
      .eq("user_id", user.id);

    interface JoinedSession {
      session_id: string;
      sessions?: {
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
          requester_name: string;
          requester_email: string;
          requester_phone: string | null;
          student_count: number | null;
          workshops?: {
            title: string;
            days: number;
          } | null;
        } | null;
      } | null;
    }

    const assignments = (rawAssignments as unknown as JoinedSession[]) || [];
    const sessionList = assignments
      .map((a) => a.sessions)
      .filter((s): s is NonNullable<typeof s> => Boolean(s));

    const bookingIds = Array.from(new Set(sessionList.map((s) => s.booking_id)));
    const sessionIds = sessionList.map((s) => s.id);

    let participantsByBooking: Record<string, { id: string; full_name: string; email: string | null }[]> = {};
    if (bookingIds.length > 0) {
      const { data: parts } = await adminClient
        .from("participants")
        .select("id, booking_id, full_name, email")
        .in("booking_id", bookingIds)
        .order("full_name", { ascending: true });

      (parts || []).forEach((p) => {
        if (!participantsByBooking[p.booking_id]) {
          participantsByBooking[p.booking_id] = [];
        }
        participantsByBooking[p.booking_id].push({
          id: p.id,
          full_name: p.full_name,
          email: p.email,
        });
      });
    }

    let attendanceBySession: Record<string, { participant_id: string; present: boolean }[]> = {};
    if (sessionIds.length > 0) {
      const { data: att } = await adminClient
        .from("attendance")
        .select("session_id, participant_id, present")
        .in("session_id", sessionIds);

      (att || []).forEach((a) => {
        if (!attendanceBySession[a.session_id]) {
          attendanceBySession[a.session_id] = [];
        }
        attendanceBySession[a.session_id].push({
          participant_id: a.participant_id,
          present: a.present,
        });
      });
    }

    sessions = sessionList.map((s) => {
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
        institute_name: booking?.institute_name || "Host Institution",
        city: booking?.city || "India",
        coordinator_name: booking?.requester_name || "Faculty In-Charge",
        coordinator_phone: booking?.requester_phone || null,
        coordinator_email: booking?.requester_email || "coordinator@college.ac.in",
        student_count: booking?.student_count || null,
        participants: participantsByBooking[s.booking_id] || [],
        attendance: attendanceBySession[s.id] || [],
      };
    });
  }

  // --- VIEW 1: MENTOR FIELD WORKSPACE (AUTHENTICATED) ---
  if (showWorkspace && user) {
    return (
      <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
        {/* Workspace Sub-Header */}
        <div className="border-b border-[#2F3545] bg-[#161920]/80 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#F97316] font-semibold uppercase">
              MENTOR FIELD WORKSPACE
            </span>
            <span className="text-[#2F3545]">|</span>
            <Link
              href="/team?view=directory"
              className="text-xs text-[#94A3B8] hover:text-white transition-colors"
            >
              View Public Team Page →
            </Link>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-[#64748B] hidden sm:inline">{user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="text-[#94A3B8] hover:text-[#F03B2A] transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Main Workspace */}
        <main className="flex-1 max-w-stage w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-xl font-mono shrink-0 shadow-glow">
                {mentorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black text-white tracking-tight font-mono">
                    {mentorName}
                  </h1>
                  <span className="px-2 py-0.5 bg-[#212530] border border-[#64748B]/40 text-[10px] font-mono font-bold text-[#F97316] uppercase rounded-full">
                    Field Lead
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                  Authorized Field Mentor • {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="bg-[#212530] border border-[#2F3545] px-4 py-2 rounded-xl text-center">
                <span className="text-[10px] text-[#64748B] block uppercase">
                  ASSIGNED SESSIONS
                </span>
                <strong className="text-base font-bold text-white">
                  {sessions.length}
                </strong>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[#2F3545] pb-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#F97316]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Assigned Workshop Sessions & Attendance Checklists
              </h2>
            </div>

            <MentorSessionsClient sessions={sessions} />
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW 2: PUBLIC TEAM DIRECTORY & RECRUITMENT PAGE (DESIGN.md Section 12) ---
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      
      {/* Mentor Workspace Access Banner if user is logged in */}
      {isAuthorizedMentor && (
        <div className="bg-[#212530] border-b border-[#2F3545] py-2 px-4 text-center text-xs text-[#F97316]">
          <span>You are recognized as an authorized field mentor. </span>
          <Link
            href="/team?view=workspace"
            className="font-bold underline text-white hover:text-[#F97316] ml-1"
          >
            Launch Mentor Field Workspace →
          </Link>
        </div>
      )}

      {/* Hero Header */}
      <section className="pt-12 pb-8 px-4 sm:px-6 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#212530] border border-[#2F3545] text-xs font-mono text-[#F97316]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>VERIFIED ENGINEERING INSTRUCTORS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          The Mentors Behind Indian Campus Robotics
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Our engineering team blends industrial automation experience with deep pedagogical rigor. We deliver physical hardware training across schools, polytechnics, and universities.
        </p>
      </section>

      {/* Team Cards Grid (Section 12: Grid of team cards; photo/initials, name, role, bio; Join Team CTA) */}
      <section className="py-8 px-4 sm:px-6 max-w-stage mx-auto w-full mb-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicTeamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 space-y-4 border border-[#2F3545] hover:border-[#64748B] transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-lg font-mono shrink-0 shadow-glow">
                  {member.initials}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {member.name}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#212530] text-[#10B981] border border-[#10B981]/30">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#F97316]">
                    {member.role}
                  </p>
                  <span className="text-[11px] font-mono text-[#64748B] block">
                    {member.credentials}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-[#2F3545]">
                {member.bio}
              </p>

              <div className="p-2.5 rounded-lg bg-[#161920] border border-[#2F3545] text-[11px] text-[#64748B] font-mono">
                Focus: {member.specialization}
              </div>
            </div>
          ))}
        </div>

        {/* Join Team Call to Action (Section 12: Join Team call to action at the end) */}
        <div className="glass-panel p-8 sm:p-10 border-[#2F3545] glow-line-top flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F97316]">
              Careers & Field Instructor Network
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Are you an engineer passionate about teaching hands-on STEM?
            </h3>
            <p className="text-xs text-[#94A3B8] max-w-xl">
              We recruit hardware engineers, robotics graduates, and embedded systems developers to mentor campus cohorts across Haryana, Punjab, and NCR.
            </p>
          </div>
          <Link
            href="/careers"
            className="btn-primary-cyan px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 flex items-center space-x-2"
          >
            <span>Apply as Mentor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
