import SIPCalculator from '@/components/calculators/SIPCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIP Calculator | Financial Calculators',
  description: 'Calculate returns on your Systematic Investment Plan (SIP). Plan your mutual fund investments and see the power of compounding with our SIP calculator.',
  keywords: 'SIP calculator, systematic investment plan, mutual fund calculator, SIP returns calculator',
  openGraph: {
    title: 'SIP Calculator',
    description: 'Calculate systematic investment plan returns',
    type: 'website',
  },
};

export default function SIPCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'SIP Calculator',
            description: 'Calculate returns on Systematic Investment Plans',
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
        <SIPCalculator />
      </div>
    </>
  );
}
