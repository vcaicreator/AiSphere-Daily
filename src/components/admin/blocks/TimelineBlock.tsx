import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Calendar, GripVertical } from 'lucide-react';

interface TimelineBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function TimelineBlock({ block, onChange }: TimelineBlockProps) {
  const items = block.blockData?.timelineItems || [];
  const layout = block.blockData?.timelineLayout || 'left';

  const addItem = () => {
    const newItems = [...items, { id: crypto.randomUUID(), date: '', title: '', description: '' }];
    onChange({ ...block, blockData: { ...block.blockData, timelineItems: newItems } });
  };

  const updateItem = (index: number, field: 'date' | 'title' | 'description', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...block, blockData: { ...block.blockData, timelineItems: newItems } });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange({ ...block, blockData: { ...block.blockData, timelineItems: newItems } });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Timeline</span>
        </div>
        <Select value={layout} onValueChange={(v: 'left' | 'right' | 'alternating') => 
          onChange({ ...block, blockData: { ...block.blockData, timelineLayout: v } })
        }>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left Aligned</SelectItem>
            <SelectItem value="right">Right Aligned</SelectItem>
            <SelectItem value="alternating">Alternating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="relative pl-8 border-l-2 border-primary/20 pb-4">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
            <div className="flex items-start gap-2">
              <GripVertical className="w-4 h-4 mt-2 text-muted-foreground cursor-move flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Input
                  value={item.date}
                  onChange={(e) => updateItem(index, 'date', e.target.value)}
                  placeholder="Date (e.g., Jan 2024)"
                  className="text-sm font-medium"
                />
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  placeholder="Event title"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Description..."
                  rows={2}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-destructive hover:text-destructive"
                disabled={items.length <= 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addItem} className="w-full">
        <Plus className="w-4 h-4 mr-2" /> Add Event
      </Button>
    </div>
  );
}
