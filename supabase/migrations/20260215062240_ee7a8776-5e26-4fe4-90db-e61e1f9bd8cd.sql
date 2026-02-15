
-- Remove the old permissive policies that still exist
DROP POLICY IF EXISTS "Anyone can create posts" ON public.discussion_posts;
DROP POLICY IF EXISTS "Anyone can create replies" ON public.discussion_replies;
DROP POLICY IF EXISTS "Anyone can create upvotes" ON public.discussion_upvotes;
