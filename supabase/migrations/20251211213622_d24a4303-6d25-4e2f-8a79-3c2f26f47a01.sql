-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create enum for post types
CREATE TYPE public.post_type AS ENUM ('question', 'concern', 'excitement');

-- Create discussion posts table
CREATE TABLE public.discussion_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  post_type post_type NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  is_flagged BOOLEAN NOT NULL DEFAULT false,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  moderation_notes TEXT,
  anonymous_identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create replies table
CREATE TABLE public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.discussion_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  content TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  is_flagged BOOLEAN NOT NULL DEFAULT false,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  anonymous_identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create upvotes tracking table
CREATE TABLE public.discussion_upvotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.discussion_posts(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
  voter_identifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT upvote_target CHECK (
    (post_id IS NOT NULL AND reply_id IS NULL) OR 
    (post_id IS NULL AND reply_id IS NOT NULL)
  )
);

-- Create unique constraints for upvotes
CREATE UNIQUE INDEX idx_unique_post_upvote ON public.discussion_upvotes(post_id, voter_identifier) WHERE post_id IS NOT NULL;
CREATE UNIQUE INDEX idx_unique_reply_upvote ON public.discussion_upvotes(reply_id, voter_identifier) WHERE reply_id IS NOT NULL;

-- Enable RLS
ALTER TABLE public.discussion_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_upvotes ENABLE ROW LEVEL SECURITY;

-- Public read access for non-hidden posts
CREATE POLICY "Anyone can view non-hidden posts" 
ON public.discussion_posts 
FOR SELECT 
USING (is_hidden = false);

-- Public insert access
CREATE POLICY "Anyone can create posts" 
ON public.discussion_posts 
FOR INSERT 
WITH CHECK (true);

-- Public read access for non-hidden replies
CREATE POLICY "Anyone can view non-hidden replies" 
ON public.discussion_replies 
FOR SELECT 
USING (is_hidden = false);

-- Public insert access for replies
CREATE POLICY "Anyone can create replies" 
ON public.discussion_replies 
FOR INSERT 
WITH CHECK (true);

-- Public access for upvotes
CREATE POLICY "Anyone can view upvotes" 
ON public.discussion_upvotes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create upvotes" 
ON public.discussion_upvotes 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.discussion_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.discussion_replies;

-- Create updated_at trigger
CREATE TRIGGER update_discussion_posts_updated_at
BEFORE UPDATE ON public.discussion_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();