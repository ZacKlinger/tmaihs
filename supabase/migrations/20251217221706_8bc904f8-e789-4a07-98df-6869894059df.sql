-- Allow admins to view all user progress for certificate dashboard
CREATE POLICY "Admins can view all user progress"
ON public.user_progress
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));