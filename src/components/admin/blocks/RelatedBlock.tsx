import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link2, Plus, Trash2, ExternalLink } from 'lucide-react';
import { ContentBlock } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface RelatedBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
  onChange?: (block: ContentBlock) => void;
}

interface RelatedArticle {
  id: string;
  articleId?: string;
  customTitle?: string;
  customUrl?: string;
}

export const RelatedBlock: React.FC<RelatedBlockProps> = ({ block, onUpdate }) => {
  const { data: articles } = useQuery({
    queryKey: ['articles-list'],
    queryFn: async () => {
      const { data } = await supabase.from('articles').select('id, title, status').eq('status', 'published');
      return data || [];
    }
  });
  const relatedItems: RelatedArticle[] = block.blockData?.relatedItems || [];
  const title = block.blockData?.title || 'Related Articles';
  const layout = block.blockData?.layout || 'list';

  const publishedArticles = articles || [];

  const updateItems = (newItems: RelatedArticle[]) => {
    onUpdate({
      ...block,
      blockData: { ...block.blockData, relatedItems: newItems }
    });
  };

  const addItem = () => {
    updateItems([
      ...relatedItems,
      { id: crypto.randomUUID() }
    ]);
  };

  const updateItem = (id: string, field: keyof RelatedArticle, value: string) => {
    updateItems(relatedItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    updateItems(relatedItems.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Link2 className="h-4 w-4" />
        <span>Related Articles Block</span>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Section title"
          value={title}
          onChange={(e) => onUpdate({ 
            ...block, 
            blockData: { ...block.blockData, title: e.target.value } 
          })}
          className="flex-1"
        />

        <Select
          value={layout}
          onValueChange={(v) => onUpdate({ 
            ...block, 
            blockData: { ...block.blockData, layout: v } 
          })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="list">List</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="cards">Cards</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {relatedItems.map((item) => (
          <div key={item.id} className="flex gap-2 items-start p-3 border rounded-lg bg-muted/30">
            <div className="flex-1 space-y-2">
              <Select
                value={item.articleId || ''}
                onValueChange={(v) => updateItem(item.id, 'articleId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an article..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Custom link</SelectItem>
                  {publishedArticles.map((article) => (
                    <SelectItem key={article.id} value={article.id}>
                      {article.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!item.articleId && (
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Custom title"
                    value={item.customTitle || ''}
                    onChange={(e) => updateItem(item.id, 'customTitle', e.target.value)}
                  />
                  <Input
                    placeholder="Custom URL"
                    value={item.customUrl || ''}
                    onChange={(e) => updateItem(item.id, 'customUrl', e.target.value)}
                  />
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Related Article
      </Button>

      {/* Preview */}
      {relatedItems.length > 0 && (
        <div className="p-4 border rounded-lg bg-muted/20">
          <h4 className="font-semibold mb-3">{title}</h4>
          <div className={layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
            {relatedItems.map((item) => {
              const article = publishedArticles.find(a => a.id === item.articleId);
              const displayTitle = article?.title || item.customTitle || 'Untitled';
              return (
                <div key={item.id} className="flex items-center gap-2 text-sm p-2 rounded bg-background">
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  <span>{displayTitle}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
