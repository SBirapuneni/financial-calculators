'use client';

import { useEffect, useState } from 'react';
import { getCurrentTheme, applyTheme, type Theme } from '@/lib/themes';

/**
 * Hook to get and apply the current occasion theme
 * Automatically updates theme based on date
 */
export function useOccasionTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Get and apply theme on mount
    const theme = getCurrentTheme();
    setCurrentTheme(theme);
    applyTheme(theme);

    // Check for theme changes every hour (in case day changes)
    const interval = setInterval(() => {
      const newTheme = getCurrentTheme();
      if (newTheme.name !== currentTheme?.name) {
        setCurrentTheme(newTheme);
        applyTheme(newTheme);
      }
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [currentTheme?.name]);

  return currentTheme;
}
