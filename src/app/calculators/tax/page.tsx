import TaxCalculator from '@/components/calculators/TaxCalculator';
import { Metadata } from 'next';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';

export const metadata: Metadata = {
  title: 'Income Tax Calculator 2025 - Estimate Your Tax Refund | Financial Calculators',
  description: 'Free 2025 income tax calculator. Estimate your federal tax, take-home pay, and tax refund. Updated with latest tax brackets and deductions.',
  keywords: 'tax calculator, income tax calculator, tax refund calculator, 2025 tax calculator, federal tax calculator, tax estimator',
  openGraph: {
    title: 'Income Tax Calculator 2025 - Estimate Your Tax Refund',
    description: 'Calculate your 2025 federal income tax and take-home pay',
    type: 'website',
  },
};

export default function TaxPage() {
  return (
    <CalculatorPageWrapper calculatorName="tax">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Income Tax Calculator 2025',
            description: 'Calculate federal income tax with latest 2025 tax brackets',
            applicationCategory: 'FinanceApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-12">
        <TaxCalculator />
      </div>
    </CalculatorPageWrapper>
  );
}
