import { getAdminClient } from "@/lib/db/admin";
import BookingsTable, { type BookingRecord } from "./BookingsTable";

export const metadata = {
  title: "Workshop Bookings & RFPs | Unibotics Admin",
  description: "Institutional workshop booking pipeline, scheduling, and payment management.",
};

export default async function AdminBookingsPage() {
  const supabase = getAdminClient();

  const { data: rawBookings, error } = await supabase
    .from("bookings")
    .select(`
      *,
      workshops (title, slug, days),
      sessions (id)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch bookings from database: {error.message}
      </div>
    );
  }

  // Type-safe mapping
  interface JoinedBooking {
    id: string;
    workshop_id: string;
    workshops?: { title: string; slug: string; days: number } | null;
    institute_id: string | null;
    institute_name: string | null;
    requester_id: string | null;
    requester_name: string;
    requester_email: string;
    requester_phone: string | null;
    city: string | null;
    venue_type: string | null;
    student_count: number | null;
    preferred_dates: string | null;
    status: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled";
    quoted_price: number | null;
    payment_status: "unpaid" | "partial" | "paid";
    notes: string | null;
    created_at: string;
    sessions?: { id: string }[] | null;
  }

  const bookings: BookingRecord[] = ((rawBookings as unknown as JoinedBooking[]) || []).map((b) => ({
    id: b.id,
    workshop_id: b.workshop_id,
    workshop_title: b.workshops?.title,
    workshop_slug: b.workshops?.slug,
    workshop_days: b.workshops?.days,
    institute_id: b.institute_id,
    institute_name: b.institute_name,
    requester_id: b.requester_id,
    requester_name: b.requester_name,
    requester_email: b.requester_email,
    requester_phone: b.requester_phone,
    city: b.city,
    venue_type: b.venue_type,
    student_count: b.student_count,
    preferred_dates: b.preferred_dates,
    status: b.status,
    quoted_price: b.quoted_price,
    payment_status: b.payment_status,
    notes: b.notes,
    created_at: b.created_at,
    session_count: b.sessions ? b.sessions.length : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          OPERATIONAL PIPELINE • INSTITUTIONAL WORKSHOPS
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Workshop Bookings & RFPs</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review RFP proposals, manage quotes, schedule campus dates, and assign certified mentor cohorts.
        </p>
      </div>

      <BookingsTable bookings={bookings} />
    </div>
  );
}
