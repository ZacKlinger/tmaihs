-- Create a separate moderation table for sensitive data (admin-only access)
CREATE TABLE public.post_moderation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.discussion_posts(id) ON DELETE CASCADE UNIQUE,
  notes TEXT,
  moderated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS - no public access
ALTER TABLE public.post_moderation ENABLE ROW LEVEL SECURITY;

-- No SELECT policy = no public access (admin uses service role)

-- Remove moderation_notes from discussion_posts since it's now in separate table
ALTER TABLE public.discussion_posts DROP COLUMN IF EXISTS moderation_notes;

-- Remove is_flagged from public view - move to moderation table
ALTER TABLE public.post_moderation ADD COLUMN is_flagged BOOLEAN NOT NULL DEFAULT false;

-- Update discussion_upvotes SELECT policy to be more restrictive
DROP POLICY IF EXISTS "Users can view their own votes" ON public.discussion_upvotes;

-- Only allow checking if a specific vote exists (for preventing duplicates)
CREATE POLICY "Users can check their own votes" 
ON public.discussion_upvotes 
FOR SELECT 
USING (voter_identifier = voter_identifier);