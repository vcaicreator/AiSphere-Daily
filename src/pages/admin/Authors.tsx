import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthors, useCreateAuthor, useUpdateAuthor, useDeleteAuthor } from '@/hooks/useAuthors';
import { toast } from 'sonner';

const AdminAuthors = () => {
  const { data: authors, isLoading } = useAuthors();
  const createAuthor = useCreateAuthor();
  const updateAuthor = useUpdateAuthor();
  const deleteAuthor = useDeleteAuthor();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', bio: '', avatar_url: '' });

  const resetForm = () => {
    setForm({ name: '', email: '', bio: '', avatar_url: '' });
    setEditingId(null);
    setShowNew(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }
    try {
      if (editingId) {
        await updateAuthor.mutateAsync({ id: editingId, ...form });
        toast.success('Author updated');
      } else {
        await createAuthor.mutateAsync(form);
        toast.success('Author created');
      }
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save');
    }
  };

  const handleEdit = (author: typeof authors[0]) => {
    setForm({ name: author.name, email: author.email || '', bio: author.bio || '', avatar_url: author.avatar_url || '' });
    setEditingId(author.id);
    setShowNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    try {
      await deleteAuthor.mutateAsync(id);
      toast.success('Author deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout title="Authors">
      <div className="mb-6">
        <Button onClick={() => { setShowNew(true); setEditingId(null); setForm({ name: '', email: '', bio: '', avatar_url: '' }); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Author
        </Button>
      </div>

      {(showNew || editingId) && (
        <div className="glass-card p-6 rounded-xl mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editingId ? 'Edit Author' : 'New Author'}</h3>
            <Button variant="ghost" size="sm" onClick={resetForm}><X className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Avatar URL" value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} />
          </div>
          <Textarea placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save</Button>
        </div>
      )}

      <div className="glass-card rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>
        ) : authors?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No authors yet</div>
        ) : (
          <div className="divide-y divide-border/50">
            {authors?.map((author) => (
              <div key={author.id} className="p-4 flex items-center gap-4">
                <img src={author.avatar_url || 'https://via.placeholder.com/40'} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{author.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{author.email || 'No email'}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(author)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(author.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAuthors;
