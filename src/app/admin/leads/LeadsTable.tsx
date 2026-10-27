"use client";

import { useState } from "react";
import { updateLeadStatus } from "./actions";
import {
  Search,
  Phone,
  Mail,
  Building2,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface LeadRecord {
  id: string;
  name: string;
  organisation: string | null;
  institute_type: string | null;
  city: string;
  phone: string;
  email: string;
  need: string;
  message: string | null;
  status: "new" | "contacted" | "closed";
  consent_given: boolean;
  created_at: string;
}

interface Props {
  leads: LeadRecord[];
}

export default function LeadsTable({ leads }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = leads.filter((lead) => {
    const statusMatch = filterStatus === "all" || lead.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !searchQuery ||
      lead.name.toLowerCase().includes(query) ||
      (lead.organisation && lead.organisation.toLowerCase().includes(query)) ||
      lead.city.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.phone.includes(query);
    return statusMatch && searchMatch;
  });

  const handleStatusChange = async (leadId: string, nextStatus: "new" | "contacted" | "closed") => {
    setPendingId(leadId);
    try {
      await updateLeadStatus(leadId, nextStatus);
    } catch (err) {
      alert("Failed to update lead status: " + (err as Error).message);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar */}
      <div className="bg-slate-950 border border-slate-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Status Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Status:</span>
          {["all", "new", "contacted", "closed"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 text-xs font-mono font-bold uppercase transition-colors border ${
                filterStatus === st
                  ? "bg-slate-800 text-teal-300 border-teal-500/50"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads, cities, emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 font-mono"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
              <th className="p-3 w-8"></th>
              <th className="p-3">Received</th>
              <th className="p-3">Representative / Institute</th>
              <th className="p-3">Location</th>
              <th className="p-3">Requirement</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Workflow Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                  No institutional leads found matching the active criteria.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => {
                const isExpanded = expandedId === lead.id;
                const isPending = pendingId === lead.id;

                return (
                  <tr key={lead.id} className="group hover:bg-slate-900/60 transition-colors">
                    {/* Expand Toggle */}
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        className="p-1 hover:text-white text-slate-500"
                        aria-label="Toggle details"
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
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Name & Org */}
                    <td className="p-3">
                      <span className="font-bold text-white block">{lead.name}</span>
                      <span className="text-slate-400 text-[11px] block">
                        {lead.organisation || "Individual Inquiry"}
                      </span>
                      {lead.institute_type && (
                        <span className="text-[10px] font-mono uppercase text-slate-500">
                          Type: {lead.institute_type}
                        </span>
                      )}
                    </td>

                    {/* City */}
                    <td className="p-3 text-slate-300 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{lead.city}</span>
                      </div>
                    </td>

                    {/* Need */}
                    <td className="p-3 font-mono uppercase text-teal-400 text-[11px] whitespace-nowrap">
                      {lead.need.replace("_", " ")}
                    </td>

                    {/* Contact Links */}
                    <td className="p-3 space-y-0.5 whitespace-nowrap">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center space-x-1 text-slate-400 hover:text-teal-400 font-mono text-[11px]"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center space-x-1 text-slate-400 hover:text-teal-400 text-[11px]"
                      >
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{lead.email}</span>
                      </a>
                    </td>

                    {/* Status Badge */}
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                          lead.status === "new"
                            ? "bg-amber-950/80 text-amber-400 border-amber-800"
                            : lead.status === "contacted"
                            ? "bg-blue-950/80 text-blue-400 border-blue-800"
                            : "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    {/* Quick Workflow Actions */}
                    <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                      {lead.status !== "contacted" && (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleStatusChange(lead.id, "contacted")}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors disabled:opacity-50"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {lead.status !== "closed" && (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleStatusChange(lead.id, "closed")}
                          className="px-2 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800 transition-colors disabled:opacity-50"
                        >
                          Close Lead
                        </button>
                      )}
                      {lead.status === "closed" && (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleStatusChange(lead.id, "new")}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors disabled:opacity-50"
                        >
                          Reopen
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

      {/* Expanded Lead Inspection Panel */}
      {expandedId && (
        <div className="bg-slate-950 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-mono text-xs text-teal-400 font-bold uppercase">
              Lead Detailed Scope & Ingestion Log
            </h4>
            <span className="text-[10px] font-mono text-slate-500">ID: {expandedId}</span>
          </div>

          {(() => {
            const current = leads.find((l) => l.id === expandedId);
            if (!current) return null;
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Submitted Message / Specific Scope:
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed font-sans">
                    {current.message || "No custom message included in submission."}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      DPDP Act 2023 Consent Given:
                    </span>
                    <span className="text-emerald-400 font-mono">
                      {current.consent_given ? "YES (Affirmative Opt-in Recorded)" : "NO"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Direct Communication Channel:
                    </span>
                    <span className="text-slate-300">
                      Reach {current.name} at <strong className="text-white">{current.phone}</strong> or <strong className="text-white">{current.email}</strong>.
                    </span>
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
