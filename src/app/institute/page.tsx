import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/db/server";
import { getAdminClient } from "@/lib/db/admin";
import { logout } from "@/app/login/actions";
import InstitutePortalClient, { type InstituteBookingItem } from "./InstitutePortalClient";
import {
  Building2,
  Calendar,
  LogOut,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";

export const metadata = {
  title: "Institute Coordinator Portal | Unibotics India",
  description: "Track institutional robotics bookings, student attendance rosters, and campus credential repositories.",
};

export default async function InstitutePortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/institute");
  }

  // 1. Verify institute_admin or super_admin
  const { data: memberships } = await supabase
    .from("memberships")
    .select("role, institute_id, approved")
    .eq("user_id", user.id)
    .in("role", ["institute_admin", "super_admin"])
    .eq("approved", true);

  if (!memberships || memberships.length === 0) {
    redirect("/unauthorized");
  }

  const isSuperAdmin = memberships.some((m) => m.role === "super_admin");
  const instituteAdminMember = memberships.find((m) => m.role === "institute_admin" && m.institute_id);
  const targetInstituteId = instituteAdminMember?.institute_id || null;

  const adminClient = getAdminClient();

  // 2. Fetch Institute details
  let instituteName = "Affiliated Institution";
  let campusCity = "India";

  if (targetInstituteId) {
    const { data: inst } = await adminClient
      .from("institutes")
      .select("name, city")
      .eq("id", targetInstituteId)
      .maybeSingle();

    if (inst) {
      instituteName = inst.name;
      campusCity = inst.city || "India";
    }
  }

  // 3. Fetch Bookings for this Institute
  let query = adminClient
    .from("bookings")
    .select(`
      id,
      quoted_price,
      payment_status,
      status,
      student_count,
      preferred_dates,
      created_at,
      institute_name,
      city,
      workshops (
        title,
        days
      ),
      sessions (
        id,
        start_date,
        end_date,
        venue,
        status
      ),
      participants (
        id,
        full_name,
        email
      ),
      certificates (
        id,
        public_code,
        holder_name,
        status
      )
    `)
    .order("created_at", { ascending: false });

  if (targetInstituteId) {
    query = query.eq("institute_id", targetInstituteId);
  } else if (!isSuperAdmin) {
    // If no institute_id assigned yet, fallback to user's requested bookings
    query = query.eq("requester_id", user.id);
  }

  const { data: rawBookings } = await query;

  interface JoinedRawBooking {
    id: string;
    quoted_price: number | null;
    payment_status: "unpaid" | "partial" | "paid";
    status: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled";
    student_count: number | null;
    preferred_dates: string | null;
    created_at: string;
    institute_name: string | null;
    city: string | null;
    workshops?: { title: string; days: number } | null;
    sessions?: {
      id: string;
      start_date: string;
      end_date: string;
      venue: string | null;
      status: string;
    }[] | null;
    participants?: {
      id: string;
      full_name: string;
      email: string | null;
    }[] | null;
    certificates?: {
      id: string;
      public_code: string;
      holder_name: string;
      status: "valid" | "revoked";
    }[] | null;
  }

  const bookingsList = (rawBookings as unknown as JoinedRawBooking[]) || [];

  const bookings: InstituteBookingItem[] = bookingsList.map((b) => {
    const ws = b.workshops;
    if (b.institute_name && instituteName === "Affiliated Institution") {
      instituteName = b.institute_name;
    }
    if (b.city && campusCity === "India") {
      campusCity = b.city;
    }

    return {
      id: b.id,
      workshop_title: ws?.title || "Robotics Training Program",
      workshop_days: ws?.days || 5,
      status: b.status,
      quoted_price: b.quoted_price,
      payment_status: b.payment_status,
      student_count: b.student_count,
      preferred_dates: b.preferred_dates,
      created_at: b.created_at,
      sessions: b.sessions || [],
      participants: b.participants || [],
      certificates: b.certificates || [],
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center">
              U
            </div>
            <span className="font-bold text-sm tracking-tight text-white">UNIBOTICS</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-mono text-xs text-teal-400 font-semibold uppercase">
            INSTITUTIONAL COORDINATOR PORTAL
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="text-slate-400 hidden sm:inline">{user.email}</span>
          <form action={logout}>
            <button
              type="submit"
              className="text-slate-400 hover:text-red-400 transition-colors flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Institute Overview Header */}
        <div className="bg-white border border-slate-300 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-bold text-xl font-mono shrink-0">
              <Building2 className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-slate-950 tracking-tight font-mono">
                  {instituteName}
                </h1>
                <span className="px-2 py-0.5 bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold text-slate-700 uppercase">
                  Partner Campus
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Location: {campusCity} • Coordinator: {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">WORKSHOPS</span>
              <strong className="text-base font-bold text-slate-900">{bookings.length}</strong>
            </div>
          </div>
        </div>

        {/* Client Tabs Component */}
        <InstitutePortalClient
          instituteName={instituteName}
          campusCity={campusCity}
          bookings={bookings}
        />
      </main>
    </div>
  );
}
