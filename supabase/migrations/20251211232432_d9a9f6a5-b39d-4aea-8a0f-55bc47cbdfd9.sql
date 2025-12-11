-- =====================================================
-- FIX #1: Add validation triggers for content length
-- (Using triggers instead of CHECK constraints per guidelines)
-- =====================================================

-- Create validation function for content length
CREATE OR REPLACE FUNCTION public.validate_content_length()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate content length (max 5000 chars)
  IF length(NEW.content) > 5000 THEN
    RAISE EXCEPTION 'Content exceeds maximum length of 5000 characters';
  END IF;
  
  -- Validate author_name length (max 100 chars)
  IF length(NEW.author_name) > 100 THEN
    RAISE EXCEPTION 'Author name exceeds maximum length of 100 characters';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger to discussion_posts
CREATE TRIGGER validate_posts_content_length
  BEFORE INSERT OR UPDATE ON public.discussion_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_content_length();

-- Add trigger to discussion_replies  
CREATE TRIGGER validate_replies_content_length
  BEFORE INSERT OR UPDATE ON public.discussion_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_content_length();

-- =====================================================
-- FIX #2: Replace RPC functions with trigger-based upvote counting
-- This prevents vote manipulation by making upvote counts automatic
-- =====================================================

-- Create function to sync upvote counts automatically
CREATE OR REPLACE FUNCTION public.sync_upvote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment counter when upvote record is inserted
    IF NEW.post_id IS NOT NULL THEN
      UPDATE public.discussion_posts
      SET upvotes = upvotes + 1
      WHERE id = NEW.post_id AND is_hidden = false;
    ELSIF NEW.reply_id IS NOT NULL THEN
      UPDATE public.discussion_replies
      SET upvotes = upvotes + 1
      WHERE id = NEW.reply_id AND is_hidden = false;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on discussion_upvotes to auto-increment counters
CREATE TRIGGER upvote_sync_trigger
  AFTER INSERT ON public.discussion_upvotes
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_upvote_count();

-- Drop the old RPC functions since they're no longer needed
-- The UNIQUE constraints on discussion_upvotes already prevent duplicate votes
DROP FUNCTION IF EXISTS public.increment_post_upvote(uuid);
DROP FUNCTION IF EXISTS public.increment_reply_upvote(uuid);