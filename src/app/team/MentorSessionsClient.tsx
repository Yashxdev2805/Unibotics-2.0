"use client";

import { useState } from "react";
import { setParticipantAttendance } from "@/app/admin/bookings/actions";
import {
  Calendar,
  Building2,
  Clock,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";

export interface MentorSessionItem {
  id: string;
  booking_id: string;
  start_date: string;
  end_date: string;
  venue: string | null;
  status: "planned" | "done" | "cancelled";
  workshop_title: string;
  workshop_days: number;
  institute_name: string;
  city: string;
  coordinator_name: string;
  coordinator_phone: string | null;
  coordinator_email: string;
  student_count: number | null;
  participants: { id: string; full_name: string; email: string | null }[];
  attendance: { participant_id: string; present: boolean }[];
}

interface Props {
  sessions: MentorSessionItem[];
}

export default function MentorSessionsClient({ sessions }: Props) {
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(
    sessions[0]?.id || null
  );
  const [localAttendance, setLocalAttendance] = useState<Record<string, Record<string, boolean>>>(
    () => {
      const map: Record<string, Record<string, boolean>> = {};
      sessions.forEach((s) => {
        map[s.id] = {};
        s.attendance.forEach((a) => {
          map[s.id][a.participant_id] = a.present;
        });
      });
      return map;
    }
  );
  const [savingId, setSavingId] = useState<string | null>(null);

  const toggleAttendance = async (sessionId: string, bookingId: string, participantId: string) => {
    const current = localAttendance[sessionId]?.[participantId] ?? false;
    const next = !current;

    setLocalAttendance((prev) => ({
      ...prev,
      [sessionId]: {
        ...(prev[sessionId] || {}),
        [participantId]: next,
      },
    }));

    setSavingId(`${sessionId}-${participantId}`);

    try {
      await setParticipantAttendance(sessionId, participantId, bookingId, next);
    } catch (err) {
      alert("Failed to save attendance mark: " + (err as Error).message);
      // Revert on failure
      setLocalAttendance((prev) => ({
        ...prev,
        [sessionId]: {
          ...(prev[sessionId] || {}),
          [participantId]: current,
        },
      }));
    } finally {
      setSavingId(null);
    }
  };

  const getPresentCount = (sessionId: string, participants: MentorSessionItem["participants"]) => {
    const sessionMap = localAttendance[sessionId] || {};
    return participants.filter((p) => sessionMap[p.id]).length;
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-white border border-slate-300 p-8 text-center text-xs text-slate-500 font-mono space-y-2">
        <p>No active workshop sessions are currently assigned to your mentor profile.</p>
        <p className="text-[11px] text-slate-400">
          When the central academic operations team allocates you to an on-campus cohort, it will appear here with syllabus notes and student attendance rosters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sessions.map((s, idx) => {
        const isExpanded = expandedSessionId === s.id;
        const presentCount = getPresentCount(s.id, s.participants);

        return (
          <div key={s.id} className="bg-white border border-slate-300 shadow-sm overflow-hidden">
            {/* Session Header Strip */}
            <div
              onClick={() => setExpandedSessionId(isExpanded ? null : s.id)}
              className="p-5 sm:p-6 bg-slate-50/50 hover:bg-slate-100/50 border-b border-slate-200 cursor-pointer transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100/70 border border-teal-300 px-2 py-0.5">
                    SESSION #{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border ${
                      s.status === "done"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : s.status === "cancelled"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : "bg-purple-100 text-purple-800 border-purple-300"
                    }`}
                  >
                    {s.status}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {s.workshop_days} Days Curriculum
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950 tracking-tight font-mono">
                  {s.workshop_title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-mono pt-0.5">
                  <div className="flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-900">{s.institute_name}</span>
                    <span className="text-slate-400">({s.city})</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {s.start_date} to {s.end_date}
                    </span>
                  </div>

                  {s.venue && (
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Venue: {s.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats & Toggle */}
              <div className="flex items-center space-x-4 self-end lg:self-center font-mono">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">ATTENDANCE</span>
                  <strong className="text-sm font-bold text-slate-900">
                    {presentCount} / {s.participants.length}
                  </strong>
                </div>

                <button
                  type="button"
                  className="p-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Expanded Session Logistics & Attendance Panel */}
            {isExpanded && (
              <div className="p-6 space-y-6">
                {/* Logistics & Coordinator Bar */}
                <div className="bg-slate-50 border border-slate-200 p-4 text-xs grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      Campus Faculty Coordinator:
                    </span>
                    <strong className="text-slate-900 block mt-0.5">{s.coordinator_name}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      Direct Contact Phone:
                    </span>
                    {s.coordinator_phone ? (
                      <a
                        href={`tel:${s.coordinator_phone}`}
                        className="text-teal-700 hover:underline font-mono block mt-0.5"
                      >
                        {s.coordinator_phone}
                      </a>
                    ) : (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      Official Contact Email:
                    </span>
                    <a
                      href={`mailto:${s.coordinator_email}`}
                      className="text-teal-700 hover:underline block truncate mt-0.5"
                    >
                      {s.coordinator_email}
                    </a>
                  </div>
                </div>

                {/* Attendance Marking Matrix */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-950 uppercase font-mono tracking-wider">
                        Participant Attendance Checklist
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      Total Enrolled: {s.participants.length}
                    </span>
                  </div>

                  {s.participants.length === 0 ? (
                    <div className="p-6 bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-mono">
                      No student roster has been uploaded for this session yet.
                    </div>
                  ) : (
                    <div className="border border-slate-200 overflow-x-auto max-h-96">
                      <table className="w-full text-left text-xs border-collapse font-mono">
                        <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 text-slate-600 text-[11px] uppercase">
                          <tr>
                            <th className="p-2.5">#</th>
                            <th className="p-2.5">Student Full Name</th>
                            <th className="p-2.5">Email</th>
                            <th className="p-2.5 text-center">Attendance State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-800">
                          {s.participants.map((p, pIdx) => {
                            const isPresent = localAttendance[s.id]?.[p.id] ?? false;
                            const isSaving = savingId === `${s.id}-${p.id}`;

                            return (
                              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-2.5 text-slate-400">{pIdx + 1}</td>
                                <td className="p-2.5 font-bold text-slate-950">{p.full_name}</td>
                                <td className="p-2.5 text-slate-500 text-[11px]">{p.email || "—"}</td>
                                <td className="p-2.5 text-center">
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => toggleAttendance(s.id, s.booking_id, p.id)}
                                    className={`px-3 py-1 text-xs font-bold uppercase transition-colors border ${
                                      isPresent
                                        ? "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700"
                                        : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                                    } disabled:opacity-50`}
                                  >
                                    {isSaving ? "Saving..." : isPresent ? "✓ Present" : "Absent"}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
