-- Fix views to use SECURITY INVOKER instead of SECURITY DEFINER
-- This ensures the views use the querying user's permissions, not the view creator's

-- Drop and recreate discussion_posts_public view with SECURITY INVOKER
DROP VIEW IF EXISTS public.discussion_posts_public;
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

-- Drop and recreate discussion_replies_public view with SECURITY INVOKER
DROP VIEW IF EXISTS public.discussion_replies_public;
CREATE VIEW public.discussion_replies_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  post_id,
  author_name, 
  is_anonymous, 
  content, 
  upvotes, 
  is_flagged,
  is_hidden,
  created_at
FROM public.discussion_replies
WHERE is_hidden = false;

-- Re-grant SELECT on views to anon and authenticated roles
GRANT SELECT ON public.discussion_posts_public TO anon, authenticated;
GRANT SELECT ON public.discussion_replies_public TO anon, authenticated;