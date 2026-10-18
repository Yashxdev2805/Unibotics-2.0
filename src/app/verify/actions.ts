"use server";

import { getAdminClient } from "@/lib/db/admin";

export interface VerificationResult {
  found: boolean;
  status?: "valid" | "revoked";
  holderName?: string;
  workshopTitle?: string;
  issuedOn?: string;
  code?: string;
  error?: string;
}

export async function verifyCertificateCode(code: string): Promise<VerificationResult> {
  const sanitized = code.trim().toUpperCase();

  if (!sanitized || sanitized.length < 4 || sanitized.length > 50) {
    return {
      found: false,
      error: "Please enter a valid certificate identification code.",
    };
  }

  try {
    const supabase = getAdminClient();
    
    // Call PostgreSQL security definer function returning minimal 4 fields
    const { data, error } = await supabase.rpc("verify_certificate", {
      p_code: sanitized,
    });

    if (error) {
      console.error("RPC verify_certificate error:", error);
      return {
        found: false,
        error: "Verification service temporarily unavailable. Please retry shortly.",
      };
    }

    if (!data || data.length === 0) {
      return {
        found: false,
        code: sanitized,
      };
    }

    const cert = data[0];
    return {
      found: true,
      code: sanitized,
      status: cert.status,
      holderName: cert.holder_name,
      workshopTitle: cert.workshop_title,
      issuedOn: cert.issued_on,
    };
  } catch (err) {
    console.error("Error in verifyCertificateCode:", err);
    return {
      found: false,
      error: "An unexpected error occurred during certificate verification.",
    };
  }
}
