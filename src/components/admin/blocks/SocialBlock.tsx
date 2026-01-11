import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Share2, Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { ContentBlock } from './types';

interface SocialBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

const socialPlatforms = [
  { id: 'facebook', label: 'Facebook', icon: Facebook },
  { id: 'twitter', label: 'Twitter/X', icon: Twitter },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'copylink', label: 'Copy Link', icon: Link2 },
];

export const SocialBlock: React.FC<SocialBlockProps> = ({ block, onUpdate }) => {
  const selectedPlatforms: string[] = block.blockData?.platforms || ['facebook', 'twitter', 'linkedin'];
  const alignment = block.blockData?.alignment || 'center';

  const togglePlatform = (platformId: string) => {
    const newPlatforms = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(p => p !== platformId)
      : [...selectedPlatforms, platformId];
    
    onUpdate({
      ...block,
      blockData: { ...block.blockData, platforms: newPlatforms }
    });
  };

  const setAlignment = (align: string) => {
    onUpdate({
      ...block,
      blockData: { ...block.blockData, alignment: align }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Share2 className="h-4 w-4" />
        <span>Social Share Buttons</span>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Select platforms:</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {socialPlatforms.map((platform) => (
            <div key={platform.id} className="flex items-center space-x-2">
              <Checkbox
                id={platform.id}
                checked={selectedPlatforms.includes(platform.id)}
                onCheckedChange={() => togglePlatform(platform.id)}
              />
              <Label htmlFor={platform.id} className="flex items-center gap-2 cursor-pointer">
                <platform.icon className="h-4 w-4" />
                {platform.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Alignment:</Label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => setAlignment(align)}
              className={`px-4 py-2 rounded border text-sm capitalize ${
                alignment === align 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background hover:bg-muted'
              }`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className={`p-4 border rounded-lg bg-muted/30 flex gap-3 ${
        alignment === 'center' ? 'justify-center' : 
        alignment === 'right' ? 'justify-end' : 'justify-start'
      }`}>
        {selectedPlatforms.map((platformId) => {
          const platform = socialPlatforms.find(p => p.id === platformId);
          if (!platform) return null;
          return (
            <button
              key={platformId}
              className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
            >
              <platform.icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
