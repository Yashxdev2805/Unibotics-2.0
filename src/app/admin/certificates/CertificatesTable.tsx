"use client";

import { useState } from "react";
import Link from "next/link";
import { revokeCertificate, reinstateCertificate } from "./actions";
import {
  Search,
  Award,
  CheckCircle2,
  XCircle,
  Download,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  User,
  Calendar,
} from "lucide-react";

export interface CertificateRecord {
  id: string;
  public_code: string;
  holder_name: string;
  workshop_title: string;
  issued_at: string;
  status: "valid" | "revoked";
  pdf_path: string | null;
  revoked_at: string | null;
  revoked_reason: string | null;
  booking_id: string;
}

interface Props {
  certificates: CertificateRecord[];
}

export default function CertificatesTable({ certificates }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);

  // Revocation modal state
  const [revokingCert, setRevokingCert] = useState<CertificateRecord | null>(null);
  const [revokeReason, setRevokeReason] = useState("");
  const [revokeError, setRevokeError] = useState<string | null>(null);

  const filtered = certificates.filter((c) => {
    const statusMatch = filterStatus === "all" || c.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !searchQuery ||
      c.public_code.toLowerCase().includes(query) ||
      c.holder_name.toLowerCase().includes(query) ||
      c.workshop_title.toLowerCase().includes(query) ||
      c.booking_id.toLowerCase().includes(query);

    return statusMatch && searchMatch;
  });

  const handleRevokeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revokingCert) return;
    if (!revokeReason.trim() || revokeReason.trim().length < 5) {
      setRevokeError("A valid reason of at least 5 characters is mandatory.");
      return;
    }

    setPendingId(revokingCert.id);
    setRevokeError(null);

    try {
      const res = await revokeCertificate(revokingCert.id, revokeReason);
      if (!res.success) {
        setRevokeError(res.error || "Failed to revoke certificate.");
      } else {
        setRevokingCert(null);
        setRevokeReason("");
      }
    } catch (err) {
      setRevokeError((err as Error).message);
    } finally {
      setPendingId(null);
    }
  };

  const handleReinstate = async (certId: string) => {
    if (!confirm("Are you sure you want to reinstate this revoked certificate?")) return;

    setPendingId(certId);
    try {
      const res = await reinstateCertificate(certId);
      if (!res.success) {
        alert("Failed to reinstate certificate: " + res.error);
      }
    } catch (err) {
      alert("Error reinstating certificate: " + (err as Error).message);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="bg-slate-950 border border-slate-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Status:</span>
          {["all", "valid", "revoked"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 text-xs font-mono font-bold uppercase transition-colors border ${
                filterStatus === st
                  ? "bg-slate-100 text-slate-950 border-white"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search code (e.g. UB-2026), student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Revocation Reason Modal */}
      {revokingCert && (
        <div className="bg-red-950/40 border border-red-800 p-5 space-y-4">
          <div className="flex items-center space-x-2 text-red-300">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-bold font-mono uppercase">
              Revoke Certificate: {revokingCert.public_code}
            </h3>
          </div>

          <p className="text-xs text-slate-300">
            You are about to revoke the completion credential for{" "}
            <strong className="text-white">{revokingCert.holder_name}</strong> ({revokingCert.workshop_title}).
            The verification portal will immediately reflect this revocation.
          </p>

          {revokeError && (
            <div className="p-2 bg-red-900/60 border border-red-700 text-red-200 text-xs font-mono">
              {revokeError}
            </div>
          )}

          <form onSubmit={handleRevokeSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Mandatory Revocation Rationale *
              </label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Course requirements not completed / Identity falsification / Administrative reissue"
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:border-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setRevokingCert(null);
                  setRevokeReason("");
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pendingId === revokingCert.id}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {pendingId === revokingCert.id ? "Revoking..." : "Confirm Revocation"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates Ledger Table */}
      <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
              <th className="p-3">Public Code</th>
              <th className="p-3">Recipient / Student</th>
              <th className="p-3">Workshop Module</th>
              <th className="p-3">Issued On</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                  No certificate credentials match the query.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                  {/* Public Code */}
                  <td className="p-3 font-mono align-top">
                    <span className="text-teal-400 font-bold block">{c.public_code}</span>
                    <Link
                      href={`/verify?code=${encodeURIComponent(c.public_code)}`}
                      target="_blank"
                      className="text-[10px] text-slate-500 hover:text-slate-300 inline-flex items-center space-x-1 mt-0.5"
                    >
                      <span>Public URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </td>

                  {/* Recipient */}
                  <td className="p-3 align-top">
                    <span className="text-white font-semibold block">{c.holder_name}</span>
                    <Link
                      href={`/admin/bookings/${c.booking_id}`}
                      className="text-[10px] text-slate-500 hover:text-teal-400 block font-mono"
                    >
                      RFP: {c.booking_id.substring(0, 8)}
                    </Link>
                  </td>

                  {/* Workshop Title */}
                  <td className="p-3 align-top max-w-xs">
                    <span className="text-slate-300 block">{c.workshop_title}</span>
                  </td>

                  {/* Issued Date */}
                  <td className="p-3 align-top font-mono text-slate-400 text-[11px]">
                    {new Date(c.issued_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="p-3 align-top">
                    <div className="space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                          c.status === "valid"
                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                            : "bg-red-950/80 text-red-400 border-red-800"
                        }`}
                      >
                        {c.status}
                      </span>
                      {c.revoked_reason && (
                        <span className="block text-[10px] text-red-400 italic font-mono max-w-xs">
                          Reason: {c.revoked_reason}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-3 align-top text-right space-x-2">
                    {/* Download PDF Link */}
                    {c.status === "valid" && (
                      <a
                        href={`/api/certificates/${encodeURIComponent(c.public_code)}/download`}
                        download
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-teal-300 font-mono text-[11px] font-bold uppercase transition-colors"
                        title="Download Certificate PDF"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </a>
                    )}

                    {/* Revoke / Reinstate Buttons */}
                    {c.status === "valid" ? (
                      <button
                        type="button"
                        onClick={() => setRevokingCert(c)}
                        disabled={pendingId === c.id}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-300 font-mono text-[11px] font-bold uppercase transition-colors"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Revoke</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReinstate(c.id)}
                        disabled={pendingId === c.id}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 text-emerald-300 font-mono text-[11px] font-bold uppercase transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reinstate</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
