import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { sendGAEvent } from '@/components/analytics/GoogleAnalytics';

interface TrackEventParams {
  category?: string;
  label?: string;
  value?: number;
  articleId?: string;
  metadata?: Record<string, any>;
}

export const useAnalytics = () => {
  const getVisitorId = (): string => {
    return localStorage.getItem('ais_visitor_id') || 'unknown';
  };

  const getSessionId = (): string => {
    return sessionStorage.getItem('ais_session_id') || 'unknown';
  };

  const trackEvent = useCallback(async (
    eventName: string,
    params: TrackEventParams = {}
  ) => {
    const { category, label, value, articleId, metadata } = params;

    // Send to GA4
    sendGAEvent(eventName, {
      event_category: category,
      event_label: label,
      value: value,
      article_id: articleId,
      ...metadata,
    });

    // Send to our database
    try {
      await supabase.from('analytics_events').insert({
        event_name: eventName,
        event_category: category || null,
        event_label: label || null,
        event_value: value || null,
        page_path: window.location.pathname,
        article_id: articleId || null,
        session_id: getSessionId(),
        visitor_id: getVisitorId(),
        metadata: metadata || {},
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, []);

  // Common event helpers
  const trackNewsletterSignup = useCallback((email: string) => {
    trackEvent('newsletter_signup', {
      category: 'engagement',
      label: email.split('@')[1], // Just the domain
    });
  }, [trackEvent]);

  const trackArticleRead = useCallback((articleId: string, title: string) => {
    trackEvent('article_read', {
      category: 'content',
      label: title,
      articleId,
    });
  }, [trackEvent]);

  const trackShare = useCallback((platform: string, articleId?: string, title?: string) => {
    trackEvent('share', {
      category: 'social',
      label: platform,
      articleId,
      metadata: { title },
    });
  }, [trackEvent]);

  const trackScrollDepth = useCallback((depth: number, articleId?: string) => {
    trackEvent('scroll_depth', {
      category: 'engagement',
      label: `${depth}%`,
      value: depth,
      articleId,
    });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, resultsCount: number) => {
    trackEvent('search', {
      category: 'engagement',
      label: query,
      value: resultsCount,
    });
  }, [trackEvent]);

  const trackContactSubmit = useCallback(() => {
    trackEvent('contact_submit', {
      category: 'engagement',
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackNewsletterSignup,
    trackArticleRead,
    trackShare,
    trackScrollDepth,
    trackSearch,
    trackContactSubmit,
  };
};

export default useAnalytics;
