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
    },
  ];

  return (
    <div className="flex-1 flex flex-col relative text-[#F7F7F8]">
      
      {/* Header Section */}
      <section className="pt-12 pb-8 px-4 sm:px-6 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#17132A] border border-[#2A2342] text-xs font-mono text-[#C9A3FF]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#45B558]" />
          <span>INSTITUTIONAL STEM CAPABILITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Turnkey Engineering Infrastructure & Training
        </h1>
        <p className="text-sm sm:text-base text-[#8B8988] leading-relaxed">
          From full laboratory commissioning to intensive student masterclasses, Unibotics provides the hardware, mentorship, and certification Indian campuses require.
        </p>
      </section>

      {/* Services List (Section 12: One section per service: what it is, who it is for, what the institution gets, 'Request a quote' button) */}
      <section className="py-8 px-4 sm:px-6 max-w-stage mx-auto w-full space-y-8 mb-16">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="glass-panel p-6 sm:p-10 border border-[#2A2342] glow-line-top space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2A2342]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#17132A] border border-[#7468A0]/40 flex items-center justify-center text-[#C9A3FF]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C9A3FF] block">
                      {service.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <Link
                  href={`/contact?need=${service.quoteParam}`}
                  className="btn-primary-violet px-5 py-2 rounded-full text-xs font-semibold self-start sm:self-auto flex items-center space-x-1.5"
                >
                  <span>Request an Institutional Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#8B8988]">
                {/* What it is */}
                <div className="space-y-2 p-4 rounded-xl bg-[#0D0B14] border border-[#2A2342]">
                  <span className="font-mono text-[10px] text-[#7468A0] uppercase font-bold block">
                    What It Is
                  </span>
                  <p className="leading-relaxed text-[#F7F7F8]">
                    {service.whatItIs}
                  </p>
                </div>

                {/* Who it is for */}
                <div className="space-y-2 p-4 rounded-xl bg-[#0D0B14] border border-[#2A2342]">
                  <span className="font-mono text-[10px] text-[#7468A0] uppercase font-bold block">
                    Target Institutions
                  </span>
                  <p className="leading-relaxed text-[#F7F7F8]">
                    {service.whoItIsFor}
                  </p>
                </div>

                {/* What the institution gets */}
                <div className="space-y-2 p-4 rounded-xl bg-[#0D0B14] border border-[#2A2342]">
                  <span className="font-mono text-[10px] text-[#7468A0] uppercase font-bold block">
                    Institutional Deliverables
                  </span>
                  <ul className="space-y-1.5 text-[#F7F7F8]">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#45B558] shrink-0 mt-0.5" />
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
      <section className="py-12 px-4 sm:px-6 bg-[#0D0B14]/80 border-t border-[#2A2342]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">
              Need a customized multi-campus package?
            </h3>
            <p className="text-xs text-[#8B8988]">
              We evaluate institutional floor plans and student strengths to design custom multi-week deployment timelines.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-secondary-dark px-6 py-2.5 rounded-full text-xs font-semibold shrink-0"
          >
            Contact Engineering Desk
          </Link>
        </div>
      </section>

    </div>
  );
}
