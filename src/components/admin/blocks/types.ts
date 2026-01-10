export type BlockType = 
  // Basic blocks (existing)
  | 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code' | 'divider'
  // Embed blocks (existing)
  | 'link' | 'embed'
  // Content blocks (existing)
  | 'callout' | 'table' | 'button' | 'gallery'
  // Interactive blocks (new)
  | 'accordion' | 'toggle' | 'tabs' | 'spoiler' | 'columns'
  // Media blocks (new)
  | 'video' | 'audio' | 'file' | 'pdf'
  // Content blocks (new)
  | 'timeline' | 'comparison' | 'pricing' | 'testimonial' | 'team' | 'stats' | 'progress' | 'alert'
  // Special blocks (new)
  | 'card' | 'social' | 'related' | 'authorbox' | 'newsletter' | 'map' | 'math' | 'mermaid';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  heading?: string;
  imageUrl?: string;
  blockData?: {
    // Heading block
    headingLevel?: 'h2' | 'h3' | 'h4';
    // List block
    listType?: 'bullet' | 'numbered';
    // Code block
    language?: string;
    // Alignment
    alignment?: 'left' | 'center' | 'right';
    // Image block
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
    
    // === NEW BLOCK DATA TYPES ===
    
    // Accordion block
    accordionItems?: {
      id: string;
      title: string;
      content: string;
      isOpen?: boolean;
    }[];
    
    // Toggle block
    toggleTitle?: string;
    toggleOpen?: boolean;
    
    // Tabs block
    tabItems?: {
      id: string;
      label: string;
      content: string;
    }[];
    activeTab?: string;
    
    // Spoiler block
    spoilerLabel?: string;
    
    // Columns block
    columnCount?: '2' | '3' | '4';
    columnContents?: string[];
    
    // Video block
    videoUrl?: string;
    videoType?: 'upload' | 'youtube' | 'vimeo';
    videoCaption?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    
    // Audio block
    audioUrl?: string;
    audioTitle?: string;
    audioArtist?: string;
    showWaveform?: boolean;
    
    // File block
    fileUrl?: string;
    fileName?: string;
    fileSize?: string;
    fileType?: string;
    
    // PDF block
    pdfUrl?: string;
    pdfHeight?: string;
    
    // Timeline block
    timelineItems?: {
      id: string;
      date: string;
      title: string;
      description: string;
      icon?: string;
    }[];
    timelineLayout?: 'left' | 'right' | 'alternating';
    
    // Comparison block
    comparisonData?: {
      headers: string[];
      rows: {
        feature: string;
        values: string[];
      }[];
    };
    
    // Pricing block
    pricingPlans?: {
      id: string;
      name: string;
      price: string;
      period?: string;
      description?: string;
      features: string[];
      buttonText?: string;
      buttonUrl?: string;
      highlighted?: boolean;
    }[];
    
    // Testimonial block
    testimonialAuthor?: string;
    testimonialRole?: string;
    testimonialAvatar?: string;
    testimonialCompany?: string;
    testimonialRating?: number;
    
    // Team block
    teamMember?: {
      name: string;
      role: string;
      avatar?: string;
      bio?: string;
      social?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        email?: string;
      };
    };
    
    // Stats block
    statsItems?: {
      id: string;
      value: string;
      label: string;
      prefix?: string;
      suffix?: string;
      icon?: string;
    }[];
    statsLayout?: 'row' | 'grid';
    
    // Progress block
    progressValue?: number;
    progressMax?: number;
    progressLabel?: string;
    progressColor?: string;
    progressShowValue?: boolean;
    
    // Alert block
    alertType?: 'info' | 'success' | 'warning' | 'error';
    alertTitle?: string;
    alertDismissible?: boolean;
    
    // Card block
    cardTitle?: string;
    cardDescription?: string;
    cardImage?: string;
    cardUrl?: string;
    cardIcon?: string;
    
    // Social block
    socialPlatforms?: ('twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'reddit' | 'email')[];
    socialStyle?: 'buttons' | 'icons';
    
    // Related articles block
    relatedArticleIds?: string[];
    relatedLayout?: 'grid' | 'list';
    
    // Author box block
    authorId?: string;
    showBio?: boolean;
    showSocial?: boolean;
    
    // Newsletter block
    newsletterTitle?: string;
    newsletterDescription?: string;
    newsletterButtonText?: string;
    
    // Map block
    mapUrl?: string;
    mapAddress?: string;
    mapZoom?: number;
    mapHeight?: string;
    
    // Math block
    mathFormula?: string;
    mathDisplay?: 'inline' | 'block';
    
    // Mermaid block
    mermaidCode?: string;
    mermaidTheme?: 'default' | 'dark' | 'forest' | 'neutral';
  };
}

export const createBlock = (type: BlockType): ContentBlock => {
  const baseBlock = {
    id: crypto.randomUUID(),
    type,
    content: '',
  };

  const blockDefaults: Partial<Record<BlockType, ContentBlock['blockData']>> = {
    heading: { headingLevel: 'h2' },
    list: { listType: 'bullet' },
    code: { language: 'javascript' },
    image: { alignment: 'center' },
    callout: { calloutType: 'info' },
    button: { buttonVariant: 'primary', buttonSize: 'medium', alignment: 'left' },
    gallery: { galleryColumns: '3', galleryImages: [] },
    table: { tableData: { headers: ['Column 1', 'Column 2'], rows: [['', '']], hasHeader: true } },
    embed: { embedType: 'youtube' },
    // New blocks
    accordion: { accordionItems: [{ id: crypto.randomUUID(), title: 'Item 1', content: '', isOpen: true }] },
    toggle: { toggleTitle: 'Click to expand', toggleOpen: false },
    tabs: { tabItems: [{ id: crypto.randomUUID(), label: 'Tab 1', content: '' }], activeTab: '' },
    spoiler: { spoilerLabel: 'Click to reveal' },
    columns: { columnCount: '2', columnContents: ['', ''] },
    video: { videoType: 'youtube', autoplay: false, loop: false, muted: false },
    audio: { showWaveform: false },
    file: {},
    pdf: { pdfHeight: '600px' },
    timeline: { timelineItems: [{ id: crypto.randomUUID(), date: '', title: '', description: '' }], timelineLayout: 'left' },
    comparison: { comparisonData: { headers: ['Feature', 'Option A', 'Option B'], rows: [{ feature: '', values: ['', ''] }] } },
    pricing: { pricingPlans: [{ id: crypto.randomUUID(), name: 'Basic', price: '$9', features: ['Feature 1'], highlighted: false }] },
    testimonial: { testimonialRating: 5 },
    team: { teamMember: { name: '', role: '' } },
    stats: { statsItems: [{ id: crypto.randomUUID(), value: '100', label: 'Stat' }], statsLayout: 'row' },
    progress: { progressValue: 50, progressMax: 100, progressShowValue: true },
    alert: { alertType: 'info', alertDismissible: false },
    card: {},
    social: { socialPlatforms: ['twitter', 'facebook', 'linkedin'], socialStyle: 'buttons' },
    related: { relatedLayout: 'grid' },
    authorbox: { showBio: true, showSocial: true },
    newsletter: { newsletterTitle: 'Subscribe to our newsletter', newsletterButtonText: 'Subscribe' },
    map: { mapZoom: 15, mapHeight: '400px' },
    math: { mathDisplay: 'block' },
    mermaid: { mermaidTheme: 'default', mermaidCode: 'graph TD\n  A[Start] --> B[End]' },
  };

  return {
    ...baseBlock,
    blockData: blockDefaults[type] || {},
  };
};

export const getBlockLabel = (type: BlockType): string => {
  const labels: Record<BlockType, string> = {
    // Existing
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
    // New Interactive
    accordion: 'Accordion',
    toggle: 'Toggle',
    tabs: 'Tabs',
    spoiler: 'Spoiler',
    columns: 'Columns',
    // New Media
    video: 'Video',
    audio: 'Audio',
    file: 'File Download',
    pdf: 'PDF Viewer',
    // New Content
    timeline: 'Timeline',
    comparison: 'Comparison Table',
    pricing: 'Pricing Table',
    testimonial: 'Testimonial',
    team: 'Team Member',
    stats: 'Statistics',
    progress: 'Progress Bar',
    alert: 'Alert',
    // New Special
    card: 'Card',
    social: 'Social Share',
    related: 'Related Articles',
    authorbox: 'Author Box',
    newsletter: 'Newsletter CTA',
    map: 'Map',
    math: 'Math Formula',
    mermaid: 'Diagram',
  };
  return labels[type];
};

export const getBlockCategory = (type: BlockType): string => {
  const categories: Record<BlockType, string> = {
    paragraph: 'Basic',
    heading: 'Basic',
    quote: 'Basic',
    list: 'Basic',
    code: 'Basic',
    divider: 'Basic',
    image: 'Media',
    gallery: 'Media',
    video: 'Media',
    audio: 'Media',
    file: 'Media',
    pdf: 'Media',
    link: 'Embeds',
    embed: 'Embeds',
    map: 'Embeds',
    mermaid: 'Embeds',
    math: 'Embeds',
    callout: 'Content',
    table: 'Content',
    button: 'Content',
    alert: 'Content',
    card: 'Content',
    accordion: 'Interactive',
    toggle: 'Interactive',
    tabs: 'Interactive',
    spoiler: 'Interactive',
    columns: 'Layout',
    timeline: 'Layout',
    comparison: 'Data',
    pricing: 'Data',
    stats: 'Data',
    progress: 'Data',
    testimonial: 'Social Proof',
    team: 'Social Proof',
    authorbox: 'Social Proof',
    social: 'Engagement',
    related: 'Engagement',
    newsletter: 'Engagement',
  };
  return categories[type];
};
