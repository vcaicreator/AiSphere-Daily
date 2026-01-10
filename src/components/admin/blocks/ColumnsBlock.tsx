import { ContentBlock } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Columns2, Columns3 } from 'lucide-react';

interface ColumnsBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function ColumnsBlock({ block, onChange }: ColumnsBlockProps) {
  const columnCount = block.blockData?.columnCount || '2';
  const columnContents = block.blockData?.columnContents || ['', ''];

  const handleColumnCountChange = (count: '2' | '3' | '4') => {
    const currentContents = [...columnContents];
    const numCols = parseInt(count);
    while (currentContents.length < numCols) {
      currentContents.push('');
    }
    onChange({ 
      ...block, 
      blockData: { 
        ...block.blockData, 
        columnCount: count, 
        columnContents: currentContents.slice(0, numCols) 
      } 
    });
  };

  const updateColumn = (index: number, value: string) => {
    const newContents = [...columnContents];
    newContents[index] = value;
    onChange({ ...block, blockData: { ...block.blockData, columnContents: newContents } });
  };

  const numCols = parseInt(columnCount);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label className="text-sm">Columns</Label>
        <Select value={columnCount} onValueChange={handleColumnCountChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">
              <span className="flex items-center gap-2"><Columns2 className="w-4 h-4" /> 2 Columns</span>
            </SelectItem>
            <SelectItem value="3">
              <span className="flex items-center gap-2"><Columns3 className="w-4 h-4" /> 3 Columns</span>
            </SelectItem>
            <SelectItem value="4">
              <span className="flex items-center gap-2">4 Columns</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={`grid gap-4 grid-cols-${numCols}`} style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
        {Array.from({ length: numCols }).map((_, index) => (
          <div key={index} className="space-y-1">
            <Label className="text-xs text-muted-foreground">Column {index + 1}</Label>
            <Textarea
              value={columnContents[index] || ''}
              onChange={(e) => updateColumn(index, e.target.value)}
              placeholder={`Column ${index + 1} content...`}
              rows={4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
