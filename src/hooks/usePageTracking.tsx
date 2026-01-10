import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { sendGAPageView } from '@/components/analytics/GoogleAnalytics';

const getOrCreateVisitorId = (): string => {
  const key = 'ais_visitor_id';
  let visitorId = localStorage.getItem(key);
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(key, visitorId);
  }
  return visitorId;
};

const getOrCreateSessionId = (): string => {
  const key = 'ais_session_id';
  const expiryKey = 'ais_session_expiry';
  const now = Date.now();
  const thirtyMinutes = 30 * 60 * 1000;
  
  let sessionId = sessionStorage.getItem(key);
  const expiry = sessionStorage.getItem(expiryKey);
  
  if (!sessionId || !expiry || now > parseInt(expiry)) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(key, sessionId);
  }
  
  // Extend session expiry
  sessionStorage.setItem(expiryKey, String(now + thirtyMinutes));
  return sessionId;
};

const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

const getBrowser = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'IE';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Unknown';
};

export const usePageTracking = () => {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    
    // Avoid duplicate tracking for the same path
    if (lastTrackedPath.current === currentPath) {
      return;
    }
    lastTrackedPath.current = currentPath;

    // Skip tracking for admin pages
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    const trackPageView = async () => {
      const visitorId = getOrCreateVisitorId();
      const sessionId = getOrCreateSessionId();

      // Send to GA4
      sendGAPageView(currentPath, document.title);

      // Send to our database
      try {
        await supabase.from('page_views').insert({
          page_path: currentPath,
          page_title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          browser: getBrowser(),
          session_id: sessionId,
          visitor_id: visitorId,
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Small delay to ensure document.title is updated
    const timeout = setTimeout(trackPageView, 100);
    return () => clearTimeout(timeout);
  }, [location.pathname, location.search]);
};

export default usePageTracking;
