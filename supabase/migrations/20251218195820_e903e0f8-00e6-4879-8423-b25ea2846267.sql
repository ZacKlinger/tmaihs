-- Drop the existing view that allows enumeration
DROP VIEW IF EXISTS public.certificate_verification;

-- Create RPC function that requires certificate_id parameter (prevents enumeration)
CREATE OR REPLACE FUNCTION public.verify_certificate(p_certificate_id text)
RETURNS TABLE (
  certificate_id text,
  recipient_name text,
  issued_at timestamptz,
  created_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = 'public'
AS $$
BEGIN
  -- Validate input - must be a valid certificate ID format
  IF p_certificate_id IS NULL OR length(p_certificate_id) < 10 THEN
    RAISE EXCEPTION 'Invalid certificate ID';
  END IF;

  RETURN QUERY
  SELECT c.certificate_id, c.recipient_name, c.issued_at, c.created_at
  FROM public.certificates c
  WHERE c.certificate_id = p_certificate_id;
END;
$$;

-- Grant execute permissions to allow anonymous certificate verification
GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO authenticated;