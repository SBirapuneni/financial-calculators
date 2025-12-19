import { Metadata } from 'next';
import FDCalculator from '@/components/calculators/FDCalculator';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';
import { PiggyBank } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FD Calculator - Fixed Deposit Maturity Calculator | Financial Calculators',
  description: 'Free Fixed Deposit (FD) calculator to calculate maturity amount, interest earned, and returns on your FD investment. Compare compound vs simple interest.',
  keywords: ['fd calculator', 'fixed deposit calculator', 'fd maturity calculator', 'fd interest calculator', 'bank fd calculator', 'term deposit calculator'],
};

export default function FDCalculatorPage() {
  return (
    <CalculatorPageWrapper calculatorName="fd">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <PiggyBank className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Fixed Deposit Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Calculate your Fixed Deposit (FD) maturity amount, interest earned, and effective returns.
            Compare compound interest vs simple interest to maximize your savings.
          </p>
        </div>

        <FDCalculator />

      <div className="mt-12 space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            What is a Fixed Deposit?
          </h2>
          <p>
            A Fixed Deposit (FD), also known as a term deposit, is a financial instrument offered by banks and
            financial institutions that provides investors with a higher rate of interest than a regular savings
            account. When you invest in an FD, you deposit a lump sum amount for a fixed period at a predetermined
            interest rate, and you receive the principal amount plus interest at maturity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            How FD Interest is Calculated
          </h2>
          <p className="mb-3">
            Most fixed deposits use compound interest, which is calculated using the following formula:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
            A = P × (1 + r/n)^(n×t)
          </div>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>A = Maturity amount</li>
            <li>P = Principal amount (deposit)</li>
            <li>r = Annual interest rate (as a decimal)</li>
            <li>n = Number of times interest is compounded per year</li>
            <li>t = Time period in years</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Types of Fixed Deposits
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Regular FD:</strong> Standard fixed deposit with a lump sum amount for a fixed tenure
            </li>
            <li>
              <strong>Tax-Saving FD:</strong> 5-year FD that qualifies for tax deduction under Section 80C
            </li>
            <li>
              <strong>Senior Citizen FD:</strong> Special FDs with higher interest rates for senior citizens
            </li>
            <li>
              <strong>Cumulative FD:</strong> Interest is compounded and paid at maturity along with principal
            </li>
            <li>
              <strong>Non-Cumulative FD:</strong> Interest is paid out periodically (monthly, quarterly, or annually)
            </li>
            <li>
              <strong>Flexi FD:</strong> Combines savings account and FD features with automatic sweep facility
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Compounding Frequency Explained
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Monthly Compounding:</strong> Interest is calculated and added to principal every month (12 times/year)
            </li>
            <li>
              <strong>Quarterly Compounding:</strong> Interest is compounded every 3 months (4 times/year) - most common
            </li>
            <li>
              <strong>Half-Yearly Compounding:</strong> Interest is compounded twice a year (every 6 months)
            </li>
            <li>
              <strong>Annual Compounding:</strong> Interest is compounded once a year
            </li>
            <li>
              More frequent compounding results in higher returns due to interest earning interest
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Benefits of Fixed Deposits
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Guaranteed Returns:</strong> Fixed and guaranteed interest rate throughout the tenure
            </li>
            <li>
              <strong>Safety:</strong> Bank FDs up to ₹5 lakh are insured by DICGC (Deposit Insurance and Credit Guarantee Corporation)
            </li>
            <li>
              <strong>Flexible Tenure:</strong> Choose from 7 days to 10 years based on your needs
            </li>
            <li>
              <strong>Loan Facility:</strong> Can avail loan against FD up to 90% of deposit value
            </li>
            <li>
              <strong>Regular Income:</strong> Non-cumulative FDs provide periodic interest payouts
            </li>
            <li>
              <strong>Senior Citizen Benefits:</strong> Higher interest rates (typically 0.25-0.50% extra)
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Important Considerations
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Premature Withdrawal:</strong> Penalty charges apply (typically 0.5-1% interest reduction)
            </li>
            <li>
              <strong>Tax on Interest:</strong> FD interest is taxable as per your income tax slab
            </li>
            <li>
              <strong>TDS Deduction:</strong> 10% TDS if annual interest exceeds ₹40,000 (₹50,000 for senior citizens)
            </li>
            <li>
              <strong>Inflation Impact:</strong> Real returns may be lower after accounting for inflation
            </li>
            <li>
              <strong>Lock-in Period:</strong> Tax-saving FDs have mandatory 5-year lock-in period
            </li>
            <li>
              <strong>Interest Rate Fluctuations:</strong> Rates vary based on RBI policy and bank discretion
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Maximizing Your FD Returns
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Compare interest rates across different banks before investing</li>
            <li>Choose cumulative FD for higher returns (compound interest benefit)</li>
            <li>Consider laddering FDs with different maturity dates for liquidity</li>
            <li>Take advantage of special FD schemes during festive seasons</li>
            <li>Senior citizens should always check for special rates</li>
            <li>Use FD calculator to compare different tenure and rate options</li>
            <li>Submit Form 15G/15H if your total income is below taxable limit to avoid TDS</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-green-800 dark:text-green-200">
            For maximum returns, choose quarterly compounding with cumulative interest payout. This allows your
            interest to compound more frequently, significantly increasing your returns over longer tenures.
            For example, ₹1,00,000 at 7% for 5 years yields ₹41,478 with quarterly compounding vs ₹40,255 with
            annual compounding - a difference of ₹1,223!
          </p>
        </div>
      </div>
    </div>
    </CalculatorPageWrapper>
  );
}
