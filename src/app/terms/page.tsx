import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Unibotics India",
  description:
    "Institutional terms of service governing Atal Tinkering Lab setup, hardware supply contracts, STEM workshop delivery, and verifiable certificate issuance.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Terms of Service</span>
        </div>
      </section>

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-container mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-mono font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>INSTITUTIONAL SERVICE TERMS • EFFECTIVE OCTOBER 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            Institutional Terms of Service
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
            1. Acceptance of Terms & Institutional Capacity
          </h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between Unibotics Services Pvt. Ltd. (&quot;Unibotics&quot;) and the client institution, school, polytechnic, university, or individual (&quot;Client&quot;) engaging our services for Atal Tinkering Lab setup, STEM workshop delivery, teacher training, or certificate verification. By submitting an RFP, booking request, or issuing a formal purchase order, the Client agrees to be bound by these Terms.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            2. Procurement, Quotations & Financial Terms
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Validity of Quotations:</strong> All commercial quotes and proforma invoices remain valid for thirty (30) calendar days from issuance.
            </li>
            <li>
              <strong className="text-slate-900">Tax Compliance:</strong> All charges are subject to applicable Goods and Services Tax (GST) under Indian statutory law. Official tax invoices with HSN/SAC codes are issued for all institutional disbursements.
            </li>
            <li>
              <strong className="text-slate-900">Payment Milestones:</strong> Unless otherwise specified in a formal contract, turnkey lab installations require a scheduled milestone advance prior to equipment dispatch, with the balance due upon successful installation and physical handover.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            3. On-Campus Delivery & Host Institute Obligations
          </h2>
          <p>For workshops and lab implementations delivered at the Client&apos;s campus, the Client agrees to provide:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>A secure, dust-free lab room with adequate electrical supply (230V stabilized AC), functional circuit breakers, and grounding.</li>
            <li>Supervision by at least one designated faculty member or lab assistant throughout training sessions to ensure student safety and discipline.</li>
            <li>Safe overnight storage for Unibotics equipment kits, tools, and testing instrumentation during multi-day workshops.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            4. Date Rescheduling & Cancellation Policy
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong className="text-slate-900">Rescheduling:</strong> Written requests to reschedule confirmed workshop dates must be submitted at least seven (7) business days prior to the planned start date to avoid mentor travel displacement fees.
            </li>
            <li>
              <strong className="text-slate-900">Force Majeure:</strong> Neither party shall be penalized for delays caused by severe weather, government pandemic orders, institutional strikes, or natural disasters.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            5. Certificate Authenticity & Revocation
          </h2>
          <p>
            Unibotics issues verifiable cryptographic certificates exclusively to students who satisfy minimum attendance (min 85%) and capstone challenge evaluation criteria. Unibotics reserves the right to revoke any certificate code if evidence of fraudulent attendance, proxy representation, or academic malfeasance is discovered post-issuance. Revoked certificates display an immutable &quot;Revoked&quot; warning on the public verification portal.
          </p>
        </div>

        {/* Section 6 */}
        <div className="bg-white border border-slate-300 p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
            6. Governing Law & Jurisdiction
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute arising from or related to our services shall be subject to the exclusive jurisdiction of the competent courts in Kurukshetra, Haryana, India.
          </p>
        </div>

      </article>
    </div>
  );
}
