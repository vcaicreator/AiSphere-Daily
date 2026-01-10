import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabsBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function TabsBlock({ block, onChange }: TabsBlockProps) {
  const tabs = block.blockData?.tabItems || [];
  const activeTab = block.blockData?.activeTab || tabs[0]?.id || '';

  const addTab = () => {
    const newTab = { id: crypto.randomUUID(), label: `Tab ${tabs.length + 1}`, content: '' };
    const newTabs = [...tabs, newTab];
    onChange({ ...block, blockData: { ...block.blockData, tabItems: newTabs, activeTab: newTab.id } });
  };

  const updateTab = (id: string, field: 'label' | 'content', value: string) => {
    const newTabs = tabs.map(tab => 
      tab.id === id ? { ...tab, [field]: value } : tab
    );
    onChange({ ...block, blockData: { ...block.blockData, tabItems: newTabs } });
  };

  const removeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    const newActiveTab = activeTab === id ? (newTabs[0]?.id || '') : activeTab;
    onChange({ ...block, blockData: { ...block.blockData, tabItems: newTabs, activeTab: newActiveTab } });
  };

  const setActiveTab = (id: string) => {
    onChange({ ...block, blockData: { ...block.blockData, activeTab: id } });
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 flex-wrap border-b border-border pb-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-t-lg cursor-pointer transition-colors",
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted hover:bg-muted/80"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <Input
              value={tab.label}
              onChange={(e) => {
                e.stopPropagation();
                updateTab(tab.id, 'label', e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className="h-6 w-24 bg-transparent border-0 p-0 text-sm focus-visible:ring-0"
            />
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className="opacity-60 hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={addTab} className="h-8">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {activeTabData && (
        <Textarea
          value={activeTabData.content}
          onChange={(e) => updateTab(activeTabData.id, 'content', e.target.value)}
          placeholder="Tab content..."
          rows={4}
        />
      )}
    </div>
  );
}
