import { useState, useEffect } from 'react';
import { Save, Globe, Search, Share2, Mail, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SiteSettings {
  site_title: string;
  site_tagline: string;
  site_description: string;
  posts_per_page: number;
  default_meta_title: string;
  default_meta_description: string;
  og_image_url: string;
  twitter_handle: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  contact_email: string;
  newsletter_enabled: boolean;
}

const defaultSettings: SiteSettings = {
  site_title: 'AiSphere Daily',
  site_tagline: 'Exploring AI\'s Creative Frontier',
  site_description: 'Your premium source for AI insights and creativity',
  posts_per_page: 10,
  default_meta_title: 'AiSphere Daily - AI Insights & Creativity',
  default_meta_description: 'Discover the latest in AI technology, creativity, and innovation.',
  og_image_url: '',
  twitter_handle: '',
  facebook_url: '',
  instagram_url: '',
  linkedin_url: '',
  contact_email: '',
  newsletter_enabled: true,
};

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        const loadedSettings: Partial<SiteSettings> = {};
        data.forEach(row => {
          if (row.key in defaultSettings) {
            const value = row.value;
            if (typeof value === 'object' && value !== null && 'value' in value) {
              (loadedSettings as any)[row.key] = (value as any).value;
            } else {
              (loadedSettings as any)[row.key] = value;
            }
          }
        });
        setSettings({ ...defaultSettings, ...loadedSettings });
      }
    } catch (error: any) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Upsert each setting
      const entries = Object.entries(settings);
      for (const [key, value] of entries) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            { key, value: { value } },
            { onConflict: 'key' }
          );
        if (error) throw error;
      }
      toast.success('Settings saved successfully');
    } catch (error: any) {
      toast.error('Failed to save: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <AdminLayout title="Settings">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> General
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="w-4 h-4" /> SEO
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Social
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="glass-card p-6 rounded-xl space-y-6">
              <h2 className="text-lg font-semibold">Site Information</h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_title">Site Title</Label>
                  <Input
                    id="site_title"
                    value={settings.site_title}
                    onChange={(e) => updateSetting('site_title', e.target.value)}
                    placeholder="My Awesome Site"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site_tagline">Tagline</Label>
                  <Input
                    id="site_tagline"
                    value={settings.site_tagline}
                    onChange={(e) => updateSetting('site_tagline', e.target.value)}
                    placeholder="A short description of your site"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site_description">Site Description</Label>
                  <Textarea
                    id="site_description"
                    value={settings.site_description}
                    onChange={(e) => updateSetting('site_description', e.target.value)}
                    placeholder="A longer description for about pages"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="posts_per_page">Posts Per Page</Label>
                  <Input
                    id="posts_per_page"
                    type="number"
                    min={1}
                    max={50}
                    value={settings.posts_per_page}
                    onChange={(e) => updateSetting('posts_per_page', parseInt(e.target.value) || 10)}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-6">
            <div className="glass-card p-6 rounded-xl space-y-6">
              <h2 className="text-lg font-semibold">Search Engine Optimization</h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default_meta_title">Default Meta Title</Label>
                  <Input
                    id="default_meta_title"
                    value={settings.default_meta_title}
                    onChange={(e) => updateSetting('default_meta_title', e.target.value)}
                    placeholder="Site Name - Tagline"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used when pages don't have their own title. Keep under 60 characters.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default_meta_description">Default Meta Description</Label>
                  <Textarea
                    id="default_meta_description"
                    value={settings.default_meta_description}
                    onChange={(e) => updateSetting('default_meta_description', e.target.value)}
                    placeholder="A compelling description for search results"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep under 160 characters for best results.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og_image_url">Default OG Image URL</Label>
                  <Input
                    id="og_image_url"
                    value={settings.og_image_url}
                    onChange={(e) => updateSetting('og_image_url', e.target.value)}
                    placeholder="https://example.com/og-image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Default image shown when shared on social media. Recommended: 1200x630px.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Social Settings */}
          <TabsContent value="social" className="space-y-6">
            <div className="glass-card p-6 rounded-xl space-y-6">
              <h2 className="text-lg font-semibold">Social Media Links</h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter_handle">Twitter/X Handle</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="twitter_handle"
                      value={settings.twitter_handle}
                      onChange={(e) => updateSetting('twitter_handle', e.target.value)}
                      placeholder="yourhandle"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook URL</Label>
                  <Input
                    id="facebook_url"
                    value={settings.facebook_url}
                    onChange={(e) => updateSetting('facebook_url', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    value={settings.instagram_url}
                    onChange={(e) => updateSetting('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={settings.linkedin_url}
                    onChange={(e) => updateSetting('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <div className="glass-card p-6 rounded-xl space-y-6">
              <h2 className="text-lg font-semibold">Email & Newsletter</h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => updateSetting('contact_email', e.target.value)}
                    placeholder="hello@example.com"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="newsletter_enabled"
                    checked={settings.newsletter_enabled}
                    onChange={(e) => updateSetting('newsletter_enabled', e.target.checked)}
                    className="w-4 h-4 rounded border-input"
                  />
                  <Label htmlFor="newsletter_enabled" className="cursor-pointer">
                    Enable Newsletter Signup
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
