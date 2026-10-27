import Link from "next/link";
import { ShieldCheck, BookOpen, Clock, Users } from "lucide-react";
import WorkshopList from "./WorkshopList";
import { WORKSHOPS_CATALOGUE } from "@/lib/data/workshops";

export const metadata = {
  title: "Robotics & STEM Workshops Catalogue (2, 5 & 7 Days) | Unibotics",
  description:
    "Standardized 2-day, 5-day, and 7-day technical robotics workshops for schools, ITIs, polytechnics, and engineering colleges. Hands-on hardware kits and verifiable QR credentials.",
};

export default function WorkshopsPage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      {/* Breadcrumb Strip */}
      <section className="border-b border-[#2F3545] bg-[#161920]/80 py-3 px-4 sm:px-6 text-sm text-[#94A3B8]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-[#F97316]">Workshops &amp; Bootcamps</span>
        </div>
      </section>

      {/* Header Banner */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-stage mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#212530] border border-[#2F3545] text-xs font-mono font-semibold text-[#F97316]">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>INSTITUTIONAL CURRICULUM ARCHITECTURE • HARDWARE INCLUDED</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Campus-Wide STEM &amp; Technical Bootcamps
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
            Hands-on 2-day, 5-day, and 7-day intensive robotics bootcamps delivered on your campus by experienced technical mentors. All development boards, robotics kits, and testing apparatus are provided directly by Unibotics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2F3545] max-w-3xl text-sm">
            <div className="flex items-center space-x-2.5 text-[#94A3B8]">
              <BookOpen className="w-4 h-4 text-[#F97316] shrink-0" />
              <span>Full Component Kit Per Team</span>
            </div>
            <div className="flex items-center space-x-2.5 text-[#94A3B8]">
              <Clock className="w-4 h-4 text-[#F97316] shrink-0" />
              <span>Structured Day-by-Day Agendas</span>
            </div>
            <div className="flex items-center space-x-2.5 text-[#94A3B8]">
              <Users className="w-4 h-4 text-[#F97316] shrink-0" />
              <span>Verifiable QR-Authenticated Badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Filter & Cards */}
      <section className="py-6 px-4 sm:px-6 max-w-stage mx-auto w-full mb-16">
        <WorkshopList workshops={WORKSHOPS_CATALOGUE} />
      </section>
    </div>
  );
}
