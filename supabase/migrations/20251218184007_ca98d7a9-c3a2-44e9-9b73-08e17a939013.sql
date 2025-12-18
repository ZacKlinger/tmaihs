-- Create certificates table for credential issuance
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  certificate_id text UNIQUE NOT NULL,
  recipient_name text NOT NULL,
  recipient_email text NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Users can view their own certificates
CREATE POLICY "Users can view own certificates" ON public.certificates
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Public can verify certificates by certificate_id (for verification page)
CREATE POLICY "Anyone can verify certificates by id" ON public.certificates
  FOR SELECT TO anon
  USING (true);

-- Users can insert their own certificate
CREATE POLICY "Users can create own certificate" ON public.certificates
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create index on certificate_id for fast lookups
CREATE INDEX idx_certificates_certificate_id ON public.certificates(certificate_id);