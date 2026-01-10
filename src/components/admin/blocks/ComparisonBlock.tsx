import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

interface ComparisonBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function ComparisonBlock({ block, onChange }: ComparisonBlockProps) {
  const data = block.blockData?.comparisonData || { headers: ['Feature', 'Option A', 'Option B'], rows: [] };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...data.headers];
    newHeaders[index] = value;
    onChange({ ...block, blockData: { ...block.blockData, comparisonData: { ...data, headers: newHeaders } } });
  };

  const addColumn = () => {
    const newHeaders = [...data.headers, `Option ${data.headers.length}`];
    const newRows = data.rows.map(row => ({ ...row, values: [...row.values, ''] }));
    onChange({ ...block, blockData: { ...block.blockData, comparisonData: { headers: newHeaders, rows: newRows } } });
  };

  const removeColumn = (colIndex: number) => {
    if (data.headers.length <= 2) return;
    const newHeaders = data.headers.filter((_, i) => i !== colIndex);
    const newRows = data.rows.map(row => ({ 
      ...row, 
      values: row.values.filter((_, i) => i !== colIndex - 1) 
    }));
    onChange({ ...block, blockData: { ...block.blockData, comparisonData: { headers: newHeaders, rows: newRows } } });
  };

  const addRow = () => {
    const newRow = { feature: '', values: Array(data.headers.length - 1).fill('') };
    onChange({ ...block, blockData: { ...block.blockData, comparisonData: { ...data, rows: [...data.rows, newRow] } } });
  };

  const removeRow = (rowIndex: number) => {
    const newRows = data.rows.filter((_, i) => i !== rowIndex);
    onChange({ ...block, blockData: { ...block.blockData, comparisonData: { ...data, rows: newRows } } });
  };

  const updateRow = (rowIndex: number, field: 'feature' | number, value: string) => {
    const newRows = [...data.rows];
    if (field === 'feature') {
      newRows[rowIndex] = { ...newRows[rowIndex], feature: value };
    } else {
      const newValues = [...newRows[rowIndex].values];
      newValues[field] = value;
      newRows[rowIndex] = { ...newRows[rowIndex], values: newValues };
    }
    onChange({ ...block, blockData: { ...block.blockData, comparisonData: { ...data, rows: newRows } } });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowRight className="w-4 h-4" />
          <span className="text-sm">Comparison Table</span>
        </div>
        <Button variant="outline" size="sm" onClick={addColumn}>
          <Plus className="w-4 h-4 mr-1" /> Column
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {data.headers.map((header, index) => (
                <th key={index} className="p-2 border border-border bg-muted">
                  <div className="flex items-center gap-1">
                    <Input
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="h-8 text-sm font-semibold text-center"
                    />
                    {index > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeColumn(index)} className="h-6 w-6 p-0">
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border border-border">
                  <Input
                    value={row.feature}
                    onChange={(e) => updateRow(rowIndex, 'feature', e.target.value)}
                    placeholder="Feature"
                    className="h-8 text-sm"
                  />
                </td>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex} className="p-2 border border-border">
                    <Input
                      value={value}
                      onChange={(e) => updateRow(rowIndex, colIndex, e.target.value)}
                      placeholder="✓ or ✗"
                      className="h-8 text-sm text-center"
                    />
                  </td>
                ))}
                <td className="p-2 border-0">
                  <Button variant="ghost" size="sm" onClick={() => removeRow(rowIndex)} className="h-6 w-6 p-0">
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button variant="outline" size="sm" onClick={addRow} className="w-full">
        <Plus className="w-4 h-4 mr-2" /> Add Row
      </Button>
    </div>
  );
}
