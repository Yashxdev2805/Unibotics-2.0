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
} from "lucide-react";

export const metadata = {
  title: "About Us | STEM & Lab Infrastructure Partner | Unibotics India",
  description:
    "Institutional STEM education and turnkey lab infrastructure partner based in Kurukshetra, Haryana. Empowering schools, ITIs, and engineering colleges across India.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">About Unibotics</span>
        </div>
      </section>

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-container mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>OPERATING FROM KURUKSHETRA, HARYANA • ESTABLISHED STEM PARTNER</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight max-w-3xl">
            Practical Engineering Infrastructure for Indian Campuses
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            Unibotics Services Pvt. Ltd. was founded on a straightforward institutional conviction: students learn real engineering by building physical hardware, not by watching slides.
          </p>
        </div>
      </section>

      {/* Institutional Mission & Operating Model */}
      <section className="py-12 px-4 sm:px-6 max-w-container mx-auto w-full space-y-10">
        
        {/* Core Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 uppercase">
              <Target className="w-4 h-4 text-teal-600" />
              <span>Institutional Purpose</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 tracking-tight">
              Closing the Gap Between Theory and Hardware Execution
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Most institutional robotics and innovation initiatives fail because hardware is procured in isolation without teacher training, or workshops are conducted as spectator lectures without component kits.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unibotics solves both bottlenecks. When we implement an Atal Tinkering Lab, we supply industrial-grade 3D printers and microcontrollers, train the school&apos;s teachers for 40 hours, and provide project guidebooks mapped to the NEP 2020 framework.
            </p>
          </div>

          <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 uppercase">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Regional Operations Hub</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 tracking-tight">
              Kurukshetra Engineering Corridor
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Headquartered in Kurukshetra, Haryana, our technical mentors and field engineers service institutions across Haryana, Punjab, Delhi NCR, and Uttar Pradesh.
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-semibold text-slate-900">Physical Presence:</span>
              </div>
              <p className="text-slate-600 pl-6">
                Kurukshetra, Haryana 136118, India
              </p>
              <div className="pl-6 pt-1 text-slate-500 text-[11px]">
                Direct Contact: <a href="mailto:directorunibotics@gmail.com" className="text-teal-700 underline font-mono">directorunibotics@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Pillars */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-slate-500 uppercase block">CORE COMPETENCIES</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            How We Partner With Campuses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white border border-slate-300 p-6 shadow-sm space-y-3">
              <div className="p-2 bg-slate-900 text-white w-fit">
                <Cpu className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Turnkey Atal Tinkering Labs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full P1-P4 equipment packages, dual-extruder 3D printers, sensor racks, and compliance paperwork under NITI Aayog guidelines.
              </p>
            </div>

            <div className="bg-white border border-slate-300 p-6 shadow-sm space-y-3">
              <div className="p-2 bg-slate-900 text-white w-fit">
                <Users className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Multi-Day Bootcamps</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                2, 5, and 7-day intensive hands-on workshops in drones, industrial IoT, embedded systems, and robotics kinematics.
              </p>
            </div>

            <div className="bg-white border border-slate-300 p-6 shadow-sm space-y-3">
              <div className="p-2 bg-slate-900 text-white w-fit">
                <GraduationCap className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Faculty Enablement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive training programs that empower school teachers and college professors to mentor student innovators independently.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 text-white p-8 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold tracking-tight">
              Invite Unibotics to Your Institution
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              We provide formal demonstrations, syllabus alignments, and laboratory facility inspections with 1 to 2 working days response.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shrink-0 text-center"
          >
            Contact Operations Hub
          </Link>
        </div>

      </section>
    </div>
  );
}
