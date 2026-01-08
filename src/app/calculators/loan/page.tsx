import LoanCalculator from '@/components/calculators/LoanCalculator';
import { Metadata } from 'next';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';

export const metadata: Metadata = {
  title: 'Loan Calculator | UtilityHub',
  description: 'Calculate your monthly loan payments and view detailed amortization schedule. Plan your home loan, car loan, or personal loan with our free loan calculator.',
  keywords: 'loan calculator, EMI calculator, personal loan calculator, amortization calculator',
  openGraph: {
    title: 'Loan Calculator',
    description: 'Calculate monthly loan payments and amortization',
    type: 'website',
  },
};

export default function LoanCalculatorPage() {
  return (
    <CalculatorPageWrapper calculatorName="loan">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Loan Calculator',
            description: 'Calculate monthly loan payments and total interest',
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
        <LoanCalculator />
      </div>
    </CalculatorPageWrapper>
  );
}
