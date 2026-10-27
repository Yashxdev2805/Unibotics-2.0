"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Building2,
  Clock,
  User,
  MapPin,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface CalendarSessionItem {
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
  student_count: number | null;
  mentors: { user_id: string; full_name: string }[];
}

interface Props {
  sessions: CalendarSessionItem[];
}

export default function CalendarClient({ sessions }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = sessions.filter((s) => {
    const statusMatch = filterStatus === "all" || s.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !searchQuery ||
      s.institute_name.toLowerCase().includes(query) ||
      s.city.toLowerCase().includes(query) ||
      s.workshop_title.toLowerCase().includes(query) ||
      s.mentors.some((m) => m.full_name.toLowerCase().includes(query)) ||
      (s.venue && s.venue.toLowerCase().includes(query));

    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-slate-950 border border-slate-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Status:</span>
          {["all", "planned", "done", "cancelled"].map((st) => (
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
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search campus, city, mentor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Sessions Timeline List */}
      <div className="space-y-3 font-mono">
        {filtered.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 p-8 text-center text-slate-500 text-xs">
            No scheduled workshop sessions match the query.
          </div>
        ) : (
          filtered.map((s) => (
            <div
              key={s.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-5 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-2 py-0.5 text-xs text-teal-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {s.start_date} to {s.end_date}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                      s.status === "done"
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : s.status === "cancelled"
                        ? "bg-red-950 text-red-400 border-red-800"
                        : "bg-purple-950 text-purple-400 border-purple-800"
                    }`}
                  >
                    {s.status}
                  </span>

                  <span className="text-slate-500 text-xs">
                    {s.workshop_days}D Module • Cohort: {s.student_count || "—"} Students
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {s.workshop_title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-200 font-semibold">{s.institute_name}</span>
                    <span className="text-slate-500">({s.city})</span>
                  </div>

                  {s.venue && (
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{s.venue}</span>
                    </div>
                  )}
                </div>

                {/* Assigned Mentors */}
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-[10px] text-slate-500 uppercase">Assigned Mentors:</span>
                  {s.mentors.length === 0 ? (
                    <span className="text-[11px] text-amber-400 italic">None allocated</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {s.mentors.map((m) => (
                        <span
                          key={m.user_id}
                          className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 text-[11px] text-slate-300 flex items-center space-x-1"
                        >
                          <User className="w-3 h-3 text-teal-400" />
                          <span>{m.full_name}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="self-end lg:self-center">
                <Link
                  href={`/admin/bookings/${s.booking_id}`}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-teal-300 font-bold text-xs uppercase transition-colors"
                >
                  <span>Manage RFP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
