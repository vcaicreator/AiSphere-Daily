import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, ExternalLink, X } from 'lucide-react';
import { ContentBlock } from './blocks/types';

interface ArticlePreviewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  introduction: string;
  conclusion: string;
  blocks: ContentBlock[];
  featuredImage: string;
  category?: string;
  author?: { name: string; avatar: string; bio?: string };
  tags: string[];
}

type DeviceView = 'desktop' | 'tablet' | 'mobile';

export function ArticlePreview({
  open,
  onClose,
  title,
  subtitle,
  introduction,
  conclusion,
  blocks,
  featuredImage,
  category,
  author,
  tags,
}: ArticlePreviewProps) {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-full';
    }
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={index} className="text-lg leading-relaxed text-muted-foreground mb-6">{block.content}</p>;
      case 'heading':
        const HeadingTag = block.blockData?.headingLevel || 'h2';
        const headingClasses = {
          h2: 'text-3xl font-bold mb-4',
          h3: 'text-2xl font-bold mb-3',
          h4: 'text-xl font-bold mb-2',
        };
        return <HeadingTag key={index} className={headingClasses[HeadingTag as keyof typeof headingClasses]}>{block.content}</HeadingTag>;
      case 'image':
        return (
          <figure key={index} className="my-8">
            <img src={block.imageUrl} alt={block.blockData?.alt || ''} className="w-full rounded-lg" />
            {block.blockData?.caption && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">{block.blockData.caption}</figcaption>
            )}
          </figure>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-6 italic text-lg">
            <p>{block.content}</p>
            {block.heading && <cite className="text-sm text-muted-foreground not-italic">— {block.heading}</cite>}
          </blockquote>
        );
      case 'list':
        const ListTag = block.blockData?.listType === 'numbered' ? 'ol' : 'ul';
        const items = block.content.split('\n').filter(Boolean);
        return (
          <ListTag key={index} className={`my-6 pl-6 ${block.blockData?.listType === 'numbered' ? 'list-decimal' : 'list-disc'}`}>
            {items.map((item, i) => <li key={i} className="text-lg text-muted-foreground mb-2">{item}</li>)}
          </ListTag>
        );
      case 'code':
        return (
          <pre key={index} className="bg-muted rounded-lg p-4 overflow-x-auto my-6">
            <code className="text-sm">{block.content}</code>
          </pre>
        );
      case 'divider':
        return <hr key={index} className="my-8 border-border" />;
      case 'callout':
        const calloutStyles: Record<string, string> = {
          info: 'bg-blue-500/10 border-blue-500 text-blue-700',
          success: 'bg-green-500/10 border-green-500 text-green-700',
          warning: 'bg-amber-500/10 border-amber-500 text-amber-700',
          error: 'bg-red-500/10 border-red-500 text-red-700',
          tip: 'bg-purple-500/10 border-purple-500 text-purple-700',
        };
        const calloutType = block.blockData?.calloutType || 'info';
        return (
          <div key={index} className={`border-l-4 p-4 rounded-r-lg my-6 ${calloutStyles[calloutType]}`}>
            {block.heading && <p className="font-semibold mb-1">{block.heading}</p>}
            <p>{block.content}</p>
          </div>
        );
      case 'button':
        return (
          <div key={index} className={`my-6 ${block.blockData?.alignment === 'center' ? 'text-center' : block.blockData?.alignment === 'right' ? 'text-right' : ''}`}>
            <a 
              href={block.blockData?.buttonUrl || '#'} 
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90"
              target={block.blockData?.openNewTab ? '_blank' : undefined}
              rel={block.blockData?.openNewTab ? 'noopener noreferrer' : undefined}
            >
              {block.content || 'Click Here'}
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex-row items-center justify-between space-y-0">
          <DialogTitle>Article Preview</DialogTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={deviceView === 'desktop' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setDeviceView('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceView === 'tablet' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setDeviceView('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceView === 'mobile' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setDeviceView('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted p-4">
          <div className={`mx-auto bg-background rounded-lg shadow-lg overflow-hidden transition-all ${getDeviceWidth()}`}>
            {/* Featured Image */}
            {featuredImage && (
              <div className="relative h-64 md:h-96">
                <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
            )}

            {/* Article Content */}
            <article className={`p-6 md:p-8 ${featuredImage ? '-mt-24 relative z-10' : ''}`}>
              {/* Meta */}
              <div className="flex items-center gap-3 mb-6">
                {category && (
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {category}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{title || 'Untitled Article'}</h1>
              {subtitle && <p className="text-xl text-muted-foreground mb-6">{subtitle}</p>}

              {/* Author */}
              {author && (
                <div className="flex items-center gap-4 border-t border-b border-border py-4 mb-8">
                  <img 
                    src={author.avatar || 'https://via.placeholder.com/48'} 
                    alt={author.name} 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <p className="font-semibold">{author.name}</p>
                    {author.bio && <p className="text-sm text-muted-foreground">{author.bio}</p>}
                  </div>
                </div>
              )}

              {/* Introduction */}
              {introduction && (
                <p className="text-lg leading-relaxed text-muted-foreground mb-8">{introduction}</p>
              )}

              {/* Content Blocks */}
              {blocks.map((block, index) => renderBlock(block, index))}

              {/* Conclusion */}
              {conclusion && (
                <div className="mt-12 p-6 rounded-2xl bg-muted border-l-4 border-accent">
                  <p className="text-lg leading-relaxed italic">{conclusion}</p>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-full text-sm bg-muted">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
