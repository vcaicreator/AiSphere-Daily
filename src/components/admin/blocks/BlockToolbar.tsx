import {
  Type,
  Heading,
  Image,
  Quote,
  List,
  Code,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BlockType, createBlock, ContentBlock } from './types';

interface BlockToolbarProps {
  onAddBlock: (block: ContentBlock) => void;
}

const BLOCK_OPTIONS: { type: BlockType; label: string; icon: React.ElementType; description: string }[] = [
  { type: 'paragraph', label: 'Paragraph', icon: Type, description: 'Plain text content' },
  { type: 'heading', label: 'Heading', icon: Heading, description: 'Section title (H2, H3, H4)' },
  { type: 'image', label: 'Image', icon: Image, description: 'Upload or embed an image' },
  { type: 'quote', label: 'Quote', icon: Quote, description: 'Blockquote with attribution' },
  { type: 'list', label: 'List', icon: List, description: 'Bullet or numbered list' },
  { type: 'code', label: 'Code', icon: Code, description: 'Code snippet with syntax' },
  { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line separator' },
];

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  const handleAddBlock = (type: BlockType) => {
    onAddBlock(createBlock(type));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64">
        {BLOCK_OPTIONS.map((option) => (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
