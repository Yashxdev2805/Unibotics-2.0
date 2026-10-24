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
    <div className="flex-1 flex flex-col relative text-[#F7F7F8]">
      {/* Breadcrumb Strip */}
      <section className="border-b border-[#2A2342] bg-[#0D0B14]/60 py-3 px-4 sm:px-6 text-xs text-[#8B8988]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2A2342]">/</span>
          <span className="font-semibold text-white">Workshops & Bootcamps</span>
        </div>
      </section>

      {/* Header Banner */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-stage mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#17132A] border border-[#2A2342] text-xs font-mono font-semibold text-[#C9A3FF]">
            <ShieldCheck className="w-4 h-4 text-[#45B558]" />
            <span>INSTITUTIONAL CURRICULUM ARCHITECTURE • HARDWARE INCLUDED</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Campus-Wide STEM & Technical Bootcamps
          </h1>

          <p className="text-base text-[#8B8988] leading-relaxed max-w-3xl">
            Hands-on 2-day, 5-day, and 7-day intensive workshops delivered on your campus by experienced technical mentors. All development boards, robotics kits, and testing apparatus are provided directly by Unibotics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2A2342] max-w-3xl text-xs">
            <div className="flex items-center space-x-2.5 text-[#8B8988]">
              <BookOpen className="w-4 h-4 text-[#C9A3FF] shrink-0" />
              <span>Full Component Kit Per Team</span>
            </div>
            <div className="flex items-center space-x-2.5 text-[#8B8988]">
              <Clock className="w-4 h-4 text-[#C9A3FF] shrink-0" />
              <span>Structured Day-by-Day Agendas</span>
            </div>
            <div className="flex items-center space-x-2.5 text-[#8B8988]">
              <Users className="w-4 h-4 text-[#C9A3FF] shrink-0" />
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
