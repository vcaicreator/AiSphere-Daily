import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Headphones } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface AudioBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function AudioBlock({ block, onChange }: AudioBlockProps) {
  const audioUrl = block.blockData?.audioUrl || '';
  const title = block.blockData?.audioTitle || '';
  const artist = block.blockData?.audioArtist || '';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Headphones className="w-4 h-4" />
        <span className="text-sm">Audio / Podcast</span>
      </div>

      <div>
        <Label className="text-sm">Audio File</Label>
        <ImageUploader
          value={audioUrl || undefined}
          onChange={(url) => onChange({ ...block, blockData: { ...block.blockData, audioUrl: url || '' } })}
          bucket="media"
          accept="audio/*"
          placeholder="Upload audio file"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Title</Label>
          <Input
            value={title}
            onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, audioTitle: e.target.value } })}
            placeholder="Track title"
          />
        </div>
        <div>
          <Label className="text-sm">Artist</Label>
          <Input
            value={artist}
            onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, audioArtist: e.target.value } })}
            placeholder="Artist name"
          />
        </div>
      </div>

      {audioUrl && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{title || 'Untitled'}</p>
              <p className="text-sm text-muted-foreground">{artist || 'Unknown Artist'}</p>
            </div>
          </div>
          <audio src={audioUrl} controls className="w-full mt-3" />
        </div>
      )}
    </div>
  );
}
