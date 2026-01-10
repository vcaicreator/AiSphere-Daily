import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import { toast } from 'sonner';

const AdminCategories = () => {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', color: '#3b82f6' });

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const resetForm = () => {
    setForm({ name: '', slug: '', description: '', color: '#3b82f6' });
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

  const handleEdit = (cat: typeof categories[0]) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', color: cat.color || '#3b82f6' });
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

  return (
    <AdminLayout title="Categories">
      <div className="mb-6">
        <Button onClick={() => { setShowNew(true); setEditingId(null); setForm({ name: '', slug: '', description: '', color: '#3b82f6' }); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {(showNew || editingId) && (
        <div className="glass-card p-6 rounded-xl mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editingId ? 'Edit Category' : 'New Category'}</h3>
            <Button variant="ghost" size="sm" onClick={resetForm}><X className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : generateSlug(e.target.value) })} />
            <Input placeholder="Slug *" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <div className="flex gap-2 items-center">
              <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
              <Input placeholder="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
            </div>
          </div>
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save</Button>
        </div>
      )}

      <div className="glass-card rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
        ) : categories?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No categories yet</div>
        ) : (
          <div className="divide-y divide-border/50">
            {categories?.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center gap-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color || '#3b82f6' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">/{cat.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(cat)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(cat.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
