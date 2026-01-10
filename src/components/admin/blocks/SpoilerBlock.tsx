import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EyeOff } from 'lucide-react';

interface SpoilerBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function SpoilerBlock({ block, onChange }: SpoilerBlockProps) {
  const label = block.blockData?.spoilerLabel || 'Click to reveal';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <EyeOff className="w-4 h-4" />
        <span className="text-sm">Spoiler / Hidden Content</span>
      </div>
      
      <div>
        <Label className="text-sm">Button Label</Label>
        <Input
          value={label}
          onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, spoilerLabel: e.target.value } })}
          placeholder="Click to reveal"
        />
      </div>

      <div>
        <Label className="text-sm">Hidden Content</Label>
        <Textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Content that will be hidden until clicked..."
          rows={4}
        />
      </div>
    </div>
  );
}
