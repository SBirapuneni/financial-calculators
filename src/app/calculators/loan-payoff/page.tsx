import { Metadata } from 'next';
import LoanPayoffCalculator from '@/components/calculators/LoanPayoffCalculator';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';
import { Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Loan Payoff Calculator - Calculate Debt Payoff Time | UtilityHub',
  description: 'Free loan payoff calculator to see how extra payments can help you pay off your loan faster and save on interest. Calculate time and money saved with additional payments.',
  keywords: ['loan payoff calculator', 'debt payoff', 'extra payment calculator', 'loan payment calculator', 'debt reduction', 'interest savings'],
};

export default function LoanPayoffCalculatorPage() {
  return (
    <CalculatorPageWrapper calculatorName="loan-payoff">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Loan Payoff Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Calculate how extra payments can help you pay off your loan faster and save thousands in interest.
            See the impact of additional monthly payments on your debt payoff timeline.
          </p>
        </div>

        <LoanPayoffCalculator />

      <div className="mt-12 space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            How Extra Payments Help
          </h2>
          <p>
            Making extra payments on your loan is one of the most effective ways to save money and become debt-free faster.
            Even small additional payments can make a significant difference over the life of your loan by reducing the
            principal balance faster and, consequently, the amount of interest you pay.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Benefits of Extra Payments
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Save on Interest:</strong> Extra payments reduce your principal balance, which means less interest accrues over time
            </li>
            <li>
              <strong>Pay Off Debt Faster:</strong> Additional payments can shorten your loan term by months or even years
            </li>
            <li>
              <strong>Build Equity Faster:</strong> For mortgages and car loans, you build ownership faster
            </li>
            <li>
              <strong>Financial Freedom:</strong> Becoming debt-free sooner frees up money for other financial goals
            </li>
            <li>
              <strong>Improved Credit Score:</strong> Lower debt-to-income ratio can positively impact your credit
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Strategies for Making Extra Payments
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Round Up Payments:</strong> If your payment is ₹487, round it up to ₹500
            </li>
            <li>
              <strong>Use Windfalls:</strong> Apply bonuses, tax refunds, or gifts directly to your loan
            </li>
            <li>
              <strong>Bi-Weekly Payments:</strong> Pay half your monthly payment every two weeks (equals 13 monthly payments per year)
            </li>
            <li>
              <strong>Automate Extra Payments:</strong> Set up automatic additional payments to stay consistent
            </li>
            <li>
              <strong>Reduce Expenses:</strong> Cut one discretionary expense and apply those savings to your loan
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Important Considerations
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Check for Prepayment Penalties:</strong> Some loans charge fees for early payoff
            </li>
            <li>
              <strong>Specify &quot;Apply to Principal&quot;:</strong> Make sure extra payments go toward principal, not future interest
            </li>
            <li>
              <strong>Maintain Emergency Fund:</strong> Don&apos;t sacrifice your emergency savings to pay off low-interest debt
            </li>
            <li>
              <strong>Consider Interest Rates:</strong> Prioritize high-interest debt first (e.g., credit cards)
            </li>
            <li>
              <strong>Tax Implications:</strong> Consider tax deductions (like mortgage interest) before aggressively paying off certain loans
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Even an extra ₹50-100 per month can save you thousands in interest over the life of a loan.
            Use this calculator to experiment with different extra payment amounts and find what works for your budget.
          </p>
        </div>
      </div>
    </div>
    </CalculatorPageWrapper>
  );
}
