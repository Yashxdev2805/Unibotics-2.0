import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Cpu,
  GraduationCap,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Target,
  Users,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About Us | STEM & Lab Infrastructure Partner | Unibotics India",
  description:
    "Institutional STEM education and turnkey lab infrastructure partner based in Kurukshetra, Haryana. Empowering schools, ITIs, and engineering colleges across India.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-[#2F3545] bg-[#161920]/60 py-3 px-4 sm:px-6 text-xs text-[#94A3B8]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-white">About Unibotics</span>
        </div>
      </section>

      {/* Hero Header */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-stage mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#212530] border border-[#2F3545] text-xs font-mono font-semibold text-[#F97316]">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>OPERATING FROM KURUKSHETRA, HARYANA • ESTABLISHED STEM PARTNER</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Practical Engineering Infrastructure for Indian Campuses
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed max-w-2xl">
            Unibotics Services Pvt. Ltd. was founded on a straightforward institutional conviction: students learn real engineering by building physical hardware, not by watching slides.
          </p>
        </div>
      </section>

      {/* Institutional Mission & Operating Model */}
      <section className="py-8 px-4 sm:px-6 max-w-stage mx-auto w-full space-y-10 mb-16">
        
        {/* Core Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#F97316] uppercase">
              <Target className="w-4 h-4 text-[#F97316]" />
              <span>Institutional Purpose</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Closing the Gap Between Theory and Hardware Execution
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Most institutional robotics and innovation initiatives fail because hardware is procured in isolation without teacher training, or workshops are conducted as spectator lectures without component kits.
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Unibotics solves both bottlenecks. When we implement an Atal Tinkering Lab, we supply industrial-grade 3D printers and microcontrollers, train the school&apos;s teachers for 40 hours, and provide project guidebooks mapped to the NEP 2020 framework.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#F97316] uppercase">
              <Building2 className="w-4 h-4 text-[#F97316]" />
              <span>Regional Operations Hub</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Kurukshetra Engineering Corridor
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Headquartered in Kurukshetra, Haryana, our technical mentors and field engineers service institutions across Haryana, Punjab, Delhi NCR, and Uttar Pradesh.
            </p>
            <div className="bg-[#212530] border border-[#2F3545] p-4 rounded-xl space-y-2 text-xs text-[#94A3B8]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0" />
                <span className="font-semibold text-white">Physical Presence:</span>
              </div>
              <p className="text-[#94A3B8] pl-6">
                Kurukshetra, Haryana 136118, India
              </p>
              <div className="pl-6 pt-1 text-[11px] text-[#64748B]">
                Direct Contact:{" "}
                <a
                  href="mailto:directorunibotics@gmail.com"
                  className="text-[#F97316] hover:underline font-mono"
                >
                  directorunibotics@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Pillars */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#64748B] uppercase block">
            CORE COMPETENCIES
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            How We Partner With Campuses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="glass-panel p-6 space-y-3">
              <div className="p-2.5 rounded-lg bg-[#212530] text-[#F97316] border border-[#2F3545] w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Turnkey Atal Tinkering Labs
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Full P1-P4 equipment packages, dual-extruder 3D printers, sensor racks, and compliance paperwork under NITI Aayog guidelines.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-3">
              <div className="p-2.5 rounded-lg bg-[#212530] text-[#F97316] border border-[#2F3545] w-fit">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Multi-Day Bootcamps
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                2, 5, and 7-day intensive hands-on workshops in drones, industrial IoT, embedded systems, and robotics kinematics.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-3">
              <div className="p-2.5 rounded-lg bg-[#212530] text-[#F97316] border border-[#2F3545] w-fit">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Faculty Enablement
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Comprehensive training programs that empower school teachers and college professors to mentor student innovators independently.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="glass-panel p-8 border-[#2F3545] glow-line-top flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight text-white">
              Invite Unibotics to Your Institution
            </h3>
            <p className="text-xs text-[#94A3B8] max-w-xl">
              We provide formal demonstrations, syllabus alignments, and laboratory facility inspections with 1 to 2 working days response.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary-cyan px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0"
          >
            Contact Operations Hub
          </Link>
        </div>

      </section>
    </div>
  );
}
