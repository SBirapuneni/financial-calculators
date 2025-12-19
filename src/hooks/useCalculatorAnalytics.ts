'use client';

import { useEffect, useRef } from 'react';
import { trackCalculatorView, trackTimeSpent, trackCalculatorEngagement } from '@/lib/analytics';

interface UseCalculatorAnalyticsOptions {
  calculatorName: string;
  trackTimeSpent?: boolean;
  trackEngagement?: boolean;
  minTimeThreshold?: number; // Minimum seconds before tracking (avoid bounces)
}

/**
 * Custom hook for automatic calculator analytics tracking
 * 
 * Features:
 * - Tracks when user visits calculator page
 * - Tracks time spent on page
 * - Tracks engagement metrics (calculations performed)
 * 
 * @example
 * ```tsx
 * export default function RetirementCalculatorPage() {
 *   const { trackCalculation } = useCalculatorAnalytics({
 *     calculatorName: 'retirement',
 *     trackTimeSpent: true,
 *   });
 * 
 *   const handleCalculate = (data) => {
 *     // ... calculation logic
 *     trackCalculation({ age: data.age, targetAmount: data.target });
 *   };
 * }
 * ```
 */
export function useCalculatorAnalytics({
  calculatorName,
  trackTimeSpent: enableTimeTracking = true,
  trackEngagement: enableEngagement = true,
  minTimeThreshold = 5, // Only track if user stays >5 seconds
}: UseCalculatorAnalyticsOptions) {
  const startTimeRef = useRef<number>(Date.now());
  const calculationCountRef = useRef<number>(0);
  const hasTrackedViewRef = useRef<boolean>(false);

  useEffect(() => {
    // Track initial page view
    if (!hasTrackedViewRef.current) {
      trackCalculatorView(calculatorName);
      hasTrackedViewRef.current = true;
    }

    // Reset start time
    startTimeRef.current = Date.now();

    // Track time spent on unmount
    return () => {
      if (enableTimeTracking) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
        
        // Only track if user spent meaningful time (avoid accidental clicks)
        if (timeSpent >= minTimeThreshold) {
          trackTimeSpent(calculatorName, timeSpent);
        }
      }

      // Track engagement metrics on unmount
      if (enableEngagement && calculationCountRef.current > 0) {
        trackCalculatorEngagement(calculatorName, {
          calculationCount: calculationCountRef.current,
        });
      }
    };
  }, [calculatorName, enableTimeTracking, enableEngagement, minTimeThreshold]);

  // Track page visibility changes (user switching tabs)
  useEffect(() => {
    let visibilityStartTime = Date.now();
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched away - track time spent
        const timeSpent = (Date.now() - visibilityStartTime) / 1000;
        if (enableTimeTracking && timeSpent >= minTimeThreshold) {
          trackTimeSpent(calculatorName, timeSpent);
        }
      } else {
        // User came back - reset timer
        visibilityStartTime = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [calculatorName, enableTimeTracking, minTimeThreshold]);

  /**
   * Track a calculation performed by the user
   * Call this when user clicks "Calculate" button
   */
  const trackCalculation = (data?: Record<string, any>) => {
    calculationCountRef.current += 1;
    
    // Track the calculation event with data
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculation_performed', {
        calculator_name: calculatorName,
        calculation_number: calculationCountRef.current,
        timestamp: new Date().toISOString(),
        ...data,
      });
    }
  };

  /**
   * Track when user changes input values
   */
  const trackInputChange = (inputName: string, value: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'input_changed', {
        calculator_name: calculatorName,
        input_name: inputName,
        input_value: typeof value === 'number' ? value : String(value).substring(0, 50), // Limit string length
      });
    }
  };

  return {
    trackCalculation,
    trackInputChange,
    calculationCount: calculationCountRef.current,
  };
}
