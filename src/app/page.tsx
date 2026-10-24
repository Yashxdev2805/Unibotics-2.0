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
  Sparkles,
  Award,
  Layers,
  FileCheck,
} from "lucide-react";
import DashboardPreview from "@/components/home/DashboardPreview";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F7F7F8]">
      
      {/* 1. Hero Section on the Atmosphere Layer (Section 1A, 12) */}
      <section className="relative pt-12 md:pt-20 pb-6 px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Capability Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#17132A]/80 border border-[#2A2342] text-xs font-mono font-medium text-[#C9A3FF] mb-6 shadow-glow">
          <ShieldCheck className="w-4 h-4 text-[#45B558]" />
          <span>NATIONAL ATAL TINKERING LAB IMPLEMENTATION PARTNER</span>
        </div>

        {/* Centred Oversized Headline with Brand Gradient (Section 1A, 3) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6">
          Build a campus where students{" "}
          <span className="brand-gradient-text">create</span>, not just study.
        </h1>

        {/* Centred One-Sentence Lede */}
        <p className="text-base sm:text-lg md:text-xl text-[#8B8988] max-w-2xl mx-auto mb-8 leading-relaxed">
          One operational partner for Atal Tinkering Lab setup, NSDC-aligned vocational training, and intensive multi-day STEM workshops for schools and colleges across India.
        </p>

        {/* Centred Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/contact"
            className="btn-primary-violet px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center space-x-2 shadow-glow"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/workshops"
            className="btn-secondary-dark px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center space-x-2"
          >
            <span>Explore Workshops</span>
          </Link>
        </div>

        {/* Quick Capabilities Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full text-center px-4 mb-4">
          <div className="p-3 rounded-xl bg-[#0D0B14]/70 border border-[#2A2342]">
            <span className="font-mono text-[#7468A0] block text-[10px] uppercase">
              Turnkey Infrastructure
            </span>
            <span className="font-bold text-[#F7F7F8] text-sm">
              P1 – P4 Lab Packages
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#0D0B14]/70 border border-[#2A2342]">
            <span className="font-mono text-[#7468A0] block text-[10px] uppercase">
              Campus Delivery
            </span>
            <span className="font-bold text-[#F7F7F8] text-sm">
              2 / 5 / 7 Days Bootcamps
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#0D0B14]/70 border border-[#2A2342]">
            <span className="font-mono text-[#7468A0] block text-[10px] uppercase">
              Verifiable Credentials
            </span>
            <span className="font-bold text-[#F7F7F8] text-sm">
              Tamper-Proof QR Badges
            </span>
          </div>
        </div>

        {/* 2. Dashboard Preview Rising from the Bottom (Section 1A, 12) */}
        <DashboardPreview />
      </section>

      {/* 3. Three Pillars Section (Section 12: ATL setup, workshops, teacher training) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative border-t border-[#2A2342] bg-[#000000]">
        <div className="max-w-stage mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C9A3FF]">
              Institutional Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F7F7F8]">
              Three Pillars of Campus Innovation
            </h2>
            <p className="text-sm text-[#8B8988]">
              Fully compliant with NITI Aayog Atal Innovation Mission guidelines and NEP 2020 experiential learning mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Turnkey ATL Setup */}
            <div className="glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#17132A] border border-[#2A2342] flex items-center justify-center text-[#C9A3FF] shadow-glow">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F7F7F8]">
                  Turnkey Atal Tinkering Labs
                </h3>
                <p className="text-xs text-[#8B8988] leading-relaxed">
                  End-to-end P1 to P4 equipment packages, 3D printers, IoT workstations, power tools, safety gear, and complete lab design commissioned on your campus.
                </p>
                <ul className="space-y-2 text-xs text-[#8B8988] pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0" />
                    <span>NITI Aayog / AIM equipment compliance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0" />
                    <span>Safety audits and ergonomic workstations</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C9A3FF] hover:text-white transition-colors"
              >
                <span>Lab Packages & Equipment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: STEM Bootcamps */}
            <div className="glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#17132A] border border-[#2A2342] flex items-center justify-center text-[#C9A3FF] shadow-glow">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F7F7F8]">
                  Campus STEM Bootcamps
                </h3>
                <p className="text-xs text-[#8B8988] leading-relaxed">
                  Intensive hands-on robotics, drone engineering, sensor circuits, and AI microcontrollers delivered directly inside your classrooms by field mentors.
                </p>
                <ul className="space-y-2 text-xs text-[#8B8988] pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0" />
                    <span>2, 5, and 7-day standardized formats</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0" />
                    <span>Physical hardware kits provided per student team</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/workshops"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C9A3FF] hover:text-white transition-colors"
              >
                <span>Browse Workshop Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: Faculty Enablement */}
            <div className="glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#17132A] border border-[#2A2342] flex items-center justify-center text-[#C9A3FF] shadow-glow">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F7F7F8]">
                  Faculty Enablement
                </h3>
                <p className="text-xs text-[#8B8988] leading-relaxed">
                  Train your school or college educators to independently operate lab equipment, mentor innovation competitions, and teach project-based curriculum.
                </p>
                <ul className="space-y-2 text-xs text-[#8B8988] pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0" />
                    <span>Curriculum guides and project blueprints</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45B558] shrink-0" />
                    <span>Ongoing mentor technical support hotline</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C9A3FF] hover:text-white transition-colors"
              >
                <span>Faculty Training Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Proof & Credibility Section (Section 12: Real photos, verified numbers) */}
      <section className="py-16 px-4 sm:px-6 bg-[#0D0B14]/60 border-t border-[#2A2342]">
        <div className="max-w-stage mx-auto space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C9A3FF]">
                Institutional Trust
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F7F7F8] tracking-tight">
                Engineering Credibility Grounded in Results
              </h2>
              <p className="text-xs sm:text-sm text-[#8B8988] leading-relaxed">
                Operating out of Kurukshetra, Haryana, Unibotics partners with schools, ITIs, polytechnics, and engineering faculties to transition theoretical science into working prototypes.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-lg bg-[#17132A] border border-[#2A2342] flex items-center space-x-3">
                  <Award className="w-5 h-5 text-[#45B558] shrink-0" />
                  <span className="text-xs text-[#F7F7F8]">
                    100% Verifiable Credentials with Instant Online Authenticity Verification
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#17132A] border border-[#2A2342] flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-[#C9A3FF] shrink-0" />
                  <span className="text-xs text-[#F7F7F8]">
                    Serving Institutional Campuses across Haryana, Punjab, Himachal & NCR
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  100%
                </span>
                <span className="text-[11px] font-mono text-[#7468A0] uppercase block">
                  Hardware-In-Hand
                </span>
                <span className="text-[11px] text-[#8B8988] block">
                  No pure theory slides
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  P1 – P4
                </span>
                <span className="text-[11px] font-mono text-[#7468A0] uppercase block">
                  Lab Standards
                </span>
                <span className="text-[11px] text-[#8B8988] block">
                  NITI Aayog compliance
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] text-center space-y-1 col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  &lt; 24h
                </span>
                <span className="text-[11px] font-mono text-[#7468A0] uppercase block">
                  Institutional SLA
                </span>
                <span className="text-[11px] text-[#8B8988] block">
                  Official proposal turnaround
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Workshop Teaser (Section 12: 2, 5, 7 day programs as 3 cards) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#000000] border-t border-[#2A2342]">
        <div className="max-w-stage mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C9A3FF]">
                Structured Curriculums
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F7F7F8]">
                Standardized On-Campus Formats
              </h2>
            </div>
            <Link
              href="/workshops"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C9A3FF] hover:underline"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 2-Day */}
            <div className="glass-panel p-6 space-y-4 border border-[#2A2342] relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded font-mono bg-[#17132A] text-[#C9A3FF] border border-[#2A2342]">
                    2 Days (12 Hours)
                  </span>
                  <span className="text-[11px] text-[#7468A0]">High Schools & ITIs</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Foundational Robotics & Sensor Integration
                </h3>
                <p className="text-xs text-[#8B8988] leading-relaxed">
                  Basic microcontroller logic, circuit breadboarding, digital and analog sensor reading, motor drivers, and obstacle-avoidance rovers.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2342] flex items-center justify-between">
                <span className="text-[11px] text-[#8B8988]">Kit included for lab</span>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#C9A3FF] hover:text-white"
                >
                  Request Dates →
                </Link>
              </div>
            </div>

            {/* 5-Day */}
            <div className="glass-panel p-6 space-y-4 border border-[#A020FF]/50 shadow-glow relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded font-mono bg-[#17132A] text-[#A020FF] border border-[#A020FF]/40 font-bold">
                    5 Days (30 Hours)
                  </span>
                  <span className="text-[11px] text-[#C9A3FF]">Most Popular</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Applied IoT & Connected Robotics Bootcamp
                </h3>
                <p className="text-xs text-[#8B8988] leading-relaxed">
                  ESP32 Wi-Fi telemetry, cloud telemetry dashboards, line-following algorithms, edge actuator control, and team project sprint.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2342] flex items-center justify-between">
                <span className="text-[11px] text-[#8B8988]">Verifiable Credential</span>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#A020FF] hover:text-white"
                >
                  Request Dates →
                </Link>
              </div>
            </div>

            {/* 7-Day */}
            <div className="glass-panel p-6 space-y-4 border border-[#2A2342] relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded font-mono bg-[#17132A] text-[#C9A3FF] border border-[#2A2342]">
                    7 Days (45 Hours)
                  </span>
                  <span className="text-[11px] text-[#7468A0]">Polytechnics & Colleges</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Advanced Autonomous Systems & Drone Engineering
                </h3>
                <p className="text-xs text-[#8B8988] leading-relaxed">
                  Aerodynamics, flight controllers, ESC calibration, computer vision obstacle detection, and final competitive field fly-off.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2342] flex items-center justify-between">
                <span className="text-[11px] text-[#8B8988]">Advanced Certification</span>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#C9A3FF] hover:text-white"
                >
                  Request Dates →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. How it works (Section 12: Enquiry, Booking, Delivery, Certificate) */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#0D0B14]/40 border-t border-[#2A2342]">
        <div className="max-w-stage mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C9A3FF]">
              Operational Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F7F7F8]">
              Four Steps from Consultation to Deployment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#17132A] text-[#C9A3FF] flex items-center justify-center font-mono font-bold text-xs border border-[#2A2342]">
                01
              </div>
              <h3 className="text-sm font-bold text-white">Institutional Enquiry</h3>
              <p className="text-xs text-[#8B8988] leading-relaxed">
                Submit campus student strength, facility requirements, and target timeline via our online briefing form.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#17132A] text-[#C9A3FF] flex items-center justify-center font-mono font-bold text-xs border border-[#2A2342]">
                02
              </div>
              <h3 className="text-sm font-bold text-white">Scoping & Itemized Quote</h3>
              <p className="text-xs text-[#8B8988] leading-relaxed">
                Receive an official institutional proposal specifying hardware inventory, mentor allocations, and schedules.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#17132A] text-[#C9A3FF] flex items-center justify-center font-mono font-bold text-xs border border-[#2A2342]">
                03
              </div>
              <h3 className="text-sm font-bold text-white">On-Campus Delivery</h3>
              <p className="text-xs text-[#8B8988] leading-relaxed">
                Unibotics field engineers arrive with equipment to commission lab benches or lead the intensive workshop.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0D0B14] border border-[#2A2342] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#17132A] text-[#C9A3FF] flex items-center justify-center font-mono font-bold text-xs border border-[#2A2342]">
                04
              </div>
              <h3 className="text-sm font-bold text-white">Verifiable Credentials</h3>
              <p className="text-xs text-[#8B8988] leading-relaxed">
                Eligible students and faculty receive cryptographically verifiable certificates with instant QR validation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Final Call to Action (Section 12) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative border-t border-[#2A2342] bg-black">
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 text-center space-y-6 glow-line-top border-[#2A2342]">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C9A3FF]">
            Commence Your Campus Transformation
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready to establish modern robotics infrastructure on your campus?
          </h2>
          <p className="text-xs sm:text-sm text-[#8B8988] max-w-xl mx-auto leading-relaxed">
            Speak directly with our technical deployment team in Kurukshetra. We provide complete ATL setup proposals and tailored workshop schedules within 24 hours.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary-violet px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center space-x-2"
            >
              <span>Get in touch with an Engineer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/verify"
              className="btn-secondary-dark px-6 py-3 rounded-full text-xs sm:text-sm font-semibold"
            >
              <span>Verify Existing Certificate</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
