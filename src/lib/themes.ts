/**
 * Theme system for occasion-based styling
 * Base theme is used as default, special themes activate during specific date ranges
 */

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: {
      from: string;
      to: string;
    };
  };
  decorations?: {
    icon?: string;
    pattern?: string;
  };
}

export interface OccasionTheme extends Theme {
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
}

// Base/Default theme (current design)
export const baseTheme: Theme = {
  name: 'default',
  colors: {
    primary: 'rgb(37, 99, 235)', // blue-600
    secondary: 'rgb(147, 51, 234)', // purple-600
    accent: 'rgb(34, 197, 94)', // green-600
    gradient: {
      from: 'rgb(34, 197, 94)', // green-500
      to: 'rgb(59, 130, 246)', // blue-500
    },
  },
};

// Christmas Theme (December 15 - December 26)
export const christmasTheme: OccasionTheme = {
  name: 'christmas',
  startDate: { month: 12, day: 15 },
  endDate: { month: 12, day: 26 },
  colors: {
    primary: 'rgb(220, 38, 38)', // red-600
    secondary: 'rgb(22, 163, 74)', // green-600
    accent: 'rgb(234, 179, 8)', // yellow-600 (gold)
    gradient: {
      from: 'rgb(220, 38, 38)', // red-600
      to: 'rgb(22, 163, 74)', // green-600
    },
  },
  decorations: {
    icon: '🎄',
    pattern: 'snowflakes',
  },
};

// New Year Theme (December 27 - January 5)
export const newYearTheme: OccasionTheme = {
  name: 'newyear',
  startDate: { month: 12, day: 27 },
  endDate: { month: 1, day: 5 },
  colors: {
    primary: 'rgb(147, 51, 234)', // purple-600
    secondary: 'rgb(234, 179, 8)', // yellow-600 (gold)
    accent: 'rgb(236, 72, 153)', // pink-600
    gradient: {
      from: 'rgb(147, 51, 234)', // purple-600
      to: 'rgb(236, 72, 153)', // pink-600
    },
  },
  decorations: {
    icon: '🎉',
    pattern: 'confetti',
  },
};

// Valentine's Day Theme (February 7 - February 15)
export const valentineTheme: OccasionTheme = {
  name: 'valentine',
  startDate: { month: 2, day: 7 },
  endDate: { month: 2, day: 15 },
  colors: {
    primary: 'rgb(236, 72, 153)', // pink-600
    secondary: 'rgb(239, 68, 68)', // red-500
    accent: 'rgb(219, 39, 119)', // pink-700
    gradient: {
      from: 'rgb(236, 72, 153)', // pink-600
      to: 'rgb(239, 68, 68)', // red-500
    },
  },
  decorations: {
    icon: '💝',
    pattern: 'hearts',
  },
};

// Spring Theme (March 20 - April 5)
export const springTheme: OccasionTheme = {
  name: 'spring',
  startDate: { month: 3, day: 20 },
  endDate: { month: 4, day: 5 },
  colors: {
    primary: 'rgb(34, 197, 94)', // green-600
    secondary: 'rgb(236, 72, 153)', // pink-600
    accent: 'rgb(250, 204, 21)', // yellow-400
    gradient: {
      from: 'rgb(34, 197, 94)', // green-500
      to: 'rgb(236, 72, 153)', // pink-500
    },
  },
  decorations: {
    icon: '🌸',
    pattern: 'flowers',
  },
};

// Independence Day Theme (July 1 - July 7) - US
export const independenceTheme: OccasionTheme = {
  name: 'independence',
  startDate: { month: 7, day: 1 },
  endDate: { month: 7, day: 7 },
  colors: {
    primary: 'rgb(220, 38, 38)', // red-600
    secondary: 'rgb(37, 99, 235)', // blue-600
    accent: 'rgb(255, 255, 255)', // white
    gradient: {
      from: 'rgb(220, 38, 38)', // red-600
      to: 'rgb(37, 99, 235)', // blue-600
    },
  },
  decorations: {
    icon: '🇺🇸',
    pattern: 'stars',
  },
};

// Halloween Theme (October 25 - October 31)
export const halloweenTheme: OccasionTheme = {
  name: 'halloween',
  startDate: { month: 10, day: 25 },
  endDate: { month: 10, day: 31 },
  colors: {
    primary: 'rgb(249, 115, 22)', // orange-600
    secondary: 'rgb(147, 51, 234)', // purple-600
    accent: 'rgb(0, 0, 0)', // black
    gradient: {
      from: 'rgb(249, 115, 22)', // orange-600
      to: 'rgb(147, 51, 234)', // purple-600
    },
  },
  decorations: {
    icon: '🎃',
    pattern: 'spooky',
  },
};

// Thanksgiving Theme (November 20 - November 28) - US
export const thanksgivingTheme: OccasionTheme = {
  name: 'thanksgiving',
  startDate: { month: 11, day: 20 },
  endDate: { month: 11, day: 28 },
  colors: {
    primary: 'rgb(249, 115, 22)', // orange-600
    secondary: 'rgb(180, 83, 9)', // amber-700
    accent: 'rgb(234, 179, 8)', // yellow-600
    gradient: {
      from: 'rgb(249, 115, 22)', // orange-600
      to: 'rgb(180, 83, 9)', // amber-700
    },
  },
  decorations: {
    icon: '🦃',
    pattern: 'autumn',
  },
};

// All occasion themes
export const occasionThemes: OccasionTheme[] = [
  christmasTheme,
  newYearTheme,
  valentineTheme,
  springTheme,
  independenceTheme,
  halloweenTheme,
  thanksgivingTheme,
];

/**
 * Get the current active theme based on today's date
 */
export function getCurrentTheme(): Theme {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed
  const currentDay = now.getDate();

  for (const theme of occasionThemes) {
    const { startDate, endDate } = theme;

    // Handle year-wrap (e.g., Dec 27 to Jan 5)
    if (startDate.month > endDate.month) {
      // Check if we're in the end of the year range or beginning of next year
      const inEndOfYear = 
        currentMonth === startDate.month && currentDay >= startDate.day;
      const inStartOfYear = 
        currentMonth === endDate.month && currentDay <= endDate.day;
      
      if (inEndOfYear || inStartOfYear) {
        return theme;
      }
    } else {
      // Normal date range within same year
      const afterStart = 
        currentMonth > startDate.month || 
        (currentMonth === startDate.month && currentDay >= startDate.day);
      const beforeEnd = 
        currentMonth < endDate.month || 
        (currentMonth === endDate.month && currentDay <= endDate.day);

      if (afterStart && beforeEnd) {
        return theme;
      }
    }
  }

  return baseTheme;
}

/**
 * Apply theme colors as CSS variables
 */
export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--gradient-from', theme.colors.gradient.from);
  root.style.setProperty('--gradient-to', theme.colors.gradient.to);
  root.setAttribute('data-theme', theme.name);
}
