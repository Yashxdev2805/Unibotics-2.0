"use client";

import { useState } from "react";
import { updateApplicationStatus } from "./actions";
import {
  Search,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
} from "lucide-react";

export interface ApplicationRecord {
  id: string;
  applicant_type: "mentor" | "intern" | "institutional_partner" | "channel_partner";
  name: string;
  email: string;
  phone: string;
  organisation: string | null;
  details: Record<string, unknown>;
  status: "pending" | "approved" | "rejected";
  reviewed_by: string | null;
  consent_given: boolean;
  created_at: string;
}

interface Props {
  applications: ApplicationRecord[];
}

export default function ApplicationsTable({ applications }: Props) {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = applications.filter((app) => {
    const typeMatch = filterType === "all" || app.applicant_type === filterType;
    const statusMatch = filterStatus === "all" || app.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const searchMatch =
      !searchQuery ||
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      (app.organisation && app.organisation.toLowerCase().includes(q)) ||
      app.phone.includes(q);
    return typeMatch && statusMatch && searchMatch;
  });

  const handleStatusChange = async (appId: string, nextStatus: "pending" | "approved" | "rejected") => {
    setPendingId(appId);
    try {
      await updateApplicationStatus(appId, nextStatus);
    } catch (err) {
      alert("Failed to update application: " + (err as Error).message);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar */}
      <div className="bg-slate-950 border border-slate-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Type & Status Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Type:</span>
            {["all", "mentor", "intern", "institutional_partner", "channel_partner"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`px-2 py-0.5 text-[11px] font-mono font-bold uppercase transition-colors border ${
                  filterType === t
                    ? "bg-slate-800 text-teal-300 border-teal-500/50"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"
                }`}
              >
                {t.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Status:</span>
            {["all", "pending", "approved", "rejected"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterStatus(s)}
                className={`px-2 py-0.5 text-[11px] font-mono font-bold uppercase transition-colors border ${
                  filterStatus === s
                    ? "bg-slate-800 text-teal-300 border-teal-500/50"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 font-mono"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
              <th className="p-3 w-8"></th>
              <th className="p-3">Applied</th>
              <th className="p-3">Candidate</th>
              <th className="p-3">Category</th>
              <th className="p-3">Affiliation</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                  No candidate applications found matching the active criteria.
                </td>
              </tr>
            ) : (
              filtered.map((app) => {
                const isExpanded = expandedId === app.id;
                const isPending = pendingId === app.id;

                return (
                  <tr key={app.id} className="group hover:bg-slate-900/60 transition-colors">
                    {/* Expand Toggle */}
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : app.id)}
                        className="p-1 hover:text-white text-slate-500"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Name */}
                    <td className="p-3 font-bold text-white whitespace-nowrap">{app.name}</td>

                    {/* Category */}
                    <td className="p-3 font-mono text-[11px] uppercase text-teal-400 whitespace-nowrap">
                      {app.applicant_type.replace("_", " ")}
                    </td>

                    {/* Affiliation */}
                    <td className="p-3 text-slate-400 whitespace-nowrap">
                      {app.organisation || "Independent"}
                    </td>

                    {/* Contact Links */}
                    <td className="p-3 space-y-0.5 whitespace-nowrap">
                      <a
                        href={`tel:${app.phone}`}
                        className="flex items-center space-x-1 text-slate-400 hover:text-teal-400 font-mono text-[11px]"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{app.phone}</span>
                      </a>
                      <a
                        href={`mailto:${app.email}`}
                        className="flex items-center space-x-1 text-slate-400 hover:text-teal-400 text-[11px]"
                      >
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{app.email}</span>
                      </a>
                    </td>

                    {/* Status Badge */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                          app.status === "pending"
                            ? "bg-amber-950/80 text-amber-400 border-amber-800"
                            : app.status === "approved"
                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                            : "bg-red-950/80 text-red-400 border-red-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                      {app.status !== "approved" && (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleStatusChange(app.id, "approved")}
                          className="px-2 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800 transition-colors disabled:opacity-50"
                        >
                          Approve
                        </button>
                      )}
                      {app.status !== "rejected" && (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleStatusChange(app.id, "rejected")}
                          className="px-2 py-1 text-[11px] font-semibold text-red-300 bg-red-950/60 hover:bg-red-900/60 border border-red-800 transition-colors disabled:opacity-50"
                        >
                          Reject
                        </button>
                      )}
                      {app.status !== "pending" && (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleStatusChange(app.id, "pending")}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-400 bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-colors disabled:opacity-50"
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Expanded Candidate Details Panel */}
      {expandedId && (
        <div className="bg-slate-950 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-mono text-xs text-teal-400 font-bold uppercase">
              Candidate Dossier & Qualifications
            </h4>
            <span className="text-[10px] font-mono text-slate-500">ID: {expandedId}</span>
          </div>

          {(() => {
            const current = applications.find((a) => a.id === expandedId);
            if (!current) return null;
            const details = (current.details as Record<string, unknown>) || {};

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Specialization & Qualifications:
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px]">
                    {String(details.qualification || "None specified")}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Candidate Profile Notes / Links:
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed font-sans">
                    {String(details.notes || "No notes submitted.")}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
