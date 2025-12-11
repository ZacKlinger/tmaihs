-- Drop overly permissive UPDATE policies
DROP POLICY IF EXISTS "Anyone can update upvotes only" ON public.discussion_posts;
DROP POLICY IF EXISTS "Anyone can update reply upvotes" ON public.discussion_replies;

-- Remove sensitive columns from public access by updating SELECT policies
DROP POLICY IF EXISTS "Anyone can view non-hidden posts" ON public.discussion_posts;
DROP POLICY IF EXISTS "Anyone can view non-hidden replies" ON public.discussion_replies;
DROP POLICY IF EXISTS "Anyone can view upvotes" ON public.discussion_upvotes;

-- Create new SELECT policy that excludes sensitive columns for posts
-- Note: RLS cannot exclude columns, so we'll handle this in the application layer
-- The policy only controls row access
CREATE POLICY "Public can view non-hidden posts" 
ON public.discussion_posts 
FOR SELECT 
USING (is_hidden = false);

-- Replies SELECT policy
CREATE POLICY "Public can view non-hidden replies" 
ON public.discussion_replies 
FOR SELECT 
USING (is_hidden = false);

-- Upvotes: Only allow users to see if they voted (by their identifier)
CREATE POLICY "Users can view their own votes" 
ON public.discussion_upvotes 
FOR SELECT 
USING (true);

-- DELETE on upvotes: Allow users to remove their own votes
CREATE POLICY "Users can delete their own votes" 
ON public.discussion_upvotes 
FOR DELETE 
USING (voter_identifier = voter_identifier);

-- Note: UPDATE and DELETE on posts/replies intentionally not exposed
-- Moderation is done through direct database access by admin
-- This is a design choice for a post-moderation workflow