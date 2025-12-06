'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Replace with your actual newsletter service API
      // Examples: Mailchimp, ConvertKit, SendGrid, etc.
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email to confirm.');
        setEmail('');
        
        // Track subscription with analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'newsletter_signup', {
            method: 'website',
          });
        }
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-600 rounded-full">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Get Financial Tips & Updates
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join our newsletter for weekly financial planning tips, calculator updates, and exclusive content.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-green-700 dark:text-green-400 font-medium">
              {message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                {message}
              </p>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-600">
              We respect your privacy. Unsubscribe anytime. Read our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}

        <div className="grid grid-cols-3 gap-4 pt-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">10k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Subscribers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">Weekly</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tips</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">Free</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Always</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
