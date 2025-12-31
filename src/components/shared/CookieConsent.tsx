'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    
    // Enable analytics if consent given
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      console.log('GA4 Consent: Updated to granted');
      
      // Trigger a page view event after consent is granted
      setTimeout(() => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title,
            page_location: window.location.href,
          });
          console.log('GA4 Page View: Sent after consent');
        }
      }, 100);
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    
    // Disable analytics if declined
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      console.log('GA4 Consent: Updated to denied');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 relative">
          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cookie Consent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                We use cookies to enhance your browsing experience, serve personalized ads or content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Learn more
                </Link>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Accept All
                </button>
                <button
                  onClick={declineCookies}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Decline
                </button>
                <Link
                  href="/privacy#cookies"
                  className="px-6 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-center"
                >
                  Manage Preferences
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
