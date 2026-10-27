import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Building2,
  FileCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { WORKSHOPS_CATALOGUE } from "@/lib/data/workshops";

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
  if (!workshop) return { title: "Workshop | Unibotics" };

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

  // Course Structured Data for Google rich results
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: workshop.title,
    description: workshop.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Unibotics",
      sameAs: "https://unibotics.in",
    },
    educationalCredentialAwarded: "Verifiable Digital QR Credential",
    timeRequired: `P${workshop.days}D`,
  };

  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      </head>

      {/* Breadcrumb Navigation */}
      <section className="border-b border-[#2F3545] bg-[#161920]/80 py-3 px-4 sm:px-6 text-sm text-[#94A3B8]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2F3545]">/</span>
          <Link href="/workshops" className="hover:text-white transition-colors">
            Workshops
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-[#F97316]">{workshop.title}</span>
        </div>
      </section>

      {/* Hero Summary Header */}
      <section className="py-10 md:py-16 px-4 sm:px-6">
        <div className="max-w-stage mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-5">
            <Link
              href="/workshops"
              className="inline-flex items-center text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors mb-1"
            >
              <ArrowLeft className="w-4 h-4 mr-1 text-[#F97316]" />
              Back to All Workshops
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center text-xs font-mono font-bold text-[#F97316] bg-[#212530] border border-[#2F3545] px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#F97316]" />
                {workshop.days} Days Intensive Program
              </span>

              {workshop.audience.map((aud) => (
                <span
                  key={aud}
                  className="text-xs font-mono uppercase bg-[#161920] text-[#38BDF8] border border-[#2F3545] px-2.5 py-1 rounded-full"
                >
                  {aud}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {workshop.title}
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
              {workshop.description}
            </p>

            <div className="bg-[#161920] border border-[#2F3545] p-5 rounded-xl max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#F97316] font-bold block mb-1">
                Student Learning Outcome:
              </span>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{workshop.outcomes}</p>
            </div>
          </div>

          {/* Booking & Logistics Sidebar Card */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-7 border border-[#2F3545] glow-line-top shadow-glow space-y-6">
            <div className="border-b border-[#2F3545] pb-3">
              <span className="font-mono text-xs text-[#F97316] block mb-0.5 font-bold uppercase">
                INSTITUTIONAL RFP
              </span>
              <h3 className="text-lg font-bold text-white">Book This Workshop</h3>
            </div>

            <div className="space-y-3.5 text-sm text-[#94A3B8]">
              <div className="flex items-start space-x-3">
                <Calendar className="w-4 h-4 text-[#F97316] mt-1 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Flexible Dates</span>
                  <span className="text-xs text-[#94A3B8]">Scheduled according to your semester or academic calendar.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Building2 className="w-4 h-4 text-[#F97316] mt-1 shrink-0" />
                <div>
                  <span className="font-bold text-white block">On-Campus Delivery</span>
                  <span className="text-xs text-[#94A3B8]">Unibotics mentors travel to your institute with complete hardware kits.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FileCheck className="w-4 h-4 text-[#10B981] mt-1 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Verifiable Credentials</span>
                  <span className="text-xs text-[#94A3B8]">Digital cryptographic badges issued to every passing participant.</span>
                </div>
              </div>
            </div>

            <Link
              href={`/workshops/${workshop.slug}/book`}
              className="btn-primary-cyan w-full py-3.5 px-4 rounded-full font-bold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-glow"
            >
              <span>Book Workshop (RFP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-[#64748B] text-center">
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
            <span className="font-mono text-xs text-[#F97316] block mb-1 uppercase font-bold">
              CURRICULUM ARCHITECTURE
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Day-by-Day Module Syllabus
            </h2>
          </div>

          <div className="space-y-4">
            {workshop.sampleAgenda.map((day) => (
              <div
                key={day.day}
                className="glass-panel p-6 border border-[#2F3545] shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[#2F3545] pb-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-[#F97316] bg-[#212530] border border-[#2F3545] px-2.5 py-1 rounded-full">
                      DAY {day.day}
                    </span>
                    <h3 className="text-base font-bold text-white">{day.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-[#F97316]">6 Hours Hands-on</span>
                </div>

                <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
                  {day.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
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
          <div className="glass-panel p-6 border border-[#2F3545] space-y-3">
            <div className="border-b border-[#2F3545] pb-2">
              <span className="text-sm font-bold text-white uppercase tracking-wider block">
                Pre-Requisites &amp; Eligibility
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {workshop.prerequisites}
            </p>
          </div>

          <div className="glass-panel p-6 border border-[#2F3545] space-y-3">
            <div className="border-b border-[#2F3545] pb-2">
              <span className="text-sm font-bold text-white uppercase tracking-wider block">
                Host Institute Facility Checklist
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              {workshop.whatInstituteProvides.map((req, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-mono text-[#F97316] text-xs mt-0.5 font-bold">0{idx + 1}.</span>
                  <span className="text-[#CBD5E1]">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-5 border border-[#2F3545] text-sm text-[#94A3B8] space-y-2">
            <div className="flex items-center space-x-2 font-bold text-white">
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              <span>Unibotics Hardware Guarantee</span>
            </div>
            <p className="text-xs leading-relaxed text-[#94A3B8]">
              All development boards, soldering stations, sensors, and robotics chassis are provided directly by Unibotics. Spare components are on-site for immediate replacement.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
