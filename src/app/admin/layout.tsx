import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/db/server";
import { logout } from "@/lib/../app/login/actions";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Inbox,
  FileCheck2,
  LogOut,
  ExternalLink,
  History,
} from "lucide-react";

export const metadata = {
  title: "Administrative Control Center | Unibotics India",
  description: "Secured operations portal for leads, applications, and role authorizations.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense-in-depth: Verify super_admin authorization
  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const { data: memberships } = await supabase
    .from("memberships")
    .select("role, approved")
    .eq("user_id", user.id)
    .eq("role", "super_admin")
    .eq("approved", true);

  if (!memberships || memberships.length === 0) {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand & Security Stamp */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-teal-600 text-slate-950 flex items-center justify-center font-black text-sm">
                U
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-white block leading-none">
                  UNIBOTICS ADMIN
                </span>
                <span className="text-[10px] font-mono text-teal-400 font-semibold uppercase mt-0.5 block">
                  SUPER ADMIN PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Operations Overview</span>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <Inbox className="w-4 h-4 text-slate-400" />
              <span>Inbound Leads CRM</span>
            </Link>

            <Link
              href="/admin/applications"
              className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-slate-400" />
              <span>Candidate Applications</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Users & Role Directory</span>
            </Link>

            <Link
              href="/admin/audit"
              className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>Security Audit Trail</span>
            </Link>
          </nav>
        </div>

        {/* User Session & Logout Footnote */}
        <div className="p-4 border-t border-slate-800 space-y-3 text-xs bg-slate-950">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">AUTHENTICATED AS:</span>
            <span className="font-mono text-slate-300 truncate block text-[11px]">{user.email}</span>
            <span className="inline-block text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.5 mt-1">
              ROLE: SUPER_ADMIN
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="text-[11px] text-red-400 hover:text-red-300 flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Administrative Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
        {/* Top Operational Status Banner */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>SYSTEM AUDIT: ENCRYPTED ROW LEVEL SECURITY (RLS) ACTIVE</span>
          </div>
          <span>SESSION AUTH: SECURE HTTPONLY COOKIES</span>
        </header>

        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
