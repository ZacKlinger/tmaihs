-- Fix 1: Create views to hide anonymous_identifier from public access
-- This provides database-level protection for anonymous user tracking data

-- Create public view for discussion_posts (excludes anonymous_identifier)
CREATE OR REPLACE VIEW public.discussion_posts_public AS
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

-- Create public view for discussion_replies (excludes anonymous_identifier)
CREATE OR REPLACE VIEW public.discussion_replies_public AS
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

-- Grant SELECT on views to anon and authenticated roles
GRANT SELECT ON public.discussion_posts_public TO anon, authenticated;
GRANT SELECT ON public.discussion_replies_public TO anon, authenticated;

-- Fix 2: Replace tautological DELETE policy with explicit deny policy
-- Drop the existing tautological policy
DROP POLICY IF EXISTS "Users can delete their own votes" ON public.discussion_upvotes;

-- Create new policy that explicitly denies all deletions (immutable votes)
CREATE POLICY "Votes are immutable"
ON public.discussion_upvotes
FOR DELETE
USING (false);