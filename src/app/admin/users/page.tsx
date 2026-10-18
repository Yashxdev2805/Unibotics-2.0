import { getAdminClient } from "@/lib/db/admin";
import UsersTable, { type UserRow } from "./UsersTable";

export const metadata = {
  title: "Users & Role Directory | Unibotics Admin",
  description: "Manage global user identities, role assignments, and coordinator approvals.",
};

export default async function AdminUsersPage() {
  const supabase = getAdminClient();

  const [{ data: profiles, error: profilesError }, { data: memberships, error: membershipsError }] =
    await Promise.all([
      supabase.from("profiles").select("id, full_name, phone, created_at").order("created_at", { ascending: false }),
      supabase.from("memberships").select("id, user_id, role, approved, institute_id"),
    ]);

  if (profilesError || membershipsError) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch user directory: {profilesError?.message || membershipsError?.message}
      </div>
    );
  }

  // Aggregate memberships per user profile
  const usersWithMemberships: UserRow[] = (profiles || []).map((p) => ({
    id: p.id,
    full_name: p.full_name,
    phone: p.phone,
    created_at: p.created_at,
    memberships: (memberships || []).filter((m) => m.user_id === p.id),
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          ACCESS CONTROL • ROLE DIRECTORY
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Users & Role Directory</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage system privileges, elevate mentors to team members, and approve institute coordinators.
        </p>
      </div>

      <UsersTable users={usersWithMemberships} />
    </div>
  );
}
