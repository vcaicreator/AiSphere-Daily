import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Link as LinkIcon, ExternalLink, RefreshCw } from 'lucide-react';
import { ContentBlock } from './types';
import { supabase } from '@/integrations/supabase/client';

interface LinkBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

interface LinkPreview {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

export function LinkBlock({ block, onChange }: LinkBlockProps) {
  const [url, setUrl] = useState(block.blockData?.linkUrl || '');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<LinkPreview | null>(
    block.blockData?.linkPreview ? block.blockData.linkPreview as LinkPreview : null
  );

  const fetchPreview = async () => {
    if (!url) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-link-preview', {
        body: { url }
      });

      if (error) throw error;

      if (data) {
        setPreview(data);
        onChange({
          ...block,
          content: data.title || url,
          blockData: {
            ...block.blockData,
            linkUrl: url,
            linkPreview: data
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch link preview:', error);
      // Set basic preview with URL only
      const basicPreview = { title: url, description: '', image: '', url, siteName: '' };
      setPreview(basicPreview);
      onChange({
        ...block,
        content: url,
        blockData: {
          ...block.blockData,
          linkUrl: url,
          linkPreview: basicPreview
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPreview();
  };

  if (preview) {
    return (
      <div className="relative border border-border rounded-lg overflow-hidden group">
        <a 
          href={preview.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex hover:bg-muted/50 transition-colors"
        >
          {preview.image && (
            <div className="w-32 h-32 flex-shrink-0">
              <img src={preview.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 p-4">
            <h4 className="font-semibold line-clamp-1">{preview.title}</h4>
            {preview.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{preview.description}</p>
            )}
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <LinkIcon className="w-3 h-3" />
              <span>{preview.siteName || new URL(preview.url).hostname}</span>
            </div>
          </div>
          <ExternalLink className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            setPreview(null);
            onChange({
              ...block,
              content: '',
              blockData: { ...block.blockData, linkUrl: '', linkPreview: null }
            });
          }}
        >
          <RefreshCw className="w-3 h-3 mr-1" /> Change
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleUrlSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL to create a link preview..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !url}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter a URL to automatically fetch title, description, and image
      </p>
    </form>
  );
}
