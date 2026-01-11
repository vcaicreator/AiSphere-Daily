import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { User, Twitter, Linkedin, Globe } from 'lucide-react';
import { ContentBlock } from './types';
import { useAuthors } from '@/hooks/useAuthors';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AuthorBoxBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

export const AuthorBoxBlock: React.FC<AuthorBoxBlockProps> = ({ block, onUpdate }) => {
  const { data: authors } = useAuthors();
  const selectedAuthorId = block.blockData?.authorId || '';
  const showBio = block.blockData?.showBio !== false;
  const showSocial = block.blockData?.showSocial !== false;
  const showAvatar = block.blockData?.showAvatar !== false;
  const style = block.blockData?.style || 'default';

  const selectedAuthor = authors?.find(a => a.id === selectedAuthorId);

  const updateField = (field: string, value: any) => {
    onUpdate({ ...block, blockData: { ...block.blockData, [field]: value } });
  };

  const socialLinks = selectedAuthor?.social_links as Record<string, string> | null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <User className="h-4 w-4" />
        <span>Author Box Block</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          value={selectedAuthorId}
          onValueChange={(v) => updateField('authorId', v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an author..." />
          </SelectTrigger>
          <SelectContent>
            {authors?.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={style} onValueChange={(v) => updateField('style', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showAvatar"
            checked={showAvatar}
            onCheckedChange={(c) => updateField('showAvatar', c)}
          />
          <Label htmlFor="showAvatar">Show Avatar</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showBio"
            checked={showBio}
            onCheckedChange={(c) => updateField('showBio', c)}
          />
          <Label htmlFor="showBio">Show Bio</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showSocial"
            checked={showSocial}
            onCheckedChange={(c) => updateField('showSocial', c)}
          />
          <Label htmlFor="showSocial">Show Social Links</Label>
        </div>
      </div>

      {/* Preview */}
      {selectedAuthor && (
        <div className={`p-6 border rounded-lg ${style === 'card' ? 'bg-card shadow-sm' : 'bg-muted/30'}`}>
          <div className={`flex gap-4 ${style === 'compact' ? 'items-center' : 'items-start'}`}>
            {showAvatar && (
              <Avatar className={style === 'compact' ? 'h-12 w-12' : 'h-16 w-16'}>
                <AvatarImage src={selectedAuthor.avatar_url || ''} />
                <AvatarFallback>
                  {selectedAuthor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{selectedAuthor.name}</h4>
              {showBio && selectedAuthor.bio && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {selectedAuthor.bio}
                </p>
              )}
              {showSocial && socialLinks && (
                <div className="flex gap-2 mt-3">
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} className="text-muted-foreground hover:text-foreground">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} className="text-muted-foreground hover:text-foreground">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {socialLinks.website && (
                    <a href={socialLinks.website} className="text-muted-foreground hover:text-foreground">
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
