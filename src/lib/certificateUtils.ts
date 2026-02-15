/**
 * Certificate ID generation utilities
 * Format: TMAI-YYYY-XXXXXX (e.g., TMAI-2025-X7K9M2)
 */

const ALPHANUMERIC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars: I, O, 0, 1

/**
 * Generate a random alphanumeric string of specified length
 */
function generateRandomSuffix(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHANUMERIC.charAt(array[i] % ALPHANUMERIC.length);
  }
  return result;
}

/**
 * Generate a unique certificate ID in format: TMAI-YYYY-XXXXXX
 */
export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const suffix = generateRandomSuffix(10);
  return `TMAI-${year}-${suffix}`;
}

/**
 * Validate certificate ID format
 */
export function isValidCertificateId(id: string): boolean {
  const pattern = /^TMAI-\d{4}-[A-HJ-NP-Z2-9]{10}$/;
  return pattern.test(id);
}

/**
 * Generate verification URL for a certificate
 */
export function getVerificationUrl(certificateId: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/verify/${certificateId}`;
}

/**
 * Generate a QR code as a data URL for PDF embedding
 */
export async function generateQRCodeDataUrl(url: string): Promise<string> {
  // Create a canvas element to render the QR code
  const QRCode = await import('qrcode');
  const dataUrl = await QRCode.toDataURL(url, {
    width: 128,
    margin: 0,
    color: {
      dark: '#7D2E46', // Primary color
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'M',
  });
  return dataUrl;
}
