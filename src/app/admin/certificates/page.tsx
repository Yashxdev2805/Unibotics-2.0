import { getAdminClient } from "@/lib/db/admin";
import CertificatesTable, { type CertificateRecord } from "./CertificatesTable";

export const metadata = {
  title: "Verifiable Certificates Registry | Unibotics Admin",
  description: "Cryptographic credential tracking, revocation, and compliance audit trail.",
};

export default async function AdminCertificatesPage() {
  const supabase = getAdminClient();

  const { data: rawCerts, error } = await supabase
    .from("certificates")
    .select(`
      id,
      public_code,
      holder_name,
      workshop_title,
      issued_at,
      status,
      pdf_path,
      revoked_at,
      revoked_reason,
      booking_id
    `)
    .order("issued_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
        Failed to fetch certificate registry: {error.message}
      </div>
    );
  }

  const certificates: CertificateRecord[] = (rawCerts || []).map((c) => ({
    id: c.id,
    public_code: c.public_code,
    holder_name: c.holder_name,
    workshop_title: c.workshop_title,
    issued_at: c.issued_at,
    status: c.status,
    pdf_path: c.pdf_path,
    revoked_at: c.revoked_at,
    revoked_reason: c.revoked_reason,
    booking_id: c.booking_id,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block mb-1">
          CREDENTIAL LEDGER • CRYPTOGRAPHIC PROOFS
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Verifiable Certificates Registry</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review issued completion certificates, monitor public verification states, download PDFs, and manage revocations.
        </p>
      </div>

      <CertificatesTable certificates={certificates} />
    </div>
  );
}
