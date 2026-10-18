import Link from "next/link";
import ApplicationForm from "./ApplicationForm";
import { ShieldCheck, Users, Wrench, GraduationCap, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Join Unibotics | Technical Mentors, Interns & Channel Partners",
  description:
    "Apply to become a robotics workshop mentor, engineering research intern, or regional institutional partner with Unibotics India.",
};

export default function CareersPage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Join Unibotics Team & Partnerships</span>
        </div>
      </section>

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-container mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ACADEMIC & FIELD OPERATIONS EXPANSION • KURUKSHETRA HUB</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Build Hardware With Us
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            We are actively recruiting passionate robotics mentors, graduate engineering interns, and regional implementation partners across North India.
          </p>
        </div>
      </section>

      {/* Main Application Area */}
      <section className="py-12 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <ApplicationForm />
      </section>

      {/* Mentor Standards Notice */}
      <section className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="bg-slate-100 border border-slate-300 p-5 text-xs text-slate-600 space-y-2">
          <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
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
