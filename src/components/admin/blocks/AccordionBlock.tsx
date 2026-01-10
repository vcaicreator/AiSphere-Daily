import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';

interface AccordionBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function AccordionBlock({ block, onChange }: AccordionBlockProps) {
  const items = block.blockData?.accordionItems || [];

  const addItem = () => {
    const newItems = [...items, { id: crypto.randomUUID(), title: 'New Item', content: '', isOpen: false }];
    onChange({ ...block, blockData: { ...block.blockData, accordionItems: newItems } });
  };

  const updateItem = (index: number, field: 'title' | 'content', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...block, blockData: { ...block.blockData, accordionItems: newItems } });
  };

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], isOpen: !newItems[index].isOpen };
    onChange({ ...block, blockData: { ...block.blockData, accordionItems: newItems } });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange({ ...block, blockData: { ...block.blockData, accordionItems: newItems } });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="border border-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 p-3 bg-muted/50">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="flex-shrink-0"
            >
              {item.isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            <Input
              value={item.title}
              onChange={(e) => updateItem(index, 'title', e.target.value)}
              placeholder="Accordion title"
              className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
            />
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
          {item.isOpen && (
            <div className="p-3 border-t border-border">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem(index, 'content', e.target.value)}
                placeholder="Accordion content..."
                rows={3}
              />
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full">
        <Plus className="w-4 h-4 mr-2" /> Add Item
      </Button>
    </div>
  );
}
