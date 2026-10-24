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
      <div className="glass-panel p-4 border border-[#2A2342] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#C9A3FF]">
          <Filter className="w-4 h-4 text-[#A020FF]" />
          <span>FILTER WORKSHOPS:</span>
        </div>

        {/* Audience Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-[#7468A0] uppercase mr-1">Audience:</span>
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
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                selectedAudience === item.id
                  ? "bg-[#17132A] text-white border-[#A020FF] shadow-glow"
                  : "bg-[#0D0B14] text-[#8B8988] border-[#2A2342] hover:bg-[#17132A] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Duration Filters */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#7468A0] uppercase mr-1">Duration:</span>
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
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                selectedDays === item.id
                  ? "bg-[#17132A] text-white border-[#A020FF] shadow-glow"
                  : "bg-[#0D0B14] text-[#8B8988] border-[#2A2342] hover:bg-[#17132A] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs font-mono text-[#7468A0] px-1">
        <span>SHOWING {filtered.length} INSTITUTIONAL MODULES</span>
        <span className="hidden sm:inline">STANDARDIZED SYLLABUS • NSDC & NEP 2020 COMPLIANT</span>
      </div>

      {/* Workshop Cards Grid */}
      {filtered.length === 0 ? (
        <div className="glass-panel p-12 text-center text-[#8B8988] text-xs border border-[#2A2342]">
          No workshops match the selected audience and duration filters. Clear filters to view all programs.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div
              key={w.slug}
              className="glass-panel p-6 flex flex-col justify-between border border-[#2A2342] hover:border-[#7468A0] transition-colors"
            >
              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between border-b border-[#2A2342] pb-3 mb-4">
                  <span className="inline-flex items-center text-xs font-mono font-bold text-white bg-[#17132A] border border-[#2A2342] px-2.5 py-0.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 mr-1 text-[#C9A3FF]" />
                    {w.days} Days Intensive
                  </span>

                  <div className="flex items-center space-x-1">
                    {w.audience.map((aud) => (
                      <span
                        key={aud}
                        className="text-[10px] font-mono uppercase bg-[#0D0B14] text-[#C9A3FF] border border-[#2A2342] px-2 py-0.5 rounded-full"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {w.title}
                </h3>

                <p className="text-xs text-[#8B8988] mb-4 leading-relaxed line-clamp-3">
                  {w.description}
                </p>

                {/* Topics Matrix */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-[#7468A0] uppercase tracking-wider block mb-1.5">
                    Core Technical Domains:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {w.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] bg-[#17132A] text-[#C9A3FF] border border-[#2A2342] px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome Statement */}
                <div className="bg-[#0D0B14] border border-[#2A2342] p-3 mb-4 rounded-xl text-xs text-[#8B8988]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block text-[11px] uppercase tracking-wide">
                        Target Learning Outcome
                      </span>
                      <p className="text-[11px] leading-relaxed mt-0.5 text-[#8B8988]">
                        {w.outcomes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#2A2342] flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/workshops/${w.slug}`}
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold text-white bg-[#17132A] hover:bg-[#231C3E] border border-[#2A2342] rounded-full transition-colors"
                >
                  View Day Agenda
                </Link>
                <Link
                  href={`/contact?workshop=${w.slug}`}
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold btn-primary-violet rounded-full transition-colors flex items-center justify-center space-x-1"
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
