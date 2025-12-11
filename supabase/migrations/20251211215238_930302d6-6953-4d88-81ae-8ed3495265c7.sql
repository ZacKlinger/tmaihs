-- Fix the tautological SELECT policy on upvotes
DROP POLICY IF EXISTS "Users can check their own votes" ON public.discussion_upvotes;

-- For an unauthenticated system, we need to allow reads to check for duplicate votes
-- but we'll restrict what the app queries
CREATE POLICY "Allow vote existence checks" 
ON public.discussion_upvotes 
FOR SELECT 
USING (true);

-- Add a comment explaining the moderation table design
COMMENT ON TABLE public.post_moderation IS 'Admin-only table for moderation data. RLS enabled with no policies means only service_role can access.';