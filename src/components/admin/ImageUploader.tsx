import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useImageUpload, BucketName } from '@/hooks/useImageUpload';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string | null) => void;
  bucket: BucketName;
  folder?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  placeholder?: string;
  maxSizeMB?: number;
  showPreview?: boolean;
  previewClassName?: string;
  accept?: string;
}

export function ImageUploader({
  value,
  onChange,
  bucket,
  folder,
  className,
  aspectRatio = 'auto',
  placeholder = 'Drop an image here or click to upload',
  maxSizeMB = 5,
  showPreview = true,
  previewClassName,
  accept = 'image/jpeg,image/png,image/webp,image/gif',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, deleteImage, getPathFromUrl, isUploading, progress } =
    useImageUpload();

  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    auto: '',
  }[aspectRatio];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        const result = await upload(file, { bucket, folder, maxSizeMB });
        if (result) {
          onChange(result.url);
        }
      }
    },
    [upload, bucket, folder, maxSizeMB, onChange]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const result = await upload(file, { bucket, folder, maxSizeMB });
        if (result) {
          onChange(result.url);
        }
      }
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [upload, bucket, folder, maxSizeMB, onChange]
  );

  const handleRemove = useCallback(async () => {
    if (value) {
      const path = getPathFromUrl(value, bucket);
      if (path) {
        await deleteImage(bucket, path);
      }
      onChange(null);
    }
  }, [value, bucket, getPathFromUrl, deleteImage, onChange]);

  const handleClick = () => {
    if (!isUploading) {
      inputRef.current?.click();
    }
  };

  if (value && showPreview) {
    return (
      <div className={cn('relative group', className)}>
        <div
          className={cn(
            'relative overflow-hidden rounded-lg border border-border bg-muted',
            aspectRatioClass,
            previewClassName
          )}
        >
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClick}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-1" />
              Replace
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg transition-all cursor-pointer',
          aspectRatioClass,
          'min-h-[120px] flex flex-col items-center justify-center gap-2 p-4',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50',
          isUploading && 'pointer-events-none opacity-70'
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
            <div className="w-full max-w-xs">
              <Progress value={progress} className="h-2" />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {placeholder}
            </p>
            <p className="text-xs text-muted-foreground/70">
              JPG, PNG, WebP, GIF • Max {maxSizeMB}MB
            </p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
