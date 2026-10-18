import { getAdminClient } from "@/lib/db/admin";
import ApplicationsTable, { type ApplicationRecord } from "./ApplicationsTable";

export const metadata = {
  title: "Candidate Applications | Unibotics Admin",
  description: "Evaluate technical mentor and partnership applications.",
};

export default async function AdminApplicationsPage() {
  const supabase = getAdminClient();

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch applications: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          RECRUITMENT & CONSORTIUM • APPLICANT DOSSIERS
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Candidate Applications</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, approve, or reject applicants for technical mentor, intern, and institutional partner roles.
        </p>
      </div>

      <ApplicationsTable applications={(applications as ApplicationRecord[]) || []} />
    </div>
  );
}
