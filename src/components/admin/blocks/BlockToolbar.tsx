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
  ChevronDown,
  ToggleLeft,
  Layers,
  Eye,
  Columns,
  Music,
  FileDown,
  FileText,
  Clock,
  GitCompare,
  DollarSign,
  MessageSquareQuote,
  Users,
  TrendingUp,
  BarChart3,
  Bell,
  LayoutGrid,
  Share2,
  Link2,
  User,
  Mail,
  MapPin,
  Calculator,
  GitBranch,
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
  // Basic
  { type: 'paragraph', label: 'Paragraph', icon: Type, description: 'Plain text content', group: 'Basic' },
  { type: 'heading', label: 'Heading', icon: Heading, description: 'Section title (H2, H3, H4)', group: 'Basic' },
  { type: 'quote', label: 'Quote', icon: Quote, description: 'Blockquote with attribution', group: 'Basic' },
  { type: 'list', label: 'List', icon: List, description: 'Bullet or numbered list', group: 'Basic' },
  { type: 'code', label: 'Code', icon: Code, description: 'Code snippet with syntax', group: 'Basic' },
  { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line separator', group: 'Basic' },
  
  // Media
  { type: 'image', label: 'Image', icon: Image, description: 'Upload or embed an image', group: 'Media' },
  { type: 'gallery', label: 'Gallery', icon: Images, description: 'Multiple images in a grid', group: 'Media' },
  { type: 'video', label: 'Video', icon: Video, description: 'YouTube, Vimeo, or upload', group: 'Media' },
  { type: 'audio', label: 'Audio', icon: Music, description: 'Audio player with waveform', group: 'Media' },
  { type: 'file', label: 'File Download', icon: FileDown, description: 'Downloadable file attachment', group: 'Media' },
  { type: 'pdf', label: 'PDF Viewer', icon: FileText, description: 'Embedded PDF document', group: 'Media' },
  
  // Embeds
  { type: 'link', label: 'Link Preview', icon: Link, description: 'Rich link card with preview', group: 'Embeds' },
  { type: 'embed', label: 'Embed', icon: Video, description: 'YouTube, Twitter, Instagram...', group: 'Embeds' },
  { type: 'map', label: 'Map', icon: MapPin, description: 'Google/OpenStreetMap embed', group: 'Embeds' },
  { type: 'math', label: 'Math Formula', icon: Calculator, description: 'LaTeX math equations', group: 'Embeds' },
  { type: 'mermaid', label: 'Diagram', icon: GitBranch, description: 'Mermaid diagrams & charts', group: 'Embeds' },
  
  // Interactive
  { type: 'accordion', label: 'Accordion', icon: ChevronDown, description: 'Collapsible FAQ sections', group: 'Interactive' },
  { type: 'toggle', label: 'Toggle', icon: ToggleLeft, description: 'Single collapsible section', group: 'Interactive' },
  { type: 'tabs', label: 'Tabs', icon: Layers, description: 'Tabbed content sections', group: 'Interactive' },
  { type: 'spoiler', label: 'Spoiler', icon: Eye, description: 'Click-to-reveal content', group: 'Interactive' },
  
  // Layout
  { type: 'columns', label: 'Columns', icon: Columns, description: '2-4 column grid layout', group: 'Layout' },
  { type: 'timeline', label: 'Timeline', icon: Clock, description: 'Chronological events', group: 'Layout' },
  
  // Content
  { type: 'callout', label: 'Callout', icon: AlertCircle, description: 'Info, warning, tip boxes', group: 'Content' },
  { type: 'table', label: 'Table', icon: Grid3X3, description: 'Editable data table', group: 'Content' },
  { type: 'button', label: 'Button', icon: MousePointer2, description: 'Call-to-action button', group: 'Content' },
  { type: 'alert', label: 'Alert', icon: Bell, description: 'Notice/warning banner', group: 'Content' },
  { type: 'card', label: 'Card', icon: LayoutGrid, description: 'Feature box with icon', group: 'Content' },
  
  // Data
  { type: 'comparison', label: 'Comparison', icon: GitCompare, description: 'Side-by-side comparison', group: 'Data' },
  { type: 'pricing', label: 'Pricing', icon: DollarSign, description: 'Pricing table with features', group: 'Data' },
  { type: 'stats', label: 'Statistics', icon: TrendingUp, description: 'Animated counters', group: 'Data' },
  { type: 'progress', label: 'Progress', icon: BarChart3, description: 'Visual progress bars', group: 'Data' },
  
  // Social Proof
  { type: 'testimonial', label: 'Testimonial', icon: MessageSquareQuote, description: 'Customer quote with avatar', group: 'Social Proof' },
  { type: 'team', label: 'Team Member', icon: Users, description: 'Team member profile', group: 'Social Proof' },
  { type: 'authorbox', label: 'Author Box', icon: User, description: 'Full author bio section', group: 'Social Proof' },
  
  // Engagement
  { type: 'social', label: 'Social Share', icon: Share2, description: 'Social share buttons', group: 'Engagement' },
  { type: 'related', label: 'Related Articles', icon: Link2, description: 'Related articles picker', group: 'Engagement' },
  { type: 'newsletter', label: 'Newsletter CTA', icon: Mail, description: 'Inline newsletter signup', group: 'Engagement' },
];

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  const handleAddBlock = (type: BlockType) => {
    onAddBlock(createBlock(type));
  };

  const groups = ['Basic', 'Media', 'Embeds', 'Interactive', 'Layout', 'Content', 'Data', 'Social Proof', 'Engagement'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-72 max-h-[70vh] overflow-y-auto">
        {groups.map((group, groupIndex) => (
          <div key={group}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-popover">{group}</div>
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
