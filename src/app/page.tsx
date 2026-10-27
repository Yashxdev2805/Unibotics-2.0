import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Cpu,
  GraduationCap,
  Building2,
  Award,
  MessageSquare,
} from "lucide-react";
import DeferredDashboard from "@/components/home/DeferredDashboard";
import LazySection from "@/components/common/LazySection";

export const metadata = {
  title: "Atal Tinkering Lab Setup & STEM Workshops | Unibotics",
  description:
    "ATL lab setup support, teacher training and 2, 5 or 7-day robotics workshops for schools, ITIs and colleges in Haryana and across India.",
};

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      
      {/* 1. Critical Above-the-Fold Hero Section (Instant Render) */}
      <section className="relative pt-12 md:pt-20 pb-8 px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Official Brand Emblem - Eager High Priority */}
        <div className="flex flex-col items-center justify-center mb-5 group">
          <Image
            src="/unibotics-logo.png"
            alt="Unibotics Official Logo"
            width={96}
            height={96}
            priority
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_24px_rgba(249,115,22,0.55)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Capability Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#212530]/90 border border-[#2F3545] text-xs font-mono font-medium text-[#F97316] mb-6 shadow-glow">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>ATAL TINKERING LABS &amp; ROBOTICS INFRASTRUCTURE</span>
        </div>

        {/* H1 Headline with High Keyword Value (SEO Audit Section 9) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto mb-4 text-[#F8FAFC]">
          Atal Tinkering Labs and Robotics Workshops for{" "}
          <span className="robotics-gradient-text">Schools, ITIs and Colleges</span>
        </h1>

        {/* Tagline under H1 */}
        <p className="text-xl sm:text-2xl font-bold text-[#F97316] mb-5 tracking-tight">
          Build a campus where students create, not just study.
        </p>

        {/* Opening paragraph (SEO Audit Section 9) */}
        <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-8 leading-relaxed">
          Schools with an AIM grant must get their Atal Tinkering Lab running within three months.
          Unibotics, based in Kurukshetra, plans your lab layout, trains your ATL in-charge and runs
          hands-on robotics workshops on your campus.
        </p>

        {/* Centred Call to Actions with Instant Contact */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/contact"
            className="btn-primary-cyan px-7 py-3.5 rounded-full text-sm font-bold tracking-wide flex items-center space-x-2 shadow-glow"
          >
            <span>Request Institutional Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/919812345678?text=Hello%20Unibotics%20Team%2C%20we%20want%20to%20inquire%20about%20ATL%20Lab%20Setup%20%2F%20Robotics%20Workshops"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hazard-orange px-6 py-3.5 rounded-full text-sm font-bold tracking-wide flex items-center space-x-2 shadow-glow-orange"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Instant WhatsApp Desk</span>
          </a>
          <Link
            href="/workshops"
            className="btn-secondary-dark px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center space-x-2"
          >
            <span>Explore Workshops</span>
          </Link>
        </div>

        {/* Quick Capabilities Strip (Audit Section 5.4: min 14px text) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full text-center px-4 mb-6">
          <div className="p-4 rounded-xl bg-[#161920]/80 border border-[#2F3545]">
            <span className="font-mono text-[#F97316] block text-xs uppercase font-bold tracking-wider mb-1">
              Turnkey Infrastructure
            </span>
            <span className="font-bold text-[#F8FAFC] text-sm sm:text-base">
              P1 – P4 Lab Packages
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#161920]/80 border border-[#2F3545]">
            <span className="font-mono text-[#F97316] block text-xs uppercase font-bold tracking-wider mb-1">
              On-Campus Delivery
            </span>
            <span className="font-bold text-[#F8FAFC] text-sm sm:text-base">
              2 / 5 / 7 Days Bootcamps
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#161920]/80 border border-[#2F3545]">
            <span className="font-mono text-[#F97316] block text-xs uppercase font-bold tracking-wider mb-1">
              Verifiable Credentials
            </span>
            <span className="font-bold text-[#F8FAFC] text-sm sm:text-base">
              Tamper-Proof QR Badges
            </span>
          </div>
        </div>

        {/* 2. Deferred Dashboard Console Preview (Renders progressively with CLS skeleton) */}
        <DeferredDashboard />
      </section>

      {/* 3. Three Pillars Section (Progressive Lazy Load) */}
      <LazySection minHeight="520px" rootMargin="300px 0px">
        <section className="py-16 md:py-24 px-4 sm:px-6 relative border-t border-[#2F3545] bg-[#0F1115]">
          <div className="max-w-stage mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#F97316]">
                Institutional Offerings
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F8FAFC]">
                Three Pillars of Campus Innovation
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Built around AIM equipment lists and NEP 2020 experiential learning mandates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1: Turnkey ATL Setup */}
              <div className="glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#212530] border border-[#2F3545] flex items-center justify-center text-[#F97316] shadow-glow">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    Turnkey Atal Tinkering Labs
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    End-to-end P1 to P4 equipment packages, 3D printers, IoT workstations, power tools, safety gear, and complete lab design commissioned on your campus.
                  </p>
                  <ul className="space-y-2 text-sm text-[#CBD5E1] pt-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>AIM equipment compliance &amp; procurement support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Safety audits, ventilation and ergonomic benches</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/atl-setup"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#F97316] hover:text-white transition-colors pt-2"
                >
                  <span>Atal Tinkering Lab setup packages P1 to P4</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Pillar 2: STEM Bootcamps */}
              <div className="glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#212530] border border-[#2F3545] flex items-center justify-center text-[#F97316] shadow-glow">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    Campus STEM Bootcamps
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Intensive hands-on robotics, drone engineering, sensor circuits, and AI microcontrollers delivered directly inside your classrooms by field mentors.
                  </p>
                  <ul className="space-y-2 text-sm text-[#CBD5E1] pt-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>2, 5, and 7-day standardized formats</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Physical hardware kits provided per student team</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/workshops"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#F97316] hover:text-white transition-colors pt-2"
                >
                  <span>Browse Workshop Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Pillar 3: Faculty Enablement */}
              <div className="glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#212530] border border-[#2F3545] flex items-center justify-center text-[#F97316] shadow-glow">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    Faculty Enablement
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Train your school or college educators to independently operate lab equipment, mentor innovation competitions, and teach project-based curriculum.
                  </p>
                  <ul className="space-y-2 text-sm text-[#CBD5E1] pt-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Curriculum guides and project blueprints</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Ongoing mentor technical support hotline</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#F97316] hover:text-white transition-colors pt-2"
                >
                  <span>Faculty Training Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. Proof & Credibility Section (Progressive Lazy Load) */}
      <LazySection minHeight="420px" rootMargin="300px 0px">
        <section className="py-16 px-4 sm:px-6 bg-[#161920]/70 border-t border-[#2F3545]">
          <div className="max-w-stage mx-auto space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#F97316]">
                  Institutional Trust
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight">
                  Engineering Credibility Grounded in Results
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Operating out of Kurukshetra, Haryana, Unibotics partners with schools, ITIs, polytechnics, and engineering faculties to transition theoretical science into working prototypes.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-[#212530] border border-[#2F3545] flex items-center space-x-3">
                    <Award className="w-5 h-5 text-[#10B981] shrink-0" />
                    <span className="text-sm text-[#F8FAFC]">
                      100% Verifiable Credentials with Instant Online Authenticity Verification
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#212530] border border-[#2F3545] flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-[#F97316] shrink-0" />
                    <span className="text-sm text-[#F8FAFC]">
                      Serving Institutional Campuses across Haryana, Punjab, Himachal &amp; NCR
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] text-center space-y-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white block">
                    100%
                  </span>
                  <span className="text-xs font-mono text-[#F97316] uppercase block font-bold">
                    Hardware-In-Hand
                  </span>
                  <span className="text-xs text-[#94A3B8] block">
                    Zero theory-only slides
                  </span>
                </div>

                <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] text-center space-y-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white block">
                    P1 – P4
                  </span>
                  <span className="text-xs font-mono text-[#F97316] uppercase block font-bold">
                    Lab Standards
                  </span>
                  <span className="text-xs text-[#94A3B8] block">
                    AIM guideline alignment
                  </span>
                </div>

                <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] text-center space-y-1.5 col-span-2 sm:col-span-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF6B35] block">
                    1–2 Days
                  </span>
                  <span className="text-xs font-mono text-[#FF6B35] uppercase block font-bold">
                    Proposal Turnaround
                  </span>
                  <span className="text-xs text-[#94A3B8] block">
                    Itemized institutional quote
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>
      </LazySection>

      {/* 5. Workshop Teaser (Progressive Lazy Load) */}
      <LazySection minHeight="540px" rootMargin="300px 0px">
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#0F1115] border-t border-[#2F3545]">
          <div className="max-w-stage mx-auto space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#F97316]">
                  Structured Curriculums
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F8FAFC]">
                  Standardized On-Campus Formats
                </h2>
              </div>
              <Link
                href="/workshops"
                className="inline-flex items-center space-x-1.5 text-sm font-bold text-[#F97316] hover:underline"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 2-Day: Industrial IoT & Embedded Systems */}
              <div className="glass-panel p-6 sm:p-7 space-y-4 border border-[#2F3545] relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded font-mono bg-[#212530] text-[#F97316] border border-[#2F3545] font-bold">
                      2 Days (12 Hours)
                    </span>
                    <span className="text-xs text-[#94A3B8]">High Schools &amp; ITIs</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Industrial IoT &amp; Embedded Systems
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    ESP32 microcontroller architecture, sensor calibration, MQTT telemetry protocols, and live web dashboard monitoring.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2F3545] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Hardware Kit Included</span>
                  <Link
                    href="/workshops/industrial-iot-embedded-systems/book"
                    className="text-sm font-bold text-[#F97316] hover:text-white flex items-center space-x-1"
                  >
                    <span>Request Dates →</span>
                  </Link>
                </div>
              </div>

              {/* 5-Day: Robotics & Autonomous Drones Bootcamp */}
              <div className="glass-panel p-6 sm:p-7 space-y-4 border border-[#F97316]/60 shadow-glow relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded font-mono bg-[#212530] text-[#F97316] border border-[#F97316]/40 font-bold">
                      5 Days (30 Hours)
                    </span>
                    <span className="text-xs text-[#FF6B35] font-semibold">Flagship Bootcamp</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Robotics &amp; Autonomous Drones Bootcamp
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Differential rover drive, motor encoders, quadcopter avionics assembly, PID flight tuning, and field fly-off challenges.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2F3545] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Verifiable Credential</span>
                  <Link
                    href="/workshops/robotics-and-drones-accelerator/book"
                    className="text-sm font-bold text-[#F97316] hover:text-white flex items-center space-x-1"
                  >
                    <span>Request Dates →</span>
                  </Link>
                </div>
              </div>

              {/* 7-Day: ATL Innovation & Tinkering Masterclass */}
              <div className="glass-panel p-6 sm:p-7 space-y-4 border border-[#2F3545] relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded font-mono bg-[#212530] text-[#F97316] border border-[#2F3545] font-bold">
                      7 Days (45 Hours)
                    </span>
                    <span className="text-xs text-[#94A3B8]">Polytechnics &amp; Colleges</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    ATL Innovation &amp; Tinkering Masterclass
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Design thinking, 3D CAD modeling, additive 3D printing operations, Arduino sensor networks, and rapid capstone showcase.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2F3545] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Institutional Showcase</span>
                  <Link
                    href="/workshops/atal-tinkering-mastery/book"
                    className="text-sm font-bold text-[#F97316] hover:text-white flex items-center space-x-1"
                  >
                    <span>Request Dates →</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>
      </LazySection>

      {/* 6. How It Works (Progressive Lazy Load) */}
      <LazySection minHeight="460px" rootMargin="300px 0px">
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#161920]/50 border-t border-[#2F3545]">
          <div className="max-w-stage mx-auto space-y-10">
            
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#F97316]">
                Operational Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F8FAFC]">
                Four Steps from Consultation to Deployment
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#212530] text-[#F97316] flex items-center justify-center font-mono font-bold text-sm border border-[#2F3545]">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Institutional Enquiry</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Submit campus student strength, facility requirements, and target timeline via our online briefing form.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#212530] text-[#F97316] flex items-center justify-center font-mono font-bold text-sm border border-[#2F3545]">
                  02
                </div>
                <h3 className="text-base font-bold text-white">Scoping &amp; Itemized Quote</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Receive an official institutional proposal specifying hardware inventory, mentor allocations, and schedules.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#212530] text-[#F97316] flex items-center justify-center font-mono font-bold text-sm border border-[#2F3545]">
                  03
                </div>
                <h3 className="text-base font-bold text-white">On-Campus Delivery</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Unibotics field engineers arrive with equipment to commission lab benches or lead the intensive workshop.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#161920] border border-[#2F3545] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#212530] text-[#F97316] flex items-center justify-center font-mono font-bold text-sm border border-[#2F3545]">
                  04
                </div>
                <h3 className="text-base font-bold text-white">Verifiable Credentials</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Students and educators receive cryptographically verifiable certificates with permanent online authenticity validation.
                </p>
              </div>

            </div>

            <div className="text-center pt-4">
              <Link
                href="/contact"
                className="btn-primary-cyan inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-sm font-bold shadow-glow"
              >
                <span>Schedule a Campus Assessment Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>
      </LazySection>

    </div>
  );
}
