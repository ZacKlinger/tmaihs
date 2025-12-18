-- Create a public verification view that excludes PII (email, user_id)
CREATE VIEW public.certificate_verification AS
SELECT 
  certificate_id,
  recipient_name,
  issued_at,
  created_at
FROM public.certificates;

-- Grant anonymous access to the view only
GRANT SELECT ON public.certificate_verification TO anon;
GRANT SELECT ON public.certificate_verification TO authenticated;

-- Drop the overly permissive policy that exposes all certificate data
DROP POLICY IF EXISTS "Anyone can verify certificates by id" ON public.certificates;