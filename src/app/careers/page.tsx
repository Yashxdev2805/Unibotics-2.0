import Link from "next/link";
import ApplicationForm from "./ApplicationForm";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Join Team | Technical Mentors & Field Engineers | Unibotics India",
  description:
    "Apply to become a robotics workshop mentor, engineering research intern, or regional institutional partner with Unibotics India. No account needed.",
};

export default function CareersPage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F7F7F8]">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-[#2A2342] bg-[#0D0B14]/60 py-3 px-4 sm:px-6 text-xs text-[#8B8988]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2A2342]">/</span>
          <Link href="/team" className="hover:text-white transition-colors">
            Team
          </Link>
          <span className="text-[#2A2342]">/</span>
          <span className="font-semibold text-white">Join Team & Apply as Mentor</span>
        </div>
      </section>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-stage mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#17132A] border border-[#2A2342] text-xs font-mono font-semibold text-[#C9A3FF]">
            <ShieldCheck className="w-4 h-4 text-[#45B558]" />
            <span>FIELD OPERATIONS EXPANSION • KURUKSHETRA HUB</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Build Hands-On Hardware With Us
          </h1>

          <p className="text-base text-[#8B8988] leading-relaxed max-w-2xl">
            We are actively recruiting passionate robotics mentors, graduate engineering interns, and regional implementation partners across North India. No prior account needed to apply.
          </p>
        </div>
      </section>

      {/* Main Application Area */}
      <section className="py-6 px-4 sm:px-6 max-w-3xl mx-auto w-full mb-8">
        <ApplicationForm />
      </section>

      {/* Mentor Standards Notice */}
      <section className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="glass-panel p-5 text-xs text-[#8B8988] space-y-2 border border-[#2A2342]">
          <span className="font-bold text-white block text-[11px] uppercase tracking-wider">
            Mentor Conduct & Safety Standard:
          </span>
          <p className="leading-relaxed">
            All mentors assigned to K-12 school Atal Tinkering Labs undergo identity verification and background vetting under our Child Protection & POCSO Compliance Policy. Unibotics maintains zero tolerance for safety violations on client campuses.
          </p>
        </div>
      </section>
    </div>
  );
}
