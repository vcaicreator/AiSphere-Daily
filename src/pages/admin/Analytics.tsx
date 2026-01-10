import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  TrendingUp,
  Activity,
  RefreshCw
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  usePageViewStats,
  useTopPages,
  useDeviceBreakdown,
  useBrowserBreakdown,
  useReferrerBreakdown,
  useRealtimeVisitors,
  useEventStats,
  useTopArticles,
  DateRange,
} from '@/hooks/useAnalyticsData';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
];

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data: pageViewStats, isLoading: loadingPageViews, refetch: refetchPageViews } = usePageViewStats(dateRange);
  const { data: topPages, refetch: refetchTopPages } = useTopPages(dateRange);
  const { data: deviceBreakdown, refetch: refetchDevice } = useDeviceBreakdown(dateRange);
  const { data: browserBreakdown, refetch: refetchBrowser } = useBrowserBreakdown(dateRange);
  const { data: referrerBreakdown, refetch: refetchReferrer } = useReferrerBreakdown(dateRange);
  const { data: realtimeData, refetch: refetchRealtime } = useRealtimeVisitors();
  const { data: eventStats, refetch: refetchEvents } = useEventStats(dateRange);
  const { data: topArticles, refetch: refetchArticles } = useTopArticles(dateRange);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      refetchPageViews(),
      refetchTopPages(),
      refetchDevice(),
      refetchBrowser(),
      refetchReferrer(),
      refetchRealtime(),
      refetchEvents(),
      refetchArticles(),
    ]);
    setIsRefreshing(false);
  };

  const getDeviceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'desktop': return Monitor;
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  return (
    <AdminLayout title="Analytics">
      {/* Real-time & Date Range Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Real-time Indicator */}
        <div className="flex items-center gap-3 glass-card px-4 py-3 rounded-xl">
          <div className="relative">
            <Activity className="w-5 h-5 text-green-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-bold">{realtimeData?.activeVisitors || 0}</span>
            <span className="text-muted-foreground ml-2">active now</span>
          </div>
        </div>

        {/* Date Range Selector & Refresh */}
        <div className="flex gap-2 items-center">
          {dateRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={dateRange === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="ml-2"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Eye className="w-5 h-5" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Total Views</p>
          <p className="text-3xl font-bold">
            {loadingPageViews ? '...' : pageViewStats?.totalViews.toLocaleString()}
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Unique Visitors</p>
          <p className="text-3xl font-bold">
            {loadingPageViews ? '...' : pageViewStats?.uniqueVisitors.toLocaleString()}
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
              <MousePointer className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Total Sessions</p>
          <p className="text-3xl font-bold">
            {loadingPageViews ? '...' : pageViewStats?.totalSessions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="glass-card p-6 rounded-xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Page Views Over Time</h2>
            <p className="text-sm text-muted-foreground">Daily page views and unique visitors</p>
          </div>
        </div>
        <div className="h-[300px]">
          {loadingPageViews ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : pageViewStats?.chartData && pageViewStats.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pageViewStats.chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="formattedDate"
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
                  name="Page Views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Unique Visitors"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No data available for this period
            </div>
          )}
        </div>
      </div>

      {/* Grid of smaller charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Device Breakdown */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Devices</h2>
          <div className="flex items-center gap-8">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceBreakdown || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={2}
                  >
                    {deviceBreakdown?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {deviceBreakdown?.map((device, index) => {
                const Icon = getDeviceIcon(device.name);
                return (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{device.name}</span>
                    </div>
                    <span className="font-medium">{device.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Browser Breakdown */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Browsers</h2>
          <div className="space-y-3">
            {browserBreakdown?.slice(0, 5).map((browser, index) => (
              <div key={browser.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{browser.name}</span>
                  <span className="text-muted-foreground">{browser.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${browser.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Sources */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Traffic Sources</h2>
          </div>
          <div className="space-y-3">
            {referrerBreakdown?.map((source, index) => (
              <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{source.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{source.value}</span>
                  <span className="text-muted-foreground ml-2 text-sm">({source.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Top Pages</h2>
          </div>
          <div className="space-y-2">
            {topPages?.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-muted-foreground w-6">{index + 1}.</span>
                  <span className="truncate text-sm">{page.path}</span>
                </div>
                <span className="font-bold ml-4">{page.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Articles & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Top Articles</h2>
          <div className="space-y-2">
            {topArticles?.length ? (
              topArticles.map((article, index) => (
                <div key={article.slug} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-muted-foreground w-6">{index + 1}.</span>
                    <span className="truncate text-sm">{article.title}</span>
                  </div>
                  <span className="font-bold ml-4">{article.views} views</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No article views yet</p>
            )}
          </div>
        </div>

        {/* Event Summary */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Events</h2>
          <div className="h-[200px]">
            {eventStats?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventStats.slice(0, 6)} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center py-8">No events tracked yet</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
