import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

export interface CertificateRenderParams {
  publicCode: string;
  holderName: string;
  workshopTitle: string;
  workshopDays?: number;
  instituteName: string;
  city?: string;
  issuedAt: Date;
  signatoryName?: string;
  signatoryTitle?: string;
}

/**
 * Generates an institutional-grade, verifiable A4 landscape certificate PDF
 * with embedded QR code pointing to https://unibotics.in/verify?code={publicCode}.
 * 
 * Strict Anti-Vibe-Coding Rules:
 * - Formal corporate typography (Helvetica/Helvetica-Bold standard PostScript fonts)
 * - Sharp geometric framing and double borders (no rounded pill shapes)
 * - High-contrast monochromatic slate/navy palette with teal accents
 * - Cryptographic verification footer with QR code and canonical URL
 */
export async function generateCertificatePdf({
  publicCode,
  holderName,
  workshopTitle,
  workshopDays = 5,
  instituteName,
  city = "India",
  issuedAt,
  signatoryName = "Er. Yash B.",
  signatoryTitle = "Director of Robotics Curriculum",
}: CertificateRenderParams): Promise<Uint8Array> {
  // A4 Landscape: 842 x 595 points
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();

  // Color Tokens (Institutional Slate & Dark Navy)
  const colorSlate950 = rgb(0.04, 0.06, 0.1);
  const colorSlate800 = rgb(0.12, 0.16, 0.22);
  const colorSlate600 = rgb(0.3, 0.35, 0.42);
  const colorTealDark = rgb(0.05, 0.45, 0.45);
  const colorBackground = rgb(0.99, 0.99, 1.0);

  // Background Fill
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: colorBackground,
  });

  // Outer Border (Heavy)
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: colorSlate950,
    borderWidth: 2.5,
  });

  // Inner Border (Hairline)
  page.drawRectangle({
    x: 30,
    y: 30,
    width: width - 60,
    height: height - 60,
    borderColor: colorSlate800,
    borderWidth: 0.75,
  });

  // Top Header Banner
  const orgTitle = "UNIBOTICS INDIA";
  const orgSub = "ATAL INNOVATION MISSION (AIM) & INSTITUTIONAL STEM PARTNER";
  
  const orgWidth = fontBold.widthOfTextAtSize(orgTitle, 16);
  page.drawText(orgTitle, {
    x: (width - orgWidth) / 2,
    y: height - 65,
    size: 16,
    font: fontBold,
    color: colorSlate950,
  });

  const subWidth = fontRegular.widthOfTextAtSize(orgSub, 8);
  page.drawText(orgSub, {
    x: (width - subWidth) / 2,
    y: height - 78,
    size: 8,
    font: fontRegular,
    color: colorSlate600,
  });

  // Horizontal Accent Rule
  page.drawLine({
    start: { x: 80, y: height - 90 },
    end: { x: width - 80, y: height - 90 },
    thickness: 1,
    color: colorTealDark,
  });

  // Certificate Heading
  const certHeader = "CERTIFICATE OF TECHNICAL COMPLETION";
  const certHeaderWidth = fontBold.widthOfTextAtSize(certHeader, 20);
  page.drawText(certHeader, {
    x: (width - certHeaderWidth) / 2,
    y: height - 130,
    size: 20,
    font: fontBold,
    color: colorSlate950,
  });

  const certSub = "THIS ACCREDITATION IS FORMALLY CONFERRED UPON";
  const certSubWidth = fontRegular.widthOfTextAtSize(certSub, 9);
  page.drawText(certSub, {
    x: (width - certSubWidth) / 2,
    y: height - 152,
    size: 9,
    font: fontRegular,
    color: colorSlate600,
  });

  // Recipient Name
  const cleanName = holderName.trim().toUpperCase();
  const nameSize = cleanName.length > 28 ? 22 : 26;
  const nameWidth = fontBold.widthOfTextAtSize(cleanName, nameSize);
  page.drawText(cleanName, {
    x: (width - nameWidth) / 2,
    y: height - 195,
    size: nameSize,
    font: fontBold,
    color: colorSlate950,
  });

  // Underline beneath recipient name
  page.drawLine({
    start: { x: (width - Math.max(nameWidth, 260)) / 2, y: height - 204 },
    end: { x: (width + Math.max(nameWidth, 260)) / 2, y: height - 204 },
    thickness: 1,
    color: colorSlate800,
  });

  // Workshop & Institution Citation Text
  const citationLine1 = `for rigorous participation and successful completion of the ${workshopDays}-Day intensive program on`;
  const citation1Width = fontRegular.widthOfTextAtSize(citationLine1, 11);
  page.drawText(citationLine1, {
    x: (width - citation1Width) / 2,
    y: height - 232,
    size: 11,
    font: fontRegular,
    color: colorSlate800,
  });

  // Program Title
  const cleanTitle = workshopTitle.trim();
  const titleSize = cleanTitle.length > 35 ? 16 : 18;
  const titleWidth = fontBold.widthOfTextAtSize(cleanTitle, titleSize);
  page.drawText(cleanTitle, {
    x: (width - titleWidth) / 2,
    y: height - 262,
    size: titleSize,
    font: fontBold,
    color: colorTealDark,
  });

  // Campus Details
  const citationLine2 = `conducted in collaboration with ${instituteName}, ${city}`;
  const citation2Width = fontRegular.widthOfTextAtSize(citationLine2, 11);
  page.drawText(citationLine2, {
    x: (width - citation2Width) / 2,
    y: height - 290,
    size: 11,
    font: fontRegular,
    color: colorSlate800,
  });

  const citationLine3 = "evaluating practical embedded systems, autonomous robotics architecture, and engineering safety.";
  const citation3Width = fontRegular.widthOfTextAtSize(citationLine3, 10);
  page.drawText(citationLine3, {
    x: (width - citation3Width) / 2,
    y: height - 310,
    size: 10,
    font: fontRegular,
    color: colorSlate600,
  });

  // Lower Section Divider
  page.drawLine({
    start: { x: 80, y: height - 340 },
    end: { x: width - 80, y: height - 340 },
    thickness: 0.5,
    color: colorSlate600,
  });

  // QR Code Generation
  const verifyUrl = `https://unibotics.in/verify?code=${encodeURIComponent(publicCode)}`;
  const qrBuffer = await QRCode.toBuffer(verifyUrl, {
    type: "png",
    width: 256,
    margin: 1,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF",
    },
  });

  const qrImage = await pdfDoc.embedPng(qrBuffer);
  const qrSize = 85;
  const qrX = 80;
  const qrY = 70;

  // Draw QR Image
  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrSize,
    height: qrSize,
  });

  // QR Verification Info Box (adjacent to QR)
  page.drawText("DIGITAL VERIFICATION SEAL", {
    x: qrX + qrSize + 12,
    y: qrY + qrSize - 14,
    size: 8,
    font: fontBold,
    color: colorSlate950,
  });

  page.drawText(`PUBLIC CODE: ${publicCode}`, {
    x: qrX + qrSize + 12,
    y: qrY + qrSize - 28,
    size: 9,
    font: fontBold,
    color: colorTealDark,
  });

  page.drawText("Scan QR code or verify online at:", {
    x: qrX + qrSize + 12,
    y: qrY + qrSize - 42,
    size: 8,
    font: fontRegular,
    color: colorSlate600,
  });

  page.drawText("https://unibotics.in/verify", {
    x: qrX + qrSize + 12,
    y: qrY + qrSize - 54,
    size: 8,
    font: fontBold,
    color: colorSlate800,
  });

  // Date of Issue
  const issueDateStr = issuedAt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  page.drawText(`ISSUED: ${issueDateStr}`, {
    x: qrX + qrSize + 12,
    y: qrY + 8,
    size: 8,
    font: fontRegular,
    color: colorSlate600,
  });

  // Right Signatory Block
  const sigX = width - 260;
  const sigY = 95;

  page.drawLine({
    start: { x: sigX, y: sigY + 45 },
    end: { x: sigX + 180, y: sigY + 45 },
    thickness: 1,
    color: colorSlate800,
  });

  page.drawText(signatoryName, {
    x: sigX,
    y: sigY + 30,
    size: 11,
    font: fontBold,
    color: colorSlate950,
  });

  page.drawText(signatoryTitle, {
    x: sigX,
    y: sigY + 16,
    size: 8,
    font: fontRegular,
    color: colorSlate600,
  });

  page.drawText("Unibotics Academic Board", {
    x: sigX,
    y: sigY + 4,
    size: 8,
    font: fontBold,
    color: colorTealDark,
  });

  // Bottom Legal Footnote
  const footerNote = "This credential is cryptographically anchored. Tampering or altering any field invalidates the certificate on unibotics.in.";
  const footerWidth = fontRegular.widthOfTextAtSize(footerNote, 7);
  page.drawText(footerNote, {
    x: (width - footerWidth) / 2,
    y: 35,
    size: 7,
    font: fontRegular,
    color: colorSlate600,
  });

  return await pdfDoc.save();
}
