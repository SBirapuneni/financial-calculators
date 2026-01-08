import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import { Metadata } from 'next';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | UtilityHub',
  description: 'Calculate the future value of your investment with our compound interest calculator. See how your money grows over time with different compounding frequencies.',
  keywords: 'compound interest calculator, investment growth calculator, future value calculator',
  openGraph: {
    title: 'Compound Interest Calculator',
    description: 'Calculate investment growth with compound interest',
    type: 'website',
  },
};

export default function CompoundInterestPage() {
  return (
    <CalculatorPageWrapper calculatorName="compound-interest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Compound Interest Calculator',
            description: 'Calculate the future value of investments with compound interest',
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
        <CompoundInterestCalculator />
      </div>
    </CalculatorPageWrapper>
  );
}
