import Link from "next/link";
import {
  Wrench,
  Cpu,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "Institutional Services | Turnkey ATL & STEM Training | Unibotics India",
  description:
    "End-to-end Atal Tinkering Lab setup, hands-on student robotics bootcamps, and faculty enablement programs for Indian educational institutions.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "atl-setup",
      badge: "Flagship Infrastructure",
      title: "Turnkey Atal Tinkering Lab (ATL) Setup",
      icon: Wrench,
      whatItIs:
        "Complete procurement, physical layout design, equipment supply, and technical commissioning of Atal Tinkering Labs compliant with NITI Aayog Atal Innovation Mission (AIM) guidelines.",
      whoItIsFor:
        "K-12 schools, CBSE/ICSE institutions, and vocational secondary schools establishing or upgrading their on-campus innovation labs under government or self-financed grants.",
      deliverables: [
        "P1 to P4 equipment packages (electronics, 3D printing, mechanics, safety gear)",
        "Ergonomic bench zoning, anti-static workmats, and tool storage shadow boards",
        "Initial teacher orientation and equipment acceptance testing",
        "Official compliance documentation and asset inventory logs",
      ],
      quoteParam: "atl_lab",
      deepLink: {
        href: "/atl-setup",
        text: "Explore Atal Tinkering Lab setup packages P1 to P4",
      },
    },
    {
      id: "stem-bootcamps",
      badge: "On-Campus Training",
      title: "Multi-Day Hands-on Robotics & STEM Bootcamps",
      icon: Cpu,
      whatItIs:
        "Intensive on-campus training led by experienced field mentors. Standardized into 2-day foundational, 5-day applied IoT, and 7-day advanced robotics engineering programs.",
      whoItIsFor:
        "Schools, ITIs, polytechnics, and engineering colleges seeking practical experiential hardware education without curriculum disruption.",
      deliverables: [
        "1 kit per student cohort (sensors, microcontrollers, motors, chassis)",
        "Zero-slides, 100% practical hardware design and coding exercises",
        "Daily attendance auditing via Unibotics Mentor Workspace",
        "Verifiable digital certificates with QR validation for all passing students",
      ],
      quoteParam: "workshops",
      deepLink: {
        href: "/workshops",
        text: "Browse Full Workshop Catalogue & Agendas",
      },
    },
    {
      id: "faculty-training",
      badge: "Institutional Enablement",
      title: "Faculty Enablement & Curriculum Mentorship",
      icon: GraduationCap,
      whatItIs:
        "Comprehensive train-the-trainer workshops for science, physics, and computer science faculty to master modern lab equipment, troubleshoot circuits, and mentor competition teams.",
      whoItIsFor:
        "School teachers, ATL in-charge educators, and vocational instructors seeking to lead experiential learning independently.",
      deliverables: [
        "NEP 2020 aligned project blueprints and rubric grading templates",
        "Equipment maintenance procedures and hardware troubleshooting checklists",
        "Dedicated technical support channel directly with Unibotics engineers",
        "Faculty certification badge recognizing accredited lab mentorship",
      ],
      quoteParam: "teacher_training",
      deepLink: {
        href: "/contact?need=teacher_training",
        text: "Schedule Faculty Enablement Workshop",
      },
    },
  ];

  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      
      {/* Header Section */}
      <section className="pt-12 pb-8 px-4 sm:px-6 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#212530] border border-[#2F3545] text-xs font-mono text-[#F97316]">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>INSTITUTIONAL STEM CAPABILITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Turnkey Engineering Infrastructure &amp; Training
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          From full laboratory commissioning to intensive student masterclasses, Unibotics provides the hardware, mentorship, and certification Indian campuses require.
        </p>
      </section>

      {/* Services List */}
      <section className="py-8 px-4 sm:px-6 max-w-stage mx-auto w-full space-y-8 mb-16">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="glass-panel p-6 sm:p-10 border border-[#2F3545] glow-line-top space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2F3545]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-[#212530] border border-[#2F3545] flex items-center justify-center text-[#F97316] shadow-glow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F97316] block">
                      {service.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {service.deepLink && (
                    <Link
                      href={service.deepLink.href}
                      className="btn-secondary-dark px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1.5"
                    >
                      <span>{service.deepLink.text}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
                    </Link>
                  )}
                  <Link
                    href={`/contact?need=${service.quoteParam}`}
                    className="btn-primary-cyan px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-glow"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#94A3B8]">
                {/* What it is */}
                <div className="space-y-2 p-5 rounded-xl bg-[#161920] border border-[#2F3545]">
                  <span className="font-mono text-xs text-[#F97316] uppercase font-bold block">
                    What It Is
                  </span>
                  <p className="leading-relaxed text-[#F8FAFC]">
                    {service.whatItIs}
                  </p>
                </div>

                {/* Who it is for */}
                <div className="space-y-2 p-5 rounded-xl bg-[#161920] border border-[#2F3545]">
                  <span className="font-mono text-xs text-[#F97316] uppercase font-bold block">
                    Target Institutions
                  </span>
                  <p className="leading-relaxed text-[#F8FAFC]">
                    {service.whoItIsFor}
                  </p>
                </div>

                {/* What the institution gets */}
                <div className="space-y-2 p-5 rounded-xl bg-[#161920] border border-[#2F3545]">
                  <span className="font-mono text-xs text-[#F97316] uppercase font-bold block">
                    Institutional Deliverables
                  </span>
                  <ul className="space-y-2 text-[#F8FAFC]">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* SLA & Engagement Note */}
      <section className="py-12 px-4 sm:px-6 bg-[#161920]/80 border-t border-[#2F3545]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Need a customized multi-campus package?
            </h3>
            <p className="text-sm text-[#94A3B8]">
              We evaluate institutional floor plans and student strengths to design custom deployment timelines with itemized quotes in 1–2 working days.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary-cyan px-7 py-3 rounded-full text-sm font-bold shrink-0 shadow-glow"
          >
            Contact Engineering Desk
          </Link>
        </div>
      </section>

    </div>
  );
}
