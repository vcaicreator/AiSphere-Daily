import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Quote, Star } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface TestimonialBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function TestimonialBlock({ block, onChange }: TestimonialBlockProps) {
  const author = block.blockData?.testimonialAuthor || '';
  const role = block.blockData?.testimonialRole || '';
  const company = block.blockData?.testimonialCompany || '';
  const avatar = block.blockData?.testimonialAvatar || '';
  const rating = block.blockData?.testimonialRating || 5;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Quote className="w-4 h-4" />
        <span className="text-sm">Testimonial</span>
      </div>

      <div>
        <Label className="text-sm">Quote</Label>
        <Textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="What the customer said..."
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <Label className="text-sm">Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange({ ...block, blockData: { ...block.blockData, testimonialRating: star } })}
              className="focus:outline-none"
            >
              <Star 
                className={`w-5 h-5 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Avatar</Label>
          <ImageUploader
            value={avatar || undefined}
            onChange={(url) => onChange({ ...block, blockData: { ...block.blockData, testimonialAvatar: url || '' } })}
            bucket="media"
            aspectRatio="square"
            placeholder="Upload avatar"
          />
        </div>
        <div className="space-y-3">
          <div>
            <Label className="text-sm">Name</Label>
            <Input
              value={author}
              onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, testimonialAuthor: e.target.value } })}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label className="text-sm">Role</Label>
            <Input
              value={role}
              onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, testimonialRole: e.target.value } })}
              placeholder="CEO"
            />
          </div>
          <div>
            <Label className="text-sm">Company</Label>
            <Input
              value={company}
              onChange={(e) => onChange({ ...block, blockData: { ...block.blockData, testimonialCompany: e.target.value } })}
              placeholder="Acme Inc."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
