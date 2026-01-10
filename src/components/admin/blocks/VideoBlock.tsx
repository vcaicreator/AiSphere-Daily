import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Video, Upload } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface VideoBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function VideoBlock({ block, onChange }: VideoBlockProps) {
  const videoType = block.blockData?.videoType || 'youtube';
  const videoUrl = block.blockData?.videoUrl || '';
  const caption = block.blockData?.videoCaption || '';
  const autoplay = block.blockData?.autoplay || false;
  const loop = block.blockData?.loop || false;
  const muted = block.blockData?.muted || false;

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getVideoPreview = () => {
    if (videoType === 'youtube' && videoUrl) {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full aspect-video rounded-lg"
            allowFullScreen
          />
        );
      }
    }
    if (videoType === 'vimeo' && videoUrl) {
      const match = videoUrl.match(/vimeo\.com\/(\d+)/);
      if (match) {
        return (
          <iframe
            src={`https://player.vimeo.com/video/${match[1]}`}
            className="w-full aspect-video rounded-lg"
            allowFullScreen
          />
        );
      }
    }
    if (videoType === 'upload' && videoUrl) {
      return (
        <video 
          src={videoUrl} 
          controls 
          className="w-full aspect-video rounded-lg"
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
        />
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Video className="w-4 h-4" />
        <span className="text-sm">Video</span>
      </div>

      <div>
        <Label className="text-sm">Video Source</Label>
        <Select 
          value={videoType} 
          onValueChange={(v: 'upload' | 'youtube' | 'vimeo') => 
            onChange({ ...block, blockData: { ...block.blockData, videoType: v, videoUrl: '' } })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="vimeo">Vimeo</SelectItem>
            <SelectItem value="upload">Upload</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {videoType === 'upload' ? (
        <div>
          <Label className="text-sm">Video File</Label>
          <ImageUploader
            value={videoUrl || undefined}
            onChange={(url) => onChange({ ...block, blockData: { ...block.blockData, videoUrl: url || '' } })}
            bucket="media"
            accept="video/*"
            placeholder="Upload video file"
          />
        </div>
      ) : (
        <div>
          <Label className="text-sm">{videoType === 'youtube' ? 'YouTube' : 'Vimeo'} URL</Label>
          <Input
            value={videoUrl}
            onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, videoUrl: e.target.value } })}
            placeholder={videoType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://vimeo.com/...'}
          />
        </div>
      )}

      {videoType === 'upload' && (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              id="autoplay"
              checked={autoplay}
              onCheckedChange={(checked) => onChange({ ...block, blockData: { ...block.blockData, autoplay: checked } })}
            />
            <Label htmlFor="autoplay" className="text-sm">Autoplay</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="loop"
              checked={loop}
              onCheckedChange={(checked) => onChange({ ...block, blockData: { ...block.blockData, loop: checked } })}
            />
            <Label htmlFor="loop" className="text-sm">Loop</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="muted"
              checked={muted}
              onCheckedChange={(checked) => onChange({ ...block, blockData: { ...block.blockData, muted: checked } })}
            />
            <Label htmlFor="muted" className="text-sm">Muted</Label>
          </div>
        </div>
      )}

      <div>
        <Label className="text-sm">Caption (optional)</Label>
        <Input
          value={caption}
          onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, videoCaption: e.target.value } })}
          placeholder="Video caption..."
        />
      </div>

      {getVideoPreview()}
    </div>
  );
}
