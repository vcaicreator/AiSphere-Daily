import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { BlockWrapper } from '@/components/admin/blocks/BlockWrapper';
import { BlockToolbar } from '@/components/admin/blocks/BlockToolbar';
import { ParagraphBlock } from '@/components/admin/blocks/ParagraphBlock';
import { HeadingBlock } from '@/components/admin/blocks/HeadingBlock';
import { ImageBlock } from '@/components/admin/blocks/ImageBlock';
import { QuoteBlock } from '@/components/admin/blocks/QuoteBlock';
import { ListBlock } from '@/components/admin/blocks/ListBlock';
import { CodeBlock } from '@/components/admin/blocks/CodeBlock';
import { DividerBlock } from '@/components/admin/blocks/DividerBlock';
import { ContentBlock, createBlock } from '@/components/admin/blocks/types';
import { useArticleById, useCreateArticle, useUpdateArticle } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';
import { useAuthors } from '@/hooks/useAuthors';
import { useBulkUpsertSections } from '@/hooks/useArticleSections';
import { toast } from 'sonner';

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { data: article, isLoading: articleLoading } = useArticleById(id);
  const { data: categories } = useCategories();
  const { data: authors } = useAuthors();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const bulkUpsertSections = useBulkUpsertSections();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setSubtitle(article.subtitle || '');
      setCategoryId(article.category_id || '');
      setAuthorId(article.author_id || '');
      setIntroduction(article.introduction || '');
      setConclusion(article.conclusion || '');
      setStatus(article.status === 'published' ? 'published' : 'draft');
      setFeaturedImage(article.featured_image || '');
      setTags(article.tags?.join(', ') || '');
      
      // Convert sections to blocks
      const sectionBlocks = article.sections?.sort((a, b) => a.order_index - b.order_index).map((s) => ({
        id: s.id,
        type: 'paragraph' as const,
        content: s.content,
        heading: s.heading,
      })) || [];
      setBlocks(sectionBlocks.length > 0 ? sectionBlocks : [createBlock('paragraph')]);
    }
  }, [article]);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) setSlug(generateSlug(value));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateBlock = (index: number, updatedBlock: ContentBlock) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    setBlocks(newBlocks);
  };

  const deleteBlock = (index: number) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((_, i) => i !== index));
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < blocks.length) {
      setBlocks(arrayMove(blocks, index, newIndex));
    }
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    const props = { block, onChange: (b: ContentBlock) => updateBlock(index, b) };
    switch (block.type) {
      case 'paragraph': return <ParagraphBlock {...props} />;
      case 'heading': return <HeadingBlock {...props} />;
      case 'image': return <ImageBlock {...props} />;
      case 'quote': return <QuoteBlock {...props} />;
      case 'list': return <ListBlock {...props} />;
      case 'code': return <CodeBlock {...props} />;
      case 'divider': return <DividerBlock />;
      default: return null;
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error('Title and slug are required');
      return;
    }
    setIsSaving(true);
    try {
      const articleData = {
        title, slug, subtitle: subtitle || null, category_id: categoryId || null,
        author_id: authorId || null, introduction: introduction || null,
        conclusion: conclusion || null, status: status as 'draft' | 'published',
        featured_image: featuredImage || null,
        tags: tags ? tags.split(',').map((t) => t.trim()) : [],
        published_at: status === 'published' ? new Date().toISOString() : null,
        read_time_minutes: Math.ceil((introduction.length + conclusion.length + blocks.reduce((acc, b) => acc + b.content.length, 0)) / 1000),
      };

      let articleId = id;
      if (isEditing) {
        await updateArticle.mutateAsync({ id, ...articleData });
      } else {
        const result = await createArticle.mutateAsync(articleData);
        articleId = result.id;
      }

      if (articleId) {
        await bulkUpsertSections.mutateAsync({
          articleId,
          sections: blocks.map((b, i) => ({ heading: b.heading || '', content: b.content, order_index: i })),
        });
      }

      toast.success(isEditing ? 'Article updated!' : 'Article created!');
      navigate('/admin/articles');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  if (articleLoading && isEditing) {
    return <AdminLayout title="Loading..."><div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div></AdminLayout>;
  }

  return (
    <AdminLayout title={isEditing ? 'Edit Article' : 'New Article'}>
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/admin/articles')}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
        <Button onClick={handleSave} disabled={isSaving}><Save className="w-4 h-4 mr-2" />{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div><Label>Title *</Label><Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Article title" className="text-xl font-semibold" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Slug *</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" /></div>
              <div><Label>Subtitle</Label><Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Optional subtitle" /></div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <Label>Featured Image</Label>
            <ImageUploader value={featuredImage || undefined} onChange={(url) => setFeaturedImage(url || '')} bucket="article-images" aspectRatio="video" placeholder="Upload featured image" />
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <div><Label>Introduction</Label><Textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} rows={3} placeholder="Article introduction..." /></div>
            
            <div className="space-y-4">
              <Label>Content Blocks</Label>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {blocks.map((block, index) => (
                      <BlockWrapper key={block.id} block={block} onDelete={() => deleteBlock(index)} onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} isFirst={index === 0} isLast={index === blocks.length - 1}>
                        {renderBlock(block, index)}
                      </BlockWrapper>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <BlockToolbar onAddBlock={(block) => setBlocks([...blocks, block])} />
            </div>

            <div><Label>Conclusion</Label><Textarea value={conclusion} onChange={(e) => setConclusion(e.target.value)} rows={3} placeholder="Article conclusion..." /></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div><Label>Status</Label><Select value={status} onValueChange={(v: 'draft' | 'published') => setStatus(v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent></Select></div>
            <div><Label>Category</Label><Select value={categoryId} onValueChange={setCategoryId}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{categories?.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Author</Label><Select value={authorId} onValueChange={setAuthorId}><SelectTrigger><SelectValue placeholder="Select author" /></SelectTrigger><SelectContent>{authors?.map((author) => <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Tags</Label><Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ai, tech, news" /></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ArticleEditor;
