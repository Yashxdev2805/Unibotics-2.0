import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Printer,
  Wrench,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  FileCheck,
  Building2,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Atal Tinkering Lab Setup Packages (P1–P4) & Commissioning | Unibotics",
  description:
    "Turnkey Atal Tinkering Lab setup under NITI Aayog AIM guidelines. Complete P1 to P4 packages, 3D printers, teacher enablement, and 30-day turnkey campus commissioning.",
};

const PACKAGES = [
  {
    id: "P1",
    title: "Package 1: Electronics, Sensors & Embedded Systems",
    icon: Cpu,
    summary:
      "Core computing boards, sensory acquisition arrays, and breadboard prototyping units compliant with AIM equipment specifications.",
    items: [
      "Microcontroller Units: Arduino Uno R3/R4, ESP32 Wi-Fi/Bluetooth, Raspberry Pi 4 Model B",
      "Sensor Ecosystem: Ultrasonic, PIR Motion, DHT11 Temp/Humidity, MQ-2 Gas, IR Obstacle, Soil Moisture",
      "Actuators & Displays: SG90 Micro Servos, DC Geared Motors, 16x2 I2C LCDs, 0.96 inch OLED Displays",
      "Prototyping Hardware: Full-size Solderless Breadboards, Jumper Wires (M-M, M-F, F-F), Resistor/Capacitor Assortment",
    ],
  },
  {
    id: "P2",
    title: "Package 2: Rapid Prototyping & Digital Fabrication",
    icon: Printer,
    summary:
      "Industrial-grade additive manufacturing units, safety enclosures, filament spools, and precision mechanical assembly tools.",
    items: [
      "Digital Fabrication: Dual-Extruder FDM 3D Printer with auto-bed leveling and enclosed chamber",
      "Materials: Standard PLA, Tough PLA, and PETG filaments (1.75mm, assorted institutional colors)",
      "Soldering Stations: Temperature-controlled soldering stations with brass tip cleaners and fume extractors",
      "Hand Tools: Precision rotary tool set, wire strippers, digital calipers (0.01mm resolution), flush cutters",
    ],
  },
  {
    id: "P3",
    title: "Package 3: Mechanical, Robotics & Aerospace Kits",
    icon: Wrench,
    summary:
      "Modular mechanical building elements, chassis assemblies, multi-rotor quadcopters, and power distribution modules.",
    items: [
      "Robotic Platforms: 4WD Rover Chassis with optical encoders, Tracked tank chassis platform",
      "Aerospace & Drones: DIY Quadcopter Kit with brushless motors, flight controller, telemetry & transmitter",
      "Power Modules: LiPo rechargeable battery packs (2S/3S) with smart balance chargers and fireproof charging bags",
      "Fasteners & Hardware: Metric M2/M3/M4 nylon and brass standoff sets, nuts, bolts, and structural aluminum extrusions",
    ],
  },
  {
    id: "P4",
    title: "Package 4: Medical STEM, Safety & Infrastructure",
    icon: HeartPulse,
    summary:
      "Biomedical measurement sensors, essential workplace safety apparatus, emergency cutoffs, and lab storage enclosures.",
    items: [
      "Medical STEM Sensors: Pulse Oximeter & Heart Rate sensors, Non-contact infrared temperature sensors",
      "Safety Stations: Wall-mounted industrial first-aid station, emergency eyewash unit, Class-ABC dry chemical fire extinguisher",
      "Personal Protection: Protective impact goggles, ESD anti-static wrist straps, heat-resistant soldering mats",
      "Storage & Organization: Heavy-duty metal component bin cabinets with transparent pull-out labeled organizers",
    ],
  },
];

const PHASES = [
  {
    step: "01",
    name: "Site Survey & Room Blueprint",
    timeline: "Days 1 to 4",
    details:
      "On-site electrical load assessment, ventilation check, workbench ergonomic planning (min 1,500 sq.ft recommended space), and power safety grounding audit.",
  },
  {
    step: "02",
    name: "Procurement & Hardware Ingestion",
    timeline: "Days 5 to 14",
    details:
      "Dispatch of standardized P1 to P4 equipment bundles directly from verified manufacturers with batch warranty documentation and serial number registers.",
  },
  {
    step: "03",
    name: "Lab Installation & Calibration",
    timeline: "Days 15 to 20",
    details:
      "Physical assembly of workstations, 3D printer bed leveling and test extrusion, solder station calibration, safety apparatus installation, and component inventory labeling.",
  },
  {
    step: "04",
    name: "Faculty Enablement & Inauguration",
    timeline: "Days 21 to 30",
    details:
      "Intensive 40-hour hands-on training for 2 to 4 designated ATL in-charge teachers. Hands-on delivery of 10 starter tinkering challenges, curriculum guidebook handover, and formal lab inauguration.",
  },
];

export default function AtlSetupPage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      {/* Breadcrumb Strip */}
      <section className="border-b border-[#2F3545] bg-[#161920]/80 py-3 px-4 sm:px-6 text-sm text-[#94A3B8]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-[#F97316]">Atal Tinkering Lab Setup Packages P1 to P4</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-stage mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#212530] border border-[#2F3545] text-xs font-mono font-semibold text-[#F97316]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>ATAL INNOVATION MISSION (AIM) ALIGNED INFRASTRUCTURE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Turnkey Atal Tinkering Lab Setup &amp; Commissioning (P1–P4)
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
              Complete, end-to-end setup and ongoing operational enablement for schools selected under the Atal Innovation Mission grant (Rs. 20 Lakhs over five years). We procure, install, commission, audit, and train your faculty within the mandatory 3-month operational window.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact?need=atl_lab"
                className="btn-primary-cyan px-7 py-3.5 rounded-full text-sm font-bold tracking-wide flex items-center space-x-2 shadow-glow"
              >
                <span>Request Lab Itemized Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#packages"
                className="btn-secondary-dark px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide"
              >
                Inspect Equipment Manifest (P1–P4)
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2F3545] text-sm">
              <div className="p-3 bg-[#161920] border border-[#2F3545] rounded-xl">
                <span className="font-mono text-[#F97316] block text-xs font-bold uppercase">PACKAGE SCOPE</span>
                <span className="font-bold text-white text-sm">P1 through P4</span>
              </div>
              <div className="p-3 bg-[#161920] border border-[#2F3545] rounded-xl">
                <span className="font-mono text-[#F97316] block text-xs font-bold uppercase">DEPLOYMENT</span>
                <span className="font-bold text-white text-sm">15 to 30 Days</span>
              </div>
              <div className="p-3 bg-[#161920] border border-[#2F3545] rounded-xl">
                <span className="font-mono text-[#F97316] block text-xs font-bold uppercase">TEACHER TRAINING</span>
                <span className="font-bold text-white text-sm">40h In-Charge</span>
              </div>
              <div className="p-3 bg-[#161920] border border-[#2F3545] rounded-xl">
                <span className="font-mono text-[#F97316] block text-xs font-bold uppercase">WARRANTY</span>
                <span className="font-bold text-[#10B981] text-sm">2-Year Cover</span>
              </div>
            </div>
          </div>

          {/* Right Architecture Blueprint Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 border border-[#2F3545] glow-line-top shadow-glow">
            <div className="flex items-center justify-between border-b border-[#2F3545] pb-3 mb-5">
              <span className="font-mono text-xs text-[#F97316] uppercase tracking-wider font-bold">
                ATL Operational Blueprint
              </span>
              <span className="text-xs font-mono text-[#10B981] bg-[#212530] border border-[#10B981]/40 px-2.5 py-0.5 rounded-full">
                AIM MANDATE READY
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-[#161920] border border-[#2F3545] rounded-xl space-y-1">
                <span className="font-bold text-white block">Physical Space Requirement</span>
                <p className="text-[#94A3B8] text-xs leading-relaxed">Minimum 1,500 sq. ft. dedicated area equipped with stabilized 230V AC lines, earthing, ventilation, and anti-static workstations.</p>
              </div>

              <div className="p-4 bg-[#161920] border border-[#2F3545] rounded-xl space-y-1">
                <span className="font-bold text-white block">Tinkering Cohort Capacity</span>
                <p className="text-[#94A3B8] text-xs leading-relaxed">Designed to concurrently accommodate 30 to 40 students across 6 to 8 collaborative workbench clusters with tool shadow boards.</p>
              </div>

              <div className="p-4 bg-[#161920] border border-[#2F3545] rounded-xl space-y-1">
                <span className="font-bold text-white block">Yearly Maintenance &amp; AMC</span>
                <p className="text-[#94A3B8] text-xs leading-relaxed">Quarterly mentor visits, replacement support under 2-year warranty, and annual project exhibition mentorship.</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#2F3545] flex items-center justify-between text-xs text-[#94A3B8]">
              <span>AIM Guidelines Compliance</span>
              <span className="font-mono text-[#F97316] font-semibold">Kurukshetra Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Manifest (P1 to P4) */}
      <section id="packages" className="py-14 px-4 sm:px-6 max-w-stage mx-auto w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#F97316] mb-2 font-bold justify-center sm:justify-start">
            <span>OFFICIAL HARDWARE SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Comprehensive Four-Package Inventory (P1 – P4)
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">
            Unibotics equips campuses exclusively with tested, industrial-tolerance components. All equipment includes warranty tracking, calibration certificates, and replacement guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className="glass-panel p-6 sm:p-7 flex flex-col justify-between border border-[#2F3545] hover:border-[#F97316] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#2F3545] pb-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-[#212530] text-[#F97316] border border-[#2F3545] shadow-glow">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-sm font-bold text-[#F97316]">{pkg.id}</span>
                    </div>

                    <span className="text-xs font-mono text-[#10B981] bg-[#212530] border border-[#10B981]/40 px-2.5 py-0.5 rounded-full font-bold">
                      AIM STANDARD
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{pkg.title}</h3>
                  <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">{pkg.summary}</p>

                  <div className="bg-[#161920] border border-[#2F3545] p-4 mb-4 rounded-xl">
                    <span className="text-xs font-mono uppercase text-[#F97316] block mb-2.5 font-bold">
                      Included Hardware Manifest:
                    </span>
                    <ul className="space-y-2 text-sm text-[#CBD5E1]">
                      {pkg.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2F3545] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Factory Sealed &amp; Tested</span>
                  <span className="font-bold text-[#F97316]">24 Months Direct Warranty</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Phase Implementation Timeline */}
      <section className="bg-[#161920]/80 border-y border-[#2F3545] py-16 px-4 sm:px-6">
        <div className="max-w-stage mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <span className="font-mono text-xs text-[#F97316] block mb-1 font-bold">OPERATIONAL ROADMAP</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Standard 30-Day Turnkey Deployment Process
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-2xl">
              From initial site audit to ribbon cutting, our standardized four-phase protocol guarantees your institution meets all regulatory auditing milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHASES.map((phase) => (
              <div
                key={phase.step}
                className="glass-panel p-6 flex flex-col justify-between border border-[#2F3545]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-[#F97316]">{phase.step}</span>
                    <span className="inline-flex items-center text-xs font-mono text-[#38BDF8] bg-[#212530] border border-[#2F3545] px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#F97316]" />
                      {phase.timeline}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{phase.name}</h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{phase.details}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#2F3545] text-xs font-mono text-[#F97316] uppercase font-bold">
                  Phase Milestone Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey vs Self-Managed Matrix */}
      <section className="py-14 px-4 sm:px-6 max-w-stage mx-auto w-full">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#F97316] block mb-1 font-bold">COMPARATIVE AUDIT</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Why Institutes Choose Turnkey Delivery Over Fragmented Vendors
          </h2>
        </div>

        <div className="overflow-x-auto glass-panel border border-[#2F3545]">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#212530] text-white font-mono text-xs uppercase tracking-wider">
                <th className="p-4 border-r border-[#2F3545]">Operational Factor</th>
                <th className="p-4 border-r border-[#2F3545] text-[#F97316]">Unibotics Turnkey Implementation</th>
                <th className="p-4 text-[#64748B]">Independent Fragmented Procurement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2F3545] text-[#94A3B8]">
              <tr>
                <td className="p-4 font-bold text-white bg-[#161920] border-r border-[#2F3545]">
                  Vendor Accountability
                </td>
                <td className="p-4 border-r border-[#2F3545] text-[#F8FAFC] font-medium">
                  Single operational partner for P1-P4 hardware, 3D printers, teacher training, and warranty maintenance.
                </td>
                <td className="p-4 text-[#64748B]">
                  12+ different suppliers with conflicting delivery schedules and separate warranties.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white bg-[#161920] border-r border-[#2F3545]">
                  Teacher Enablement
                </td>
                <td className="p-4 border-r border-[#2F3545] text-[#F8FAFC] font-medium">
                  40 hours structured on-site training + curriculum guidebooks + project schematics.
                </td>
                <td className="p-4 text-[#64748B]">
                  Zero training or superficial 2-hour software demonstration leaving equipment unused.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white bg-[#161920] border-r border-[#2F3545]">
                  Compliance &amp; Grant Audit
                </td>
                <td className="p-4 border-r border-[#2F3545] text-[#F8FAFC] font-medium">
                  Complete documentation, serial registers, and AIM compliance reports prepared for submission.
                </td>
                <td className="p-4 text-[#64748B]">
                  Institute administrators must manually compile fragmented bills and risk audit delays.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white bg-[#161920] border-r border-[#2F3545]">
                  Continuous Project Support
                </td>
                <td className="p-4 border-r border-[#2F3545] text-[#F8FAFC] font-medium">
                  Dedicated regional technical mentor on call for school innovation competitions and hackathons.
                </td>
                <td className="p-4 text-[#64748B]">
                  Vendors disappear post-delivery; hardware sits idle in storage cabinets.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="bg-[#0F1115] py-14 px-4 sm:px-6 border-t border-[#2F3545]">
        <div className="max-w-stage mx-auto glass-panel p-8 sm:p-12 border-[#2F3545] glow-line-top flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white">
              Ready to Establish an Atal Tinkering Lab on Your Campus?
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Our operations team responds within 1 to 2 working days with a detailed room plan, hardware bill of materials, and transparent institutional pricing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact?need=atl_lab"
              className="btn-primary-cyan px-7 py-3.5 rounded-full text-sm font-bold text-center shadow-glow"
            >
              Request Lab Implementation RFP
            </Link>
            <Link
              href="/workshops"
              className="btn-secondary-dark px-7 py-3.5 rounded-full text-sm font-semibold text-center"
            >
              Explore Short Workshops
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
