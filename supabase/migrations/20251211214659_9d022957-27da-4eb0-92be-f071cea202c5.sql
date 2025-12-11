-- Drop the view since it doesn't work well with RLS
DROP VIEW IF EXISTS public.discussion_posts_public;

-- Create a secure function to increment upvotes atomically
CREATE OR REPLACE FUNCTION public.increment_post_upvote(post_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.discussion_posts 
  SET upvotes = upvotes + 1 
  WHERE id = post_id_param AND is_hidden = false;
END;
$$;

-- Create a secure function to increment reply upvotes atomically
CREATE OR REPLACE FUNCTION public.increment_reply_upvote(reply_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.discussion_replies 
  SET upvotes = upvotes + 1 
  WHERE id = reply_id_param AND is_hidden = false;
END;
$$;