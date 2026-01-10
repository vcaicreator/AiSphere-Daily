import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useArticleById, useCreateArticle, useUpdateArticle } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';
import { useAuthors } from '@/hooks/useAuthors';
import { useBulkUpsertSections } from '@/hooks/useArticleSections';
import { toast } from 'sonner';

interface Section {
  id?: string;
  heading: string;
  content: string;
  order_index: number;
}

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
  const [sections, setSections] = useState<Section[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
      setSections(
        article.sections?.sort((a, b) => a.order_index - b.order_index).map((s) => ({
          id: s.id,
          heading: s.heading,
          content: s.content,
          order_index: s.order_index,
        })) || []
      );
    }
  }, [article]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const addSection = () => {
    setSections([...sections, { heading: '', content: '', order_index: sections.length }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: 'heading' | 'content', value: string) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error('Title and slug are required');
      return;
    }

    setIsSaving(true);

    try {
      const articleData = {
        title,
        slug,
        subtitle: subtitle || null,
        category_id: categoryId || null,
        author_id: authorId || null,
        introduction: introduction || null,
        conclusion: conclusion || null,
        status: status as 'draft' | 'published',
        featured_image: featuredImage || null,
        tags: tags ? tags.split(',').map((t) => t.trim()) : [],
        published_at: status === 'published' ? new Date().toISOString() : null,
        read_time_minutes: Math.ceil((introduction.length + conclusion.length + sections.reduce((acc, s) => acc + s.content.length, 0)) / 1000),
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
          sections: sections.map((s, i) => ({ heading: s.heading, content: s.content, order_index: i })),
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
    return (
      <AdminLayout title="Loading...">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Edit Article' : 'New Article'}>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin/articles')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Article title" />
            </div>
            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Article subtitle" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <div>
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea id="introduction" value={introduction} onChange={(e) => setIntroduction(e.target.value)} rows={4} placeholder="Article introduction..." />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Sections</Label>
                <Button variant="outline" size="sm" onClick={addSection}>
                  <Plus className="w-4 h-4 mr-2" /> Add Section
                </Button>
              </div>
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <Input value={section.heading} onChange={(e) => updateSection(index, 'heading', e.target.value)} placeholder="Section heading" className="flex-1" />
                      <Button variant="ghost" size="sm" onClick={() => removeSection(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <Textarea value={section.content} onChange={(e) => updateSection(index, 'content', e.target.value)} rows={4} placeholder="Section content..." />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="conclusion">Conclusion</Label>
              <Textarea id="conclusion" value={conclusion} onChange={(e) => setConclusion(e.target.value)} rows={4} placeholder="Article conclusion..." />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')} className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                <option value="">Select category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <select id="author" value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                <option value="">Select author</option>
                {authors?.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input id="featuredImage" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ai, technology, news" />
            </div>
          </div>

          <Button className="w-full" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ArticleEditor;
