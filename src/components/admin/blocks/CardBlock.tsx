import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploader } from '../ImageUploader';
import { LayoutGrid, Star, Zap, Shield, Heart, Trophy, Lightbulb, Target } from 'lucide-react';
import { ContentBlock } from './types';

interface CardBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

const iconOptions = [
  { value: 'star', icon: Star, label: 'Star' },
  { value: 'zap', icon: Zap, label: 'Lightning' },
  { value: 'shield', icon: Shield, label: 'Shield' },
  { value: 'heart', icon: Heart, label: 'Heart' },
  { value: 'trophy', icon: Trophy, label: 'Trophy' },
  { value: 'lightbulb', icon: Lightbulb, label: 'Lightbulb' },
  { value: 'target', icon: Target, label: 'Target' },
];

export const CardBlock: React.FC<CardBlockProps> = ({ block, onUpdate }) => {
  const title = block.blockData?.title || '';
  const description = block.blockData?.description || '';
  const iconName = block.blockData?.icon || 'star';
  const imageUrl = block.blockData?.imageUrl || '';
  const linkUrl = block.blockData?.linkUrl || '';
  const linkText = block.blockData?.linkText || '';

  const updateField = (field: string, value: string) => {
    onUpdate({ ...block, blockData: { ...block.blockData, [field]: value } });
  };

  const IconComponent = iconOptions.find(i => i.value === iconName)?.icon || Star;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <LayoutGrid className="h-4 w-4" />
        <span>Feature Card Block</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Select value={iconName} onValueChange={(v) => updateField('icon', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center gap-2">
                    <opt.icon className="h-4 w-4" />
                    <span>{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Card title"
            value={title}
            onChange={(e) => updateField('title', e.target.value)}
          />

          <Textarea
            placeholder="Card description..."
            value={description}
            onChange={(e) => updateField('description', e.target.value)}
            className="min-h-[80px]"
          />

          <Input
            placeholder="Link URL (optional)"
            value={linkUrl}
            onChange={(e) => updateField('linkUrl', e.target.value)}
          />

          <Input
            placeholder="Link text (optional)"
            value={linkText}
            onChange={(e) => updateField('linkText', e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <ImageUploader
            value={imageUrl}
            onChange={(url) => updateField('imageUrl', url)}
            bucket="media"
            folder="cards"
          />

          {/* Preview */}
          <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <IconComponent className="h-6 w-6" />
              </div>
              <h4 className="font-semibold">{title || 'Card Title'}</h4>
            </div>
            {imageUrl && (
              <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded-md mb-3" />
            )}
            <p className="text-sm text-muted-foreground">
              {description || 'Card description goes here...'}
            </p>
            {linkText && (
              <p className="text-sm text-primary mt-2 font-medium">{linkText} →</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
