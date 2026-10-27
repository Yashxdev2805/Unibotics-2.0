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
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function WorkshopBookPage({ params }: PageProps) {
  const { slug } = await params;
  const workshop = WORKSHOPS_CATALOGUE.find((w) => w.slug === slug);

  if (!workshop) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
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
          <Link href={`/workshops/${workshop.slug}`} className="hover:text-white transition-colors">
            {workshop.title}
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-[#F97316]">Book Program</span>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 flex-1 mb-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2F3545] pb-4">
            <div>
              <Link
                href={`/workshops/${workshop.slug}`}
                className="inline-flex items-center text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors mb-1"
              >
                <ArrowLeft className="w-4 h-4 mr-1 text-[#F97316]" />
                Back to Workshop Details
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Institutional Booking Request
              </h1>
              <p className="text-sm text-[#94A3B8] mt-0.5">
                Standard 3-Step Scope &amp; Deployment Booking Wizard
              </p>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#212530] text-[#F97316] border border-[#2F3545]">
                {workshop.days} Days Duration
              </span>
            </div>
          </div>

          {/* Booking Wizard */}
          <BookingWizard workshop={workshop} />
        </div>
      </section>
    </div>
  );
}
