import { getAdminClient } from "@/lib/db/admin";
import { History, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Security Audit Trail | Unibotics Admin",
  description: "Immutable administrative audit log of all system state changes.",
};

export default async function AdminAuditPage() {
  const supabase = getAdminClient();

  const { data: logs, error } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch audit log: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          SYSTEM INTEGRITY • IMMUTABLE AUDIT TRAIL
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Security Audit Trail</h1>
        <p className="text-xs text-slate-400 mt-1">
          Chronological record of administrative privilege grants, lead status updates, and candidate decisions.
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
              <th className="p-3">Timestamp (IST)</th>
              <th className="p-3">Action</th>
              <th className="p-3">Entity</th>
              <th className="p-3">Target Entity ID</th>
              <th className="p-3">Actor ID</th>
              <th className="p-3">Parameters / Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {!logs || logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                  No administrative events recorded in audit log yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>

                  <td className="p-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-slate-900 text-teal-300 border border-slate-700">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-slate-300 uppercase text-[11px]">
                    {log.entity}
                  </td>

                  <td className="p-3 font-mono text-[11px] text-slate-400 truncate max-w-[120px]">
                    {log.entity_id || "N/A"}
                  </td>

                  <td className="p-3 font-mono text-[11px] text-slate-500 truncate max-w-[120px]">
                    {log.actor_id || "SYSTEM"}
                  </td>

                  <td className="p-3 font-mono text-[10px] text-slate-400 max-w-xs truncate">
                    {JSON.stringify(log.details)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
