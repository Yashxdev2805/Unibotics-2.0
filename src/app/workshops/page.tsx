import Link from "next/link";
import { ShieldCheck, BookOpen, Clock, Users } from "lucide-react";
import WorkshopList from "./WorkshopList";
import { WORKSHOPS_CATALOGUE } from "@/lib/data/workshops";

export const metadata = {
  title: "STEM & Robotics Workshops Catalogue | Unibotics India",
  description:
    "Standardized 2-day, 5-day, and 7-day technical workshops for schools, ITIs, polytechnics, and engineering colleges across India. Verifiable student certificates.",
};

export default function WorkshopsPage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Strip */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container-wide mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Workshops & Bootcamps</span>
        </div>
      </section>

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-container-wide mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>INSTITUTIONAL CURRICULUM ARCHITECTURE • HARDWARE INCLUDED</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Campus-Wide STEM & Technical Bootcamps
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            Hands-on 2-day, 5-day, and 7-day intensive workshops delivered on your campus by experienced technical mentors. All development boards, robotics kits, and testing apparatus are provided directly by Unibotics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 max-w-3xl text-xs">
            <div className="flex items-center space-x-2.5 text-slate-700">
              <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Full Component Kit Per Team</span>
            </div>
            <div className="flex items-center space-x-2.5 text-slate-700">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Structured Day-by-Day Agendas</span>
            </div>
            <div className="flex items-center space-x-2.5 text-slate-700">
              <Users className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Verifiable QR-Authenticated Badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Filter & Cards */}
      <section className="py-10 px-4 sm:px-6 max-w-container-wide mx-auto w-full">
        <WorkshopList workshops={WORKSHOPS_CATALOGUE} />
      </section>

      {/* Booking RFP Note Strip */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-container-wide mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold tracking-tight">Need a Custom Curriculum for Your Department?</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              We customize module durations, topics, and hardware platforms for specific college syllabi or department accreditation goals.
            </p>
          </div>
          <Link
            href="/contact?need=workshop"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shrink-0 text-center"
          >
            Request Custom Workshop Proposal
          </Link>
        </div>
      </section>
    </div>
  );
}
