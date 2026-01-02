'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
// Updated: Jan 1, 2026

interface SaveShareUrlProps {
  params: Record<string, string | number>;
  calculatorName: string;
}

export function SaveShareUrl({ params, calculatorName }: SaveShareUrlProps) {
  const [copied, setCopied] = useState(false);

  const generateShareableUrl = () => {
    if (typeof window === 'undefined') return '';
    
    const url = new URL(window.location.href);
    
    // Add all parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    
    return url.toString();
  };

  const copyToClipboard = async () => {
    const shareUrl = generateShareableUrl();
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareNative = async () => {
    const shareUrl = generateShareableUrl();
    
    // Check if Web Share API is available
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: `${calculatorName} Results`,
          text: `Check out my ${calculatorName} calculation`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    } else {
      // Fallback to copy
      copyToClipboard();
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="text-xs"
      >
        {copied ? '✓ Copied!' : '📋 Copy Link'}
      </Button>
      
      {hasNativeShare && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={shareNative}
          className="text-xs"
        >
          🔗 Share
        </Button>
      )}
    </div>
  );
}

// Hook to read URL parameters on mount
export function useUrlParams<T extends Record<string, any>>(
  defaultValues: T
): T {
  if (typeof window === 'undefined') return defaultValues;
  
  const params = new URLSearchParams(window.location.search);
  const urlParams: Partial<T> = {};
  
  Object.keys(defaultValues).forEach((key) => {
    const value = params.get(key);
    if (value !== null) {
      const defaultValue = defaultValues[key];
      
      // Parse based on default value type
      if (typeof defaultValue === 'number') {
        urlParams[key as keyof T] = parseFloat(value) as T[keyof T];
      } else if (typeof defaultValue === 'boolean') {
        urlParams[key as keyof T] = (value === 'true') as T[keyof T];
      } else {
        urlParams[key as keyof T] = value as T[keyof T];
      }
    }
  });
  
  return { ...defaultValues, ...urlParams };
}
