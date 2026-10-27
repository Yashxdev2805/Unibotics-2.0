import { Suspense } from "react";
import Link from "next/link";
import VerifyForm from "./VerifyForm";
import { ShieldCheck, CheckCircle2, QrCode, Lock } from "lucide-react";

export const metadata = {
  title: "Verify Certificate & STEM Badges | Unibotics India",
  description:
    "Instant tamper-proof cryptographic verification for all Unibotics STEM workshop and training certificates. Official employer and academic registrar authentication.",
};

export default function VerifyPage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-[#2F3545] bg-[#161920]/60 py-3 px-4 sm:px-6 text-xs text-[#94A3B8]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-white">Certificate & Credential Authenticator</span>
        </div>
      </section>

      {/* Hero Header */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#212530] border border-[#2F3545] text-xs font-mono font-semibold text-[#F97316]">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>CRYPTOGRAPHIC CREDENTIAL VERIFICATION PROTOCOL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Institutional Certificate Authenticator
          </h1>

          <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            Validate the legitimacy and active status of certificates issued by Unibotics India for school Atal Tinkering Labs, robotics bootcamps, and faculty enablement programs.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-2 text-xs font-mono text-[#64748B]">
            <div className="flex items-center space-x-1.5">
              <QrCode className="w-4 h-4 text-[#F97316]" />
              <span>QR BADGE VERIFIED</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-[#F97316]" />
              <span>ZERO THIRD-PARTY LEAKS</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>TAMPER-PROOF LEDGER</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Verification Form & Result Section */}
      <section className="py-6 px-4 sm:px-6 max-w-2xl mx-auto w-full">
        <Suspense
          fallback={
            <div className="glass-panel p-8 text-center text-xs text-[#94A3B8]">
              Loading credential verification service...
            </div>
          }
        >
          <VerifyForm />
        </Suspense>
      </section>

      {/* Registrar Guidance Box */}
      <section className="max-w-2xl mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="glass-panel p-5 text-xs text-[#94A3B8] space-y-2 border border-[#2F3545]">
          <span className="font-bold text-white block text-[11px] uppercase tracking-wider">
            Notice for Academic Registrars & Corporate Recruiters:
          </span>
          <p className="leading-relaxed">
            Unibotics does not store unencrypted student identity records in public caches. The authenticator verifies the certificate serial against our immutable PostgreSQL ledger and confirms the recipient full name, workshop title, and issuance date directly from official training logs.
          </p>
          <p className="text-[11px] text-[#64748B] pt-1">
            For institutional batch verifications exceeding 50 credentials, contact{" "}
            <a href="mailto:directorunibotics@gmail.com" className="text-[#F97316] hover:underline font-mono">
              directorunibotics@gmail.com
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
