-- Fix the security definer view by recreating with security_invoker = true
DROP VIEW IF EXISTS public.certificate_verification;

CREATE VIEW public.certificate_verification 
WITH (security_invoker = true) AS
SELECT 
  certificate_id,
  recipient_name,
  issued_at,
  created_at
FROM public.certificates;

-- Re-grant access
GRANT SELECT ON public.certificate_verification TO anon;
GRANT SELECT ON public.certificate_verification TO authenticated;