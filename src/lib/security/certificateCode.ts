import crypto from "crypto";

/**
 * Generates an unguessable, cryptographically secure public verification code
 * for Unibotics academic completion certificates.
 * 
 * Format: UB-{YEAR}-{HEX4}-{HEX4} (e.g. UB-2026-A8F2-9C1D)
 * Entropy: 32 bits of cryptographic randomness + year namespace.
 * Prevents enumeration and brute-force guessing attacks.
 */
export function generateCertificateCode(year: number = new Date().getFullYear()): string {
  const bytes = crypto.randomBytes(4);
  const part1 = bytes.subarray(0, 2).toString("hex").toUpperCase();
  const part2 = bytes.subarray(2, 4).toString("hex").toUpperCase();
  return `UB-${year}-${part1}-${part2}`;
}

/**
 * Validates whether a given string matches the canonical Unibotics certificate code pattern.
 */
export function isValidCertificateCode(code: string): boolean {
  if (!code || typeof code !== "string") return false;
  const regex = /^UB-\d{4}-[A-F0-9]{4}-[A-F0-9]{4}$/i;
  return regex.test(code.trim());
}
