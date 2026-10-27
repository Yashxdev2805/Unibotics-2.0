"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyCertificateCode, type VerificationResult } from "./actions";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Calendar,
  Award,
  User,
  QrCode,
  Download,
} from "lucide-react";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";

  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    if (initialCode) {
      handleVerify(initialCode);
    }
  }, [initialCode]);

  const handleVerify = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setLoading(true);
    setResult(null);

    const res = await verifyCertificateCode(codeToVerify);
    setResult(res);
    setLoading(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(code);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <form onSubmit={onSubmit} className="glass-panel p-6 sm:p-8 border border-[#2F3545] glow-line-top">
        <label className="block text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider mb-2">
          Certificate Identification Code
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <QrCode className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="e.g. UB-2026-A1B2C3D4"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#64748B] text-sm font-mono uppercase text-white bg-[#161920] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-cyan py-2.5 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 disabled:opacity-50 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? "Authenticating..." : "Verify Certificate"}</span>
          </button>
        </div>
        <p className="text-[11px] text-[#64748B] mt-2">
          Enter the alphanumeric serial number located directly beneath the certificate QR badge.
        </p>
      </form>

      {/* Verification Result Card */}
      {result && (
        <div className="transition-all">
          {result.error ? (
            <div className="glass-panel border border-[#F03B2A]/40 p-6 flex items-start space-x-3 text-[#F03B2A]">
              <AlertCircle className="w-5 h-5 text-[#F03B2A] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-white">Verification Notice</h4>
                <p className="text-xs text-[#F03B2A] mt-0.5">{result.error}</p>
              </div>
            </div>
          ) : !result.found ? (
            <div className="glass-panel border border-[#F59E0B]/40 p-6 space-y-3">
              <div className="flex items-center space-x-2 text-[#F59E0B]">
                <XCircle className="w-5 h-5 text-[#F59E0B]" />
                <h4 className="font-bold text-sm text-white">Credential Not Found</h4>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                The identifier <span className="font-mono font-bold text-white">{result.code}</span> could not be verified in the Unibotics institutional database. Please re-check the entered code or ensure the certificate was officially issued by an authorized partner school.
              </p>
              <div className="text-[11px] text-[#64748B] pt-2 border-t border-[#2F3545]">
                Contact <a href="mailto:directorunibotics@gmail.com" className="text-[#F97316] hover:underline">directorunibotics@gmail.com</a> for credential dispute resolution.
              </div>
            </div>
          ) : (
            <div className="glass-panel border border-[#2F3545] overflow-hidden">
              {/* Authenticated Banner */}
              <div
                className={`p-4 border-b flex items-center justify-between ${
                  result.status === "valid"
                    ? "bg-[#212530] border-[#2F3545] text-white"
                    : "bg-[#212530] border-[#F03B2A]/40 text-[#F03B2A]"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {result.status === "valid" ? (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#F03B2A]" />
                  )}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      {result.status === "valid"
                        ? "Authentic Unibotics Credential"
                        : "Certificate Status: Revoked"}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      IDENTIFIER: {result.code}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase ${
                    result.status === "valid"
                      ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40"
                      : "bg-[#F03B2A]/20 text-[#F03B2A] border border-[#F03B2A]/40"
                  }`}
                >
                  {result.status === "valid" ? "Verified Active" : "Revoked"}
                </span>
              </div>

              {/* Certificate Details Matrix */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#94A3B8]">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#212530] text-[#F97316] border border-[#2F3545]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                      Recipient / Candidate Name
                    </span>
                    <span className="text-base font-bold text-white mt-0.5 block">
                      {result.holderName}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#212530] text-[#F97316] border border-[#2F3545]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                      Program / Workshop Module
                    </span>
                    <span className="text-base font-bold text-white mt-0.5 block">
                      {result.workshopTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#212530] text-[#F97316] border border-[#2F3545]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                      Date of Issue
                    </span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      {result.issuedOn
                        ? new Date(result.issuedOn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Recorded on file"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#212530] text-[#10B981] border border-[#2F3545]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                      Verification Standard
                    </span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      PostgreSQL Cryptographic Checksum
                    </span>
                  </div>
                </div>
              </div>

              {result.status === "valid" && (
                <div className="px-6 pb-6 pt-1 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`/api/certificates/${encodeURIComponent(result.code || "")}/download`}
                    download
                    className="btn-primary-cyan w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>Download Official Verified PDF</span>
                  </a>
                </div>
              )}

              {/* Bottom Guarantee Strip */}
              <div className="bg-[#08060E] border-t border-[#2F3545] px-6 py-3 text-[11px] text-[#64748B] flex flex-col sm:flex-row justify-between items-center gap-1">
                <span>Direct ledger verification without intermediary certificates authority.</span>
                <span className="font-mono text-[#F97316]">UNIBOTICS GOVERNANCE DIRECTORY</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
