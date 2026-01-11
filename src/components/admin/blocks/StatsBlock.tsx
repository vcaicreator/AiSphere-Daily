import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, TrendingUp } from 'lucide-react';
import { ContentBlock } from './types';

interface StatsBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const StatsBlock: React.FC<StatsBlockProps> = ({ block, onUpdate }) => {
  const stats: StatItem[] = block.blockData?.stats || [
    { id: '1', value: '100', label: 'Users', prefix: '', suffix: '+' }
  ];

  const updateStats = (newStats: StatItem[]) => {
    onUpdate({
      ...block,
      blockData: { ...block.blockData, stats: newStats }
    });
  };

  const addStat = () => {
    updateStats([
      ...stats,
      { id: crypto.randomUUID(), value: '0', label: 'Label', prefix: '', suffix: '' }
    ]);
  };

  const updateStat = (id: string, field: keyof StatItem, value: string) => {
    updateStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStat = (id: string) => {
    if (stats.length > 1) {
      updateStats(stats.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <TrendingUp className="h-4 w-4" />
        <span>Statistics Block</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Prefix ($, +)"
                value={stat.prefix || ''}
                onChange={(e) => updateStat(stat.id, 'prefix', e.target.value)}
                className="w-20"
              />
              <Input
                placeholder="Value"
                value={stat.value}
                onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                className="flex-1 text-center font-bold"
              />
              <Input
                placeholder="Suffix (%, +)"
                value={stat.suffix || ''}
                onChange={(e) => updateStat(stat.id, 'suffix', e.target.value)}
                className="w-20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStat(stat.id)}
                disabled={stats.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addStat} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Statistic
      </Button>
    </div>
  );
};
