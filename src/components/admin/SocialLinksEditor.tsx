import { useState, useEffect } from 'react';
import { Plus, Trash2, Globe, Twitter, Linkedin, Github, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface SocialLink {
  platform: string;
  url: string;
}

interface SocialLinksEditorProps {
  value: Record<string, string> | null;
  onChange: (value: Record<string, string>) => void;
}

const PLATFORMS = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'twitter', label: 'Twitter/X', icon: Twitter },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'github', label: 'GitHub', icon: Github },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
];

export function SocialLinksEditor({ value, onChange }: SocialLinksEditorProps) {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (value && typeof value === 'object') {
      const initialLinks = Object.entries(value).map(([platform, url]) => ({
        platform,
        url: url as string,
      }));
      setLinks(initialLinks);
    }
  }, []);

  const updateParent = (newLinks: SocialLink[]) => {
    const result: Record<string, string> = {};
    newLinks.forEach(link => {
      if (link.platform && link.url) {
        result[link.platform] = link.url;
      }
    });
    onChange(result);
  };

  const addLink = () => {
    const usedPlatforms = links.map(l => l.platform);
    const availablePlatform = PLATFORMS.find(p => !usedPlatforms.includes(p.id));
    if (availablePlatform) {
      const newLinks = [...links, { platform: availablePlatform.id, url: '' }];
      setLinks(newLinks);
    }
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    updateParent(newLinks);
  };

  const updateLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
    updateParent(newLinks);
  };

  const usedPlatforms = links.map(l => l.platform);
  const canAddMore = PLATFORMS.some(p => !usedPlatforms.includes(p.id));

  const getIcon = (platformId: string) => {
    const platform = PLATFORMS.find(p => p.id === platformId);
    return platform?.icon || Globe;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Social Links</Label>
        {canAddMore && (
          <Button type="button" variant="outline" size="sm" onClick={addLink}>
            <Plus className="h-4 w-4 mr-1" />
            Add Link
          </Button>
        )}
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground py-2">No social links added yet.</p>
      ) : (
        <div className="space-y-2">
          {links.map((link, index) => {
            const Icon = getIcon(link.platform);
            return (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Select
                  value={link.platform}
                  onValueChange={(value) => updateLink(index, 'platform', value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.filter(
                      p => p.id === link.platform || !usedPlatforms.includes(p.id)
                    ).map(platform => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="https://"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
