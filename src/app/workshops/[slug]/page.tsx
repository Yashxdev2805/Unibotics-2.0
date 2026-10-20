import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  FileCheck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { WORKSHOPS_CATALOGUE, type WorkshopItem } from "@/lib/data/workshops";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WORKSHOPS_CATALOGUE.map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const workshop = WORKSHOPS_CATALOGUE.find((w) => w.slug === slug);
  if (!workshop) return { title: "Workshop Not Found | Unibotics" };

  return {
    title: `${workshop.title} (${workshop.days} Days) | Unibotics India`,
    description: workshop.description,
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workshop = WORKSHOPS_CATALOGUE.find((w) => w.slug === slug);

  if (!workshop) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container-wide mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/workshops" className="hover:text-slate-900">
            Workshops
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{workshop.title}</span>
        </div>
      </section>

      {/* Hero Summary Header */}
      <section className="bg-white border-b border-slate-200 py-10 md:py-14 px-4 sm:px-6">
        <div className="max-w-container-wide mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <Link
              href="/workshops"
              className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to All Workshops
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5">
                <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                {workshop.days} Days Intensive Program
              </span>

              {workshop.audience.map((aud) => (
                <span
                  key={aud}
                  className="text-xs font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5"
                >
                  {aud}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {workshop.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              {workshop.description}
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 max-w-2xl">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                Student Learning Outcome:
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">{workshop.outcomes}</p>
            </div>
          </div>

          {/* Booking & Logistics Sidebar Card */}
          <div className="lg:col-span-4 bg-slate-900 text-white p-6 border border-slate-800 shadow-sm space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="font-mono text-xs text-slate-400 block mb-0.5">INSTITUTIONAL RFP</span>
              <h3 className="text-base font-bold text-white">Book This Workshop</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Flexible Dates</span>
                  <span>Scheduled according to your semester or academic calendar.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Building2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">On-Campus Delivery</span>
                  <span>Unibotics mentors travel to your institute with all hardware kits.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FileCheck className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Verifiable Credentials</span>
                  <span>Digital cryptographic badges issued to every passing participant.</span>
                </div>
              </div>
            </div>

            <Link
              href={`/workshops/${workshop.slug}/book`}
              className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Book Workshop (RFP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-slate-400 text-center">
              Written quote and mentor itinerary confirmed in 1 to 2 working days.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Agenda Breakdown & Logistics */}
      <section className="py-12 px-4 sm:px-6 max-w-container-wide mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Day-by-Day Agenda */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <span className="font-mono text-xs text-slate-500 block mb-1">CURRICULUM ARCHITECTURE</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Day-by-Day Module Syllabus
            </h2>
          </div>

          <div className="space-y-4">
            {workshop.sampleAgenda.map((day) => (
              <div
                key={day.day}
                className="bg-white border border-slate-300 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-0.5">
                      DAY {day.day}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{day.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">6 Hours Hands-on</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-700">
                  {day.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pre-requisites & Lab Requirements */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-300 p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Pre-Requisites & Eligibility
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {workshop.prerequisites}
            </p>
          </div>

          <div className="bg-white border border-slate-300 p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Host Institute Facility Checklist
              </span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              {workshop.whatInstituteProvides.map((req, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-mono text-slate-400 text-[10px] mt-0.5">0{idx + 1}.</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-100 border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Unibotics Hardware Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              All development boards, soldering gear, sensors, and robotics chassis are supplied by Unibotics. Defective or burned components are replaced immediately on-site with zero downtime.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
