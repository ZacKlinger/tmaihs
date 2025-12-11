-- Fix the tautological DELETE policy on upvotes
DROP POLICY IF EXISTS "Users can delete their own votes" ON public.discussion_upvotes;

-- Since there's no auth, we'll just not allow deletes (votes are permanent)
-- This prevents vote manipulation