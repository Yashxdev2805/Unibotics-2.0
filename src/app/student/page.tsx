import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logout } from "@/app/login/actions";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  GraduationCap,
  LogOut,
  MapPin,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Student Portal & Academic Credentials | Unibotics India",
  description: "View registered technical workshop enrollments, track certifications, and download verifiable credentials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudentPortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/student");
  }

  const adminClient = getAdminClient();

  // 1. Fetch Student Profile
  const { data: profile } = await adminClient
    .from("profiles")
    .select("full_name, phone, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const studentName = profile?.full_name || user.email?.split("@")[0] || "Student Candidate";

  // 2. Fetch Workshop Participations (by user_id or email match)
  const userEmail = user.email || "";
  let query = adminClient
    .from("participants")
    .select(`
      id,
      booking_id,
      full_name,
      email,
      created_at,
      bookings (
        id,
        status,
        institute_name,
        city,
        preferred_dates,
        workshops (
          title,
          days,
          slug
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (userEmail) {
    query = query.or(`user_id.eq.${user.id},email.eq.${userEmail}`);
  } else {
    query = query.eq("user_id", user.id);
  }

  const { data: rawParticipations } = await query;

  interface JoinedParticipation {
    id: string;
    booking_id: string;
    full_name: string;
    email: string | null;
    created_at: string;
    bookings?: {
      id: string;
      status: "lead" | "quoted" | "confirmed" | "scheduled" | "completed" | "cancelled";
      institute_name: string | null;
      city: string | null;
      preferred_dates: string | null;
      workshops?: {
        title: string;
        days: number;
        slug: string;
      } | null;
    } | null;
  }

  const participations = (rawParticipations as unknown as JoinedParticipation[]) || [];
  const participantIds = participations.map((p) => p.id);

  // 3. Fetch Issued Certificates for this student
  let certificates: {
    id: string;
    public_code: string;
    status: "valid" | "revoked";
    issued_at: string;
    workshop_title: string;
    institute_name?: string;
  }[] = [];

  if (participantIds.length > 0) {
    const { data: certs } = await adminClient
      .from("certificates")
      .select(`
        id,
        public_code,
        status,
        issued_at,
        metadata,
        participant_id
      `)
      .in("participant_id", participantIds)
      .order("issued_at", { ascending: false });

    if (certs && certs.length > 0) {
      certificates = certs.map((c) => {
        const meta = (c.metadata as { workshop_title?: string; institute_name?: string }) || {};
        return {
          id: c.id,
          public_code: c.public_code,
          status: c.status,
          issued_at: c.issued_at,
          workshop_title: meta.workshop_title || "Robotics Training Workshop",
          institute_name: meta.institute_name,
        };
      });
    }
  }

  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      {/* Top Header */}
      <header className="border-b border-[#2F3545] bg-[#161920]/80 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#F97316] to-[#0EA5E9] text-white flex items-center justify-center shadow-glow">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">UNIBOTICS</span>
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-mono text-xs text-[#F97316] font-semibold uppercase">
            STUDENT ACADEMIC PORTAL
          </span>
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
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-stage w-full mx-auto px-4 sm:px-6 py-8 space-y-8 mb-16">
        {/* Profile Card Header */}
        <div className="glass-panel p-6 border border-[#2F3545] glow-line-top flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-xl font-mono shrink-0 shadow-glow">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-white tracking-tight font-mono">
                  {studentName}
                </h1>
                <span className="px-2.5 py-0.5 bg-[#212530] border border-[#64748B]/40 text-[10px] font-mono font-bold text-[#F97316] uppercase rounded-full">
                  Candidate
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                UID: {user.id.substring(0, 13)} • {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="bg-[#212530] border border-[#2F3545] px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] text-[#64748B] block uppercase">WORKSHOPS</span>
              <strong className="text-sm font-bold text-white">{participations.length}</strong>
            </div>
            <div className="bg-[#212530] border border-[#2F3545] px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] text-[#64748B] block uppercase">CREDENTIALS</span>
              <strong className="text-sm font-bold text-[#10B981]">{certificates.length}</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Verifiable Completion Certificates */}
        <section className="space-y-4">
          <div className="border-b border-[#2F3545] pb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#F97316]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Issued Cryptographic Credentials ({certificates.length})
              </h2>
            </div>
            <Link
              href="/verify"
              className="text-xs text-[#F97316] hover:underline font-semibold flex items-center space-x-1"
            >
              <span>Public Verification Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {certificates.length === 0 ? (
            <div className="glass-panel p-8 text-center text-xs text-[#94A3B8] font-mono space-y-2 border border-[#2F3545]">
              <p>No completion certificates have been issued to your academic profile yet.</p>
              <p className="text-[11px] text-[#64748B]">
                Certificates are issued automatically upon workshop completion and attendance verification by your institutional coordinator.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-panel p-5 border border-[#2F3545] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#F97316] bg-[#212530] border border-[#2F3545] px-2.5 py-0.5 rounded-full">
                        {cert.public_code}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          cert.status === "valid"
                            ? "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40"
                            : "bg-[#F03B2A]/20 text-[#F03B2A] border-[#F03B2A]/40"
                        }`}
                      >
                        {cert.status === "valid" ? "Active Credential" : "Revoked"}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white leading-snug">
                      {cert.workshop_title}
                    </h3>

                    <div className="text-xs text-[#94A3B8] space-y-1">
                      <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>
                          Issued:{" "}
                          {new Date(cert.issued_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Tamper-proof SHA-256 verifiable QR badge embedded</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#2F3545] flex items-center justify-between gap-2">
                    <Link
                      href={`/verify?code=${encodeURIComponent(cert.public_code)}`}
                      target="_blank"
                      className="text-xs text-[#F97316] hover:underline font-semibold inline-flex items-center space-x-1"
                    >
                      <span>Verify Online</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    {cert.status === "valid" && (
                      <a
                        href={`/api/certificates/${encodeURIComponent(cert.public_code)}/download`}
                        download
                        className="btn-primary-cyan px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase flex items-center space-x-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                        <span>Download PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Workshop Enrollments & Academic Records */}
        <section className="space-y-4">
          <div className="border-b border-[#2F3545] pb-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#F97316]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Workshop Enrollments & Cohort Records
              </h2>
            </div>
          </div>

          {participations.length === 0 ? (
            <div className="glass-panel p-8 text-center text-xs text-[#94A3B8] font-mono space-y-2 border border-[#2F3545]">
              <p>No active workshop enrollments found for this account.</p>
              <p className="text-[11px] text-[#64748B]">
                When your institute uploads the cohort roster, your account will automatically reflect your enrolled sessions.
              </p>
              <div className="pt-2">
                <Link
                  href="/workshops"
                  className="btn-secondary-dark inline-block px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold"
                >
                  Browse Workshop Catalogue
                </Link>
              </div>
            </div>
          ) : (
            <div className="glass-panel border border-[#2F3545] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#212530] border-b border-[#2F3545] text-[#94A3B8] font-mono text-[11px] uppercase">
                    <th className="p-3">Workshop Title</th>
                    <th className="p-3">Host Campus</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Enrolled On</th>
                    <th className="p-3">Lifecycle Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2F3545] text-[#94A3B8]">
                  {participations.map((p) => {
                    const booking = p.bookings;
                    const ws = booking?.workshops;
                    return (
                      <tr key={p.id} className="hover:bg-[#212530]/50 transition-colors">
                        <td className="p-3 font-semibold text-white">
                          {ws?.title || "Technical Training Workshop"}
                        </td>
                        <td className="p-3 text-[#94A3B8]">
                          <span className="block font-medium text-white">{booking?.institute_name || "Campus Cohort"}</span>
                          <span className="text-[11px] text-[#64748B]">{booking?.city || "India"}</span>
                        </td>
                        <td className="p-3 font-mono text-[#94A3B8]">
                          {ws?.days ? `${ws.days} Days Intensive` : "Standard"}
                        </td>
                        <td className="p-3 font-mono text-[#64748B] text-[11px]">
                          {new Date(p.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full border ${
                              booking?.status === "completed"
                                ? "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40"
                                : booking?.status === "scheduled"
                                ? "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/40"
                                : "bg-[#212530] text-[#94A3B8] border-[#2F3545]"
                            }`}
                          >
                            {booking?.status || "registered"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
