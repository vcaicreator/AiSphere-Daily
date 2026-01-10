import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ContentBlock } from './types';

interface ButtonBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

export function ButtonBlock({ block, onChange }: ButtonBlockProps) {
  const variant = (block.blockData?.buttonVariant as ButtonVariant) || 'primary';
  const size = (block.blockData?.buttonSize as ButtonSize) || 'medium';
  const openNewTab = block.blockData?.openNewTab as boolean || false;
  const alignment = block.blockData?.alignment || 'left';

  const getButtonClasses = () => {
    const baseClasses = 'inline-block font-medium rounded-full transition-colors';
    
    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border-2 border-primary text-primary hover:bg-primary/10'
    };

    const sizeClasses = {
      small: 'px-4 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg'
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  };

  const getAlignmentClass = () => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className={`p-4 bg-muted/50 rounded-lg ${getAlignmentClass()}`}>
        <span className={getButtonClasses()}>
          {block.content || 'Button Text'}
        </span>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Button Text</Label>
          <Input
            value={block.content}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            placeholder="Click Here"
          />
        </div>
        <div className="space-y-2">
          <Label>URL</Label>
          <Input
            value={block.blockData?.buttonUrl as string || ''}
            onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, buttonUrl: e.target.value } })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Style</Label>
          <Select 
            value={variant} 
            onValueChange={(v: ButtonVariant) => onChange({ ...block, blockData: { ...block.blockData, buttonVariant: v } })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Size</Label>
          <Select 
            value={size} 
            onValueChange={(v: ButtonSize) => onChange({ ...block, blockData: { ...block.blockData, buttonSize: v } })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Alignment</Label>
          <Select 
            value={alignment}
            onValueChange={(v: 'left' | 'center' | 'right') => onChange({ ...block, blockData: { ...block.blockData, alignment: v } })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={openNewTab}
          onCheckedChange={(checked) => onChange({ ...block, blockData: { ...block.blockData, openNewTab: checked } })}
        />
        <Label>Open in new tab</Label>
      </div>
    </div>
  );
}
