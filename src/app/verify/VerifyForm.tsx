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
      <form onSubmit={onSubmit} className="bg-white border border-slate-300 p-6 sm:p-8 shadow-sm">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Certificate Identification Code
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="e.g. UB-2026-A1B2C3D4"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 text-sm font-mono uppercase text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? "Authenticating..." : "Verify Certificate"}</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Enter the alphanumeric serial number located directly beneath the certificate QR badge.
        </p>
      </form>

      {/* Verification Result Card */}
      {result && (
        <div className="transition-all">
          {result.error ? (
            <div className="bg-white border border-red-300 p-6 shadow-sm flex items-start space-x-3 text-red-800">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-red-950">Verification Notice</h4>
                <p className="text-xs text-red-700 mt-0.5">{result.error}</p>
              </div>
            </div>
          ) : !result.found ? (
            <div className="bg-white border border-amber-300 p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-amber-700">
                <XCircle className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-slate-950">Credential Not Found</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The identifier <span className="font-mono font-bold text-slate-800">{result.code}</span> could not be verified in the Unibotics institutional database. Please re-check the entered code or ensure the certificate was officially issued by an authorized partner school.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Contact <a href="mailto:directorunibotics@gmail.com" className="text-teal-700 underline">directorunibotics@gmail.com</a> for credential dispute resolution.
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-300 shadow-sm">
              {/* Authenticated Banner */}
              <div
                className={`p-4 border-b flex items-center justify-between ${
                  result.status === "valid"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {result.status === "valid" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      {result.status === "valid"
                        ? "Authentic Unibotics Credential"
                        : "Certificate Status: Revoked"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      IDENTIFIER: {result.code}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 uppercase ${
                    result.status === "valid"
                      ? "bg-emerald-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {result.status === "valid" ? "Verified Active" : "Revoked"}
                </span>
              </div>

              {/* Certificate Details Matrix */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-100 text-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Recipient / Candidate Name
                    </span>
                    <span className="text-base font-bold text-slate-950 mt-0.5 block">
                      {result.holderName}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-100 text-slate-700">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Program / Workshop Module
                    </span>
                    <span className="text-base font-bold text-slate-950 mt-0.5 block">
                      {result.workshopTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-100 text-slate-700">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Date of Issue
                    </span>
                    <span className="text-sm font-semibold text-slate-900 mt-0.5 block">
                      {result.issuedOn ? new Date(result.issuedOn).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }) : "Recorded on file"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-100 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Verification Standard
                    </span>
                    <span className="text-sm font-semibold text-slate-900 mt-0.5 block">
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
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors border border-slate-950"
                  >
                    <Download className="w-4 h-4 text-teal-400" />
                    <span>Download Official Verified PDF</span>
                  </a>
                </div>
              )}

              {/* Bottom Guarantee Strip */}
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-1">
                <span>Direct ledger verification without intermediary certificates authority.</span>
                <span className="font-mono text-slate-400">UNIBOTICS GOVERNANCE DIRECTORY</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
