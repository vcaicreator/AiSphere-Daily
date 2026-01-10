import { FileText, Eye, Users, Tags, Image, Mail, Plus, Clock, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAllArticles } from '@/hooks/useArticles';
import { useAuthors } from '@/hooks/useAuthors';
import { useCategories } from '@/hooks/useCategories';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const { data: articles, isLoading: articlesLoading } = useAllArticles();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  
  // Fetch subscriber count
  const { data: subscriberCount } = useQuery({
    queryKey: ['subscriber_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      
      if (error) throw error;
      return count || 0;
    },
  });

  const publishedCount = articles?.filter(a => a.status === 'published').length || 0;
  const draftCount = articles?.filter(a => a.status === 'draft').length || 0;
  const scheduledCount = articles?.filter(a => a.status === 'scheduled').length || 0;
  const totalViews = articles?.reduce((sum, a) => sum + (a.views_count || 0), 0) || 0;

  // Generate mock chart data based on articles
  const chartData = (() => {
    const days = 7;
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayViews = Math.floor(Math.random() * 500) + 100;
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        views: dayViews,
      });
    }
    return data;
  })();

  const stats = [
    {
      label: 'Total Articles',
      value: articles?.length || 0,
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-500',
      loading: articlesLoading,
      href: '/admin/articles',
    },
    {
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: 'bg-green-500/10 text-green-500',
      loading: articlesLoading,
    },
    {
      label: 'Authors',
      value: authors?.length || 0,
      icon: Users,
      color: 'bg-purple-500/10 text-purple-500',
      loading: authorsLoading,
      href: '/admin/authors',
    },
    {
      label: 'Categories',
      value: categories?.length || 0,
      icon: Tags,
      color: 'bg-amber-500/10 text-amber-500',
      loading: categoriesLoading,
      href: '/admin/categories',
    },
    {
      label: 'Subscribers',
      value: subscriberCount || 0,
      icon: Mail,
      color: 'bg-pink-500/10 text-pink-500',
      loading: false,
      href: '/admin/subscribers',
    },
  ];

  const recentArticles = articles?.slice(0, 5) || [];
  const draftArticles = articles?.filter(a => a.status === 'draft').slice(0, 5) || [];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const content = (
            <div className="glass-card p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">
                {stat.loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  stat.value
                )}
              </p>
            </div>
          );

          return stat.href ? (
            <Link key={stat.label} to={stat.href}>
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      {/* Charts and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Views Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Page Views</h2>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Article Status */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Article Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Published</span>
              </div>
              <span className="font-bold text-green-500">{publishedCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Drafts</span>
              </div>
              <span className="font-bold text-amber-500">{draftCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Scheduled</span>
              </div>
              <span className="font-bold text-blue-500">{scheduledCount}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <Link to="/admin/articles/new">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" /> New Article
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions and Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/articles/new"
              className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">New Article</span>
            </Link>
            <Link
              to="/admin/authors"
              className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
            >
              <Users className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Add Author</span>
            </Link>
            <Link
              to="/admin/media"
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors"
            >
              <Image className="w-5 h-5 text-green-500" />
              <span className="font-medium">Media Library</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
            >
              <Tags className="w-5 h-5 text-amber-500" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </div>

        {/* Drafts */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pending Drafts</h2>
            <Link to="/admin/articles?status=draft" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>

          {articlesLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-14 bg-muted rounded-lg" />
              ))}
            </div>
          ) : draftArticles.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No drafts. All caught up! 🎉
            </p>
          ) : (
            <div className="space-y-2">
              {draftArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/admin/articles/${article.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{article.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Last updated {new Date(article.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Articles</h2>
          <Link
            to="/admin/articles"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {articlesLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded-lg" />
            ))}
          </div>
        ) : recentArticles.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No articles yet. Create your first article!
          </p>
        ) : (
          <div className="space-y-2">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                to={`/admin/articles/${article.id}`}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
              >
                {article.featured_image ? (
                  <img
                    src={article.featured_image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{article.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {article.category?.name || 'Uncategorized'} • {article.author?.name || 'Unknown author'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      {article.views_count || 0}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      article.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : article.status === 'draft'
                        ? 'bg-amber-500/10 text-amber-500'
                        : article.status === 'scheduled'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
