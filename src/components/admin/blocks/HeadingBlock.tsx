import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentBlock } from './types';

interface HeadingBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function HeadingBlock({ block, onChange }: HeadingBlockProps) {
  const level = block.blockData?.headingLevel || 'h2';

  const textSizeClass = {
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-medium',
  }[level];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Select
          value={level}
          onValueChange={(value: 'h2' | 'h3' | 'h4') =>
            onChange({
              ...block,
              blockData: { ...block.blockData, headingLevel: value },
            })
          }
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h2">H2</SelectItem>
            <SelectItem value="h3">H3</SelectItem>
            <SelectItem value="h4">H4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Enter heading..."
        className={`border-0 focus-visible:ring-0 p-0 ${textSizeClass}`}
      />
    </div>
  );
}
