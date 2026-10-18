"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2, Filter } from "lucide-react";
import type { WorkshopItem } from "@/lib/data/workshops";

interface Props {
  workshops: WorkshopItem[];
}

export default function WorkshopList({ workshops }: Props) {
  const [selectedAudience, setSelectedAudience] = useState<string>("all");
  const [selectedDays, setSelectedDays] = useState<string>("all");

  const filtered = workshops.filter((w) => {
    const audienceMatch =
      selectedAudience === "all" ||
      w.audience.includes(selectedAudience as "school" | "iti" | "diploma" | "engineering");
    const daysMatch = selectedDays === "all" || w.days.toString() === selectedDays;
    return audienceMatch && daysMatch;
  });

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-300 p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-700">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>FILTER WORKSHOPS:</span>
        </div>

        {/* Audience Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">Audience:</span>
          {[
            { id: "all", label: "All Campuses" },
            { id: "school", label: "Schools (K-12)" },
            { id: "iti", label: "ITI Colleges" },
            { id: "diploma", label: "Polytechnic" },
            { id: "engineering", label: "Engineering" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedAudience(item.id)}
              className={`px-2.5 py-1 text-xs font-semibold border transition-colors ${
                selectedAudience === item.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Duration Filters */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">Duration:</span>
          {[
            { id: "all", label: "All" },
            { id: "2", label: "2 Days" },
            { id: "5", label: "5 Days" },
            { id: "7", label: "7 Days" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedDays(item.id)}
              className={`px-2.5 py-1 text-xs font-semibold border transition-colors ${
                selectedDays === item.id
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <span>SHOWING {filtered.length} INSTITUTIONAL MODULES</span>
        <span>STANDARDIZED SYLLABUS • NSDC & NEP 2020 COMPLIANT</span>
      </div>

      {/* Workshop Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-300 p-12 text-center text-slate-500 text-xs">
          No workshops match the selected audience and duration filters. Clear filters to view all programs.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div
              key={w.slug}
              className="bg-white border border-slate-300 p-6 flex flex-col justify-between shadow-sm hover:border-slate-500 transition-colors"
            >
              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <span className="inline-flex items-center text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                    {w.days} Days Intensive
                  </span>

                  <div className="flex items-center space-x-1">
                    {w.audience.map((aud) => (
                      <span
                        key={aud}
                        className="text-[10px] font-mono uppercase bg-slate-50 text-slate-600 border border-slate-200 px-1.5 py-0.5"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-950 mb-2 leading-snug">{w.title}</h3>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {w.description}
                </p>

                {/* Topics Matrix */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Core Technical Domains:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {w.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] bg-slate-50 text-slate-800 border border-slate-200 px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome Statement */}
                <div className="bg-slate-50 border border-slate-200 p-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wide">
                        Target Learning Outcome
                      </span>
                      <p className="text-[11px] leading-relaxed mt-0.5">{w.outcomes}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/workshops/${w.slug}`}
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                >
                  View Day Agenda
                </Link>
                <Link
                  href={`/contact?workshop=${w.slug}`}
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Request RFP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
