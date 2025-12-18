-- Add course_status to existing course_progress table
ALTER TABLE public.course_progress 
ADD COLUMN IF NOT EXISTS course_status TEXT NOT NULL DEFAULT 'not_started';

-- Add check constraint for valid statuses
ALTER TABLE public.course_progress
ADD CONSTRAINT course_status_valid CHECK (course_status IN ('not_started', 'in_progress', 'completed', 'credited'));

-- Create module_definitions table - source of truth for modules per course
CREATE TABLE public.module_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id TEXT NOT NULL UNIQUE,
  course_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.module_definitions ENABLE ROW LEVEL SECURITY;

-- Module definitions are public read (structure of courses)
CREATE POLICY "Anyone can view module definitions" 
ON public.module_definitions 
FOR SELECT 
USING (true);

-- Create module_progress table - per-user module mastery
CREATE TABLE public.module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  mastered BOOLEAN NOT NULL DEFAULT false,
  mastered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Enable RLS
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;

-- Users can only view their own module progress
CREATE POLICY "Users can view their own module progress" 
ON public.module_progress 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own module progress
CREATE POLICY "Users can insert their own module progress" 
ON public.module_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own module progress
CREATE POLICY "Users can update their own module progress" 
ON public.module_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create check_attempts table - full attempt history
CREATE TABLE public.check_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  check_id TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  item_correctness JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INTEGER NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.check_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own check attempts
CREATE POLICY "Users can view their own check attempts" 
ON public.check_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own check attempts
CREATE POLICY "Users can insert their own check attempts" 
ON public.check_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at on module_progress
CREATE TRIGGER update_module_progress_updated_at
BEFORE UPDATE ON public.module_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_module_definitions_course_id ON public.module_definitions(course_id);
CREATE INDEX idx_module_progress_user_module ON public.module_progress(user_id, module_id);
CREATE INDEX idx_check_attempts_user_module ON public.check_attempts(user_id, module_id);