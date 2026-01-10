import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GoogleAnalytics = () => {
  const [measurementId, setMeasurementId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasurementId = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'ga_measurement_id')
        .single();

      if (!error && data?.value) {
        const value = typeof data.value === 'object' && 'value' in data.value 
          ? (data.value as { value: string }).value 
          : data.value;
        if (typeof value === 'string' && value.startsWith('G-')) {
          setMeasurementId(value);
        }
      }
    };

    fetchMeasurementId();
  }, []);

  useEffect(() => {
    if (!measurementId) return;

    // Check if already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      return;
    }

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false, // We'll handle this manually
    });

    return () => {
      // Cleanup is not strictly necessary for GA scripts
    };
  }, [measurementId]);

  return null;
};

// Helper function to send events to GA4
export const sendGAEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Helper function to send page views to GA4
export const sendGAPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export default GoogleAnalytics;
