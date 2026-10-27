import Link from "next/link";
import { ShieldCheck, Lock, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DPDP Act 2023 Compliance | Unibotics India",
  description:
    "Official institutional privacy policy of Unibotics Services Pvt. Ltd. compliant with India's Digital Personal Data Protection Act 2023 and child data safeguards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Privacy Policy</span>
        </div>
      </section>

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-container mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>DPDP ACT 2023 COMPLIANT • REVISED OCTOBER 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            Institutional Privacy Policy
          </h1>

          <p className="text-xs text-slate-500 font-mono">
            OPERATING ENTITY: UNIBOTICS SERVICES PVT. LTD. | KURUKSHETRA, HARYANA
          </p>
        </div>
      </section>

      {/* Legal Prose Content */}
      <article className="py-12 px-4 sm:px-6 max-w-container mx-auto w-full space-y-8 text-xs text-slate-700 leading-relaxed">
        
        {/* Section 1 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            1. Data Fiduciary & Scope
          </h2>
          <p>
            Unibotics Services Pvt. Ltd. (&quot;Unibotics&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) functions as a Data Fiduciary under the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act). This Privacy Policy explains our practices regarding the collection, processing, storage, and protection of digital personal data provided by educational institutions, school coordinators, teachers, mentors, and students interacting with our STEM training programs and equipment services.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            <span className="font-semibold text-slate-900 block">Registered Office:</span>
            Kurukshetra, Haryana 136118, India | Email: directorunibotics@gmail.com
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            2. Categories of Personal Data Collected
          </h2>
          <p>We restrict data collection to the minimum necessary required to fulfill institutional training and certification deliverables:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Institutional Inquiries:</strong> Representative name, official email, phone number, campus affiliation, and project scope submitted through public forms.
            </li>
            <li>
              <strong className="text-slate-900">Workshop Participants & Certification Records:</strong> Student full name, enrolled workshop title, affiliated school/college, attendance logs, and public verification identifier.
            </li>
            <li>
              <strong className="text-slate-900">Mentor & Team Applications:</strong> Applicant name, contact coordinates, technical experience, CV, and university credentials for candidate evaluation.
            </li>
            <li>
              <strong className="text-slate-900">Security & Anti-Bot Telemetry:</strong> Anonymized IP addresses and Cloudflare Turnstile cryptographic validation tokens to mitigate distributed denial of service and automated spam.
            </li>
          </ul>
          <p className="text-[11px] text-slate-500 italic">
            * We do not collect credit card details or bank passwords on our servers. All financial transactions are executed via official institutional bank wire (NEFT/RTGS) against formal proforma invoices.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            3. Child Data Protection (Section 9 DPDP Act)
          </h2>
          <p>
            Because Unibotics delivers Atal Tinkering Labs and STEM bootcamps to K-12 schools, we adhere to strict statutory safeguards for students under 18 years of age:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>We do not engage in targeted behavioral advertising, tracking, or automated profiling of minors.</li>
            <li>Student rosters for workshop attendance and certificate generation are collected exclusively through authorized school principals or designated lab coordinators acting under institutional authority.</li>
            <li>Public certificate verification displays only the student&apos;s name and workshop title to verify credential validity, exposing zero personal contact data or demographic information.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            4. Data Security & Storage Standards
          </h2>
          <p>
            All records are stored within enterprise-grade PostgreSQL infrastructure with Row Level Security (RLS) active on every table. All client-server traffic is encrypted using Transport Layer Security (TLS 1.3). Direct administrative access to customer data is strictly governed by least-privilege role policies and server-only cryptographic authentication.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            5. Rights of Data Principals & Grievance Redressal
          </h2>
          <p>
            Under the DPDP Act 2023, data principals or their lawful guardians possess the right to access summaries of personal data processed, request correction of erroneous certificate names, or request erasure of non-statutory records.
          </p>
          <div className="pt-2">
            <span className="font-semibold text-slate-900 block mb-1">Data Protection Grievance Officer:</span>
            <p className="text-slate-600">Operations Directorate, Unibotics Services Pvt. Ltd.</p>
            <p className="text-slate-600">Kurukshetra, Haryana 136118, India</p>
            <p className="text-slate-600">Direct Email: <a href="mailto:directorunibotics@gmail.com" className="text-teal-700 underline font-mono">directorunibotics@gmail.com</a></p>
            <p className="text-[11px] text-slate-500 mt-1">Official Response Time: Within 7 business days.</p>
          </div>
        </div>

      </article>
    </div>
  );
}
