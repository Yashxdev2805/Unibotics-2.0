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
    <div className="flex-1 flex flex-col relative text-[#F7F7F8]">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-[#2A2342] bg-[#0D0B14]/60 py-3 px-4 sm:px-6 text-xs text-[#8B8988]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2A2342]">/</span>
          <Link href="/workshops" className="hover:text-white transition-colors">
            Workshops
          </Link>
          <span className="text-[#2A2342]">/</span>
          <span className="font-semibold text-white">{workshop.title}</span>
        </div>
      </section>

      {/* Hero Summary Header */}
      <section className="py-10 md:py-14 px-4 sm:px-6">
        <div className="max-w-stage mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <Link
              href="/workshops"
              className="inline-flex items-center text-xs font-semibold text-[#8B8988] hover:text-white transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to All Workshops
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center text-xs font-mono font-bold text-white bg-[#17132A] border border-[#2A2342] px-2.5 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#C9A3FF]" />
                {workshop.days} Days Intensive Program
              </span>

              {workshop.audience.map((aud) => (
                <span
                  key={aud}
                  className="text-xs font-mono uppercase bg-[#0D0B14] text-[#C9A3FF] border border-[#2A2342] px-2 py-0.5 rounded-full"
                >
                  {aud}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {workshop.title}
            </h1>

            <p className="text-base text-[#8B8988] leading-relaxed max-w-2xl">
              {workshop.description}
            </p>

            <div className="bg-[#0D0B14] border border-[#2A2342] p-4 rounded-xl max-w-2xl">
              <span className="text-[10px] font-mono uppercase text-[#7468A0] font-bold block mb-1">
                Student Learning Outcome:
              </span>
              <p className="text-xs text-[#F7F7F8] leading-relaxed">{workshop.outcomes}</p>
            </div>
          </div>

          {/* Booking & Logistics Sidebar Card */}
          <div className="lg:col-span-4 glass-panel p-6 border border-[#2A2342] glow-line-top shadow-glow space-y-5">
            <div className="border-b border-[#2A2342] pb-3">
              <span className="font-mono text-xs text-[#C9A3FF] block mb-0.5 font-bold uppercase">
                INSTITUTIONAL RFP
              </span>
              <h3 className="text-base font-bold text-white">Book This Workshop</h3>
            </div>

            <div className="space-y-3 text-xs text-[#8B8988]">
              <div className="flex items-start space-x-2.5">
                <Calendar className="w-4 h-4 text-[#C9A3FF] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Flexible Dates</span>
                  <span>Scheduled according to your semester or academic calendar.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Building2 className="w-4 h-4 text-[#C9A3FF] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">On-Campus Delivery</span>
                  <span>Unibotics mentors travel to your institute with all hardware kits.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <FileCheck className="w-4 h-4 text-[#45B558] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Verifiable Credentials</span>
                  <span>Digital cryptographic badges issued to every passing participant.</span>
                </div>
              </div>
            </div>

            <Link
              href={`/workshops/${workshop.slug}/book`}
              className="btn-primary-violet w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2"
            >
              <span>Book Workshop (RFP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-[#7468A0] text-center">
              Written quote and mentor itinerary confirmed in 1 to 2 working days.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Agenda Breakdown & Logistics */}
      <section className="py-8 px-4 sm:px-6 max-w-stage mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left Column: Day-by-Day Agenda */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <span className="font-mono text-xs text-[#C9A3FF] block mb-1 uppercase font-bold">
              CURRICULUM ARCHITECTURE
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Day-by-Day Module Syllabus
            </h2>
          </div>

          <div className="space-y-4">
            {workshop.sampleAgenda.map((day) => (
              <div
                key={day.day}
                className="glass-panel p-5 border border-[#2A2342] shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[#2A2342] pb-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-white bg-[#17132A] border border-[#2A2342] px-2.5 py-0.5 rounded-full">
                      DAY {day.day}
                    </span>
                    <h3 className="text-sm font-bold text-white">{day.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#7468A0]">6 Hours Hands-on</span>
                </div>

                <ul className="space-y-2 text-xs text-[#8B8988]">
                  {day.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#45B558] mt-0.5 shrink-0" />
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
          <div className="glass-panel p-5 border border-[#2A2342] space-y-3">
            <div className="border-b border-[#2A2342] pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Pre-Requisites & Eligibility
              </span>
            </div>
            <p className="text-xs text-[#8B8988] leading-relaxed">
              {workshop.prerequisites}
            </p>
          </div>

          <div className="glass-panel p-5 border border-[#2A2342] space-y-3">
            <div className="border-b border-[#2A2342] pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Host Institute Facility Checklist
              </span>
            </div>
            <ul className="space-y-2 text-xs text-[#8B8988]">
              {workshop.whatInstituteProvides.map((req, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-mono text-[#7468A0] text-[10px] mt-0.5">0{idx + 1}.</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-4 border border-[#2A2342] text-xs text-[#8B8988] space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-[#45B558]" />
              <span>Unibotics Hardware Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#7468A0]">
              All development boards, soldering gear, sensors, and robotics chassis are supplied by Unibotics. Defective components are replaced on-site with zero downtime.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
