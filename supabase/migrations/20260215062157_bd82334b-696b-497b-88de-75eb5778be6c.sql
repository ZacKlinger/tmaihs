
-- Fix overly permissive INSERT policies on discussion tables
-- These are intentionally public (anonymous discussion board) but should have basic validation

-- discussion_posts: require content to be non-empty and within length limits
DROP POLICY IF EXISTS "Anyone can create posts" ON public.discussion_posts;
CREATE POLICY "Anyone can create posts with valid content"
ON public.discussion_posts
FOR INSERT
WITH CHECK (
  content IS NOT NULL
  AND length(content) > 0
  AND length(content) <= 5000
  AND length(author_name) <= 100
);

-- discussion_replies: require content and valid post reference
DROP POLICY IF EXISTS "Anyone can create replies" ON public.discussion_replies;
CREATE POLICY "Anyone can create replies with valid content"
ON public.discussion_replies
FOR INSERT
WITH CHECK (
  content IS NOT NULL
  AND length(content) > 0
  AND length(content) <= 5000
  AND length(author_name) <= 100
  AND post_id IS NOT NULL
);

-- discussion_upvotes: require either post_id or reply_id (not both, not neither)
DROP POLICY IF EXISTS "Anyone can create upvotes" ON public.discussion_upvotes;
CREATE POLICY "Anyone can create upvotes with valid target"
ON public.discussion_upvotes
FOR INSERT
WITH CHECK (
  voter_identifier IS NOT NULL
  AND length(voter_identifier) >= 10
  AND (
    (post_id IS NOT NULL AND reply_id IS NULL)
    OR (post_id IS NULL AND reply_id IS NOT NULL)
  )
);
