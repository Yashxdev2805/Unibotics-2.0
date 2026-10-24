"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
} from "lucide-react";

export interface InstituteBookingItem {
  id: string;
  workshop_title: string;
  workshop_days: number;
  status: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled";
  quoted_price: number | null;
  payment_status: "unpaid" | "partial" | "paid";
  student_count: number | null;
  preferred_dates: string | null;
  created_at: string;
  sessions: {
    id: string;
    start_date: string;
    end_date: string;
    venue: string | null;
    status: string;
  }[];
  participants: {
    id: string;
    full_name: string;
    email: string | null;
  }[];
  certificates: {
    id: string;
    public_code: string;
    holder_name: string;
    status: "valid" | "revoked";
  }[];
}

interface Props {
  instituteName: string;
  campusCity: string;
  bookings: InstituteBookingItem[];
}

export default function InstitutePortalClient({
  instituteName,
  campusCity,
  bookings,
}: Props) {
  const [activeTab, setActiveTab] = useState<"bookings" | "certificates">("bookings");
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings[0]?.id || ""
  );

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  // All certificates across all campus bookings
  const allCertificates = bookings.flatMap((b) =>
    b.certificates.map((c) => ({
      ...c,
      workshop_title: b.workshop_title,
      booking_id: b.id,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Navigation Tabs Bar */}
      <div className="flex border-b border-slate-300 bg-white px-6 pt-3 space-x-6 text-xs font-mono font-bold uppercase">
        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === "bookings"
              ? "border-slate-900 text-slate-950"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Workshop Engagements ({bookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certificates")}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === "certificates"
              ? "border-slate-900 text-slate-950"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          <Award className="w-4 h-4 text-teal-600" />
          <span>Campus Credentials ({allCertificates.length})</span>
        </button>
      </div>

      {/* TAB 1: WORKSHOP ENGAGEMENTS & DETAILS */}
      {activeTab === "bookings" && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="bg-white border border-slate-300 p-8 text-center text-xs text-slate-500 font-mono space-y-2">
              <p>No workshop engagements registered for {instituteName} yet.</p>
              <div className="pt-2">
                <Link
                  href="/workshops"
                  className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-mono uppercase font-bold hover:bg-slate-800"
                >
                  Request Institutional Workshop RFP
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (4 cols): Bookings Selector List */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Campus Engagements:
                </span>
                {bookings.map((b) => {
                  const isSelected = b.id === selectedBooking?.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBookingId(b.id)}
                      className={`p-4 border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-white text-slate-800 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={isSelected ? "text-teal-400 font-bold" : "text-slate-500"}>
                          RFP: {b.id.substring(0, 8)}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 uppercase font-bold ${
                            isSelected
                              ? "bg-slate-800 text-slate-200 border border-slate-700"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm leading-snug font-mono">
                        {b.workshop_title}
                      </h4>

                      <div className="flex items-center space-x-3 text-xs opacity-80 mt-2 font-mono">
                        <span>{b.workshop_days}D Intensive</span>
                        <span>•</span>
                        <span>{b.student_count ? `${b.student_count} Students` : "Cohort TBD"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column (8 cols): Selected Engagement Dossier */}
              {selectedBooking && (
                <div className="lg:col-span-8 bg-white border border-slate-300 p-6 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-teal-700 uppercase font-bold block">
                        ACTIVE ENGAGEMENT PROFILE
                      </span>
                      <h3 className="text-xl font-black text-slate-950 tracking-tight font-mono">
                        {selectedBooking.workshop_title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Duration: {selectedBooking.workshop_days} Days On-Campus Program • Target Window: {selectedBooking.preferred_dates || "To be confirmed"}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-300 text-slate-800 font-bold uppercase">
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>

                  {/* Commercial & Dates Snapshot */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 p-4 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">QUOTED INVESTMENT</span>
                      <strong className="text-base text-slate-900 font-bold block mt-0.5">
                        {selectedBooking.quoted_price !== null
                          ? `₹${Number(selectedBooking.quoted_price).toLocaleString("en-IN")}`
                          : "Quotation in Review"}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">SETTLEMENT STATUS</span>
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase border mt-1 ${
                          selectedBooking.payment_status === "paid"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : selectedBooking.payment_status === "partial"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-red-100 text-red-800 border-red-300"
                        }`}
                      >
                        {selectedBooking.payment_status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">COHORT CAPACITY</span>
                      <strong className="text-base text-slate-900 font-bold block mt-0.5">
                        {selectedBooking.participants.length} / {selectedBooking.student_count || "—"} Students
                      </strong>
                    </div>
                  </div>

                  {/* Sessions Schedule */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-slate-600 uppercase font-bold block">
                      Scheduled Academic Sessions:
                    </span>
                    {selectedBooking.sessions.length === 0 ? (
                      <p className="text-xs text-slate-400 font-mono italic">
                        No sessions scheduled yet. Unibotics lead engineer will schedule dates after quotation approval.
                      </p>
                    ) : (
                      <div className="space-y-2 font-mono text-xs">
                        {selectedBooking.sessions.map((s, sIdx) => (
                          <div
                            key={s.id}
                            className="bg-slate-50 border border-slate-200 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-5 h-5 bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                                {sIdx + 1}
                              </span>
                              <span className="font-bold text-slate-900">
                                {s.start_date} to {s.end_date}
                              </span>
                              {s.venue && <span className="text-slate-500">• Venue: {s.venue}</span>}
                            </div>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-white border border-slate-300 text-slate-700">
                              {s.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Participant Roster */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-[11px] font-mono text-slate-600 uppercase font-bold">
                        Enrolled Participant Cohort ({selectedBooking.participants.length}):
                      </span>
                    </div>

                    {selectedBooking.participants.length === 0 ? (
                      <p className="text-xs text-slate-400 font-mono italic">
                        Participant roster is being compiled.
                      </p>
                    ) : (
                      <div className="border border-slate-200 overflow-x-auto max-h-64 font-mono text-xs">
                        <table className="w-full text-left border-collapse">
                          <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 text-slate-600 text-[10px] uppercase">
                            <tr>
                              <th className="p-2">#</th>
                              <th className="p-2">Student Name</th>
                              <th className="p-2">Email</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 text-slate-800">
                            {selectedBooking.participants.map((p, idx) => (
                              <tr key={p.id} className="hover:bg-slate-50">
                                <td className="p-2 text-slate-400">{idx + 1}</td>
                                <td className="p-2 font-bold">{p.full_name}</td>
                                <td className="p-2 text-slate-500 text-[11px]">{p.email || "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CAMPUS CREDENTIALS REPOSITORY */}
      {activeTab === "certificates" && (
        <div className="bg-white border border-slate-300 p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-950 uppercase font-mono tracking-wider">
                Verifiable Completion Certificates Issued for {instituteName}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Total Credentials: {allCertificates.length} • Cryptographically verified by Unibotics India
              </p>
            </div>
          </div>

          {allCertificates.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono space-y-1">
              <p>No certificates have been issued for this institution yet.</p>
              <p className="text-[11px] text-slate-400">
                Certificates are generated following session completion and attendance reconciliation.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] uppercase">
                    <th className="p-3">Public Code</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Workshop Title</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {allCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-teal-800 font-bold">{cert.public_code}</td>
                      <td className="p-3 font-semibold text-slate-950">{cert.holder_name}</td>
                      <td className="p-3 text-slate-600">{cert.workshop_title}</td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase border ${
                            cert.status === "valid"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-red-50 text-red-800 border-red-300"
                          }`}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <Link
                          href={`/verify?code=${encodeURIComponent(cert.public_code)}`}
                          target="_blank"
                          className="inline-flex items-center space-x-1 text-slate-600 hover:text-slate-900 text-[11px]"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        {cert.status === "valid" && (
                          <a
                            href={`/api/certificates/${encodeURIComponent(cert.public_code)}/download`}
                            download
                            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase"
                          >
                            <Download className="w-3 h-3 text-teal-400" />
                            <span>PDF</span>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
