import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type ArticleSection = Tables<'article_sections'>;
export type ArticleSectionInsert = TablesInsert<'article_sections'>;
export type ArticleSectionUpdate = TablesUpdate<'article_sections'>;

// Create section
export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: ArticleSectionInsert) => {
      const { data, error } = await supabase
        .from('article_sections')
        .insert(section)
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

// Update section
export const useUpdateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ArticleSectionUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('article_sections')
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

// Delete section
export const useDeleteSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('article_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Bulk upsert sections for an article
export const useBulkUpsertSections = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      articleId,
      sections,
    }: {
      articleId: string;
      sections: { heading: string; content: string; order_index: number }[];
    }) => {
      // First, delete existing sections
      await supabase
        .from('article_sections')
        .delete()
        .eq('article_id', articleId);

      // Then insert new sections
      if (sections.length > 0) {
        const { error } = await supabase.from('article_sections').insert(
          sections.map((section, index) => ({
            article_id: articleId,
            heading: section.heading,
            content: section.content,
            order_index: section.order_index ?? index,
          }))
        );

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
