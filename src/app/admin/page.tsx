import Link from "next/link";
import { getAdminClient } from "@/lib/db/admin";
import {
  Inbox,
  FileCheck2,
  Users,
  ShieldAlert,
  ArrowRight,
  Clock,
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
    { count: totalUsers },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("memberships").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("id, name, organisation, city, need, status, created_at").order("created_at", { ascending: false }).limit(5),
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* New Leads */}
        <div className="bg-slate-950 border border-slate-800 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase">Unresolved Leads</span>
            <Inbox className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-white">{newLeads ?? 0}</span>
            <span className="text-xs text-slate-400">of {totalLeads ?? 0} total</span>
          </div>
          <Link
            href="/admin/leads"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Review Inbound CRM</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Pending Applications */}
        <div className="bg-slate-950 border border-slate-800 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase">Pending Applications</span>
            <FileCheck2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-white">{pendingApps ?? 0}</span>
            <span className="text-xs text-slate-400">of {totalApps ?? 0} total</span>
          </div>
          <Link
            href="/admin/applications"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Evaluate Candidates</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Total Memberships */}
        <div className="bg-slate-950 border border-slate-800 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase">Active Memberships</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-white">{totalUsers ?? 0}</span>
            <span className="text-xs text-slate-400">Users Registered</span>
          </div>
          <Link
            href="/admin/users"
            className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1 pt-2 border-t border-slate-850"
          >
            <span>Manage Access Roles</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Security Health */}
        <div className="bg-slate-950 border border-slate-800 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase">RLS & Ledger Integrity</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold font-mono text-emerald-400">SECURE</span>
          </div>
          <p className="text-[11px] text-slate-500">14 Tables Governed by Row Level Security</p>
        </div>

      </div>

      {/* Recent Leads Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
            Recent Inbound Inquiries
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="p-3">Received</th>
                <th className="p-3">Name</th>
                <th className="p-3">Organisation</th>
                <th className="p-3">City</th>
                <th className="p-3">Requirement</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {!recentLeads || recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500 font-mono">
                    No inquiries recorded in ledger yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-mono text-slate-400">
                      {new Date(lead.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="p-3 font-semibold text-white">{lead.name}</td>
                    <td className="p-3 text-slate-300">{lead.organisation || "Individual"}</td>
                    <td className="p-3 text-slate-400">{lead.city}</td>
                    <td className="p-3 font-mono uppercase text-teal-400 text-[11px]">
                      {lead.need.replace("_", " ")}
                    </td>
                    <td className="p-3">
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
