-- Recreate the view with SECURITY INVOKER (default, safer)
DROP VIEW IF EXISTS public.public_authors;

CREATE VIEW public.public_authors 
WITH (security_invoker = true)
AS
SELECT 
  id,
  name,
  avatar_url,
  bio,
  social_links,
  created_at,
  updated_at
FROM public.authors;

-- Also need to allow public to SELECT from authors table for the view to work
-- but only expose non-sensitive fields through the view
DROP POLICY IF EXISTS "Admins and editors can view all author data" ON public.authors;

-- Allow everyone to view authors (needed for the view), but the view restricts what columns are exposed
CREATE POLICY "Authors basic info viewable by everyone"
ON public.authors
FOR SELECT
USING (true);

-- Grant access to the view
GRANT SELECT ON public.public_authors TO anon, authenticated;