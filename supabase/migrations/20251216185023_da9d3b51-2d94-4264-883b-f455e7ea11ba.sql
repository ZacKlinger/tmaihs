-- Add input validation to check_user_votes function
-- This addresses the SECURITY DEFINER concern by adding strict input validation
CREATE OR REPLACE FUNCTION public.check_user_votes(p_voter_identifier text)
RETURNS TABLE(target_id uuid)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Input validation: voter_identifier should be between 10-100 chars
  -- and contain only alphanumeric characters, hyphens, and underscores
  IF p_voter_identifier IS NULL 
     OR length(p_voter_identifier) < 10 
     OR length(p_voter_identifier) > 100
     OR p_voter_identifier !~ '^[a-zA-Z0-9_-]+$' THEN
    RAISE EXCEPTION 'Invalid voter identifier format';
  END IF;

  -- Return the voted targets for this identifier
  RETURN QUERY
  SELECT COALESCE(post_id, reply_id) as target_id
  FROM public.discussion_upvotes
  WHERE voter_identifier = p_voter_identifier;
END;
$$;

COMMENT ON FUNCTION public.check_user_votes(text) IS 
'Checks which posts/replies a voter has upvoted. Uses SECURITY DEFINER to bypass RLS 
since discussion_upvotes SELECT is denied to prevent vote pattern exposure. 
Input validation ensures voter_identifier is 10-100 chars, alphanumeric with hyphens/underscores only.';