import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface TeamBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function TeamBlock({ block, onChange }: TeamBlockProps) {
  const member = block.blockData?.teamMember || { name: '', role: '' };
  const social = member.social || {};

  const updateMember = (field: string, value: string) => {
    onChange({ 
      ...block, 
      blockData: { 
        ...block.blockData, 
        teamMember: { ...member, [field]: value } 
      } 
    });
  };

  const updateSocial = (platform: string, value: string) => {
    onChange({ 
      ...block, 
      blockData: { 
        ...block.blockData, 
        teamMember: { 
          ...member, 
          social: { ...social, [platform]: value } 
        } 
      } 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <User className="w-4 h-4" />
        <span className="text-sm">Team Member</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Photo</Label>
          <ImageUploader
            value={member.avatar || undefined}
            onChange={(url) => updateMember('avatar', url || '')}
            bucket="media"
            aspectRatio="square"
            placeholder="Upload photo"
          />
        </div>
        <div className="space-y-3">
          <div>
            <Label className="text-sm">Name</Label>
            <Input
              value={member.name}
              onChange={(e) => updateMember('name', e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div>
            <Label className="text-sm">Role / Title</Label>
            <Input
              value={member.role}
              onChange={(e) => updateMember('role', e.target.value)}
              placeholder="Job title"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-sm">Bio</Label>
        <Textarea
          value={member.bio || ''}
          onChange={(e) => updateMember('bio', e.target.value)}
          placeholder="Short bio..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Social Links</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Twitter</Label>
            <Input
              value={social.twitter || ''}
              onChange={(e) => updateSocial('twitter', e.target.value)}
              placeholder="@username"
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs">LinkedIn</Label>
            <Input
              value={social.linkedin || ''}
              onChange={(e) => updateSocial('linkedin', e.target.value)}
              placeholder="Profile URL"
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs">GitHub</Label>
            <Input
              value={social.github || ''}
              onChange={(e) => updateSocial('github', e.target.value)}
              placeholder="@username"
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs">Email</Label>
            <Input
              value={social.email || ''}
              onChange={(e) => updateSocial('email', e.target.value)}
              placeholder="email@example.com"
              className="h-8 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
