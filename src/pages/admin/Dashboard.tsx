import { FileText, Eye, Users, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAllArticles } from '@/hooks/useArticles';
import { useAuthors } from '@/hooks/useAuthors';
import { useCategories } from '@/hooks/useCategories';

const AdminDashboard = () => {
  const { data: articles, isLoading: articlesLoading } = useAllArticles();
  const { data: authors, isLoading: authorsLoading } = useAuthors();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const publishedCount = articles?.filter(a => a.status === 'published').length || 0;
  const draftCount = articles?.filter(a => a.status === 'draft').length || 0;
  const totalViews = articles?.reduce((sum, a) => sum + (a.views_count || 0), 0) || 0;

  const stats = [
    {
      label: 'Total Articles',
      value: articles?.length || 0,
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-500',
      loading: articlesLoading,
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
    },
    {
      label: 'Categories',
      value: categories?.length || 0,
      icon: Tags,
      color: 'bg-amber-500/10 text-amber-500',
      loading: categoriesLoading,
    },
  ];

  const recentArticles = articles?.slice(0, 5) || [];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
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
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Article Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Published</span>
              <span className="font-medium text-green-500">{publishedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Drafts</span>
              <span className="font-medium text-amber-500">{draftCount}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/articles/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              New Article
            </Link>
            <Link
              to="/admin/authors"
              className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              Manage Authors
            </Link>
            <Link
              to="/admin/categories"
              className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              Manage Categories
            </Link>
          </div>
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
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                to={`/admin/articles/${article.id}`}
                className="block p-4 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{article.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {article.category?.name || 'Uncategorized'} • {article.author?.name || 'Unknown author'}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      article.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : article.status === 'draft'
                        ? 'bg-amber-500/10 text-amber-500'
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
