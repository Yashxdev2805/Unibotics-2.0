import "server-only";
import { getAdminClient } from "@/lib/db/admin";

const CERTIFICATES_BUCKET = "certificates";

/**
 * Uploads a generated certificate PDF to the private Supabase storage bucket.
 * 
 * Path convention: `${bookingId}/${certificateId}.pdf`
 */
export async function uploadCertificatePdf(
  pdfBytes: Uint8Array,
  filePath: string
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const supabase = getAdminClient();
    
    // Ensure bucket exists or attempt upload
    const { data, error } = await supabase.storage
      .from(CERTIFICATES_BUCKET)
      .upload(filePath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      console.warn("Storage upload warning (mock or bucket not configured):", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, path: data.path };
  } catch (err) {
    console.warn("Exception during certificate storage upload:", err);
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Creates a short-lived (60-second) signed download URL for an authorized participant or admin.
 */
export async function createSignedCertificateUrl(
  filePath: string,
  expiresInSeconds: number = 60
): Promise<{ signedUrl: string | null; error?: string }> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase.storage
      .from(CERTIFICATES_BUCKET)
      .createSignedUrl(filePath, expiresInSeconds);

    if (error) {
      return { signedUrl: null, error: error.message };
    }

    return { signedUrl: data.signedUrl };
  } catch (err) {
    return { signedUrl: null, error: (err as Error).message };
  }
}
