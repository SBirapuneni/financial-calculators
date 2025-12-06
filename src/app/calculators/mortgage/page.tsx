import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Home Loan Payments | Financial Calculators',
  description: 'Free mortgage calculator with taxes, insurance, and PMI. Calculate your monthly mortgage payment and total cost of homeownership.',
  keywords: 'mortgage calculator, home loan calculator, mortgage payment calculator, house payment calculator, home affordability calculator',
  openGraph: {
    title: 'Mortgage Calculator - Calculate Monthly Home Loan Payments',
    description: 'Calculate mortgage payments including taxes, insurance, and PMI',
    type: 'website',
  },
};

export default function MortgagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Mortgage Calculator',
            description: 'Calculate mortgage payments with taxes, insurance, and PMI',
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
        <MortgageCalculator />
      </div>
    </>
  );
}
