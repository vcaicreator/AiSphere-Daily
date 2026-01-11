import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { ContentBlock } from './types';

interface AlertBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

type AlertType = 'info' | 'success' | 'warning' | 'error' | 'neutral';

const alertStyles: Record<AlertType, { icon: React.ReactNode; bg: string; border: string; text: string }> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200'
  },
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200'
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200'
  },
  error: {
    icon: <XCircle className="h-5 w-5" />,
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200'
  },
  neutral: {
    icon: <AlertCircle className="h-5 w-5" />,
    bg: 'bg-muted/50',
    border: 'border-border',
    text: 'text-foreground'
  }
};

export const AlertBlock: React.FC<AlertBlockProps> = ({ block, onUpdate }) => {
  const alertType: AlertType = block.blockData?.alertType || 'info';
  const title = block.blockData?.title || '';
  const style = alertStyles[alertType];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <AlertCircle className="h-4 w-4" />
        <span>Alert/Notice Block</span>
      </div>

      <div className="flex gap-4">
        <Select
          value={alertType}
          onValueChange={(value: AlertType) => 
            onUpdate({ ...block, blockData: { ...block.blockData, alertType: value } })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="info">ℹ️ Info</SelectItem>
            <SelectItem value="success">✅ Success</SelectItem>
            <SelectItem value="warning">⚠️ Warning</SelectItem>
            <SelectItem value="error">❌ Error</SelectItem>
            <SelectItem value="neutral">📌 Neutral</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Alert title (optional)"
          value={title}
          onChange={(e) => onUpdate({ ...block, blockData: { ...block.blockData, title: e.target.value } })}
          className="flex-1"
        />
      </div>

      <Textarea
        placeholder="Alert message..."
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="min-h-[80px]"
      />

      {/* Preview */}
      <div className={`p-4 rounded-lg border ${style.bg} ${style.border}`}>
        <div className={`flex items-start gap-3 ${style.text}`}>
          {style.icon}
          <div className="flex-1">
            {title && <p className="font-semibold mb-1">{title}</p>}
            <p className="text-sm">{block.content || 'Alert message preview'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
