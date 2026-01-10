import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { subDays, format, startOfDay, endOfDay } from 'date-fns';

export type DateRange = '24h' | '7d' | '30d' | '90d';

const getDateRange = (range: DateRange) => {
  const end = new Date();
  let start: Date;
  
  switch (range) {
    case '24h':
      start = subDays(end, 1);
      break;
    case '7d':
      start = subDays(end, 7);
      break;
    case '30d':
      start = subDays(end, 30);
      break;
    case '90d':
      start = subDays(end, 90);
      break;
    default:
      start = subDays(end, 7);
  }
  
  return { start, end };
};

export const usePageViewStats = (range: DateRange = '7d') => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['pageViewStats', range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('created_at, page_path, visitor_id, session_id')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      // Aggregate by day
      const dailyStats: Record<string, { views: number; visitors: Set<string>; sessions: Set<string> }> = {};
      
      data?.forEach((pv) => {
        const day = format(new Date(pv.created_at), 'yyyy-MM-dd');
        if (!dailyStats[day]) {
          dailyStats[day] = { views: 0, visitors: new Set(), sessions: new Set() };
        }
        dailyStats[day].views++;
        if (pv.visitor_id) dailyStats[day].visitors.add(pv.visitor_id);
        if (pv.session_id) dailyStats[day].sessions.add(pv.session_id);
      });
      
      const chartData = Object.entries(dailyStats).map(([date, stats]) => ({
        date,
        formattedDate: format(new Date(date), 'MMM d'),
        views: stats.views,
        visitors: stats.visitors.size,
        sessions: stats.sessions.size,
      }));
      
      const totalViews = data?.length || 0;
      const uniqueVisitors = new Set(data?.map(pv => pv.visitor_id).filter(Boolean)).size;
      const totalSessions = new Set(data?.map(pv => pv.session_id).filter(Boolean)).size;
      
      return {
        chartData,
        totalViews,
        uniqueVisitors,
        totalSessions,
      };
    },
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useTopPages = (range: DateRange = '7d', limit = 10) => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['topPages', range, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('page_path, page_title')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      if (error) throw error;
      
      // Aggregate by page
      const pageStats: Record<string, { views: number; title: string }> = {};
      
      data?.forEach((pv) => {
        if (!pageStats[pv.page_path]) {
          pageStats[pv.page_path] = { views: 0, title: pv.page_title || pv.page_path };
        }
        pageStats[pv.page_path].views++;
      });
      
      return Object.entries(pageStats)
        .map(([path, stats]) => ({ path, ...stats }))
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
    },
  });
};

export const useDeviceBreakdown = (range: DateRange = '7d') => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['deviceBreakdown', range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('device_type')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      if (error) throw error;
      
      const deviceCounts: Record<string, number> = {};
      
      data?.forEach((pv) => {
        const device = pv.device_type || 'unknown';
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      });
      
      const total = data?.length || 1;
      
      return Object.entries(deviceCounts).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: count,
        percentage: Math.round((count / total) * 100),
      }));
    },
  });
};

export const useBrowserBreakdown = (range: DateRange = '7d') => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['browserBreakdown', range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('browser')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      if (error) throw error;
      
      const browserCounts: Record<string, number> = {};
      
      data?.forEach((pv) => {
        const browser = pv.browser || 'unknown';
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      });
      
      const total = data?.length || 1;
      
      return Object.entries(browserCounts)
        .map(([name, count]) => ({
          name,
          value: count,
          percentage: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.value - a.value);
    },
  });
};

export const useReferrerBreakdown = (range: DateRange = '7d') => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['referrerBreakdown', range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('referrer')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      if (error) throw error;
      
      const referrerCounts: Record<string, number> = {};
      
      data?.forEach((pv) => {
        let source = 'Direct';
        if (pv.referrer) {
          try {
            const url = new URL(pv.referrer);
            source = url.hostname.replace('www.', '');
          } catch {
            source = 'Other';
          }
        }
        referrerCounts[source] = (referrerCounts[source] || 0) + 1;
      });
      
      const total = data?.length || 1;
      
      return Object.entries(referrerCounts)
        .map(([name, count]) => ({
          name,
          value: count,
          percentage: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
    },
  });
};

export const useRealtimeVisitors = () => {
  return useQuery({
    queryKey: ['realtimeVisitors'],
    queryFn: async () => {
      const fiveMinutesAgo = subDays(new Date(), 0);
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      
      const { data, error } = await supabase
        .from('page_views')
        .select('visitor_id, page_path')
        .gte('created_at', fiveMinutesAgo.toISOString());
      
      if (error) throw error;
      
      const uniqueVisitors = new Set(data?.map(pv => pv.visitor_id).filter(Boolean));
      const currentPages: Record<string, number> = {};
      
      data?.forEach((pv) => {
        currentPages[pv.page_path] = (currentPages[pv.page_path] || 0) + 1;
      });
      
      return {
        activeVisitors: uniqueVisitors.size,
        currentPages: Object.entries(currentPages)
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useEventStats = (range: DateRange = '7d') => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['eventStats', range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('event_name, event_category')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      if (error) throw error;
      
      const eventCounts: Record<string, number> = {};
      
      data?.forEach((ev) => {
        eventCounts[ev.event_name] = (eventCounts[ev.event_name] || 0) + 1;
      });
      
      return Object.entries(eventCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    },
  });
};

export const useTopArticles = (range: DateRange = '7d', limit = 10) => {
  const { start, end } = getDateRange(range);
  
  return useQuery({
    queryKey: ['topArticles', range, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('page_path, page_title, article_id')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .like('page_path', '/article/%');
      
      if (error) throw error;
      
      // Aggregate by article
      const articleStats: Record<string, { views: number; title: string }> = {};
      
      data?.forEach((pv) => {
        const slug = pv.page_path.replace('/article/', '');
        if (!articleStats[slug]) {
          articleStats[slug] = { 
            views: 0, 
            title: pv.page_title?.replace(' | AiSphere Daily', '') || slug 
          };
        }
        articleStats[slug].views++;
      });
      
      return Object.entries(articleStats)
        .map(([slug, stats]) => ({ slug, ...stats }))
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
    },
  });
};
