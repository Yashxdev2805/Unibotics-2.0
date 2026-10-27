import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/db/admin";
import { generateCertificatePdf } from "@/lib/certificates/pdfGenerator";
import { isValidCertificateCode } from "@/lib/security/certificateCode";

interface RouteParams {
  params: Promise<{ code: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { code } = await params;
    const cleanCode = code ? decodeURIComponent(code).trim().toUpperCase() : "";

    if (!cleanCode || !isValidCertificateCode(cleanCode)) {
      return NextResponse.json(
        { ok: false, error: { message: "Invalid or malformed certificate code." } },
        { status: 400 }
      );
    }

    const adminClient = getAdminClient();

    // Query certificate with booking and workshop details
    const { data: cert, error } = await adminClient
      .from("certificates")
      .select(`
        id,
        public_code,
        holder_name,
        workshop_title,
        issued_at,
        status,
        pdf_path,
        bookings (
          institute_name,
          city,
          workshops (days)
        )
      `)
      .eq("public_code", cleanCode)
      .maybeSingle();

    if (error || !cert) {
      return NextResponse.json(
        { ok: false, error: { message: "Certificate not found in Unibotics ledger." } },
        { status: 404 }
      );
    }

    if (cert.status === "revoked") {
      return NextResponse.json(
        {
          ok: false,
          error: {
            message: "This certificate has been revoked and cannot be downloaded as an active credential.",
          },
        },
        { status: 403 }
      );
    }

    // Attempt to download from Supabase storage if pdf_path is available
    if (cert.pdf_path) {
      const { data: fileData, error: fileError } = await adminClient.storage
        .from("certificates")
        .download(cert.pdf_path);

      if (!fileError && fileData) {
        const buffer = await fileData.arrayBuffer();
        return new Response(buffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="Unibotics_Certificate_${cleanCode}.pdf"`,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    }

    // Dynamic On-The-Fly Fallback Generator (guarantees certificate is ALWAYS downloadable)
    const joinedBooking = Array.isArray(cert.bookings) ? cert.bookings[0] : cert.bookings;
    const joinedWs = Array.isArray(joinedBooking?.workshops) ? joinedBooking?.workshops[0] : joinedBooking?.workshops;

    const pdfBytes = await generateCertificatePdf({
      publicCode: cert.public_code,
      holderName: cert.holder_name,
      workshopTitle: cert.workshop_title,
      workshopDays: joinedWs?.days || 5,
      instituteName: joinedBooking?.institute_name || "Institutional Campus",
      city: joinedBooking?.city || "India",
      issuedAt: new Date(cert.issued_at),
    });

    return new Response(pdfBytes as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Unibotics_Certificate_${cleanCode}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Error serving certificate PDF download:", err);
    return NextResponse.json(
      { ok: false, error: { message: "Internal server error streaming certificate." } },
      { status: 500 }
    );
  }
}
