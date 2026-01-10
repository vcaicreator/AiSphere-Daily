import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Youtube, Twitter, Instagram, Video, X } from 'lucide-react';
import { ContentBlock } from './types';

interface EmbedBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

type EmbedType = 'youtube' | 'twitter' | 'instagram' | 'vimeo' | 'codepen' | 'spotify';

const EMBED_OPTIONS: { type: EmbedType; label: string; icon: React.ElementType; placeholder: string }[] = [
  { type: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/watch?v=...' },
  { type: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: 'https://twitter.com/user/status/...' },
  { type: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/p/...' },
  { type: 'vimeo', label: 'Vimeo', icon: Video, placeholder: 'https://vimeo.com/...' },
  { type: 'codepen', label: 'CodePen', icon: Video, placeholder: 'https://codepen.io/user/pen/...' },
  { type: 'spotify', label: 'Spotify', icon: Video, placeholder: 'https://open.spotify.com/track/...' },
];

function extractEmbedId(url: string, type: EmbedType): string | null {
  try {
    const urlObj = new URL(url);
    switch (type) {
      case 'youtube': {
        const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
        return videoId || null;
      }
      case 'vimeo': {
        return urlObj.pathname.split('/').pop() || null;
      }
      case 'spotify': {
        const match = url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
        return match ? `${match[1]}/${match[2]}` : null;
      }
      default:
        return url;
    }
  } catch {
    return null;
  }
}

function getEmbedHtml(url: string, type: EmbedType): string | null {
  const embedId = extractEmbedId(url, type);
  if (!embedId) return null;

  switch (type) {
    case 'youtube':
      return `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${embedId}" frameborder="0" allowfullscreen></iframe>`;
    case 'vimeo':
      return `<iframe width="100%" height="400" src="https://player.vimeo.com/video/${embedId}" frameborder="0" allowfullscreen></iframe>`;
    case 'spotify':
      return `<iframe src="https://open.spotify.com/embed/${embedId}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    case 'twitter':
      return `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote>`;
    case 'instagram':
      return `<blockquote class="instagram-media" data-instgrm-permalink="${url}"></blockquote>`;
    case 'codepen':
      return `<iframe height="400" style="width: 100%;" scrolling="no" src="${url.replace('/pen/', '/embed/')}?default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`;
    default:
      return null;
  }
}

export function EmbedBlock({ block, onChange }: EmbedBlockProps) {
  const [url, setUrl] = useState(block.blockData?.embedUrl || '');
  const [embedType, setEmbedType] = useState<EmbedType>(block.blockData?.embedType || 'youtube');
  const [showPreview, setShowPreview] = useState(!!block.blockData?.embedUrl);

  const handleEmbed = () => {
    const embedHtml = getEmbedHtml(url, embedType);
    if (embedHtml) {
      onChange({
        ...block,
        content: embedHtml,
        blockData: {
          ...block.blockData,
          embedUrl: url,
          embedType,
          embedHtml
        }
      });
      setShowPreview(true);
    }
  };

  const handleClear = () => {
    setUrl('');
    setShowPreview(false);
    onChange({
      ...block,
      content: '',
      blockData: { ...block.blockData, embedUrl: '', embedType: 'youtube', embedHtml: '' }
    });
  };

  const selectedOption = EMBED_OPTIONS.find(o => o.type === embedType);

  if (showPreview && block.blockData?.embedHtml) {
    return (
      <div className="relative group">
        <div 
          className="rounded-lg overflow-hidden bg-muted"
          dangerouslySetInnerHTML={{ __html: block.blockData.embedHtml as string }}
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleClear}
        >
          <X className="w-3 h-3 mr-1" /> Remove
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Select value={embedType} onValueChange={(v: EmbedType) => setEmbedType(v)}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {EMBED_OPTIONS.map((option) => (
            <SelectItem key={option.type} value={option.type}>
              <div className="flex items-center gap-2">
                <option.icon className="w-4 h-4" />
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={selectedOption?.placeholder}
          className="flex-1"
        />
        <Button onClick={handleEmbed} disabled={!url}>
          Embed
        </Button>
      </div>
    </div>
  );
}
