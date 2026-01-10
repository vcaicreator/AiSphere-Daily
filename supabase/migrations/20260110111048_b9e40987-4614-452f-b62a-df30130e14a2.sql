-- Add block_type and block_data columns to article_sections for the block editor
ALTER TABLE public.article_sections 
ADD COLUMN block_type text NOT NULL DEFAULT 'paragraph',
ADD COLUMN image_url text,
ADD COLUMN block_data jsonb DEFAULT '{}'::jsonb;

-- Add constraint for valid block types
ALTER TABLE public.article_sections
ADD CONSTRAINT valid_block_type CHECK (block_type IN ('paragraph', 'heading', 'image', 'quote', 'list', 'code', 'divider'));

-- Add featured_image and display_order to categories
ALTER TABLE public.categories
ADD COLUMN featured_image text,
ADD COLUMN display_order integer DEFAULT 0;

-- Create site_settings table for global configuration
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_settings
CREATE POLICY "Site settings are viewable by everyone"
ON public.site_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site settings"
ON public.site_settings
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on site_settings
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();