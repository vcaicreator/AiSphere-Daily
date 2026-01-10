import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, GripVertical } from 'lucide-react';
import { ContentBlock } from './types';

interface TableBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

interface TableData {
  headers: string[];
  rows: string[][];
  hasHeader: boolean;
}

export function TableBlock({ block, onChange }: TableBlockProps) {
  const [tableData, setTableData] = useState<TableData>(() => {
    const saved = block.blockData?.tableData as TableData | undefined;
    return saved || {
      headers: ['Column 1', 'Column 2', 'Column 3'],
      rows: [['', '', ''], ['', '', '']],
      hasHeader: true
    };
  });

  useEffect(() => {
    onChange({
      ...block,
      content: JSON.stringify(tableData),
      blockData: { ...block.blockData, tableData }
    });
  }, [tableData]);

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    setTableData({ ...tableData, rows: newRows });
  };

  const updateHeader = (colIndex: number, value: string) => {
    const newHeaders = [...tableData.headers];
    newHeaders[colIndex] = value;
    setTableData({ ...tableData, headers: newHeaders });
  };

  const addRow = () => {
    const newRow = new Array(tableData.headers.length).fill('');
    setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
  };

  const removeRow = (rowIndex: number) => {
    if (tableData.rows.length > 1) {
      setTableData({ ...tableData, rows: tableData.rows.filter((_, i) => i !== rowIndex) });
    }
  };

  const addColumn = () => {
    setTableData({
      ...tableData,
      headers: [...tableData.headers, `Column ${tableData.headers.length + 1}`],
      rows: tableData.rows.map(row => [...row, ''])
    });
  };

  const removeColumn = (colIndex: number) => {
    if (tableData.headers.length > 2) {
      setTableData({
        ...tableData,
        headers: tableData.headers.filter((_, i) => i !== colIndex),
        rows: tableData.rows.map(row => row.filter((_, i) => i !== colIndex))
      });
    }
  };

  const toggleHeader = () => {
    setTableData({ ...tableData, hasHeader: !tableData.hasHeader });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={addColumn}>
          <Plus className="w-3 h-3 mr-1" /> Column
        </Button>
        <Button variant="outline" size="sm" onClick={addRow}>
          <Plus className="w-3 h-3 mr-1" /> Row
        </Button>
        <Button 
          variant={tableData.hasHeader ? 'secondary' : 'outline'} 
          size="sm" 
          onClick={toggleHeader}
        >
          Header Row
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          {tableData.hasHeader && (
            <thead className="bg-muted">
              <tr>
                <th className="w-8"></th>
                {tableData.headers.map((header, colIndex) => (
                  <th key={colIndex} className="p-1 border-b border-r last:border-r-0">
                    <div className="flex items-center gap-1">
                      <Input
                        value={header}
                        onChange={(e) => updateHeader(colIndex, e.target.value)}
                        className="border-0 bg-transparent font-semibold text-center h-8"
                      />
                      {tableData.headers.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => removeColumn(colIndex)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="group">
                <td className="w-8 bg-muted border-r">
                  <div className="flex items-center justify-center gap-1">
                    <GripVertical className="w-3 h-3 text-muted-foreground" />
                    {tableData.rows.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={() => removeRow(rowIndex)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-1 border-b border-r last:border-r-0">
                    <Input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="border-0 bg-transparent h-8"
                      placeholder="..."
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
