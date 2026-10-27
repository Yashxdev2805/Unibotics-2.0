"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Award,
  Settings,
  Briefcase,
  Search,
  Bell,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  Cpu,
} from "lucide-react";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="w-full max-w-stage mx-auto mt-8 md:mt-12 px-2 sm:px-4">
      {/* Container simulating high-tech robotics hardware console */}
      <div className="relative rounded-t-2xl sm:rounded-t-3xl border border-[#2F3545] bg-[#161920]/95 backdrop-blur-xl shadow-[0_-12px_48px_rgba(249, 115, 22, 0.22)] overflow-hidden glow-line-top">
        
        {/* Dashboard Top Application Bar */}
        <div className="h-14 border-b border-[#2F3545] px-4 sm:px-6 flex items-center justify-between bg-[#0F1115]/85">
          {/* Left: Search input */}
          <div className="flex items-center space-x-3 w-1/3">
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                readOnly
                aria-label="Preview search bar"
                placeholder="Search workshops, batches, credentials..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#212530] text-xs text-[#F8FAFC] rounded-full border border-[#2F3545] placeholder-[#64748B] focus:outline-none cursor-default"
              />
            </div>
            <span className="text-xs font-mono text-[#94A3B8] hidden md:inline">
              Operations Console
            </span>
          </div>

          {/* Center: Institutional Platform Tag */}
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
              Unibotics Institutional Command Center
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#212530] text-[#F97316] border border-[#2F3545]">
              Live Preview
            </span>
          </div>

          {/* Right: Notifications & User Chip */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#212530] border border-[#2F3545] flex items-center justify-center text-[#94A3B8] hover:text-[#F97316] transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 pl-2 border-l border-[#2F3545]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#0284C7] text-[#0F1115] flex items-center justify-center text-xs font-black shadow-[0_0_8px_rgba(249, 115, 22, 0.6)]">
                AS
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-medium text-[#F8FAFC] leading-none">
                  Dr. A. Sharma
                </span>
                <span className="text-[11px] text-[#64748B]">ATL In-Charge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          
          {/* Mini Sidebar */}
          <div className="hidden md:flex md:col-span-3 lg:col-span-2 border-r border-[#2F3545] p-4 flex-col justify-between bg-[#0F1115]/60">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] px-3 mb-2 block">
                Navigation
              </span>
              {[
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { id: "bookings", label: "Bookings", icon: Briefcase, count: "14" },
                { id: "sessions", label: "Sessions", icon: CalendarDays },
                { id: "participants", label: "Students", icon: Users },
                { id: "certificates", label: "Certificates", icon: Award },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-[#212530] text-[#F97316] border-l-2 border-[#F97316] shadow-[0_0_12px_rgba(249, 115, 22, 0.25)]"
                        : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#212530]/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4 text-[#F97316]" />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#2F3545] text-[#F97316]">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Promo Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#212530] to-[#161920] border border-[#2F3545] mt-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#F8FAFC]">
                <Cpu className="w-4 h-4 text-[#F97316]" />
                <span>Need an ATL Lab?</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-tight">
                Turnkey Atal Tinkering Lab setup with P1-P4 equipment.
              </p>
              <Link
                href="/atl-setup"
                className="text-xs font-bold text-[#F97316] hover:underline flex items-center space-x-1 pt-1"
              >
                <span>Explore Packages (P1–P4)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="col-span-1 md:col-span-9 lg:col-span-10 p-4 sm:p-6 space-y-6">
            
            {/* 3 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#212530]/80 border border-[#2F3545] space-y-2 hover:border-[#F97316] transition-colors relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Workshops This Month</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161920] text-[#F97316] border border-[#2F3545]">
                    Telemetry
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">14</span>
                  <span className="text-xs font-semibold text-[#10B981] flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                    +18% vs prev
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Across district hubs in Haryana, Punjab &amp; NCR
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#212530]/80 border border-[#2F3545] space-y-2 hover:border-[#F97316] transition-colors relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Certificates Issued</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161920] text-[#F97316] border border-[#2F3545]">
                    Verified
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">840</span>
                  <span className="text-xs font-semibold text-[#10B981] flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                    100% Verifiable
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Direct QR online validation enabled
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#212530]/80 border border-[#2F3545] space-y-2 hover:border-[#F97316] transition-colors relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Active Lab Deployments</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161920] text-[#FF6B35] border border-[#2F3545]">
                    In Progress
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">3</span>
                  <span className="text-xs font-semibold text-[#FF6B35] flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-0.5" />
                    SLA: 1-2 Days turnaround
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  P1 through P4 ATL lab batches in progress
                </p>
              </div>

            </div>

            {/* Bottom Split: Area Chart + Live Sessions Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Monthly Participant Velocity */}
              <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[#212530]/50 border border-[#2F3545] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
                      Participant Velocity (Monthly)
                    </h4>
                    <p className="text-xs text-[#94A3B8]">
                      Active students trained in robotics &amp; embedded systems
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161920] text-[#F97316] border border-[#2F3545]">
                    Telemetry
                  </span>
                </div>

                {/* SVG Area Chart */}
                <div className="h-44 w-full relative pt-2">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 500 160"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="cyanRoboticsArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#2F3545" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#2F3545" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#2F3545" strokeDasharray="3 3" />

                    {/* Area fill */}
                    <polygon
                      points="0,150 0,110 90,95 180,115 270,60 360,40 450,20 500,15 500,150"
                      fill="url(#cyanRoboticsArea)"
                    />

                    {/* Glowing curve stroke */}
                    <polyline
                      points="0,110 90,95 180,115 270,60 360,40 450,20 500,15"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="3"
                      className="filter drop-shadow-[0_0_8px_rgba(249, 115, 22, 0.7)]"
                    />

                    {/* Data Points */}
                    <circle cx="90" cy="95" r="4" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                    <circle cx="180" cy="115" r="4" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                    <circle cx="270" cy="60" r="4" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                    <circle cx="360" cy="40" r="4" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                    <circle cx="450" cy="20" r="5" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                  </svg>

                  {/* Chart X-axis labels */}
                  <div className="flex justify-between text-xs font-mono text-[#64748B] pt-2">
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>

              {/* Right: Upcoming Sessions Overview */}
              <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-[#212530]/50 border border-[#2F3545] space-y-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#2F3545]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
                      Upcoming Sessions
                    </span>
                    <span className="text-xs font-mono text-[#10B981] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span>Live Schedule</span>
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-3">
                    <div className="p-3 rounded-lg bg-[#161920] border border-[#2F3545] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[#F8FAFC]">
                          5-Day Robotics Bootcamp
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          DAV Centenary Senior Secondary School, Kurukshetra
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-mono bg-[#212530] text-[#F97316] rounded border border-[#2F3545]">
                        Nov 10
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#161920] border border-[#2F3545] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[#F8FAFC]">
                          Turnkey ATL P1 Commissioning
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          Govt Model Sanskriti Sr Sec School, Ambala
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-mono bg-[#212530] text-[#10B981] rounded border border-[#10B981]/30">
                        Nov 14
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#161920] border border-[#2F3545] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[#F8FAFC]">
                          Faculty Enablement &amp; IoT Training
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          Modern Academy Polytechnic, Panipat
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-mono bg-[#212530] text-[#F97316] rounded border border-[#2F3545]">
                        Nov 18
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2F3545] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Average Attendance: 96.4%</span>
                  <span className="text-[#F97316] font-medium">100% QR Audited</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
