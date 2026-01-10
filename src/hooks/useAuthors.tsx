import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Author = Tables<'authors'>;
export type AuthorInsert = TablesInsert<'authors'>;
export type AuthorUpdate = TablesUpdate<'authors'>;

// Public author type (without email)
export type PublicAuthor = Omit<Author, 'email'>;

// Fetch all authors for admin (includes email)
export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Author[];
    },
  });
};

// Fetch all public authors (without email) - for public-facing pages
export const usePublicAuthors = () => {
  return useQuery({
    queryKey: ['public-authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('public_authors')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as PublicAuthor[];
    },
  });
};

// Fetch single author by ID (admin - includes email)
export const useAuthor = (id: string | undefined) => {
  return useQuery({
    queryKey: ['author', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Author | null;
    },
    enabled: !!id,
  });
};

// Fetch single public author by ID (without email) - for public-facing pages
export const usePublicAuthor = (id: string | undefined) => {
  return useQuery({
    queryKey: ['public-author', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('public_authors')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as PublicAuthor | null;
    },
    enabled: !!id,
  });
};

// Create author
export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (author: AuthorInsert) => {
      const { data, error } = await supabase
        .from('authors')
        .insert(author)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

// Update author
export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: AuthorUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('authors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};

// Delete author
export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};
