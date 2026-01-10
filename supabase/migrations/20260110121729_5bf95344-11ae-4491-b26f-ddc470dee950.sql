-- Fix overly permissive RLS policies

-- 1. Fix activity_logs INSERT policy - restrict to authenticated admins/editors only
DROP POLICY IF EXISTS "System can insert activity logs" ON public.activity_logs;

CREATE POLICY "Admins and editors can insert activity logs"
ON public.activity_logs
FOR INSERT
TO authenticated
WITH CHECK (is_admin_or_editor(auth.uid()));

-- 2. Fix contact_submissions INSERT policy - allow public but require valid data format
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form with valid email"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(name) > 0 
  AND length(name) <= 255
  AND length(subject) > 0 
  AND length(subject) <= 500
  AND length(message) > 0 
  AND length(message) <= 10000
);