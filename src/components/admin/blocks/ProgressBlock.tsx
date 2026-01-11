import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, BarChart3 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { ContentBlock } from './types';

interface ProgressBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

interface ProgressItem {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export const ProgressBlock: React.FC<ProgressBlockProps> = ({ block, onUpdate }) => {
  const items: ProgressItem[] = block.blockData?.items || [
    { id: '1', label: 'Progress', value: 75, color: 'hsl(var(--primary))' }
  ];

  const updateItems = (newItems: ProgressItem[]) => {
    onUpdate({
      ...block,
      blockData: { ...block.blockData, items: newItems }
    });
  };

  const addItem = () => {
    updateItems([
      ...items,
      { id: crypto.randomUUID(), label: 'New Skill', value: 50, color: 'hsl(var(--primary))' }
    ]);
  };

  const updateItem = (id: string, field: keyof ProgressItem, value: string | number) => {
    updateItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      updateItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <BarChart3 className="h-4 w-4" />
        <span>Progress Bars</span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Label"
                value={item.label}
                onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                className="flex-1"
              />
              <Input
                type="color"
                value={item.color || '#3b82f6'}
                onChange={(e) => updateItem(item.id, 'color', e.target.value)}
                className="w-12 h-9 p-1 cursor-pointer"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                disabled={items.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[item.value]}
                onValueChange={(v) => updateItem(item.id, 'value', v[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{item.value}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Progress Bar
      </Button>
    </div>
  );
};
