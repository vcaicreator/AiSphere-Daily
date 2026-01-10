import { useState } from 'react';
import { 
  Mail, 
  Download, 
  Search, 
  ToggleLeft, 
  ToggleRight, 
  Trash2,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type Subscriber = Tables<'newsletter_subscribers'>;

const AdminSubscribers = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch subscribers
  const { data: subscribers, isLoading, refetch } = useQuery({
    queryKey: ['newsletter_subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return data as Subscriber[];
    },
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Toggle active status
  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter_subscribers'] });
      toast.success('Subscriber updated');
    },
    onError: (error: any) => {
      toast.error('Failed to update: ' + error.message);
    },
  });

  // Filter and search
  const filteredSubscribers = subscribers?.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && sub.is_active) || 
      (filter === 'inactive' && !sub.is_active);
    return matchesSearch && matchesFilter;
  }) || [];

  // Stats
  const totalCount = subscribers?.length || 0;
  const activeCount = subscribers?.filter(s => s.is_active).length || 0;
  const inactiveCount = totalCount - activeCount;
  
  // Recent subscribers (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentCount = subscribers?.filter(s => 
    new Date(s.subscribed_at) >= weekAgo
  ).length || 0;

  // Export to CSV
  const exportToCSV = () => {
    if (!subscribers || subscribers.length === 0) {
      toast.error('No subscribers to export');
      return;
    }

    const headers = ['Email', 'Status', 'Subscribed At'];
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      sub.is_active ? 'Active' : 'Inactive',
      new Date(sub.subscribed_at).toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(`Exported ${filteredSubscribers.length} subscribers`);
  };

  const stats = [
    { label: 'Total Subscribers', value: totalCount, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Active', value: activeCount, icon: CheckCircle, color: 'text-green-500 bg-green-500/10' },
    { label: 'Inactive', value: inactiveCount, icon: XCircle, color: 'text-red-500 bg-red-500/10' },
    { label: 'This Week', value: recentCount, icon: TrendingUp, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <AdminLayout title="Newsletter Subscribers">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all capitalize ${
                filter === f
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Refresh & Export */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Subscribers Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Mail className="w-12 h-12 mb-4 opacity-50" />
            <p>{search ? 'No subscribers found' : 'No subscribers yet'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Subscribed</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                          {subscriber.email[0].toUpperCase()}
                        </div>
                        <span className="font-medium">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          subscriber.is_active
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        {subscriber.is_active ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive.mutate({
                            id: subscriber.id,
                            is_active: !subscriber.is_active,
                          })}
                          title={subscriber.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {subscriber.is_active ? (
                            <ToggleRight className="w-5 h-5 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!isLoading && filteredSubscribers.length > 0 && (
          <div className="p-4 border-t border-border/50 text-sm text-muted-foreground">
            Showing {filteredSubscribers.length} of {totalCount} subscribers
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSubscribers;
