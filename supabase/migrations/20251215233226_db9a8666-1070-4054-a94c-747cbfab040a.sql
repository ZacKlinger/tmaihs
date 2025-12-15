-- Create a secure function to check vote existence without exposing voting patterns
-- This replaces direct SELECT queries on discussion_upvotes

CREATE OR REPLACE FUNCTION public.check_user_votes(p_voter_identifier text)
RETURNS TABLE(target_id uuid) 
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(post_id, reply_id) as target_id
  FROM public.discussion_upvotes
  WHERE voter_identifier = p_voter_identifier;
$$;

-- Grant execute to public (for anonymous users)
GRANT EXECUTE ON FUNCTION public.check_user_votes(text) TO anon;
GRANT EXECUTE ON FUNCTION public.check_user_votes(text) TO authenticated;

-- Now we can restrict the direct SELECT policy on discussion_upvotes
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow vote existence checks" ON public.discussion_upvotes;

-- Create a more restrictive policy - only allow users to see their own votes
-- This prevents querying other users' voting patterns
CREATE POLICY "Users can only view their own votes" 
ON public.discussion_upvotes 
FOR SELECT 
USING (false);  -- Deny direct SELECT, force use of RPC function