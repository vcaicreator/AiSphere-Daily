import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContentBlock } from './types';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function QuoteBlock({ block, onChange }: QuoteBlockProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Quote className="h-8 w-8 text-muted-foreground/50 flex-shrink-0 mt-1" />
        <Textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Enter the quote..."
          className="min-h-[80px] resize-none border-0 focus-visible:ring-0 p-0 text-lg italic"
        />
      </div>
      <div className="space-y-2 pl-11">
        <Label className="text-xs text-muted-foreground">Attribution</Label>
        <Input
          value={block.heading || ''}
          onChange={(e) => onChange({ ...block, heading: e.target.value })}
          placeholder="— Author name"
          className="border-0 focus-visible:ring-0 p-0 text-sm text-muted-foreground"
        />
      </div>
    </div>
  );
}
