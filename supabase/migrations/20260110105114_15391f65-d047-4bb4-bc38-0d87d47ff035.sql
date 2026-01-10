-- Drop the existing public SELECT policy
DROP POLICY IF EXISTS "Authors are viewable by everyone" ON public.authors;

-- Create a new policy that only allows admins/editors to see all author data
CREATE POLICY "Admins and editors can view all author data"
ON public.authors
FOR SELECT
USING (is_admin_or_editor(auth.uid()));

-- Create a public view that excludes sensitive email data
CREATE OR REPLACE VIEW public.public_authors AS
SELECT 
  id,
  name,
  avatar_url,
  bio,
  social_links,
  created_at,
  updated_at
FROM public.authors;

-- Grant access to the view for anonymous and authenticated users
GRANT SELECT ON public.public_authors TO anon, authenticated;