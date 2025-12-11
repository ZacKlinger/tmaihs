-- Drop the security definer view
DROP VIEW IF EXISTS public.discussion_posts_public;

-- Create the view with SECURITY INVOKER (default, safer)
CREATE VIEW public.discussion_posts_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  author_name,
  is_anonymous,
  post_type,
  content,
  upvotes,
  is_flagged,
  is_hidden,
  created_at,
  updated_at
FROM public.discussion_posts
WHERE is_hidden = false;

-- Grant access to the view
GRANT SELECT ON public.discussion_posts_public TO anon, authenticated;