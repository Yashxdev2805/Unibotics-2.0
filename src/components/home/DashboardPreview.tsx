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
} from "lucide-react";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="w-full max-w-stage mx-auto mt-8 md:mt-12 px-2 sm:px-4">
      {/* Container simulating the dark glass product preview rising from the bottom */}
      <div className="relative rounded-t-2xl sm:rounded-t-3xl border border-[#2A2342] bg-[#0D0B14]/90 backdrop-blur-xl shadow-[0_-12px_48px_rgba(147,18,255,0.28)] overflow-hidden glow-line-top">
        
        {/* Dashboard Top Application Bar */}
        <div className="h-14 border-b border-[#2A2342] px-4 sm:px-6 flex items-center justify-between bg-[#08060E]/80">
          {/* Left: Search input */}
          <div className="flex items-center space-x-3 w-1/3">
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="w-3.5 h-3.5 text-[#7468A0] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                readOnly
                aria-label="Preview search bar"
                placeholder="Search workshops, batches, credentials..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#17132A] text-xs text-[#F7F7F8] rounded-full border border-[#2A2342] placeholder-[#7468A0] focus:outline-none cursor-default"
              />
            </div>
            <span className="text-xs font-mono text-[#8B8988] hidden md:inline">
              Operations Hub
            </span>
          </div>

          {/* Center: Institutional Platform Tag */}
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#45B558] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#F7F7F8]">
              Unibotics Institutional Command Center
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#17132A] text-[#C9A3FF] border border-[#7468A0]/40">
              Sample data
            </span>
          </div>

          {/* Right: Notifications & User Chip */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#17132A] border border-[#2A2342] flex items-center justify-center text-[#8B8988] hover:text-[#F7F7F8] transition-colors cursor-pointer">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center space-x-2 pl-2 border-l border-[#2A2342]">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A020FF] to-[#7A1CF8] text-white flex items-center justify-center text-xs font-bold shadow-[0_0_8px_rgba(160,32,255,0.5)]">
                AS
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-medium text-[#F7F7F8] leading-none">
                  Dr. A. Sharma
                </span>
                <span className="text-[10px] text-[#7468A0]">Coordinator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Workspace (Sidebar + Content Area) */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          
          {/* Mini Sidebar */}
          <div className="hidden md:flex md:col-span-3 lg:col-span-2 border-r border-[#2A2342] p-4 flex-col justify-between bg-[#08060E]/50">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7468A0] px-3 mb-2 block">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "bg-[#17132A] text-white border-l-2 border-[#A020FF] shadow-[0_0_12px_rgba(147,18,255,0.25)]"
                        : "text-[#8B8988] hover:text-[#F7F7F8] hover:bg-[#17132A]/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-3.5 h-3.5 text-[#C9A3FF]" />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#2A2342] text-[#C9A3FF]">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Promo Card */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-[#17132A] to-[#0D0B14] border border-[#2A2342] mt-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#F7F7F8]">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A3FF]" />
                <span>Need a Lab?</span>
              </div>
              <p className="text-[11px] text-[#8B8988] leading-tight">
                Turnkey Atal Tinkering Lab setup with P1-P4 equipment.
              </p>
              <Link
                href="/services"
                className="text-[11px] font-medium text-[#C9A3FF] hover:underline flex items-center space-x-1"
              >
                <span>Explore Packages</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="col-span-1 md:col-span-9 lg:col-span-10 p-4 sm:p-6 space-y-6">
            
            {/* 3 Stat Cards (Sample Data) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-[#17132A]/60 border border-[#2A2342] space-y-2 hover:border-[#7468A0] transition-colors relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#8B8988]">
                  <span>Workshops This Month</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0D0B14] text-[#C9A3FF] border border-[#2A2342]">
                    Sample
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">14</span>
                  <span className="text-xs font-semibold text-[#45B558] flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    +18% vs prev
                  </span>
                </div>
                <p className="text-[11px] text-[#7468A0]">
                  Across 6 district hubs in Haryana & NCR
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-[#17132A]/60 border border-[#2A2342] space-y-2 hover:border-[#7468A0] transition-colors relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#8B8988]">
                  <span>Certificates Issued</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0D0B14] text-[#C9A3FF] border border-[#2A2342]">
                    Sample
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">840</span>
                  <span className="text-xs font-semibold text-[#45B558] flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-0.5" />
                    100% Verifiable
                  </span>
                </div>
                <p className="text-[11px] text-[#7468A0]">
                  Direct QR validation enabled
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-[#17132A]/60 border border-[#2A2342] space-y-2 hover:border-[#7468A0] transition-colors relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#8B8988]">
                  <span>Active Lab Deployments</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0D0B14] text-[#C9A3FF] border border-[#2A2342]">
                    Sample
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">3</span>
                  <span className="text-xs font-semibold text-[#F59E0B] flex items-center">
                    <Clock className="w-3 h-3 mr-0.5" />
                    SLA: 24h review
                  </span>
                </div>
                <p className="text-[11px] text-[#7468A0]">
                  P2 & P3 ATL packages under dispatch
                </p>
              </div>

            </div>

            {/* Bottom Split: Area Chart + Live Sessions Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Monthly Participant Velocity (Area Chart) */}
              <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[#17132A]/40 border border-[#2A2342] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F7F8]">
                      Participant Velocity (Monthly)
                    </h4>
                    <p className="text-[11px] text-[#8B8988]">
                      Active students trained in robotics & embedded systems
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0D0B14] text-[#C9A3FF] border border-[#2A2342]">
                    Sample data
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
                      <linearGradient id="violetArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A020FF" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#7A1CF8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#2A2342" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#2A2342" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#2A2342" strokeDasharray="3 3" />

                    {/* Area fill */}
                    <polygon
                      points="0,150 0,110 90,95 180,115 270,60 360,40 450,20 500,15 500,150"
                      fill="url(#violetArea)"
                    />

                    {/* Glowing curve stroke */}
                    <polyline
                      points="0,110 90,95 180,115 270,60 360,40 450,20 500,15"
                      fill="none"
                      stroke="#C9A3FF"
                      strokeWidth="3"
                      className="filter drop-shadow-[0_0_8px_rgba(160,32,255,0.7)]"
                    />

                    {/* Data Points */}
                    <circle cx="90" cy="95" r="4" fill="#FFFFFF" stroke="#9312FF" strokeWidth="2" />
                    <circle cx="180" cy="115" r="4" fill="#FFFFFF" stroke="#9312FF" strokeWidth="2" />
                    <circle cx="270" cy="60" r="4" fill="#FFFFFF" stroke="#9312FF" strokeWidth="2" />
                    <circle cx="360" cy="40" r="4" fill="#FFFFFF" stroke="#9312FF" strokeWidth="2" />
                    <circle cx="450" cy="20" r="5" fill="#FFFFFF" stroke="#A020FF" strokeWidth="2" />
                  </svg>

                  {/* Chart X-axis labels */}
                  <div className="flex justify-between text-[10px] font-mono text-[#7468A0] pt-2">
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
              <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-[#17132A]/40 border border-[#2A2342] space-y-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#2A2342]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F7F7F8]">
                      Upcoming Sessions
                    </span>
                    <span className="text-[10px] font-mono text-[#45B558]">
                      Live Schedule
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-3">
                    <div className="p-2.5 rounded-lg bg-[#0D0B14] border border-[#2A2342] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#F7F7F8]">
                          5-Day Robotics Bootcamp
                        </div>
                        <div className="text-[10px] text-[#7468A0]">
                          DAV Centenary School, Kurukshetra
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-[#17132A] text-[#C9A3FF] rounded border border-[#7468A0]/30">
                        Oct 28
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0D0B14] border border-[#2A2342] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#F7F7F8]">
                          Turnkey ATL P1 Commissioning
                        </div>
                        <div className="text-[10px] text-[#7468A0]">
                          Govt Sr Sec Model School, Ambala
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-[#17132A] text-[#45B558] rounded border border-[#45B558]/30">
                        Nov 02
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0D0B14] border border-[#2A2342] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#F7F7F8]">
                          Faculty Enablement & IoT Training
                        </div>
                        <div className="text-[10px] text-[#7468A0]">
                          Modern Academy, Panipat
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-[#17132A] text-[#C9A3FF] rounded border border-[#7468A0]/30">
                        Nov 05
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2A2342] flex items-center justify-between text-[11px] text-[#7468A0]">
                  <span>Average Attendance: 96.4%</span>
                  <span className="text-[#C9A3FF] font-medium">100% QR Audited</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
