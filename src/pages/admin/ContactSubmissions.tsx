import { useState, useEffect } from 'react';
import { Mail, Eye, Trash2, CheckCircle, Clock, Search, MailOpen } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  responded_at: string | null;
  admin_notes: string | null;
  created_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast.error('Failed to load submissions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, is_read: true } : s));
    } catch (error: any) {
      toast.error('Failed to update: ' + error.message);
    }
  };

  const markAsResponded = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ responded_at: new Date().toISOString(), admin_notes: adminNotes })
        .eq('id', id);

      if (error) throw error;
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, responded_at: new Date().toISOString(), admin_notes: adminNotes } : s));
      setSelectedSubmission(null);
      toast.success('Marked as responded');
    } catch (error: any) {
      toast.error('Failed to update: ' + error.message);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast.success('Submission deleted');
    } catch (error: any) {
      toast.error('Failed to delete: ' + error.message);
    }
  };

  const openSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setAdminNotes(submission.admin_notes || '');
    if (!submission.is_read) {
      markAsRead(submission.id);
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.subject.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = submissions.filter(s => !s.is_read).length;

  if (loading) {
    return (
      <AdminLayout title="Contact Submissions">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Contact Submissions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search submissions..."
                className="pl-10 w-64"
              />
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
          </div>
        </div>

        {/* Submissions List */}
        <div className="glass-card rounded-xl overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No contact submissions yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${!submission.is_read ? 'bg-primary/5' : ''}`}
                  onClick={() => openSubmission(submission)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!submission.is_read && <div className="w-2 h-2 rounded-full bg-primary" />}
                        <span className="font-semibold truncate">{submission.name}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground truncate">{submission.email}</span>
                      </div>
                      <p className="font-medium truncate">{submission.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">{submission.message}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {submission.responded_at && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Responded
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); deleteSubmission(submission.id); }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MailOpen className="w-5 h-5" />
              {selectedSubmission?.subject}
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">From</p>
                  <p className="font-medium">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedSubmission.email}`} className="font-medium text-primary hover:underline">
                    {selectedSubmission.email}
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground">Received</p>
                  <p className="font-medium">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  {selectedSubmission.responded_at ? (
                    <Badge variant="secondary">Responded {new Date(selectedSubmission.responded_at).toLocaleDateString()}</Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm mb-2">Message</p>
                <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm mb-2">Admin Notes</p>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <a href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}>
                    <Mail className="w-4 h-4 mr-2" /> Reply via Email
                  </a>
                </Button>
                {!selectedSubmission.responded_at && (
                  <Button onClick={() => markAsResponded(selectedSubmission.id)} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Responded
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContactSubmissions;
