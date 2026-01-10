import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileDown, File, FileText, FileImage, FileVideo, FileAudio } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface FileBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function FileBlock({ block, onChange }: FileBlockProps) {
  const fileUrl = block.blockData?.fileUrl || '';
  const fileName = block.blockData?.fileName || '';
  const fileSize = block.blockData?.fileSize || '';
  const fileType = block.blockData?.fileType || '';

  const getFileIcon = () => {
    if (fileType.includes('image')) return FileImage;
    if (fileType.includes('video')) return FileVideo;
    if (fileType.includes('audio')) return FileAudio;
    if (fileType.includes('pdf') || fileType.includes('document')) return FileText;
    return File;
  };

  const FileIcon = getFileIcon();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FileDown className="w-4 h-4" />
        <span className="text-sm">File Download</span>
      </div>

      <div>
        <Label className="text-sm">File</Label>
        <ImageUploader
          value={fileUrl || undefined}
          onChange={(url) => {
            onChange({ 
              ...block, 
              blockData: { 
                ...block.blockData, 
                fileUrl: url || '',
                fileType: url ? 'application/octet-stream' : ''
              } 
            });
          }}
          bucket="media"
          accept="*/*"
          placeholder="Upload file"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Display Name</Label>
          <Input
            value={fileName}
            onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, fileName: e.target.value } })}
            placeholder="File name to display"
          />
        </div>
        <div>
          <Label className="text-sm">File Size (optional)</Label>
          <Input
            value={fileSize}
            onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, fileSize: e.target.value } })}
            placeholder="e.g., 2.5 MB"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm">Button Text</Label>
        <Input
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Download Now"
        />
      </div>

      {fileUrl && (
        <div className="p-4 bg-muted rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{fileName || 'Unnamed File'}</p>
            {fileSize && <p className="text-sm text-muted-foreground">{fileSize}</p>}
          </div>
          <a 
            href={fileUrl} 
            download 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
          >
            {block.content || 'Download'}
          </a>
        </div>
      )}
    </div>
  );
}
