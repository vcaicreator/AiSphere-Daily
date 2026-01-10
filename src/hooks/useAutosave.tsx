import { useState, useEffect, useRef, useCallback } from 'react';

type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'unsaved';

interface UseAutosaveOptions {
  data: any;
  onSave: () => Promise<void>;
  interval?: number; // milliseconds
  enabled?: boolean;
}

export function useAutosave({ data, onSave, interval = 30000, enabled = true }: UseAutosaveOptions) {
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const previousDataRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Stringify data for comparison
  const dataString = JSON.stringify(data);

  // Check if data has changed
  useEffect(() => {
    if (previousDataRef.current && previousDataRef.current !== dataString) {
      setStatus('unsaved');
    }
  }, [dataString]);

  const save = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setStatus('saving');
      await onSave();
      if (isMountedRef.current) {
        setStatus('saved');
        setLastSaved(new Date());
        previousDataRef.current = dataString;
        
        // Reset to idle after 3 seconds
        setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle');
          }
        }, 3000);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setStatus('error');
      }
    }
  }, [onSave, enabled, dataString]);

  // Manual save
  const saveNow = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return save();
  }, [save]);

  // Auto-save interval
  useEffect(() => {
    if (!enabled) return;

    // Only start autosave if there are unsaved changes
    if (status === 'unsaved') {
      timeoutRef.current = setTimeout(() => {
        save();
      }, interval);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status, interval, enabled, save]);

  // Initialize previous data
  useEffect(() => {
    if (!previousDataRef.current) {
      previousDataRef.current = dataString;
    }
  }, [dataString]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status === 'unsaved') {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [status]);

  return {
    status,
    lastSaved,
    saveNow,
    hasUnsavedChanges: status === 'unsaved',
  };
}
