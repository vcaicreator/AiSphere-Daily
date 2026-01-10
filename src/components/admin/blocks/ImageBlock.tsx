import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ContentBlock } from './types';

interface ImageBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function ImageBlock({ block, onChange }: ImageBlockProps) {
  const alignment = block.blockData?.alignment || 'center';

  return (
    <div className="space-y-4">
      <ImageUploader
        value={block.imageUrl}
        onChange={(url) => onChange({ ...block, imageUrl: url || undefined })}
        bucket="article-images"
        aspectRatio="video"
        placeholder="Upload an image for this block"
        maxSizeMB={5}
      />

      {block.imageUrl && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Alt Text</Label>
            <Input
              value={block.blockData?.alt || ''}
              onChange={(e) =>
                onChange({
                  ...block,
                  blockData: { ...block.blockData, alt: e.target.value },
                })
              }
              placeholder="Describe the image..."
            />
          </div>
          <div className="space-y-2">
            <Label>Alignment</Label>
            <Select
              value={alignment}
              onValueChange={(value: 'left' | 'center' | 'right') =>
                onChange({
                  ...block,
                  blockData: { ...block.blockData, alignment: value },
                })
              }
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
          <div className="col-span-2 space-y-2">
            <Label>Caption (optional)</Label>
            <Input
              value={block.blockData?.caption || ''}
              onChange={(e) =>
                onChange({
                  ...block,
                  blockData: { ...block.blockData, caption: e.target.value },
                })
              }
              placeholder="Add a caption..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
