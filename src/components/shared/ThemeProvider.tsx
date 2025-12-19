'use client';

import { useOccasionTheme } from '@/hooks/useOccasionTheme';

/**
 * Theme Provider Component
 * Apply occasion-based themes automatically
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useOccasionTheme();

  return (
    <>
      {theme && theme.decorations?.icon && (
        <div className="fixed top-20 right-4 text-4xl animate-bounce pointer-events-none z-50 hidden md:block">
          {theme.decorations.icon}
        </div>
      )}
      {children}
    </>
  );
}
