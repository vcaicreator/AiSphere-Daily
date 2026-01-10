import { Textarea } from '@/components/ui/textarea';
import { ContentBlock } from './types';

interface ParagraphBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function ParagraphBlock({ block, onChange }: ParagraphBlockProps) {
  return (
    <Textarea
      value={block.content}
      onChange={(e) => onChange({ ...block, content: e.target.value })}
      placeholder="Write your paragraph here..."
      className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
    />
  );
}
