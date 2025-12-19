'use client';

import { useOccasionTheme } from '@/hooks/useOccasionTheme';

/**
 * Theme Provider Component
 * Apply occasion-based themes automatically with prominent visual changes
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useOccasionTheme();

  // Only show special occasion UI if not base theme
  const isSpecialOccasion = theme && theme.name !== 'default';

  return (
    <>
      {/* Occasion Banner */}
      {isSpecialOccasion && theme.decorations?.icon && (
        <div 
          className="w-full py-3 text-center text-white font-semibold shadow-lg relative overflow-hidden"
          style={{ background: `linear-gradient(to right, var(--gradient-from), var(--gradient-to))` }}
        >
          <div className="container mx-auto px-4 flex items-center justify-center gap-3">
            <span className="text-2xl animate-bounce">{theme.decorations.icon}</span>
            <span className="text-lg">
              {theme.name === 'christmas' && 'Merry Christmas! 🎅'}
              {theme.name === 'newyear' && 'Happy New Year! 🎊'}
              {theme.name === 'valentine' && "Happy Valentine's Day! 💕"}
              {theme.name === 'spring' && 'Welcome Spring! 🌼'}
              {theme.name === 'independence' && 'Happy Independence Day! 🎆'}
              {theme.name === 'halloween' && 'Happy Halloween! 👻'}
              {theme.name === 'thanksgiving' && 'Happy Thanksgiving! 🍂'}
            </span>
            <span className="text-2xl animate-bounce">{theme.decorations.icon}</span>
          </div>
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {theme.decorations.pattern === 'snowflakes' && (
              <div className="snowflakes" aria-hidden="true">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="snowflake">❅</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating decorative icons */}
      {isSpecialOccasion && theme.decorations?.icon && (
        <>
          <div className="fixed top-24 right-8 text-5xl animate-bounce pointer-events-none z-40 hidden lg:block opacity-80">
            {theme.decorations.icon}
          </div>
          <div className="fixed bottom-24 left-8 text-4xl animate-pulse pointer-events-none z-40 hidden lg:block opacity-70">
            {theme.decorations.icon}
          </div>
        </>
      )}

      {/* Snowfall animation for Christmas */}
      {isSpecialOccasion && theme.decorations?.pattern === 'snowflakes' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          <div className="snowfall">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  opacity: Math.random() * 0.6 + 0.4,
                  fontSize: `${Math.random() * 10 + 10}px`,
                }}
              >
                ❄
              </div>
            ))}
          </div>
        </div>
      )}

      {children}
    </>
  );
}
