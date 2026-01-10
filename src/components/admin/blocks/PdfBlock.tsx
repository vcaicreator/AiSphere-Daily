import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface PdfBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function PdfBlock({ block, onChange }: PdfBlockProps) {
  const pdfUrl = block.blockData?.pdfUrl || '';
  const pdfHeight = block.blockData?.pdfHeight || '600px';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FileText className="w-4 h-4" />
        <span className="text-sm">PDF Viewer</span>
      </div>

      <div>
        <Label className="text-sm">PDF File</Label>
        <ImageUploader
          value={pdfUrl || undefined}
          onChange={(url) => onChange({ ...block, blockData: { ...block.blockData, pdfUrl: url || '' } })}
          bucket="media"
          accept="application/pdf"
          placeholder="Upload PDF file"
        />
      </div>

      <div>
        <Label className="text-sm">Viewer Height</Label>
        <Input
          value={pdfHeight}
          onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, pdfHeight: e.target.value } })}
          placeholder="600px"
        />
      </div>

      {pdfUrl && (
        <div className="border border-border rounded-lg overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full"
            style={{ height: pdfHeight }}
            title="PDF Viewer"
          />
        </div>
      )}
    </div>
  );
}
