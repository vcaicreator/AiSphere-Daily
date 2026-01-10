export type BlockType = 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code' | 'divider';

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
               type === 'image' ? { alignment: 'center' } : {},
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
  };
  return labels[type];
};
