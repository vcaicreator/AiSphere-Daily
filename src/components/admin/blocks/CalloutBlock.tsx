import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentBlock } from './types';
import { Info, CheckCircle, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';

interface CalloutBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

type CalloutType = 'info' | 'success' | 'warning' | 'error' | 'tip';

const CALLOUT_TYPES: { type: CalloutType; label: string; icon: React.ElementType; styles: string }[] = [
  { type: 'info', label: 'Info', icon: Info, styles: 'bg-blue-500/10 border-blue-500 text-blue-600' },
  { type: 'success', label: 'Success', icon: CheckCircle, styles: 'bg-green-500/10 border-green-500 text-green-600' },
  { type: 'warning', label: 'Warning', icon: AlertTriangle, styles: 'bg-amber-500/10 border-amber-500 text-amber-600' },
  { type: 'error', label: 'Error', icon: XCircle, styles: 'bg-red-500/10 border-red-500 text-red-600' },
  { type: 'tip', label: 'Tip', icon: Lightbulb, styles: 'bg-purple-500/10 border-purple-500 text-purple-600' },
];

export function CalloutBlock({ block, onChange }: CalloutBlockProps) {
  const calloutType = (block.blockData?.calloutType as CalloutType) || 'info';
  const selectedType = CALLOUT_TYPES.find(t => t.type === calloutType) || CALLOUT_TYPES[0];
  const Icon = selectedType.icon;

  return (
    <div className={`border-l-4 rounded-r-lg p-4 ${selectedType.styles}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Select 
              value={calloutType} 
              onValueChange={(v: CalloutType) => onChange({ ...block, blockData: { ...block.blockData, calloutType: v } })}
            >
              <SelectTrigger className="w-32 h-8 bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CALLOUT_TYPES.map((type) => (
                  <SelectItem key={type.type} value={type.type}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={block.heading || ''}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
              placeholder="Optional title..."
              className="h-8 bg-background/50 flex-1"
            />
          </div>
          <Textarea
            value={block.content}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            placeholder="Write your callout message here..."
            className="min-h-[60px] resize-none bg-background/50 border-0"
          />
        </div>
      </div>
    </div>
  );
}
