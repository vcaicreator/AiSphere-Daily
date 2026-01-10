import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ToggleBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function ToggleBlock({ block, onChange }: ToggleBlockProps) {
  const title = block.blockData?.toggleTitle || '';
  const isOpen = block.blockData?.toggleOpen ?? false;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...block, blockData: { ...block.blockData, toggleOpen: !isOpen } })}
          className="flex-shrink-0"
        >
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        <Input
          value={title}
          onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, toggleTitle: e.target.value } })}
          placeholder="Toggle title"
          className="flex-1"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Switch
          id="default-open"
          checked={isOpen}
          onCheckedChange={(checked) => onChange({ ...block, blockData: { ...block.blockData, toggleOpen: checked } })}
        />
        <Label htmlFor="default-open" className="text-sm text-muted-foreground">
          Open by default
        </Label>
      </div>

      <Textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Toggle content..."
        rows={3}
      />
    </div>
  );
}
