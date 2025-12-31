import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AdSenseScript from "@/components/ads/AdSenseScript";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import PWAInstaller from "@/components/shared/PWAInstaller";
import ThemeProvider from "@/components/shared/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free Financial Calculators - Retirement, Mortgage, Tax & Investment Tools",
    template: "%s | Financial Calculators",
  },
  description: "Free online financial calculators for retirement planning, mortgage payments, tax estimates, and investment returns. Make smarter financial decisions today.",
  keywords: ["financial calculator", "retirement calculator", "mortgage calculator", "tax calculator", "investment calculator"],
  authors: [{ name: "Financial Calculators" }],
  creator: "Financial Calculators",
  publisher: "Financial Calculators",
  metadataBase: new URL('https://calculators.utltyhub.com'),
  verification: {
    google: 'rYre4uVlZ8azo4swV3bFXUMSkDj_SutOl--QAjVLFzw',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calculators.utltyhub.com',
    title: 'Free Financial Calculators',
    description: 'Plan your financial future with free calculators',
    siteName: 'Financial Calculators',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Financial Calculators',
    description: 'Plan your financial future with free calculators',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        {ADSENSE_CLIENT_ID && <AdSenseScript clientId={ADSENSE_CLIENT_ID} />}
        <ThemeProvider>
          <PWAInstaller />
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
