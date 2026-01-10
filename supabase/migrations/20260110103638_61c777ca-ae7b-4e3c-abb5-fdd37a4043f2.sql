-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'author');

-- Create article_status enum
CREATE TYPE public.article_status AS ENUM ('draft', 'published', 'scheduled', 'archived');

-- Create authors table
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  featured_image TEXT,
  introduction TEXT,
  conclusion TEXT,
  tags TEXT[] DEFAULT '{}',
  status public.article_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  read_time_minutes INTEGER DEFAULT 5,
  word_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create article_sections table
CREATE TABLE public.article_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profile for security)
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS on all tables
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor')
  )
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE ON public.authors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for authors table
CREATE POLICY "Authors are viewable by everyone"
  ON public.authors FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert authors"
  ON public.authors FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update authors"
  ON public.authors FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete authors"
  ON public.authors FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for categories table
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for articles table
CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (status = 'published' OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can insert articles"
  ON public.articles FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update articles"
  ON public.articles FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for article_sections table
CREATE POLICY "Article sections of published articles are viewable by everyone"
  ON public.article_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.articles
      WHERE articles.id = article_sections.article_id
        AND (articles.status = 'published' OR public.is_admin_or_editor(auth.uid()))
    )
  );

CREATE POLICY "Admins and editors can insert article sections"
  ON public.article_sections FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update article sections"
  ON public.article_sections FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can delete article sections"
  ON public.article_sections FOR DELETE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for newsletter_subscribers table
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update subscribers"
  ON public.newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Create storage bucket for author avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('author-avatars', 'author-avatars', true);

-- Storage policies for article-images bucket
CREATE POLICY "Article images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

CREATE POLICY "Admins and editors can upload article images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'article-images' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update article images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'article-images' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete article images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for author-avatars bucket
CREATE POLICY "Author avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'author-avatars');

CREATE POLICY "Admins and editors can upload author avatars"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'author-avatars' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update author avatars"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'author-avatars' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete author avatars"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'author-avatars' AND public.has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_category_id ON public.articles(category_id);
CREATE INDEX idx_articles_author_id ON public.articles(author_id);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_article_sections_article_id ON public.article_sections(article_id);
CREATE INDEX idx_article_sections_order ON public.article_sections(article_id, order_index);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- Insert default AI-focused categories
INSERT INTO public.categories (name, slug, description, color) VALUES
  ('AI News', 'ai-news', 'Latest news and updates from the AI world', '#f59e0b'),
  ('Machine Learning', 'machine-learning', 'Deep dives into ML algorithms and techniques', '#3b82f6'),
  ('AI Tools', 'ai-tools', 'Reviews and guides for AI-powered tools', '#10b981'),
  ('AI Ethics', 'ai-ethics', 'Discussions on responsible AI development', '#8b5cf6'),
  ('AI Business', 'ai-business', 'AI applications in business and industry', '#ef4444'),
  ('Research', 'research', 'Latest AI research papers and breakthroughs', '#06b6d4');