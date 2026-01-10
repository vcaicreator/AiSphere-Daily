import {
  Type,
  Heading,
  Image,
  Quote,
  List,
  Code,
  Minus,
  Plus,
  Link,
  Video,
  AlertCircle,
  Grid3X3,
  MousePointer2,
  Images,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BlockType, createBlock, ContentBlock } from './types';

interface BlockToolbarProps {
  onAddBlock: (block: ContentBlock) => void;
}

const BLOCK_OPTIONS: { type: BlockType; label: string; icon: React.ElementType; description: string; group: string }[] = [
  { type: 'paragraph', label: 'Paragraph', icon: Type, description: 'Plain text content', group: 'Basic' },
  { type: 'heading', label: 'Heading', icon: Heading, description: 'Section title (H2, H3, H4)', group: 'Basic' },
  { type: 'image', label: 'Image', icon: Image, description: 'Upload or embed an image', group: 'Media' },
  { type: 'gallery', label: 'Gallery', icon: Images, description: 'Multiple images in a grid', group: 'Media' },
  { type: 'quote', label: 'Quote', icon: Quote, description: 'Blockquote with attribution', group: 'Basic' },
  { type: 'list', label: 'List', icon: List, description: 'Bullet or numbered list', group: 'Basic' },
  { type: 'code', label: 'Code', icon: Code, description: 'Code snippet with syntax', group: 'Basic' },
  { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line separator', group: 'Basic' },
  { type: 'link', label: 'Link Preview', icon: Link, description: 'Rich link card with preview', group: 'Embeds' },
  { type: 'embed', label: 'Embed', icon: Video, description: 'YouTube, Twitter, Instagram...', group: 'Embeds' },
  { type: 'callout', label: 'Callout', icon: AlertCircle, description: 'Info, warning, tip boxes', group: 'Blocks' },
  { type: 'table', label: 'Table', icon: Grid3X3, description: 'Editable data table', group: 'Blocks' },
  { type: 'button', label: 'Button', icon: MousePointer2, description: 'Call-to-action button', group: 'Blocks' },
];

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  const handleAddBlock = (type: BlockType) => {
    onAddBlock(createBlock(type));
  };

  const groups = ['Basic', 'Media', 'Embeds', 'Blocks'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-72 max-h-96 overflow-y-auto">
        {groups.map((group, groupIndex) => (
          <div key={group}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{group}</div>
            {BLOCK_OPTIONS.filter(o => o.group === group).map((option) => (
              <DropdownMenuItem
                key={option.type}
                onClick={() => handleAddBlock(option.type)}
                className="flex items-start gap-3 py-2"
              >
                <option.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
