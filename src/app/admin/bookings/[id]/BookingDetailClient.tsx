"use client";

import { useState } from "react";
import Link from "next/link";
import {
  updateBookingStatus,
  updateBookingFinancials,
  createSession,
  updateSessionStatus,
  assignMentorToSession,
  removeMentorFromSession,
  addParticipant,
  bulkImportParticipants,
  deleteParticipant,
  setParticipantAttendance,
} from "../actions";
import {
  Calendar,
  Building2,
  Clock,
  User,
  Mail,
  Phone,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Plus,
  FileSpreadsheet,
  Users,
  ShieldAlert,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

export interface BookingDetail {
  id: string;
  workshop_id: string;
  workshop_title?: string;
  workshop_slug?: string;
  workshop_days?: number;
  workshop_audience?: string[];
  institute_id: string | null;
  institute_name: string | null;
  requester_id: string | null;
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  city: string | null;
  venue_type: string | null;
  student_count: number | null;
  preferred_dates: string | null;
  status: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled";
  quoted_price: number | null;
  payment_status: "unpaid" | "partial" | "paid";
  notes: string | null;
  created_at: string;
}

export interface SessionRecord {
  id: string;
  booking_id: string;
  start_date: string;
  end_date: string;
  venue: string | null;
  status: "planned" | "done" | "cancelled";
  mentors: { user_id: string; full_name: string }[];
}

export interface MentorProfile {
  id: string;
  full_name: string;
  phone: string | null;
  role: string;
}

export interface ParticipantRecord {
  id: string;
  booking_id: string;
  full_name: string;
  email: string | null;
  created_at: string;
}

export interface AttendanceRecord {
  session_id: string;
  participant_id: string;
  present: boolean;
}

interface Props {
  booking: BookingDetail;
  sessions: SessionRecord[];
  mentors: MentorProfile[];
  participants: ParticipantRecord[];
  attendance: AttendanceRecord[];
}

export default function BookingDetailClient({
  booking,
  sessions,
  mentors,
  participants,
  attendance,
}: Props) {
  // Financial & Status State
  const [currentStatus, setCurrentStatus] = useState(booking.status);
  const [quotedPrice, setQuotedPrice] = useState(booking.quoted_price?.toString() || "");
  const [paymentStatus, setPaymentStatus] = useState(booking.payment_status);
  const [notes, setNotes] = useState(booking.notes || "");
  const [financialSaving, setFinancialSaving] = useState(false);
  const [financialFeedback, setFinancialFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  // New Session State
  const [sessionStartDate, setSessionStartDate] = useState("");
  const [sessionEndDate, setSessionEndDate] = useState("");
  const [sessionVenue, setSessionVenue] = useState(booking.venue_type || "");
  const [sessionCreating, setSessionCreating] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // Mentor Assignment State
  const [selectedMentor, setSelectedMentor] = useState<Record<string, string>>({});
  const [mentorActionError, setMentorActionError] = useState<string | null>(null);
  const [mentorActionSuccess, setMentorActionSuccess] = useState<string | null>(null);

  // Participant State
  const [newPartName, setNewPartName] = useState("");
  const [newPartEmail, setNewPartEmail] = useState("");
  const [partAdding, setPartAdding] = useState(false);
  const [csvInput, setCsvInput] = useState("");
  const [showCsvBox, setShowCsvBox] = useState(false);
  const [csvImporting, setCsvImporting] = useState(false);
  const [partMessage, setPartMessage] = useState<{ ok: boolean; msg: string } | null>(null);

  // Attendance State
  const [selectedSessionForAttendance, setSelectedSessionForAttendance] = useState<string>(
    sessions[0]?.id || ""
  );

  // Financial Update Handler
  const handleSaveFinancials = async (e: React.FormEvent) => {
    e.preventDefault();
    setFinancialSaving(true);
    setFinancialFeedback(null);

    const priceNum = quotedPrice.trim() ? Number(quotedPrice) : null;

    try {
      if (currentStatus !== booking.status) {
        const statusRes = await updateBookingStatus(booking.id, currentStatus);
        if (!statusRes.success) {
          setFinancialFeedback({ ok: false, msg: statusRes.error || "Failed to update status." });
          setFinancialSaving(false);
          return;
        }
      }

      const finRes = await updateBookingFinancials(
        booking.id,
        priceNum,
        paymentStatus,
        notes
      );

      if (!finRes.success) {
        setFinancialFeedback({ ok: false, msg: finRes.error || "Failed to update financials." });
      } else {
        setFinancialFeedback({ ok: true, msg: "Financial details and status updated successfully." });
      }
    } catch (err) {
      setFinancialFeedback({ ok: false, msg: (err as Error).message });
    } finally {
      setFinancialSaving(false);
    }
  };

  // Create Session Handler
  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionStartDate || !sessionEndDate) {
      setSessionError("Both Start and End dates are required.");
      return;
    }
    setSessionCreating(true);
    setSessionError(null);

    try {
      const res = await createSession(booking.id, sessionStartDate, sessionEndDate, sessionVenue);
      if (!res.success) {
        setSessionError(res.error || "Failed to create session.");
      } else {
        setSessionStartDate("");
        setSessionEndDate("");
        if (res.sessionId && !selectedSessionForAttendance) {
          setSelectedSessionForAttendance(res.sessionId);
        }
      }
    } catch (err) {
      setSessionError((err as Error).message);
    } finally {
      setSessionCreating(false);
    }
  };

  // Assign Mentor Handler
  const handleAssignMentor = async (sessionId: string) => {
    const mentorId = selectedMentor[sessionId];
    if (!mentorId) return;

    setMentorActionError(null);
    setMentorActionSuccess(null);

    try {
      const res = await assignMentorToSession(sessionId, booking.id, mentorId);
      if (!res.success) {
        setMentorActionError(res.error || "Failed to assign mentor.");
      } else {
        setMentorActionSuccess("Mentor assigned successfully.");
        setSelectedMentor((prev) => ({ ...prev, [sessionId]: "" }));
      }
    } catch (err) {
      setMentorActionError((err as Error).message);
    }
  };

  // Remove Mentor Handler
  const handleRemoveMentor = async (sessionId: string, mentorUserId: string) => {
    setMentorActionError(null);
    setMentorActionSuccess(null);

    try {
      const res = await removeMentorFromSession(sessionId, booking.id, mentorUserId);
      if (!res.success) {
        setMentorActionError(res.error || "Failed to remove mentor.");
      }
    } catch (err) {
      setMentorActionError((err as Error).message);
    }
  };

  // Add Single Participant
  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartName.trim()) return;

    setPartAdding(true);
    setPartMessage(null);

    try {
      const res = await addParticipant(booking.id, newPartName, newPartEmail);
      if (!res.success) {
        setPartMessage({ ok: false, msg: res.error || "Failed to add participant." });
      } else {
        setNewPartName("");
        setNewPartEmail("");
        setPartMessage({ ok: true, msg: "Participant added to cohort." });
      }
    } catch (err) {
      setPartMessage({ ok: false, msg: (err as Error).message });
    } finally {
      setPartAdding(false);
    }
  };

  // Bulk CSV Import
  const handleBulkImport = async () => {
    if (!csvInput.trim()) return;

    setCsvImporting(true);
    setPartMessage(null);

    try {
      const res = await bulkImportParticipants(booking.id, csvInput);
      if (!res.success) {
        setPartMessage({ ok: false, msg: res.error || "Bulk import failed." });
      } else {
        setCsvInput("");
        setShowCsvBox(false);
        setPartMessage({ ok: true, msg: `Successfully imported ${res.count} participant records.` });
      }
    } catch (err) {
      setPartMessage({ ok: false, msg: (err as Error).message });
    } finally {
      setCsvImporting(false);
    }
  };

  // Delete Participant
  const handleDeleteParticipant = async (participantId: string) => {
    if (!confirm("Are you sure you want to remove this participant?")) return;

    try {
      await deleteParticipant(participantId, booking.id);
    } catch (err) {
      alert("Failed to delete participant: " + (err as Error).message);
    }
  };

  // Attendance Toggle
  const handleAttendanceToggle = async (sessionId: string, participantId: string, currentPresent: boolean) => {
    try {
      await setParticipantAttendance(sessionId, participantId, booking.id, !currentPresent);
    } catch (err) {
      alert("Failed to update attendance: " + (err as Error).message);
    }
  };

  // Helper to check attendance status
  const isPresent = (sessionId: string, participantId: string) => {
    const record = attendance.find(
      (a) => a.session_id === sessionId && a.participant_id === participantId
    );
    return record?.present ?? false;
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to All Workshop Bookings
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
              RFP: {booking.id.substring(0, 8)}
            </h1>
            <span
              className={`px-2 py-0.5 text-xs font-mono font-bold uppercase border ${
                booking.status === "completed"
                  ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                  : booking.status === "scheduled"
                  ? "bg-purple-950/80 text-purple-400 border-purple-800"
                  : booking.status === "confirmed"
                  ? "bg-blue-950/80 text-blue-400 border-blue-800"
                  : booking.status === "cancelled"
                  ? "bg-red-950/80 text-red-400 border-red-800"
                  : "bg-amber-950/80 text-amber-400 border-amber-800"
              }`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Program: <strong className="text-white">{booking.workshop_title || "Technical Program"}</strong> ({booking.workshop_days} Days) • Campus: <strong className="text-white">{booking.institute_name || "Direct Campus"}</strong>, {booking.city || "India"}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3 text-right font-mono text-xs">
          <span className="text-[10px] text-slate-500 block uppercase">SUBMITTED ON</span>
          <span className="text-slate-300 font-bold">
            {new Date(booking.created_at).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Grid: Left Column (Financials & RFP Details) + Right Column (Sessions & Mentors) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): RFP Specification & Financial Governance */}
        <div className="lg:col-span-5 space-y-6">
          {/* RFP Snapshot */}
          <div className="bg-slate-950 border border-slate-800 p-5 space-y-4">
            <div className="border-b border-slate-850 pb-2">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block">
                INTAKE DOSSIER
              </span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-0.5">
                Client & Venue Specifications
              </h2>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Coordinator Name:</span>
                <span className="text-white font-semibold">{booking.requester_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Email:</span>
                  <a href={`mailto:${booking.requester_email}`} className="text-teal-400 hover:underline truncate block">
                    {booking.requester_email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Phone:</span>
                  <a href={`tel:${booking.requester_phone}`} className="text-slate-300 hover:text-teal-400 block font-mono">
                    {booking.requester_phone || "Not provided"}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Target Window:</span>
                  <span className="text-slate-200 font-mono">{booking.preferred_dates || "Unspecified"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Cohort Count:</span>
                  <span className="text-slate-200 font-mono font-bold">
                    {booking.student_count ? `${booking.student_count} Participants` : "Unspecified"}
                  </span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-900">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Venue Infrastructure:</span>
                <span className="text-slate-300">{booking.venue_type || "Standard Electronics / Computer Facility"}</span>
              </div>
            </div>
          </div>

          {/* Financial & Status Governance Form */}
          <form onSubmit={handleSaveFinancials} className="bg-slate-950 border border-slate-800 p-5 space-y-4">
            <div className="border-b border-slate-850 pb-2">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block">
                COMMERCIAL GOVERNANCE
              </span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-0.5">
                Quotation & Billing State
              </h2>
            </div>

            {financialFeedback && (
              <div
                className={`p-3 text-xs flex items-start space-x-2 border ${
                  financialFeedback.ok
                    ? "bg-emerald-950/80 border-emerald-800 text-emerald-300"
                    : "bg-red-950/80 border-red-800 text-red-300"
                }`}
              >
                {financialFeedback.ok ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{financialFeedback.msg}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Booking Operational Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as BookingDetail["status"])}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-white text-xs font-mono focus:border-slate-600 focus:outline-none"
                >
                  <option value="pending">pending (Intake Evaluation)</option>
                  <option value="confirmed">confirmed (Dates Agreed)</option>
                  <option value="scheduled">scheduled (Mentors Deployed)</option>
                  <option value="completed">completed (Workshop Delivered)</option>
                  <option value="cancelled">cancelled (Terminated)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Quoted Fee (₹ INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-slate-500 font-mono text-xs">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 75000"
                      value={quotedPrice}
                      onChange={(e) => setQuotedPrice(e.target.value)}
                      className="w-full pl-6 pr-2 py-2 bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-slate-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as BookingDetail["payment_status"])}
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-white text-xs font-mono focus:border-slate-600 focus:outline-none"
                  >
                    <option value="unpaid">unpaid</option>
                    <option value="partial">partial (Advance Received)</option>
                    <option value="paid">paid (Full Settlement)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Internal Operations Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Record PO numbers, kit dispatch notes, GST invoice tracking..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-slate-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={financialSaving}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {financialSaving ? "Saving Financial Records..." : "Update Commercial Dossier"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column (7 cols): Sessions, Mentor Allocation & Attendance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section: Sessions & Mentor Deployment */}
          <div className="bg-slate-950 border border-slate-800 p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
              <div>
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block">
                  FIELD DEPLOYMENT
                </span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-0.5">
                  Academic Sessions & Mentor Assignment
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {sessions.length} Session(s) Scheduled
              </span>
            </div>

            {/* Error / Conflict Banner */}
            {mentorActionError && (
              <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start space-x-2 font-mono">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-red-200">CONFLICT DETECTED:</strong>
                  <span>{mentorActionError}</span>
                </div>
              </div>
            )}

            {mentorActionSuccess && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{mentorActionSuccess}</span>
              </div>
            )}

            {/* Sessions List */}
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <div className="p-6 bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs font-mono">
                  No operational sessions have been added to this booking yet. Use the schedule form below.
                </div>
              ) : (
                sessions.map((s, idx) => (
                  <div key={s.id} className="bg-slate-900 border border-slate-800 p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 bg-teal-600 text-slate-950 text-[11px] font-black flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <div className="text-xs font-mono text-white">
                          <strong>{s.start_date}</strong> to <strong>{s.end_date}</strong>
                        </div>
                        {s.venue && (
                          <span className="text-[11px] text-slate-400">
                            • Room/Venue: {s.venue}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 uppercase border ${
                            s.status === "done"
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : s.status === "cancelled"
                              ? "bg-red-950 text-red-400 border-red-800"
                              : "bg-slate-950 text-slate-300 border-slate-700"
                          }`}
                        >
                          {s.status}
                        </span>

                        <select
                          value={s.status}
                          onChange={(e) =>
                            updateSessionStatus(
                              s.id,
                              booking.id,
                              e.target.value as "planned" | "done" | "cancelled"
                            )
                          }
                          className="bg-slate-950 border border-slate-800 text-[10px] text-slate-300 px-1 py-0.5 focus:outline-none"
                        >
                          <option value="planned">planned</option>
                          <option value="done">done</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Assigned Mentors */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Assigned Mentor Cohort:
                      </span>
                      {s.mentors.length === 0 ? (
                        <p className="text-[11px] text-amber-400 font-mono italic">
                          No mentors assigned yet. (Assign below)
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {s.mentors.map((m) => (
                            <div
                              key={m.user_id}
                              className="bg-slate-950 border border-slate-700 px-2 py-1 text-xs flex items-center space-x-2"
                            >
                              <User className="w-3.5 h-3.5 text-teal-400" />
                              <span className="text-white font-mono text-[11px]">{m.full_name}</span>
                              <button
                                type="button"
                                title="Remove mentor from session"
                                onClick={() => handleRemoveMentor(s.id, m.user_id)}
                                className="text-slate-500 hover:text-red-400 transition-colors ml-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Assign Mentor Dropdown */}
                    <div className="pt-2 border-t border-slate-850 flex items-center space-x-2">
                      <select
                        value={selectedMentor[s.id] || ""}
                        onChange={(e) =>
                          setSelectedMentor((prev) => ({ ...prev, [s.id]: e.target.value }))
                        }
                        className="flex-1 bg-slate-950 border border-slate-800 px-2 py-1.5 text-xs text-white focus:outline-none"
                      >
                        <option value="">Select certified mentor...</option>
                        {mentors.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.full_name} ({m.role})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleAssignMentor(s.id)}
                        disabled={!selectedMentor[s.id]}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 font-mono text-xs font-bold uppercase transition-colors disabled:opacity-40"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Form: Schedule New Session */}
            <form onSubmit={handleCreateSession} className="bg-slate-900 border border-slate-800 p-4 space-y-3">
              <span className="text-[11px] font-mono text-slate-300 uppercase font-bold block">
                Schedule Additional Academic Session
              </span>

              {sessionError && (
                <div className="p-2 bg-red-950 border border-red-800 text-red-300 text-xs font-mono">
                  {sessionError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionStartDate}
                    onChange={(e) => setSessionStartDate(e.target.value)}
                    className="w-full p-1.5 bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionEndDate}
                    onChange={(e) => setSessionEndDate(e.target.value)}
                    className="w-full p-1.5 bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Venue / Room
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lab 402, Block B"
                    value={sessionVenue}
                    onChange={(e) => setSessionVenue(e.target.value)}
                    className="w-full p-1.5 bg-slate-950 border border-slate-800 text-white text-xs focus:border-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={sessionCreating}
                  className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {sessionCreating ? "Scheduling..." : "Add Session to Calendar"}
                </button>
              </div>
            </form>
          </div>

          {/* Section: Participant Roster & Attendance Matrix */}
          <div className="bg-slate-950 border border-slate-800 p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
              <div>
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block">
                  STUDENT COHORT & ACCREDITATION
                </span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-0.5">
                  Participant Roster & Session Attendance
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-400">
                  Enrolled: <strong className="text-white">{participants.length}</strong> / {booking.student_count || "—"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCsvBox(!showCsvBox)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-teal-400 font-mono text-xs flex items-center space-x-1 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{showCsvBox ? "Close CSV" : "Bulk Import CSV"}</span>
                </button>
              </div>
            </div>

            {partMessage && (
              <div
                className={`p-2.5 text-xs flex items-start space-x-2 border font-mono ${
                  partMessage.ok
                    ? "bg-emerald-950/80 border-emerald-800 text-emerald-300"
                    : "bg-red-950/80 border-red-800 text-red-300"
                }`}
              >
                {partMessage.ok ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{partMessage.msg}</span>
              </div>
            )}

            {/* Bulk CSV Modal/Box */}
            {showCsvBox && (
              <div className="bg-slate-900 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400 uppercase">
                    Bulk Import Participants (CSV Format)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Format: Full Name, Email</span>
                </div>
                <textarea
                  rows={4}
                  placeholder={`Aarav Sharma, aarav@college.ac.in\nPriya Verma, priya@college.ac.in\nRohan Gupta`}
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-slate-600 focus:outline-none"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500">
                    Lines with headers are automatically recognized and skipped.
                  </span>
                  <button
                    type="button"
                    onClick={handleBulkImport}
                    disabled={csvImporting || !csvInput.trim()}
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold font-mono text-xs uppercase transition-colors disabled:opacity-50"
                  >
                    {csvImporting ? "Importing Roster..." : "Ingest CSV Rows"}
                  </button>
                </div>
              </div>
            )}

            {/* Single Add Form */}
            <form onSubmit={handleAddParticipant} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Student Full Name *"
                required
                value={newPartName}
                onChange={(e) => setNewPartName(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 text-white text-xs focus:border-slate-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Student Email (Optional)"
                value={newPartEmail}
                onChange={(e) => setNewPartEmail(e.target.value)}
                className="w-full sm:w-60 px-3 py-1.5 bg-slate-900 border border-slate-800 text-white text-xs focus:border-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                disabled={partAdding}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 font-mono text-xs font-bold uppercase transition-colors shrink-0 disabled:opacity-50"
              >
                {partAdding ? "Adding..." : "+ Add Student"}
              </button>
            </form>

            {/* Attendance Session Selector */}
            {sessions.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-slate-400 uppercase font-semibold">ATTENDANCE FOR:</span>
                  <select
                    value={selectedSessionForAttendance}
                    onChange={(e) => setSelectedSessionForAttendance(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-white px-2 py-1 text-xs focus:outline-none"
                  >
                    {sessions.map((s, idx) => (
                      <option key={s.id} value={s.id}>
                        Session #{idx + 1}: {s.start_date} to {s.end_date} {s.venue ? `(${s.venue})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Present:{" "}
                  <strong className="text-emerald-400">
                    {
                      participants.filter((p) =>
                        isPresent(selectedSessionForAttendance, p.id)
                      ).length
                    }
                  </strong>{" "}
                  / {participants.length}
                </div>
              </div>
            )}

            {/* Roster & Attendance Table */}
            <div className="border border-slate-800 overflow-x-auto max-h-96">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Student Name</th>
                    <th className="p-2.5">Email</th>
                    {sessions.length > 0 && (
                      <th className="p-2.5 text-center">
                        Attendance ({selectedSessionForAttendance ? "Active Session" : "None"})
                      </th>
                    )}
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 font-mono text-xs">
                  {participants.length === 0 ? (
                    <tr>
                      <td colSpan={sessions.length > 0 ? 5 : 4} className="p-6 text-center text-slate-500 font-mono">
                        No participants registered in this cohort yet. Use the intake form or CSV importer above.
                      </td>
                    </tr>
                  ) : (
                    participants.map((p, idx) => {
                      const present = isPresent(selectedSessionForAttendance, p.id);
                      return (
                        <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-2.5 text-slate-500">{idx + 1}</td>
                          <td className="p-2.5 text-white font-semibold">{p.full_name}</td>
                          <td className="p-2.5 text-slate-400 text-[11px]">{p.email || "—"}</td>
                          {sessions.length > 0 && (
                            <td className="p-2.5 text-center">
                              <button
                                type="button"
                                disabled={!selectedSessionForAttendance}
                                onClick={() =>
                                  handleAttendanceToggle(
                                    selectedSessionForAttendance,
                                    p.id,
                                    present
                                  )
                                }
                                className={`px-2.5 py-0.5 text-[10px] font-bold uppercase transition-colors border ${
                                  present
                                    ? "bg-emerald-950 text-emerald-300 border-emerald-700 hover:bg-emerald-900"
                                    : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                                }`}
                              >
                                {present ? "✓ Present" : "Absent"}
                              </button>
                            </td>
                          )}
                          <td className="p-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteParticipant(p.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors"
                              title="Remove student"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
