import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ShieldCheck, ArrowLeft, CheckCircle2, Cpu } from "lucide-react";
import { WORKSHOPS_CATALOGUE } from "@/lib/data/workshops";
import BookingWizard from "./BookingWizard";

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
  if (!workshop) return { title: "Booking | Unibotics" };

  return {
    title: `Book ${workshop.title} (${workshop.days} Days) | Institutional RFP | Unibotics`,
    description: `Submit an institutional workshop request for ${workshop.title}. Direct mentor deployment, certified kits, and verifiable credentialing.`,
  };
}

export default async function WorkshopBookPage({ params }: PageProps) {
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
          <Link href={`/workshops/${workshop.slug}`} className="hover:text-slate-900">
            {workshop.title}
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Book Program</span>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 flex-1">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <Link
                href={`/workshops/${workshop.slug}`}
                className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Return to Workshop Details
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-mono">
                INSTITUTIONAL RFP & BOOKING WIZARD
              </h1>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                Deploy verified robotics and embedded engineering curriculum directly at your campus. Complete the 3-step intake below to reserve dates and generate a formal institutional quote.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-white border border-slate-300 px-3 py-2 text-xs font-mono self-start sm:self-auto">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="font-bold text-slate-900">{workshop.days} Days</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">Cohort: 10-500</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Booking Wizard */}
            <div className="lg:col-span-8">
              <BookingWizard workshop={workshop} />
            </div>

            {/* Right: Technical Spec & Institutional Guarantees */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-300 p-5 space-y-4 shadow-sm">
                <div className="border-b border-slate-200 pb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                    PROGRAM PROFILE
                  </span>
                  <h2 className="text-sm font-bold text-slate-950 mt-0.5">{workshop.title}</h2>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start space-x-2">
                    <Cpu className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-mono text-[11px]">HARDWARE LOGISTICS:</strong>
                      <span>Hardware development kits, development boards, and sensors are shipped and managed on-site by Unibotics lead engineers.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-mono text-[11px]">COMPLETION BADGES:</strong>
                      <span>All attending students undergo practical testing and receive unique SHA-256 verifiable credentials.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-mono text-[11px]">GST INVOICING:</strong>
                      <span>Direct B2B/B2G compliance with formal GEM / institutional procurement and vendor onboarding support.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900 block mb-1">Target Audience:</span>
                  <div className="flex flex-wrap gap-1">
                    {workshop.audience.map((a) => (
                      <span key={a} className="bg-white border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-5 border border-slate-800 shadow-sm text-xs space-y-2">
                <span className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-wider block">
                  FAST-TRACK DIRECT CONTACT
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Have an immediate university fest, grant deadline, or custom ATL setup? Speak directly with our operations director:
                </p>
                <div className="font-mono text-xs pt-1 text-teal-300">
                  📞 +91 94160 51582
                  <br />
                  ✉️ contact@unibotics.in
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
