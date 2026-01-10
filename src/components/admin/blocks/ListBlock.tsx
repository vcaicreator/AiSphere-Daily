import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentBlock } from './types';
import { List, ListOrdered } from 'lucide-react';

interface ListBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function ListBlock({ block, onChange }: ListBlockProps) {
  const listType = block.blockData?.listType || 'bullet';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {listType === 'bullet' ? (
          <List className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ListOrdered className="h-4 w-4 text-muted-foreground" />
        )}
        <Label className="text-xs text-muted-foreground">List Type</Label>
        <Select
          value={listType}
          onValueChange={(value: 'bullet' | 'numbered') =>
            onChange({
              ...block,
              blockData: { ...block.blockData, listType: value },
            })
          }
        >
          <SelectTrigger className="w-28 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bullet">Bullet</SelectItem>
            <SelectItem value="numbered">Numbered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Enter each list item on a new line..."
        className="min-h-[100px] resize-none font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        Enter each list item on a new line.
      </p>
    </div>
  );
}
