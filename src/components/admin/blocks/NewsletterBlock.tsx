import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentBlock } from './types';

interface NewsletterBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

export const NewsletterBlock: React.FC<NewsletterBlockProps> = ({ block, onUpdate }) => {
  const title = block.blockData?.title || 'Subscribe to our newsletter';
  const description = block.blockData?.description || 'Get the latest articles delivered to your inbox.';
  const buttonText = block.blockData?.buttonText || 'Subscribe';
  const placeholder = block.blockData?.placeholder || 'Enter your email';
  const style = block.blockData?.style || 'default';
  const backgroundColor = block.blockData?.backgroundColor || '';

  const updateField = (field: string, value: string) => {
    onUpdate({ ...block, blockData: { ...block.blockData, [field]: value } });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Mail className="h-4 w-4" />
        <span>Newsletter CTA Block</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => updateField('title', e.target.value)}
        />
        <Select value={style} onValueChange={(v) => updateField('style', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="banner">Banner</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => updateField('description', e.target.value)}
        className="min-h-[60px]"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Email placeholder text"
          value={placeholder}
          onChange={(e) => updateField('placeholder', e.target.value)}
        />
        <Input
          placeholder="Button text"
          value={buttonText}
          onChange={(e) => updateField('buttonText', e.target.value)}
        />
      </div>

      <Input
        type="color"
        value={backgroundColor || '#f3f4f6'}
        onChange={(e) => updateField('backgroundColor', e.target.value)}
        className="w-20 h-10 p-1"
      />

      {/* Preview */}
      <div 
        className={`p-6 rounded-lg border ${style === 'card' ? 'shadow-md' : ''}`}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        <div className={`${style === 'banner' ? 'flex items-center justify-between gap-4' : 'text-center'}`}>
          <div className={style === 'banner' ? 'flex-1' : ''}>
            <div className="flex items-center gap-2 justify-center mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">{title}</h4>
            </div>
            {style !== 'minimal' && (
              <p className="text-sm text-muted-foreground mb-4">{description}</p>
            )}
          </div>
          
          <div className={`flex gap-2 ${style === 'banner' ? '' : 'max-w-md mx-auto'}`}>
            <Input
              placeholder={placeholder}
              className="flex-1"
              disabled
            />
            <Button disabled>
              {style === 'minimal' ? <Send className="h-4 w-4" /> : buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
