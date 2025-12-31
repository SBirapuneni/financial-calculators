'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

function AnalyticsTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Track pageview on route change
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
      console.log('GA4 Page View:', url);
    }
  }, [pathname, searchParams, measurementId]);

  return null;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    console.warn('Google Analytics measurement ID is not set');
    return null;
  }

  return (
    <>
      {/* Google Consent Mode v2 - Set default to denied before any scripts load */}
      <Script
        id="google-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent to denied (will be granted after user accepts)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            
            // Check if user has previously accepted cookies
            const consent = localStorage.getItem('cookie-consent');
            if (consent === 'accepted') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
              });
              console.log('GA4 Consent: Granted from localStorage');
            } else {
              console.log('GA4 Consent: Waiting for user action');
            }
          `,
        }}
      />
      
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              debug_mode: true,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure'
            });
            console.log('GA4 Initialized:', '${measurementId}');
          `,
        }}
      />
      
      <Suspense fallback={null}>
        <AnalyticsTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
