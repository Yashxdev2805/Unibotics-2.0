import React from "react";

/**
 * DashboardSkeleton
 * Precision dark-mode skeleton loader for the institutional console.
 * Prevents Cumulative Layout Shift (CLS) and renders immediately above the fold.
 */
export default function DashboardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-stage mx-auto mt-8 md:mt-12 px-2 sm:px-4 animate-pulse select-none"
    >
      <div className="relative rounded-t-2xl sm:rounded-t-3xl border border-[#2F3545] bg-[#161920]/90 backdrop-blur-xl overflow-hidden min-h-[460px] md:min-h-[580px] flex flex-col">
        {/* Top bar skeleton */}
        <div className="h-14 border-b border-[#2F3545] px-4 sm:px-6 flex items-center justify-between bg-[#08090C]/80">
          <div className="flex items-center space-x-3 w-1/3">
            <div className="w-48 h-8 rounded-full bg-[#212530]" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]/50" />
            <div className="w-40 sm:w-64 h-4 rounded bg-[#212530]" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#212530]" />
            <div className="w-24 h-8 rounded-full bg-[#212530]" />
          </div>
        </div>

        {/* Content area skeleton */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col space-y-3 col-span-1 border-r border-[#2F3545]/60 pr-4">
            <div className="w-full h-10 rounded-lg bg-[#212530]" />
            <div className="w-full h-10 rounded-lg bg-[#212530]/60" />
            <div className="w-full h-10 rounded-lg bg-[#212530]/40" />
            <div className="w-full h-10 rounded-lg bg-[#212530]/30" />
          </div>

          {/* Main stage */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="h-24 rounded-xl bg-[#212530]" />
              <div className="h-24 rounded-xl bg-[#212530]" />
              <div className="h-24 rounded-xl bg-[#212530]" />
            </div>
            <div className="h-56 sm:h-72 rounded-xl bg-[#212530]/70 flex items-center justify-center">
              <div className="flex flex-col items-center space-x-2 text-xs font-mono text-[#94A3B8]">
                <div className="w-6 h-6 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin mb-2" />
                <span>Synchronizing Telemetry Hardware Console...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
