-- Create page_views table for tracking all page visits
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  page_title TEXT,
  article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  session_id TEXT,
  visitor_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for efficient querying
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);
CREATE INDEX idx_page_views_article_id ON public.page_views(article_id);
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX idx_page_views_visitor_id ON public.page_views(visitor_id);
CREATE INDEX idx_page_views_session_id ON public.page_views(session_id);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert page views (for tracking)
CREATE POLICY "Anyone can log page views"
ON public.page_views FOR INSERT
WITH CHECK (true);

-- Only admins/editors can read page views
CREATE POLICY "Admins can read page views"
ON public.page_views FOR SELECT
USING (is_admin_or_editor(auth.uid()));

-- Create analytics_events table for custom event tracking
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_category TEXT,
  event_label TEXT,
  event_value NUMERIC,
  page_path TEXT,
  article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
  session_id TEXT,
  visitor_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for analytics_events
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_events_article_id ON public.analytics_events(article_id);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone can insert events (for tracking)
CREATE POLICY "Anyone can log events"
ON public.analytics_events FOR INSERT
WITH CHECK (true);

-- Only admins/editors can read events
CREATE POLICY "Admins can read events"
ON public.analytics_events FOR SELECT
USING (is_admin_or_editor(auth.uid()));

-- Enable realtime for page_views (for live dashboard)
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;