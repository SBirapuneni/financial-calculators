import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirement Calculator - Plan Your Retirement Savings | UtilityHub',
  description: 'Calculate how much you need to save for retirement. Plan your retirement with our free calculator including expected returns, inflation, and monthly income projections.',
  keywords: 'retirement calculator, retirement planning, retirement savings, 401k calculator, pension calculator',
  openGraph: {
    title: 'Retirement Calculator - Plan Your Retirement Savings',
    description: 'Free retirement calculator to plan your financial future',
    type: 'website',
  },
};

export default function RetirementPage() {
  return (
    <CalculatorPageWrapper calculatorName="retirement">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Retirement Calculator',
            description: 'Calculate retirement savings and plan your financial future',
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
        <RetirementCalculator />
      </div>
    </CalculatorPageWrapper>
  );
}
