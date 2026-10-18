import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Printer,
  Wrench,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  FileText,
  Clock,
  GraduationCap,
  Sparkles,
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
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb & Sub-Strip */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container-wide mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Atal Tinkering Lab Setup</span>
        </div>
      </section>

      {/* Hero Section: High Density Dual Column */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-container-wide mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NITI AAYOG / ATAL INNOVATION MISSION (AIM) ALIGNED</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Turnkey Atal Tinkering Lab Implementation
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Complete, end-to-end setup and ongoing operational enablement for schools selected under the Atal Innovation Mission. We handle hardware procurement, room acoustics, 3D printers, safety infrastructure, and structured teacher training.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?need=atl_lab"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 transition-colors shadow-sm"
              >
                <span>Request Lab RFP & Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#packages"
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs tracking-wider uppercase border border-slate-300 transition-colors"
              >
                Inspect Equipment Manifest
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 text-xs">
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">PACKAGE SCOPE</span>
                <span className="font-bold text-slate-900">P1 through P4</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">DEPLOYMENT</span>
                <span className="font-bold text-slate-900">15 to 30 Days</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">FACULTY TRAINING</span>
                <span className="font-bold text-slate-900">40 Hours Hands-on</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block text-[10px]">CURRICULUM</span>
                <span className="font-bold text-slate-900">NEP 2020 Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Architecture Blueprint Card */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 p-6 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                ATL Operational Blueprint
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5">
                VERIFIED STANDARD
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800/80 border border-slate-700">
                <span className="font-semibold text-white block mb-0.5">Physical Space Requirement</span>
                <p className="text-slate-400 text-[11px]">Minimum 1,500 sq. ft. dedicated area equipped with stabilized 230V AC lines, earthing, and anti-static workstations.</p>
              </div>

              <div className="p-3 bg-slate-800/80 border border-slate-700">
                <span className="font-semibold text-white block mb-0.5">Tinkering Cohort Capacity</span>
                <p className="text-slate-400 text-[11px]">Designed to concurrently accommodate 30 to 40 students across 6 to 8 collaborative workbench clusters.</p>
              </div>

              <div className="p-3 bg-slate-800/80 border border-slate-700">
                <span className="font-semibold text-white block mb-0.5">Yearly Maintenance & Support</span>
                <p className="text-slate-400 text-[11px]">Quarterly mentor visits, hardware component replacements under warranty, and annual project exhibition mentorship.</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Official Reference: AIM Guidelines v3.0</span>
              <span className="font-mono text-slate-300">Kurukshetra Ops Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Manifest (P1 to P4) */}
      <section id="packages" className="py-14 px-4 sm:px-6 max-w-container-wide mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-1">
            <span>OFFICIAL HARDWARE SPECIFICATION</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Comprehensive Four-Package Inventory (P1 – P4)
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Unibotics supplies exclusively branded, industrial-tolerance components. No unbranded gray-market parts or volatile non-safety-rated batteries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className="bg-white border border-slate-300 p-6 flex flex-col justify-between shadow-sm hover:border-slate-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-900 text-white">
                        <Icon className="w-5 h-5 text-teal-400" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500">{pkg.id}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5">
                      AIM STANDARD
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 mb-2">{pkg.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{pkg.summary}</p>

                  <div className="bg-slate-50 border border-slate-200 p-3 mb-4">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2 font-semibold">
                      Included Hardware Manifest:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pkg.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Factory Sealed & Tested</span>
                  <span className="font-semibold text-slate-700">12 Months Direct Warranty</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Phase Implementation Timeline */}
      <section className="bg-white border-y border-slate-200 py-14 px-4 sm:px-6">
        <div className="max-w-container-wide mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-slate-500 block mb-1">OPERATIONAL ROADMAP</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Standard 30-Day Turnkey Deployment Process
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              From site survey to ribbon cutting, our standardized four-phase protocol guarantees your institution meets all regulatory auditing milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHASES.map((phase) => (
              <div
                key={phase.step}
                className="bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-slate-300">{phase.step}</span>
                    <span className="inline-flex items-center text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      {phase.timeline}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{phase.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{phase.details}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-400 uppercase">
                  Phase Milestone Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey vs Self-Managed Matrix */}
      <section className="py-14 px-4 sm:px-6 max-w-container-wide mx-auto w-full">
        <div className="mb-8">
          <span className="font-mono text-xs text-slate-500 block mb-1">COMPARATIVE AUDIT</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Why Institutes Choose Turnkey Delivery Over Fragmented Vendors
          </h2>
        </div>

        <div className="overflow-x-auto border border-slate-300 bg-white shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-200 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-3.5 border-r border-slate-800">Operational Factor</th>
                <th className="p-3.5 border-r border-slate-800 text-emerald-400">Unibotics Turnkey Implementation</th>
                <th className="p-3.5 text-slate-400">Independent Fragmented Procurement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                  Vendor Accountability
                </td>
                <td className="p-3.5 border-r border-slate-200 text-slate-900 font-medium">
                  Single point of contact for P1-P4 hardware, 3D printers, training, and maintenance.
                </td>
                <td className="p-3.5 text-slate-500">
                  12+ different suppliers with conflicting delivery schedules and separate warranties.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                  Teacher Enablement
                </td>
                <td className="p-3.5 border-r border-slate-200 text-slate-900 font-medium">
                  40 hours structured on-site training + curriculum guidebooks + project schematics.
                </td>
                <td className="p-3.5 text-slate-500">
                  Zero training or superficial 2-hour software demonstration leaving equipment unused.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                  Compliance & Grant Audit
                </td>
                <td className="p-3.5 border-r border-slate-200 text-slate-900 font-medium">
                  Complete documentation, serial registers, and AIM compliance reports prepared for submission.
                </td>
                <td className="p-3.5 text-slate-500">
                  Institute administrators must manually compile fragmented bills and risk audit delays.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                  Continuous Project Support
                </td>
                <td className="p-3.5 border-r border-slate-200 text-slate-900 font-medium">
                  Dedicated regional technical mentor on call for school innovation competitions and hackathons.
                </td>
                <td className="p-3.5 text-slate-500">
                  Vendors disappear post-delivery; hardware sits idle in storage cabinets.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-container-wide mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Ready to Establish an Atal Tinkering Lab on Your Campus?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Our operations team responds within 1 to 2 working days with a detailed room plan, hardware bill of materials, and transparent pricing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact?need=atl_lab"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors text-center"
            >
              Request Lab Implementation RFP
            </Link>
            <Link
              href="/workshops"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase border border-slate-700 transition-colors text-center"
            >
              Explore Short Workshops
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
