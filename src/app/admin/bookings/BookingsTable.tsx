"use client";

import { useState } from "react";
import Link from "next/link";
import { updateBookingStatus } from "./actions";
import {
  Search,
  Building2,
  Calendar,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Filter,
  DollarSign,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface BookingRecord {
  id: string;
  workshop_id: string;
  workshop_title?: string;
  workshop_slug?: string;
  workshop_days?: number;
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
  session_count?: number;
}

interface Props {
  bookings: BookingRecord[];
}

export default function BookingsTable({ bookings }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    const statusMatch = filterStatus === "all" || b.status === filterStatus;
    const paymentMatch = filterPayment === "all" || b.payment_status === filterPayment;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !searchQuery ||
      b.requester_name.toLowerCase().includes(query) ||
      (b.institute_name && b.institute_name.toLowerCase().includes(query)) ||
      (b.city && b.city.toLowerCase().includes(query)) ||
      b.requester_email.toLowerCase().includes(query) ||
      (b.workshop_title && b.workshop_title.toLowerCase().includes(query)) ||
      b.id.toLowerCase().includes(query);

    return statusMatch && paymentMatch && searchMatch;
  });

  const handleQuickStatus = async (
    bookingId: string,
    nextStatus: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled"
  ) => {
    setPendingId(bookingId);
    try {
      const res = await updateBookingStatus(bookingId, nextStatus);
      if (!res.success) {
        alert("Failed to update status: " + res.error);
      }
    } catch (err) {
      alert("Error updating status: " + (err as Error).message);
    } finally {
      setPendingId(null);
    }
  };

  const getStatusBadge = (status: BookingRecord["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-950/80 text-amber-400 border-amber-800";
      case "confirmed":
        return "bg-blue-950/80 text-blue-400 border-blue-800";
      case "scheduled":
        return "bg-purple-950/80 text-purple-400 border-purple-800";
      case "completed":
        return "bg-emerald-950/80 text-emerald-400 border-emerald-800";
      case "cancelled":
        return "bg-red-950/80 text-red-400 border-red-800";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  const getPaymentBadge = (status: BookingRecord["payment_status"]) => {
    switch (status) {
      case "unpaid":
        return "bg-red-950/80 text-red-400 border-red-800";
      case "partial":
        return "bg-amber-950/80 text-amber-400 border-amber-800";
      case "paid":
        return "bg-emerald-950/80 text-emerald-400 border-emerald-800";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Filters & Search */}
      <div className="bg-slate-950 border border-slate-800 p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">RFP Status:</span>
            {["all", "pending", "confirmed", "scheduled", "completed", "cancelled"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase transition-colors border ${
                  filterStatus === st
                    ? "bg-slate-100 text-slate-950 border-white"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search institute, city, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Payment Filters Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-900">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Payment Status:</span>
          {["all", "unpaid", "partial", "paid"].map((pst) => (
            <button
              key={pst}
              type="button"
              onClick={() => setFilterPayment(pst)}
              className={`px-2 py-0.5 text-[11px] font-mono font-semibold uppercase transition-colors border ${
                filterPayment === pst
                  ? "bg-teal-950 text-teal-300 border-teal-700"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {pst}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-slate-500">
            Showing <strong className="text-slate-300">{filtered.length}</strong> of {bookings.length} RFPs
          </span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
              <th className="p-3">RFP ID / Date</th>
              <th className="p-3">Workshop & Cohort</th>
              <th className="p-3">Institution & Venue</th>
              <th className="p-3">Coordinator Contact</th>
              <th className="p-3">Status</th>
              <th className="p-3">Quoted / Payment</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                  No workshop bookings match the applied filters.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/60 transition-colors">
                  {/* ID & Date */}
                  <td className="p-3 font-mono align-top">
                    <span className="text-teal-400 font-bold block">{b.id.substring(0, 8)}</span>
                    <span className="text-[10px] text-slate-500 block">
                      {new Date(b.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {b.session_count ?? 0} Session(s)
                    </span>
                  </td>

                  {/* Workshop & Cohort */}
                  <td className="p-3 align-top max-w-xs">
                    <span className="font-bold text-white block leading-snug">
                      {b.workshop_title || "Unknown Workshop"}
                    </span>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                      {b.workshop_days && (
                        <span className="bg-slate-900 border border-slate-800 px-1 py-0.5 font-mono text-[10px]">
                          {b.workshop_days}D
                        </span>
                      )}
                      <span>Cohort: {b.student_count ? `${b.student_count} Students` : "TBD"}</span>
                    </div>
                    {b.preferred_dates && (
                      <span className="text-[11px] text-slate-500 block mt-1 font-mono">
                        Target: {b.preferred_dates}
                      </span>
                    )}
                  </td>

                  {/* Institution & Venue */}
                  <td className="p-3 align-top max-w-xs">
                    <span className="text-slate-200 font-semibold block">
                      {b.institute_name || "Direct Institutional Ingestion"}
                    </span>
                    <span className="text-slate-400 text-[11px] block">{b.city || "India"}</span>
                    {b.venue_type && (
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Venue: {b.venue_type}
                      </span>
                    )}
                  </td>

                  {/* Coordinator Contact */}
                  <td className="p-3 align-top font-mono text-[11px]">
                    <span className="text-white font-semibold block">{b.requester_name}</span>
                    <a
                      href={`mailto:${b.requester_email}`}
                      className="text-slate-400 hover:text-teal-400 block truncate max-w-[180px]"
                    >
                      {b.requester_email}
                    </a>
                    {b.requester_phone && (
                      <a
                        href={`tel:${b.requester_phone}`}
                        className="text-slate-400 hover:text-teal-400 block"
                      >
                        {b.requester_phone}
                      </a>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-3 align-top">
                    <div className="space-y-1.5">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${getStatusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>

                      <select
                        value={b.status}
                        disabled={pendingId === b.id}
                        onChange={(e) =>
                          handleQuickStatus(
                            b.id,
                            e.target.value as "pending" | "confirmed" | "scheduled" | "completed" | "cancelled"
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 px-1.5 py-1 focus:outline-none focus:border-slate-600 disabled:opacity-50"
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="scheduled">scheduled</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </div>
                  </td>

                  {/* Quoted / Payment */}
                  <td className="p-3 align-top font-mono">
                    <span className="text-white font-bold block">
                      {b.quoted_price !== null && b.quoted_price !== undefined
                        ? `₹${Number(b.quoted_price).toLocaleString("en-IN")}`
                        : "Quote Pending"}
                    </span>
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase border mt-1 ${getPaymentBadge(
                        b.payment_status
                      )}`}
                    >
                      {b.payment_status}
                    </span>
                  </td>

                  {/* Action Link */}
                  <td className="p-3 align-top text-right">
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
