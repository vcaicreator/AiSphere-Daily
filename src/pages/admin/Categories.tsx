import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, GripVertical, FileText } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import { useAllArticles } from '@/hooks/useArticles';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
  featured_image: string;
}

interface SortableCategoryProps {
  category: any;
  articleCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableCategory = ({ category, articleCount, onEdit, onDelete }: SortableCategoryProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 flex items-center gap-4 bg-background/50 hover:bg-muted/30 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {category.featured_image ? (
        <img
          src={category.featured_image}
          alt={category.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ) : (
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: category.color || '#3b82f6' }}
        >
          <span className="text-white font-bold text-lg">
            {category.name[0]?.toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium">{category.name}</p>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color || '#3b82f6' }}
          />
        </div>
        <p className="text-sm text-muted-foreground">/{category.slug}</p>
        {category.description && (
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            {category.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <FileText className="w-4 h-4" />
        <span className="text-sm">{articleCount}</span>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

const AdminCategories = () => {
  const { data: categories, isLoading } = useCategories();
  const { data: articles } = useAllArticles();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    color: '#3b82f6',
    featured_image: '',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const resetForm = () => {
    setForm({ name: '', slug: '', description: '', color: '#3b82f6', featured_image: '' });
    setEditingId(null);
    setShowNew(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error('Name and slug are required');
      return;
    }
    try {
      if (editingId) {
        await updateCategory.mutateAsync({ id: editingId, ...form });
        toast.success('Category updated');
      } else {
        await createCategory.mutateAsync(form);
        toast.success('Category created');
      }
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save');
    }
  };

  const handleEdit = (cat: any) => {
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      color: cat.color || '#3b82f6',
      featured_image: cat.featured_image || '',
    });
    setEditingId(cat.id);
    setShowNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await deleteCategory.mutateAsync(id);
      toast.success('Deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !categories) return;

    const oldIndex = categories.findIndex(c => c.id === active.id);
    const newIndex = categories.findIndex(c => c.id === over.id);

    const reordered = arrayMove(categories, oldIndex, newIndex);

    // Update display_order for all reordered items
    for (let i = 0; i < reordered.length; i++) {
      if (reordered[i].display_order !== i) {
        await updateCategory.mutateAsync({
          id: reordered[i].id,
          display_order: i,
        });
      }
    }
  };

  const getArticleCount = (categoryId: string) =>
    articles?.filter(a => a.category_id === categoryId).length || 0;

  const sortedCategories = categories?.sort((a, b) => 
    (a.display_order || 0) - (b.display_order || 0)
  ) || [];

  return (
    <AdminLayout title="Categories">
      <div className="mb-6">
        <Button
          onClick={() => {
            setShowNew(true);
            setEditingId(null);
            setForm({ name: '', slug: '', description: '', color: '#3b82f6', featured_image: '' });
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Form */}
      {(showNew || editingId) && (
        <div className="glass-card p-6 rounded-xl mb-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              {editingId ? 'Edit Category' : 'New Category'}
            </h3>
            <Button variant="ghost" size="sm" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    placeholder="Category name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                        slug: editingId ? form.slug : generateSlug(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug *</label>
                  <Input
                    placeholder="category-slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="A brief description of this category"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0"
                  />
                  <Input
                    placeholder="#3b82f6"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Featured Image</label>
              <ImageUploader
                bucket="article-images"
                value={form.featured_image}
                onChange={(url) => setForm({ ...form, featured_image: url || '' })}
                aspectRatio="video"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={createCategory.isPending || updateCategory.isPending}>
              <Save className="w-4 h-4 mr-2" /> Save Category
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="glass-card rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        ) : categories?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No categories yet. Create your first category!
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedCategories.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="divide-y divide-border/50">
                {sortedCategories.map((cat) => (
                  <SortableCategory
                    key={cat.id}
                    category={cat}
                    articleCount={getArticleCount(cat.id)}
                    onEdit={() => handleEdit(cat)}
                    onDelete={() => handleDelete(cat.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground">
        <p><strong>Tip:</strong> Drag and drop categories to reorder them. The order will be reflected on the public site.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
