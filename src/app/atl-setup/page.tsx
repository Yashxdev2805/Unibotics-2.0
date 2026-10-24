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
} from "lucide-react";

export const metadata = {
  title: "Turnkey Atal Tinkering Lab (ATL) Setup | Unibotics India",
  description:
    "Complete end-to-end Atal Tinkering Lab implementation under NITI Aayog guidelines. Packages P1 through P4, teacher training, 3D printers, and robotics inventory.",
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
      "Digital Fabrication: Dual-Extruder FDM 3D Printer with auto-bed leveling and enclosure",
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
    <div className="flex-1 flex flex-col relative text-[#F7F7F8]">
      {/* Breadcrumb & Sub-Strip */}
      <section className="border-b border-[#2A2342] bg-[#0D0B14]/60 py-3 px-4 sm:px-6 text-xs text-[#8B8988]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2A2342]">/</span>
          <span className="font-semibold text-white">Atal Tinkering Lab Setup</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-stage mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#17132A] border border-[#2A2342] text-xs font-mono font-semibold text-[#C9A3FF]">
              <ShieldCheck className="w-4 h-4 text-[#45B558]" />
              <span>NITI AAYOG / ATAL INNOVATION MISSION (AIM) ALIGNED</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Turnkey Atal Tinkering Lab Implementation
            </h1>

            <p className="text-base text-[#8B8988] leading-relaxed max-w-2xl">
              Complete, end-to-end setup and ongoing operational enablement for schools selected under the Atal Innovation Mission. We handle hardware procurement, room acoustics, 3D printers, safety infrastructure, and structured teacher training.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?need=atl_lab"
                className="btn-primary-violet px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 shadow-glow"
              >
                <span>Request Lab RFP & Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#packages"
                className="btn-secondary-dark px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
              >
                Inspect Equipment Manifest
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2A2342] text-xs">
              <div>
                <span className="font-mono text-[#7468A0] block text-[10px]">PACKAGE SCOPE</span>
                <span className="font-bold text-white">P1 through P4</span>
              </div>
              <div>
                <span className="font-mono text-[#7468A0] block text-[10px]">DEPLOYMENT</span>
                <span className="font-bold text-white">15 to 30 Days</span>
              </div>
              <div>
                <span className="font-mono text-[#7468A0] block text-[10px]">FACULTY TRAINING</span>
                <span className="font-bold text-white">40 Hours Hands-on</span>
              </div>
              <div>
                <span className="font-mono text-[#7468A0] block text-[10px]">CURRICULUM</span>
                <span className="font-bold text-white">NEP 2020 Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Architecture Blueprint Card */}
          <div className="lg:col-span-5 glass-panel p-6 border border-[#2A2342] glow-line-top shadow-glow">
            <div className="flex items-center justify-between border-b border-[#2A2342] pb-3 mb-4">
              <span className="font-mono text-xs text-[#C9A3FF] uppercase tracking-wider font-semibold">
                ATL Operational Blueprint
              </span>
              <span className="text-[11px] font-mono text-[#45B558] bg-[#17132A] border border-[#45B558]/30 px-2 py-0.5 rounded-full">
                VERIFIED STANDARD
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#0D0B14] border border-[#2A2342] rounded-xl">
                <span className="font-semibold text-white block mb-0.5">Physical Space Requirement</span>
                <p className="text-[#8B8988] text-[11px]">Minimum 1,500 sq. ft. dedicated area equipped with stabilized 230V AC lines, earthing, and anti-static workstations.</p>
              </div>

              <div className="p-3 bg-[#0D0B14] border border-[#2A2342] rounded-xl">
                <span className="font-semibold text-white block mb-0.5">Tinkering Cohort Capacity</span>
                <p className="text-[#8B8988] text-[11px]">Designed to concurrently accommodate 30 to 40 students across 6 to 8 collaborative workbench clusters.</p>
              </div>

              <div className="p-3 bg-[#0D0B14] border border-[#2A2342] rounded-xl">
                <span className="font-semibold text-white block mb-0.5">Yearly Maintenance & Support</span>
                <p className="text-[#8B8988] text-[11px]">Quarterly mentor visits, hardware component replacements under warranty, and annual project exhibition mentorship.</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2A2342] flex items-center justify-between text-[11px] text-[#7468A0]">
              <span>Official Reference: AIM Guidelines v3.0</span>
              <span className="font-mono text-[#C9A3FF]">Kurukshetra Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Manifest (P1 to P4) */}
      <section id="packages" className="py-14 px-4 sm:px-6 max-w-stage mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#C9A3FF] mb-1">
            <span>OFFICIAL HARDWARE SPECIFICATION</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Comprehensive Four-Package Inventory (P1 – P4)
          </h2>
          <p className="text-xs text-[#8B8988] mt-1 max-w-2xl">
            Unibotics supplies exclusively branded, industrial-tolerance components. No unbranded gray-market parts or volatile non-safety-rated batteries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className="glass-panel p-6 flex flex-col justify-between border border-[#2A2342] hover:border-[#7468A0] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#2A2342] pb-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-[#17132A] text-[#C9A3FF] border border-[#2A2342]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#C9A3FF]">{pkg.id}</span>
                    </div>

                    <span className="text-[11px] font-mono text-[#45B558] bg-[#17132A] border border-[#45B558]/30 px-2 py-0.5 rounded-full">
                      AIM STANDARD
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{pkg.title}</h3>
                  <p className="text-xs text-[#8B8988] mb-4 leading-relaxed">{pkg.summary}</p>

                  <div className="bg-[#0D0B14] border border-[#2A2342] p-3 mb-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase text-[#7468A0] block mb-2 font-semibold">
                      Included Hardware Manifest:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#8B8988]">
                      {pkg.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#45B558] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2A2342] flex items-center justify-between text-[11px] text-[#7468A0]">
                  <span>Factory Sealed & Tested</span>
                  <span className="font-semibold text-[#C9A3FF]">12 Months Direct Warranty</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Phase Implementation Timeline */}
      <section className="bg-[#0D0B14]/70 border-y border-[#2A2342] py-14 px-4 sm:px-6">
        <div className="max-w-stage mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-[#C9A3FF] block mb-1">OPERATIONAL ROADMAP</span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Standard 30-Day Turnkey Deployment Process
            </h2>
            <p className="text-xs text-[#8B8988] mt-1 max-w-2xl">
              From site survey to ribbon cutting, our standardized four-phase protocol guarantees your institution meets all regulatory auditing milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHASES.map((phase) => (
              <div
                key={phase.step}
                className="glass-panel p-5 flex flex-col justify-between border border-[#2A2342]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-[#A020FF]">{phase.step}</span>
                    <span className="inline-flex items-center text-[10px] font-mono text-[#C9A3FF] bg-[#17132A] border border-[#2A2342] px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 mr-1 text-[#C9A3FF]" />
                      {phase.timeline}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{phase.name}</h4>
                  <p className="text-xs text-[#8B8988] leading-relaxed">{phase.details}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#2A2342] text-[10px] font-mono text-[#7468A0] uppercase">
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
          <span className="font-mono text-xs text-[#C9A3FF] block mb-1">COMPARATIVE AUDIT</span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Why Institutes Choose Turnkey Delivery Over Fragmented Vendors
          </h2>
        </div>

        <div className="overflow-x-auto glass-panel border border-[#2A2342]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#17132A] text-white font-mono text-[11px] uppercase tracking-wider">
                <th className="p-3.5 border-r border-[#2A2342]">Operational Factor</th>
                <th className="p-3.5 border-r border-[#2A2342] text-[#C9A3FF]">Unibotics Turnkey Implementation</th>
                <th className="p-3.5 text-[#7468A0]">Independent Fragmented Procurement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2342] text-[#8B8988]">
              <tr>
                <td className="p-3.5 font-bold text-white bg-[#0D0B14] border-r border-[#2A2342]">
                  Vendor Accountability
                </td>
                <td className="p-3.5 border-r border-[#2A2342] text-[#F7F7F8] font-medium">
                  Single point of contact for P1-P4 hardware, 3D printers, training, and maintenance.
                </td>
                <td className="p-3.5 text-[#7468A0]">
                  12+ different suppliers with conflicting delivery schedules and separate warranties.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white bg-[#0D0B14] border-r border-[#2A2342]">
                  Teacher Enablement
                </td>
                <td className="p-3.5 border-r border-[#2A2342] text-[#F7F7F8] font-medium">
                  40 hours structured on-site training + curriculum guidebooks + project schematics.
                </td>
                <td className="p-3.5 text-[#7468A0]">
                  Zero training or superficial 2-hour software demonstration leaving equipment unused.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white bg-[#0D0B14] border-r border-[#2A2342]">
                  Compliance & Grant Audit
                </td>
                <td className="p-3.5 border-r border-[#2A2342] text-[#F7F7F8] font-medium">
                  Complete documentation, serial registers, and AIM compliance reports prepared for submission.
                </td>
                <td className="p-3.5 text-[#7468A0]">
                  Institute administrators must manually compile fragmented bills and risk audit delays.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white bg-[#0D0B14] border-r border-[#2A2342]">
                  Continuous Project Support
                </td>
                <td className="p-3.5 border-r border-[#2A2342] text-[#F7F7F8] font-medium">
                  Dedicated regional technical mentor on call for school innovation competitions and hackathons.
                </td>
                <td className="p-3.5 text-[#7468A0]">
                  Vendors disappear post-delivery; hardware sits idle in storage cabinets.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="bg-black py-12 px-4 sm:px-6 border-t border-[#2A2342]">
        <div className="max-w-stage mx-auto glass-panel p-8 sm:p-10 border-[#2A2342] glow-line-top flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Ready to Establish an Atal Tinkering Lab on Your Campus?
            </h3>
            <p className="text-xs text-[#8B8988] max-w-xl">
              Our operations team responds within 1 to 2 working days with a detailed room plan, hardware bill of materials, and transparent pricing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact?need=atl_lab"
              className="btn-primary-violet px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-center"
            >
              Request Lab Implementation RFP
            </Link>
            <Link
              href="/workshops"
              className="btn-secondary-dark px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-center"
            >
              Explore Short Workshops
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
