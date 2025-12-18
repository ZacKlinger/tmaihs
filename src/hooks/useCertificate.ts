import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { generateCertificateId } from '@/lib/certificateUtils';

interface Certificate {
  id: string;
  certificate_id: string;
  recipient_name: string;
  recipient_email: string;
  issued_at: string;
  created_at: string;
  user_id: string;
}

interface UseCertificateResult {
  certificate: Certificate | null;
  loading: boolean;
  error: string | null;
  issueCertificate: (name: string, email: string) => Promise<Certificate | null>;
}

/**
 * Hook to manage certificate fetching and issuance
 */
export function useCertificate(userId: string | undefined): UseCertificateResult {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing certificate for user
  useEffect(() => {
    async function fetchCertificate() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching certificate:', fetchError);
          setError(fetchError.message);
        } else {
          setCertificate(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching certificate:', err);
        setError('Failed to fetch certificate');
      } finally {
        setLoading(false);
      }
    }

    fetchCertificate();
  }, [userId]);

  // Issue a new certificate
  const issueCertificate = useCallback(async (name: string, email: string): Promise<Certificate | null> => {
    if (!userId) {
      setError('User not authenticated');
      return null;
    }

    // Check if certificate already exists
    if (certificate) {
      return certificate;
    }

    try {
      setLoading(true);
      const certificateId = generateCertificateId();

      const { data, error: insertError } = await supabase
        .from('certificates')
        .insert({
          user_id: userId,
          certificate_id: certificateId,
          recipient_name: name,
          recipient_email: email,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error issuing certificate:', insertError);
        setError(insertError.message);
        return null;
      }

      setCertificate(data);
      return data;
    } catch (err) {
      console.error('Unexpected error issuing certificate:', err);
      setError('Failed to issue certificate');
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, certificate]);

  return { certificate, loading, error, issueCertificate };
}

// Public verification data (excludes PII like email and user_id)
interface VerificationData {
  certificate_id: string;
  recipient_name: string;
  issued_at: string;
  created_at: string;
}

/**
 * Hook to verify a certificate by its public ID
 * Uses the certificate_verification view which excludes PII
 */
export function useVerifyCertificate(certificateId: string | undefined) {
  const [certificate, setCertificate] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function verifyCertificate() {
      if (!certificateId) {
        setLoading(false);
        setNotFound(true);
        return;
      }

      try {
        // Use RPC function to verify certificate (prevents enumeration attacks)
        const { data, error: fetchError } = await supabase
          .rpc('verify_certificate', { p_certificate_id: certificateId });
        
        const certificateData = data && data.length > 0 ? data[0] : null;

        if (fetchError) {
          console.error('Error verifying certificate:', fetchError);
          setError(fetchError.message);
        } else if (!certificateData) {
          setNotFound(true);
        } else {
          setCertificate(certificateData);
        }
      } catch (err) {
        console.error('Unexpected error verifying certificate:', err);
        setError('Failed to verify certificate');
      } finally {
        setLoading(false);
      }
    }

    verifyCertificate();
  }, [certificateId]);

  return { certificate, loading, error, notFound };
}
