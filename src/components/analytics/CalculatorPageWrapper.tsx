'use client';

import { useCalculatorAnalytics } from '@/hooks/useCalculatorAnalytics';
import { ReactNode } from 'react';

interface CalculatorPageWrapperProps {
  calculatorName: string;
  children: ReactNode;
}

/**
 * Wrapper component for calculator pages to automatically track analytics
 * This handles:
 * - Page view tracking
 * - Time spent tracking
 * - Engagement metrics
 */
export default function CalculatorPageWrapper({
  calculatorName,
  children,
}: CalculatorPageWrapperProps) {
  // Automatically track calculator visits and time spent
  useCalculatorAnalytics({
    calculatorName,
    trackTimeSpent: true,
    trackEngagement: true,
    minTimeThreshold: 5, // Track only if user stays >5 seconds
  });

  return <>{children}</>;
}
