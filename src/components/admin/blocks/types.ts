export type BlockType = 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code' | 'divider' | 'link' | 'embed' | 'callout' | 'table' | 'button' | 'gallery';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  heading?: string;
  imageUrl?: string;
  blockData?: {
    headingLevel?: 'h2' | 'h3' | 'h4';
    listType?: 'bullet' | 'numbered';
    language?: string;
    alignment?: 'left' | 'center' | 'right';
    caption?: string;
    alt?: string;
    // Link block
    linkUrl?: string;
    linkPreview?: {
      title: string;
      description: string;
      image: string;
      url: string;
      siteName: string;
    } | null;
    // Embed block
    embedUrl?: string;
    embedType?: 'youtube' | 'twitter' | 'instagram' | 'vimeo' | 'codepen' | 'spotify';
    embedHtml?: string;
    // Callout block
    calloutType?: 'info' | 'success' | 'warning' | 'error' | 'tip';
    // Table block
    tableData?: {
      headers: string[];
      rows: string[][];
      hasHeader: boolean;
    };
    // Button block
    buttonUrl?: string;
    buttonVariant?: 'primary' | 'secondary' | 'outline';
    buttonSize?: 'small' | 'medium' | 'large';
    openNewTab?: boolean;
    // Gallery block
    galleryImages?: {
      url: string;
      caption: string;
      alt: string;
    }[];
    galleryColumns?: '2' | '3' | '4';
  };
}

export const createBlock = (type: BlockType): ContentBlock => {
  return {
    id: crypto.randomUUID(),
    type,
    content: '',
    blockData: type === 'heading' ? { headingLevel: 'h2' } : 
               type === 'list' ? { listType: 'bullet' } :
               type === 'code' ? { language: 'javascript' } : 
               type === 'image' ? { alignment: 'center' } :
               type === 'callout' ? { calloutType: 'info' } :
               type === 'button' ? { buttonVariant: 'primary', buttonSize: 'medium', alignment: 'left' } :
               type === 'gallery' ? { galleryColumns: '3', galleryImages: [] } :
               type === 'table' ? { tableData: { headers: ['Column 1', 'Column 2'], rows: [['', '']], hasHeader: true } } :
               type === 'embed' ? { embedType: 'youtube' } : {},
  };
};

export const getBlockLabel = (type: BlockType): string => {
  const labels: Record<BlockType, string> = {
    paragraph: 'Paragraph',
    heading: 'Heading',
    image: 'Image',
    quote: 'Quote',
    list: 'List',
    code: 'Code',
    divider: 'Divider',
    link: 'Link Preview',
    embed: 'Embed',
    callout: 'Callout',
    table: 'Table',
    button: 'Button',
    gallery: 'Gallery',
  };
  return labels[type];
};
