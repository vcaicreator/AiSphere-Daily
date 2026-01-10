import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Article = Tables<'articles'> & {
  category?: Tables<'categories'> | null;
  author?: Tables<'authors'> | null;
  sections?: Tables<'article_sections'>[];
};

export type ArticleInsert = TablesInsert<'articles'>;
export type ArticleUpdate = TablesUpdate<'articles'>;

// Fetch all published articles
export const usePublishedArticles = () => {
  return useQuery({
    queryKey: ['articles', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          author:authors(*),
          sections:article_sections(*)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Fetch all articles (for admin)
export const useAllArticles = () => {
  return useQuery({
    queryKey: ['articles', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          author:authors(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Fetch single article by slug
export const useArticle = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          author:authors(*),
          sections:article_sections(*)
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    },
    enabled: !!slug,
  });
};

// Fetch article by ID (for admin editing)
export const useArticleById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['article', 'id', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          author:authors(*),
          sections:article_sections(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    },
    enabled: !!id,
  });
};

// Fetch featured articles (most recent published)
export const useFeaturedArticles = (limit = 6) => {
  return useQuery({
    queryKey: ['articles', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          author:authors(*)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Fetch related articles (same category, excluding current)
export const useRelatedArticles = (articleId: string | undefined, categoryId: string | undefined, limit = 3) => {
  return useQuery({
    queryKey: ['articles', 'related', articleId, categoryId],
    queryFn: async () => {
      if (!articleId || !categoryId) return [];

      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          author:authors(*)
        `)
        .eq('status', 'published')
        .eq('category_id', categoryId)
        .neq('id', articleId)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },
    enabled: !!articleId && !!categoryId,
  });
};

// Create article
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: ArticleInsert) => {
      const { data, error } = await supabase
        .from('articles')
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Update article
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ArticleUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Delete article
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Increment view count
export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      // Manual increment since we don't have RPC function
      const { data: article } = await supabase
        .from('articles')
        .select('views_count')
        .eq('id', id)
        .single();
      
      if (article) {
        await supabase
          .from('articles')
          .update({ views_count: (article.views_count || 0) + 1 })
          .eq('id', id);
      }
    },
  });
};
