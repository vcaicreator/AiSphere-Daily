import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { X, Plus, GripVertical } from 'lucide-react';
import { ContentBlock } from './types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface GalleryBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

interface GalleryImage {
  url: string;
  caption: string;
  alt: string;
}

type ColumnsCount = '2' | '3' | '4';

export function GalleryBlock({ block, onChange }: GalleryBlockProps) {
  const [showUploader, setShowUploader] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const images: GalleryImage[] = (block.blockData?.galleryImages as GalleryImage[]) || [];
  const columns = (block.blockData?.galleryColumns as ColumnsCount) || '3';

  const updateImages = (newImages: GalleryImage[]) => {
    onChange({
      ...block,
      content: JSON.stringify(newImages),
      blockData: { ...block.blockData, galleryImages: newImages }
    });
  };

  const addImage = (url: string | undefined) => {
    if (url) {
      const newImage: GalleryImage = { url, caption: '', alt: '' };
      updateImages([...images, newImage]);
      setShowUploader(false);
    }
  };

  const removeImage = (index: number) => {
    updateImages(images.filter((_, i) => i !== index));
  };

  const updateImageCaption = (index: number, caption: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], caption };
    updateImages(newImages);
  };

  const getGridClass = () => {
    switch (columns) {
      case '2': return 'grid-cols-2';
      case '4': return 'grid-cols-4';
      default: return 'grid-cols-3';
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => setShowUploader(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Columns:</span>
          <Select 
            value={columns} 
            onValueChange={(v: ColumnsCount) => onChange({ ...block, blockData: { ...block.blockData, galleryColumns: v } })}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload Dialog */}
      {showUploader && (
        <div className="border rounded-lg p-4 bg-muted/50">
          <ImageUploader
            bucket="article-images"
            onChange={addImage}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowUploader(false)}
            className="mt-2"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className={`grid gap-4 ${getGridClass()}`}>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                    <img 
                      src={image.url} 
                      alt={image.alt || `Gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                  <img 
                    src={image.url} 
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                </DialogContent>
              </Dialog>
              
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Caption input */}
              <Input
                value={image.caption}
                onChange={(e) => updateImageCaption(index, e.target.value)}
                placeholder="Add caption..."
                className="mt-2 text-sm h-8"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center text-muted-foreground">
          <p>No images added yet. Click "Add Image" to get started.</p>
        </div>
      )}
    </div>
  );
}
