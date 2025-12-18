-- Add admin-only write policies for module_definitions
-- Only admins can insert/update/delete module definitions
CREATE POLICY "Admins can manage module definitions" 
ON public.module_definitions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));