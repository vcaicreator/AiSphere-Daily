-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Create a more specific policy that requires a valid email format
CREATE POLICY "Anyone can subscribe with valid email"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');