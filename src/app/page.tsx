import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Clock,
  Cpu,
  GraduationCap,
  Building2,
  FileCheck,
  Send,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Telemetry / Notice Strip */}
      <section className="bg-slate-950 text-slate-300 py-2.5 px-4 text-xs font-mono border-b border-slate-800">
        <div className="max-w-container-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>STEM LAB IMPLEMENTATION & VOCATIONAL TRAINING ACROSS INDIA</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            Inquiry SLA: 1 to 2 Working Days Response
          </span>
        </div>
      </section>

      {/* Hero Section: High Spatial Density Split Layout */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-container-wide mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Institutional Pitch */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>TURNKEY ATAL TINKERING LABS & INSTITUTIONAL BOOTCAMPS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Build a campus where students create, not just study.
            </h1>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
              One operational partner for Atal Tinkering Lab setup, NSDC-aligned vocational training, and intensive multi-day STEM workshops for schools and colleges across India.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?need=atl_lab"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 transition-colors shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/workshops"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs tracking-wider uppercase border border-slate-300 transition-colors"
              >
                <span>Explore Workshops</span>
              </Link>
            </div>

            {/* Quick Factual Capabilities Strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 w-full text-xs">
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">TURNKEY IMPLEMENTATION</span>
                <span className="font-bold text-slate-900 text-sm">P1 – P4 Lab Packages</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">CAMPUS WORKSHOPS</span>
                <span className="font-bold text-slate-900 text-sm">2 / 5 / 7 Days</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">CREDENTIALS</span>
                <span className="font-bold text-slate-900 text-sm">Verifiable QR Badges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Platform Architecture & Hardware Overview Card */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 p-6 sm:p-7 border border-slate-800 shadow-md flex flex-col space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Institutional Capabilities
              </span>
              <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Operational</span>
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 bg-slate-800/80 border border-slate-700 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Atal Tinkering Labs</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Industrial 3D printers, microcontrollers, sensor kits, and 40 hours of on-site teacher enablement.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 flex items-start space-x-3">
                <Wrench className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Technical Bootcamps</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Autonomous drones, robotics kinematics, and industrial IoT delivered directly on campus.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 border border-slate-700 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tamper-Proof Verification</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Direct cryptographic ledger lookup for all student workshop credentials without third-party fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center pt-3 border-t border-slate-800 flex items-center justify-between">
              <span>Kurukshetra, Haryana, India</span>
              <a href="mailto:directorunibotics@gmail.com" className="text-teal-400 hover:underline font-mono">
                directorunibotics@gmail.com
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* WHO WE SERVE SECTION: 4 Interactive Campus Cards */}
      <section className="py-14 px-4 sm:px-6 max-w-container-wide mx-auto w-full">
        <div className="mb-8">
          <span className="font-mono text-xs text-slate-500 uppercase block mb-1">INSTITUTIONAL PARTNERSHIP PROFILES</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Tailored Engineering Infrastructure for Every Campus
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            We adapt curriculum rigor, component complexity, and lab requirements to the specific charter of your institution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-300 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">GRADES 6 TO 12</span>
              <h3 className="text-base font-bold text-slate-950">K-12 Schools</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Atal Tinkering Lab turnkey setups, beginner block coding, 3D printing foundations, and NEP 2020 aligned experiential STEM.
              </p>
            </div>
            <Link
              href="/atl-setup"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1 pt-2 border-t border-slate-100"
            >
              <span>Explore ATL Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-300 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">VOCATIONAL TRAINING</span>
              <h3 className="text-base font-bold text-slate-950">ITI Colleges</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Practical technician bootcamps in sensor wiring, electric motor controls, industrial IoT, and electronic circuit troubleshooting.
              </p>
            </div>
            <Link
              href="/workshops"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1 pt-2 border-t border-slate-100"
            >
              <span>View ITI Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-300 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">APPLIED ENGINEERING</span>
              <h3 className="text-base font-bold text-slate-950">Polytechnic Institutes</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Embedded microcontroller systems, pneumatic automation, PCB prototyping, and real-time telemetry protocols.
              </p>
            </div>
            <Link
              href="/workshops"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1 pt-2 border-t border-slate-100"
            >
              <span>View Diploma Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-300 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">ADVANCED RESEARCH</span>
              <h3 className="text-base font-bold text-slate-950">Engineering Colleges</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Autonomous drone avionics, differential drive kinematics, ROS robotics simulation, and industry-grade embedded firmware.
              </p>
            </div>
            <Link
              href="/workshops/robotics-and-drones-accelerator"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1 pt-2 border-t border-slate-100"
            >
              <span>Drone Bootcamp RFP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION: 4 Step Process */}
      <section className="bg-white border-y border-slate-200 py-14 px-4 sm:px-6">
        <div className="max-w-container-wide mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-slate-500 uppercase block mb-1">OPERATIONAL WORKFLOW</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Four Steps From Inquiry to Certified Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-slate-300 block mb-2">01</span>
                <h4 className="text-sm font-bold text-slate-950 mb-1">Submit Inquiry</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fill out our online RFP in under 60 seconds with no account or password required.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase mt-4 pt-2 border-t border-slate-200">
                1–2 Day Reply SLA
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-slate-300 block mb-2">02</span>
                <h4 className="text-sm font-bold text-slate-950 mb-1">Plan With Us</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We align dates, hardware manifests, student cohort size, and transparent GST quotations.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase mt-4 pt-2 border-t border-slate-200">
                Custom Bill of Materials
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-slate-300 block mb-2">03</span>
                <h4 className="text-sm font-bold text-slate-950 mb-1">On-Campus Delivery</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unibotics mentors travel to your institute with all development boards, robotics kits, and testing gear.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase mt-4 pt-2 border-t border-slate-200">
                Hands-on Hardware
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-slate-300 block mb-2">04</span>
                <h4 className="text-sm font-bold text-slate-950 mb-1">Verified Credentials</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every passing student receives a tamper-proof cryptographic QR badge verifiable directly via our portal.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase mt-4 pt-2 border-t border-slate-200">
                Instant Verification
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Conversion Strip */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-container-wide mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Ready to Upgrade STEM Infrastructure on Your Campus?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Get in touch with our Kurukshetra technical operations team. We provide complete lab proposals and workshop date availability within 1 to 2 working days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact?need=atl_lab"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors text-center"
            >
              Request Lab Quote
            </Link>
            <Link
              href="/contact?need=workshop"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase border border-slate-700 transition-colors text-center"
            >
              Request Workshop RFP
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
