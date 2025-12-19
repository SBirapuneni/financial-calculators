// Type definitions for Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a custom event in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track calculator usage
 */
export const trackCalculation = (
  calculatorName: string,
  data?: Record<string, any>
) => {
  trackEvent('calculation_performed', {
    calculator_name: calculatorName,
    timestamp: new Date().toISOString(),
    ...data,
  });
};

/**
 * Track calculator page view
 */
export const trackCalculatorView = (calculatorName: string) => {
  trackEvent('calculator_opened', {
    calculator_name: calculatorName,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track time spent on calculator page
 */
export const trackTimeSpent = (
  calculatorName: string,
  timeInSeconds: number
) => {
  trackEvent('calculator_time_spent', {
    calculator_name: calculatorName,
    time_seconds: Math.round(timeInSeconds),
    time_minutes: Math.round(timeInSeconds / 60 * 10) / 10, // Round to 1 decimal
    page_path: window.location.pathname,
  });
};

/**
 * Track calculator engagement (scroll depth, interactions)
 */
export const trackCalculatorEngagement = (
  calculatorName: string,
  engagementData: {
    calculationCount?: number;
    scrollDepth?: number;
    inputsChanged?: number;
  }
) => {
  trackEvent('calculator_engagement', {
    calculator_name: calculatorName,
    ...engagementData,
  });
};

/**
 * Track result view
 */
export const trackResultView = (
  calculatorName: string,
  calculationType?: string
) => {
  trackEvent('result_viewed', {
    calculator_name: calculatorName,
    calculation_type: calculationType,
  });
};

/**
 * Track share action
 */
export const trackShare = (calculatorName: string, method: string) => {
  trackEvent('share_clicked', {
    calculator_name: calculatorName,
    share_method: method,
  });
};

/**
 * Track print action
 */
export const trackPrint = (calculatorName: string) => {
  trackEvent('print_clicked', {
    calculator_name: calculatorName,
  });
};

/**
 * Track advanced options toggle
 */
export const trackAdvancedOptions = (
  calculatorName: string,
  isExpanded: boolean
) => {
  trackEvent('advanced_options_toggled', {
    calculator_name: calculatorName,
    expanded: isExpanded,
  });
};

export {};
