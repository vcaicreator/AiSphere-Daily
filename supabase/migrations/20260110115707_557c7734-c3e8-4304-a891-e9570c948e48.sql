-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  responded_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact submissions
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions" ON public.contact_submissions
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Activity logs table
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  user_email TEXT,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  entity_name TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for activity logs
CREATE POLICY "Admins can view activity logs" ON public.activity_logs
  FOR SELECT USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "System can insert activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (true);

-- Article revisions table
CREATE TABLE public.article_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  revision_number INTEGER NOT NULL DEFAULT 1,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for article revisions
CREATE POLICY "Admins and editors can view revisions" ON public.article_revisions
  FOR SELECT USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can insert revisions" ON public.article_revisions
  FOR INSERT WITH CHECK (is_admin_or_editor(auth.uid()));

-- Add scheduled_for column to articles if not exists (for scheduling)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'articles' 
                 AND column_name = 'scheduled_for') THEN
    ALTER TABLE public.articles ADD COLUMN scheduled_for TIMESTAMPTZ;
  END IF;
END $$;

-- Add email settings to site_settings defaults
INSERT INTO public.site_settings (key, value) VALUES 
  ('report_emails', '{"value": ""}'),
  ('weekly_reports_enabled', '{"value": false}'),
  ('contact_notification_email', '{"value": ""}')
ON CONFLICT (key) DO NOTHING;