/**
 * Certificate ID generation utilities
 * Format: TMAI-YYYY-XXXXXX (e.g., TMAI-2025-X7K9M2)
 */

const ALPHANUMERIC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars: I, O, 0, 1

/**
 * Generate a random alphanumeric string of specified length
 */
function generateRandomSuffix(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length));
  }
  return result;
}

/**
 * Generate a unique certificate ID in format: TMAI-YYYY-XXXXXX
 */
export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const suffix = generateRandomSuffix(6);
  return `TMAI-${year}-${suffix}`;
}

/**
 * Validate certificate ID format
 */
export function isValidCertificateId(id: string): boolean {
  const pattern = /^TMAI-\d{4}-[A-Z0-9]{6}$/;
  return pattern.test(id);
}

/**
 * Generate verification URL for a certificate
 */
export function getVerificationUrl(certificateId: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/verify/${certificateId}`;
}
