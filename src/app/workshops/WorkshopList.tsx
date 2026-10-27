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
      <div className="glass-panel p-4 sm:p-5 border border-[#2F3545] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#F97316]">
          <Filter className="w-4 h-4 text-[#F97316]" />
          <span>FILTER WORKSHOPS:</span>
        </div>

        {/* Audience Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#64748B] uppercase mr-1">Audience:</span>
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                selectedAudience === item.id
                  ? "bg-[#212530] text-[#F97316] border-[#F97316] shadow-glow"
                  : "bg-[#161920] text-[#94A3B8] border-[#2F3545] hover:bg-[#212530] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Duration Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#64748B] uppercase mr-1">Duration:</span>
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                selectedDays === item.id
                  ? "bg-[#212530] text-[#F97316] border-[#F97316] shadow-glow"
                  : "bg-[#161920] text-[#94A3B8] border-[#2F3545] hover:bg-[#212530] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs font-mono text-[#64748B] px-1">
        <span>SHOWING {filtered.length} INSTITUTIONAL MODULES</span>
        <span className="hidden sm:inline">STANDARDIZED SYLLABUS • NSDC &amp; NEP 2020 COMPLIANT</span>
      </div>

      {/* Workshop Cards Grid */}
      {filtered.length === 0 ? (
        <div className="glass-panel p-12 text-center text-[#94A3B8] text-sm border border-[#2F3545]">
          No workshops match the selected audience and duration filters. Clear filters to view all programs.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div
              key={w.slug}
              className="glass-panel p-6 sm:p-7 flex flex-col justify-between border border-[#2F3545] hover:border-[#F97316] transition-all"
            >
              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between border-b border-[#2F3545] pb-3 mb-4">
                  <span className="inline-flex items-center text-xs font-mono font-bold text-[#F97316] bg-[#212530] border border-[#2F3545] px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 mr-1 text-[#F97316]" />
                    {w.days} Days Intensive
                  </span>

                  <div className="flex items-center space-x-1">
                    {w.audience.map((aud) => (
                      <span
                        key={aud}
                        className="text-[11px] font-mono uppercase bg-[#161920] text-[#38BDF8] border border-[#2F3545] px-2 py-0.5 rounded-full"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {w.title}
                </h3>

                <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed line-clamp-3">
                  {w.description}
                </p>

                {/* Topics Matrix */}
                <div className="mb-4">
                  <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider block mb-2 font-bold">
                    Core Technical Domains:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {w.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-[#212530] text-[#CBD5E1] border border-[#2F3545] px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome Statement */}
                <div className="bg-[#161920] border border-[#2F3545] p-3.5 mb-4 rounded-xl text-xs text-[#94A3B8]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block text-xs uppercase tracking-wide">
                        Target Learning Outcome
                      </span>
                      <p className="text-xs leading-relaxed mt-1 text-[#CBD5E1]">
                        {w.outcomes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#2F3545] flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/workshops/${w.slug}`}
                  className="flex-1 py-2.5 px-3 text-center text-xs sm:text-sm font-semibold text-white bg-[#212530] hover:bg-[#142644] border border-[#2F3545] rounded-full transition-colors"
                >
                  View Day Agenda
                </Link>
                <Link
                  href={`/workshops/${w.slug}/book`}
                  className="flex-1 py-2.5 px-3 text-center text-xs sm:text-sm font-bold btn-primary-cyan rounded-full transition-colors flex items-center justify-center space-x-1 shadow-glow"
                >
                  <span>Request Dates</span>
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
