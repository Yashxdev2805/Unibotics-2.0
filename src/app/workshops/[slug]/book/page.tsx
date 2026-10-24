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
          <Link href={`/workshops/${workshop.slug}`} className="hover:text-white transition-colors">
            {workshop.title}
          </Link>
          <span className="text-[#2A2342]">/</span>
          <span className="font-semibold text-white">Book Program</span>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 flex-1 mb-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2342] pb-4">
            <div>
              <Link
                href={`/workshops/${workshop.slug}`}
                className="inline-flex items-center text-xs font-semibold text-[#8B8988] hover:text-white transition-colors mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Workshop Details
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Institutional Booking Request
              </h1>
              <p className="text-xs text-[#8B8988] mt-0.5">
                Standard 3-Step Scope & Deployment Booking Wizard (Section 12)
              </p>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#17132A] text-[#C9A3FF] border border-[#2A2342]">
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
