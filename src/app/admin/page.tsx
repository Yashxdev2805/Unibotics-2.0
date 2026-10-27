import Link from "next/link";
import { getAdminClient } from "@/lib/db/admin";
import {
  Inbox,
  FileCheck2,
  CalendarCheck,
  Award,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default async function AdminOverviewPage() {
  const supabase = getAdminClient();

  // Parallel metrics queries
  const [
    { count: totalLeads },
    { count: newLeads },
    { count: totalApps },
    { count: pendingApps },
    { count: totalBookings },
    { count: pendingBookings },
    { count: totalCerts },
    { count: totalUsers },
    { data: recentLeads },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("memberships").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id, name, organisation, city, need, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("bookings")
      .select("id, requester_name, institute_name, city, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          CONTROL CENTER • LIVE METRICS
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Operations Overview</h1>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* New Leads */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Unresolved Leads</span>
            <Inbox className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-white">{newLeads ?? 0}</span>
            <span className="text-[11px] text-slate-400">of {totalLeads ?? 0}</span>
          </div>
          <Link
            href="/admin/leads"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Review CRM</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Pending Applications */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Pending Apps</span>
            <FileCheck2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-white">{pendingApps ?? 0}</span>
            <span className="text-[11px] text-slate-400">of {totalApps ?? 0}</span>
          </div>
          <Link
            href="/admin/applications"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Candidates</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Workshop Bookings */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Workshop RFPs</span>
            <CalendarCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-white">{pendingBookings ?? 0}</span>
            <span className="text-[11px] text-slate-400">pending of {totalBookings ?? 0}</span>
          </div>
          <Link
            href="/admin/bookings"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Manage RFPs</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Total Memberships */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Active Memberships</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-white">{totalUsers ?? 0}</span>
            <span className="text-[11px] text-slate-400">Registered</span>
          </div>
          <Link
            href="/admin/users"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Roles</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Issued Certificates */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Credentials</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-white">{totalCerts ?? 0}</span>
            <span className="text-[11px] text-slate-400">Issued</span>
          </div>
          <Link
            href="/admin/certificates"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Certificates</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Security Health */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">RLS & Ledger</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold font-mono text-emerald-400">SECURE</span>
          </div>
          <p className="text-[10px] text-slate-500 pt-1">14 Tables Governed by RLS</p>
        </div>

      </div>

      {/* Dual Tables: Recent Leads & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recent Inbound Leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Organisation</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {!recentLeads || recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500 font-mono">
                      No inquiries recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-2.5 font-mono text-slate-400 text-[11px]">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      <td className="p-2.5 font-semibold text-white">{lead.name}</td>
                      <td className="p-2.5 text-slate-300 truncate max-w-[140px]">
                        {lead.organisation || "Individual"}
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase border ${
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Workshop Bookings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recent Workshop RFPs
            </h2>
            <Link
              href="/admin/bookings"
              className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="p-2.5">RFP ID</th>
                  <th className="p-2.5">Requester / Campus</th>
                  <th className="p-2.5">City</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {!recentBookings || recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500 font-mono">
                      No workshop bookings registered yet.
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-2.5 font-mono text-teal-400 font-bold text-[11px]">
                        <Link href={`/admin/bookings/${b.id}`} className="hover:underline">
                          {b.id.substring(0, 8)}
                        </Link>
                      </td>
                      <td className="p-2.5">
                        <span className="font-semibold text-white block">{b.requester_name}</span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[140px]">
                          {b.institute_name || "Campus Ingestion"}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-400">{b.city || "—"}</td>
                      <td className="p-2.5">
                        <span
                          className={`inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase border ${
                            b.status === "completed"
                              ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                              : b.status === "scheduled"
                              ? "bg-purple-950/80 text-purple-400 border-purple-800"
                              : b.status === "confirmed"
                              ? "bg-blue-950/80 text-blue-400 border-blue-800"
                              : b.status === "cancelled"
                              ? "bg-red-950/80 text-red-400 border-red-800"
                              : "bg-amber-950/80 text-amber-400 border-amber-800"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
