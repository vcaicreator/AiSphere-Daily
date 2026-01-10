import { useState, useEffect } from 'react';
import { Image, Trash2, Copy, Search, Grid, List, Upload, X, CheckSquare, Square, Download, RefreshCw } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  bucket: string;
  created_at: string;
  size?: number;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [activeBucket, setActiveBucket] = useState<'article-images' | 'author-avatars'>('article-images');
  const [previewImage, setPreviewImage] = useState<MediaFile | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchFiles();
    setIsRefreshing(false);
  };

  const buckets = [
    { id: 'article-images', label: 'Article Images' },
    { id: 'author-avatars', label: 'Author Avatars' },
  ];

  useEffect(() => {
    fetchFiles();
  }, [activeBucket]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(activeBucket)
        .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (error) throw error;

      const filesWithUrls: MediaFile[] = (data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => ({
          id: file.id || file.name,
          name: file.name,
          url: supabase.storage.from(activeBucket).getPublicUrl(file.name).data.publicUrl,
          bucket: activeBucket,
          created_at: file.created_at || new Date().toISOString(),
          size: file.metadata?.size,
        }));

      setFiles(filesWithUrls);
    } catch (error: any) {
      toast.error('Failed to load media: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete "${file.name}"?`)) return;

    try {
      const { error } = await supabase.storage.from(file.bucket).remove([file.name]);
      if (error) throw error;
      toast.success('File deleted');
      fetchFiles();
    } catch (error: any) {
      toast.error('Failed to delete: ' + error.message);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return;
    if (!confirm(`Delete ${selectedFiles.size} files?`)) return;

    try {
      const filesToDelete = files.filter(f => selectedFiles.has(f.id)).map(f => f.name);
      const { error } = await supabase.storage.from(activeBucket).remove(filesToDelete);
      if (error) throw error;
      toast.success(`${selectedFiles.size} files deleted`);
      setSelectedFiles(new Set());
      fetchFiles();
    } catch (error: any) {
      toast.error('Failed to delete: ' + error.message);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const selectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map(f => f.id)));
    }
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <AdminLayout title="Media Library">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button onClick={() => setShowUploadDialog(true)}>
          <Upload className="w-4 h-4 mr-2" /> Upload
        </Button>

        {/* Bucket Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {buckets.map(bucket => (
            <button
              key={bucket.id}
              onClick={() => {
                setActiveBucket(bucket.id as any);
                setSelectedFiles(new Set());
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                activeBucket === bucket.id
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {bucket.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-background shadow' : ''}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-background shadow' : ''}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.size > 0 && (
        <div className="flex items-center gap-4 p-4 mb-6 bg-muted rounded-xl">
          <span className="text-sm font-medium">{selectedFiles.size} selected</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete Selected
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedFiles(new Set())}>
            Clear Selection
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="glass-card rounded-xl p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Image className="w-12 h-12 mb-4 opacity-50" />
            <p>No files found</p>
            <Button variant="outline" className="mt-4" onClick={() => setShowUploadDialog(true)}>
              Upload your first image
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {/* Select All */}
            <button
              onClick={selectAll}
              className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              {selectedFiles.size === filteredFiles.length ? (
                <CheckSquare className="w-6 h-6" />
              ) : (
                <Square className="w-6 h-6" />
              )}
              <span className="text-xs">Select All</span>
            </button>

            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedFiles.has(file.id)
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent hover:border-border'
                }`}
                onClick={() => setPreviewImage(file)}
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                
                {/* Selection Checkbox */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSelect(file.id); }}
                  className={`absolute top-2 left-2 p-1 rounded transition-all ${
                    selectedFiles.has(file.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {selectedFiles.has(file.id) ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>

                {/* Actions */}
                <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}
                    className="p-1.5 bg-black/50 text-white rounded hover:bg-black/70"
                    title="Copy URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(file); }}
                    className="p-1.5 bg-red-500/80 text-white rounded hover:bg-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Filename */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Header */}
            <div className="flex items-center gap-4 p-3 text-sm font-medium text-muted-foreground">
              <button onClick={selectAll} className="p-1">
                {selectedFiles.size === filteredFiles.length ? (
                  <CheckSquare className="w-4 h-4" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
              <span className="flex-1">Name</span>
              <span className="w-24">Size</span>
              <span className="w-32">Date</span>
              <span className="w-24">Actions</span>
            </div>

            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors ${
                  selectedFiles.has(file.id) ? 'bg-primary/5' : ''
                }`}
              >
                <button onClick={() => toggleSelect(file.id)} className="p-1">
                  {selectedFiles.has(file.id) ? (
                    <CheckSquare className="w-4 h-4 text-primary" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
                <div
                  className="w-10 h-10 rounded overflow-hidden cursor-pointer"
                  onClick={() => setPreviewImage(file)}
                >
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                </div>
                <span className="flex-1 truncate">{file.name}</span>
                <span className="w-24 text-sm text-muted-foreground">{formatFileSize(file.size)}</span>
                <span className="w-32 text-sm text-muted-foreground">
                  {new Date(file.created_at).toLocaleDateString()}
                </span>
                <div className="w-24 flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => copyUrl(file.url)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(file)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              {buckets.map(bucket => (
                <button
                  key={bucket.id}
                  onClick={() => setActiveBucket(bucket.id as any)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    activeBucket === bucket.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
            <ImageUploader
              bucket={activeBucket}
              onChange={(url) => {
                if (url) {
                  toast.success('Image uploaded');
                  setShowUploadDialog(false);
                  fetchFiles();
                }
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="truncate">{previewImage?.name}</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden bg-muted flex items-center justify-center max-h-[60vh]">
                <img
                  src={previewImage.url}
                  alt={previewImage.name}
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => copyUrl(previewImage.url)} variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" /> Copy URL
                </Button>
                <Button
                  onClick={() => window.open(previewImage.url, '_blank')}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" /> Open Full Size
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(previewImage);
                    setPreviewImage(null);
                  }}
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Size: {formatFileSize(previewImage.size)}</p>
                <p>Uploaded: {new Date(previewImage.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMedia;
