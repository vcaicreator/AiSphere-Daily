import { useState } from 'react';
import { Plus, Pencil, Trash2, User, X, Save, Mail, RefreshCw } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { SocialLinksEditor } from '@/components/admin/SocialLinksEditor';
import {
  useAuthors,
  useCreateAuthor,
  useUpdateAuthor,
  useDeleteAuthor,
  Author,
} from '@/hooks/useAuthors';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminAuthors = () => {
  const { data: authors, isLoading, refetch } = useAuthors();
  const createAuthor = useCreateAuthor();
  const updateAuthor = useUpdateAuthor();
  const deleteAuthor = useDeleteAuthor();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar_url: '',
    social_links: {} as Record<string, string>,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      bio: '',
      avatar_url: '',
      social_links: {},
    });
    setEditingAuthor(null);
  };

  const openNewAuthorDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditAuthorDialog = (author: Author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      email: author.email || '',
      bio: author.bio || '',
      avatar_url: author.avatar_url || '',
      social_links: (author.social_links as Record<string, string>) || {},
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    const authorData = {
      name: formData.name,
      email: formData.email || null,
      bio: formData.bio || null,
      avatar_url: formData.avatar_url || null,
      social_links: Object.keys(formData.social_links).length > 0 ? formData.social_links : null,
    };

    if (editingAuthor) {
      await updateAuthor.mutateAsync({
        id: editingAuthor.id,
        ...authorData,
      });
    } else {
      await createAuthor.mutateAsync(authorData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (author: Author) => {
    if (confirm(`Are you sure you want to delete "${author.name}"? This action cannot be undone.`)) {
      await deleteAuthor.mutateAsync(author.id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AdminLayout title="Authors">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Manage your content authors and their profiles.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={openNewAuthorDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Author
            </Button>
          </div>
        </div>

        {/* Authors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-muted rounded" />
                      <div className="h-3 w-32 bg-muted rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : authors?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No authors yet</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Add your first author to start creating content.
              </p>
              <Button onClick={openNewAuthorDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Author
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors?.map((author) => (
              <Card key={author.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={author.avatar_url || undefined} />
                      <AvatarFallback className="text-lg">
                        {getInitials(author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{author.name}</h3>
                      {author.email && (
                        <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {author.email}
                        </p>
                      )}
                      {author.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {author.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social Links Preview */}
                  {author.social_links && Object.keys(author.social_links).length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground">
                        {Object.keys(author.social_links).length} social link(s)
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditAuthorDialog(author)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(author)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Author Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAuthor ? 'Edit Author' : 'Add New Author'}
              </DialogTitle>
              <DialogDescription>
                {editingAuthor
                  ? 'Update the author profile information.'
                  : 'Create a new author profile for your content.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.avatar_url || undefined} />
                    <AvatarFallback className="text-xl">
                      {formData.name ? getInitials(formData.name) : <User className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <ImageUploader
                      value={formData.avatar_url || undefined}
                      onChange={(url) =>
                        setFormData({ ...formData, avatar_url: url || '' })
                      }
                      bucket="author-avatars"
                      aspectRatio="square"
                      placeholder="Upload profile photo"
                      maxSizeMB={2}
                      showPreview={false}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter author name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="author@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Email is kept private and not shown on public pages.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short biography..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Social Links */}
              <SocialLinksEditor
                value={formData.social_links}
                onChange={(links) =>
                  setFormData({ ...formData, social_links: links })
                }
              />
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  !formData.name.trim() ||
                  createAuthor.isPending ||
                  updateAuthor.isPending
                }
              >
                <Save className="h-4 w-4 mr-1" />
                {editingAuthor ? 'Update Author' : 'Create Author'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminAuthors;
