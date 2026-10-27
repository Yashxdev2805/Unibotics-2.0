import { getAdminClient } from "@/lib/db/admin";
import LeadsTable, { type LeadRecord } from "./LeadsTable";

export const metadata = {
  title: "Inbound Leads CRM | Unibotics Admin",
  description: "Institutional enquiry workflow management.",
};

export default async function AdminLeadsPage() {
  const supabase = getAdminClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch leads from ledger: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          INBOUND PIPELINE • DIRECT ENQUIRIES
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Inbound Leads CRM</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, track, and manage commercial inquiries for Atal Tinkering Labs and campus workshops.
        </p>
      </div>

      <LeadsTable leads={(leads as LeadRecord[]) || []} />
    </div>
  );
}
