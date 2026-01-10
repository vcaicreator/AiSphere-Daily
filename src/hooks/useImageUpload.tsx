import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type BucketName = 'article-images' | 'author-avatars';

interface UploadOptions {
  bucket: BucketName;
  folder?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

interface UploadResult {
  url: string;
  path: string;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (
    file: File,
    options: UploadOptions
  ): Promise<UploadResult | null> => {
    const {
      bucket,
      folder = '',
      maxSizeMB = 5,
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    } = options;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      toast.error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
      return null;
    }

    // Validate file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`File too large. Maximum size: ${maxSizeMB}MB`);
      return null;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}-${randomId}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      clearInterval(progressInterval);

      if (error) {
        throw error;
      }

      setProgress(100);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      toast.success('Image uploaded successfully!');

      return {
        url: urlData.publicUrl,
        path: data.path,
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const deleteImage = async (
    bucket: BucketName,
    path: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) {
        throw error;
      }

      toast.success('Image deleted successfully!');
      return true;
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete image');
      return false;
    }
  };

  const getPathFromUrl = (url: string, bucket: BucketName): string | null => {
    try {
      const bucketPath = `/storage/v1/object/public/${bucket}/`;
      const index = url.indexOf(bucketPath);
      if (index === -1) return null;
      return url.substring(index + bucketPath.length);
    } catch {
      return null;
    }
  };

  return {
    upload,
    deleteImage,
    getPathFromUrl,
    isUploading,
    progress,
  };
}
