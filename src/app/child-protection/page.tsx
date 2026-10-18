import Link from "next/link";
import { ShieldCheck, Lock, AlertTriangle, Users } from "lucide-react";

export const metadata = {
  title: "Child Protection & POCSO Compliance Policy | Unibotics India",
  description:
    "Institutional child safety charter and POCSO compliance guidelines for Unibotics technical mentors visiting K-12 partner schools.",
};

export default function ChildProtectionPage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Child Protection Policy</span>
        </div>
      </section>

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-container mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>POCSO ACT 2012 COMPLIANT • K-12 INSTITUTIONAL CHARTER</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            Child Protection & Safety Charter
          </h1>

          <p className="text-xs text-slate-500 font-mono">
            APPLICABLE TO ALL UNIBOTICS MENTORS, TRAINERS & ON-SITE ENGINEERS
          </p>
        </div>
      </section>

      {/* Legal Prose Content */}
      <article className="py-12 px-4 sm:px-6 max-w-container mx-auto w-full space-y-8 text-xs text-slate-700 leading-relaxed">
        
        {/* Section 1 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            1. Zero Tolerance Safety Principle
          </h2>
          <p>
            Unibotics Services Pvt. Ltd. recognizes that working with students in K-12 schools and Atal Tinkering Labs requires the highest ethical and statutory diligence. We maintain a zero-tolerance policy toward any form of physical, emotional, or verbal abuse, neglect, or harassment of minors, strictly aligned with the Protection of Children from Sexual Offences (POCSO) Act, 2012.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            2. Mandatory Mentor Screening & Vetting
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Identity & Police Verification:</strong> Every trainer, mentor, or field technician deployed to school premises must possess verified government identification and clear background verification records.
            </li>
            <li>
              <strong className="text-slate-900">Code of Conduct Adherence:</strong> Mentors sign a legally binding Child Safeguarding Code of Conduct prohibiting private communication with students outside official institutional channels.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            3. The &quot;Dual-Adult&quot; Lab Supervision Rule
          </h2>
          <p>
            To protect both students and trainers, Unibotics enforces the Dual-Adult Supervision Rule during all school-based workshop deliveries:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>A Unibotics mentor is never permitted to remain alone with a student in any classroom, lab, or storage area.</li>
            <li>The host school must provide at least one designated teacher, lab assistant, or coordinator who remains physically present throughout the workshop session.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            4. Laboratory Hardware Safety Protocols
          </h2>
          <p>Tinkering environments involve power tools, heated 3D printer nozzles, and lithium batteries:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Protective Gear:</strong> Impact goggles must be worn during rotary cutting, drilling, and high-temperature soldering operations.
            </li>
            <li>
              <strong className="text-slate-900">Battery Charging:</strong> Lithium polymer (LiPo) drone batteries must only be charged inside certified fire-resistant charging enclosures under direct instructor supervision.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            5. Student Media & Privacy Safeguards
          </h2>
          <p>
            Unibotics mentors and staff are strictly prohibited from publishing photographs or videos of school students on personal social media accounts. Institutional documentation photographs are captured exclusively with written principal authorization and must comply with institutional media release guidelines.
          </p>
        </div>

        {/* Section 6 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            6. Safety Reporting & Grievance Contact
          </h2>
          <p>
            Any observed safety infraction, inappropriate behavior, or concern regarding student welfare must be reported immediately:
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-900 block mb-1">Unibotics Child Safety Officer:</span>
            <p className="text-slate-600">Operations Directorate, Unibotics India</p>
            <p className="text-slate-600">Kurukshetra, Haryana, India</p>
            <p className="text-slate-600">Direct Email: <a href="mailto:directorunibotics@gmail.com" className="text-teal-700 underline font-mono">directorunibotics@gmail.com</a></p>
            <p className="text-slate-500 text-[11px] mt-1">Direct escalation SLA: Immediate same-day response (under 4 hours).</p>
          </div>
        </div>

      </article>
    </div>
  );
}
