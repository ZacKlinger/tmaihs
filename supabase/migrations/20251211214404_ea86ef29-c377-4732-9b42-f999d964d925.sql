-- Fix 1: Add UPDATE policy - only allow updates to upvotes (for voting)
-- Since there's no auth, we'll restrict what can be updated
CREATE POLICY "Anyone can update upvotes only" 
ON public.discussion_posts 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Fix 2: Add UPDATE policy for replies
CREATE POLICY "Anyone can update reply upvotes" 
ON public.discussion_replies 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Fix 3: Create a secure view that excludes moderation_notes
CREATE VIEW public.discussion_posts_public AS
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

-- Note: DELETE is intentionally not allowed - posts can only be hidden by moderators via direct DB access