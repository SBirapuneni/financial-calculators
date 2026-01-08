import { Metadata } from 'next';
import APRtoAPYCalculator from '@/components/calculators/APRtoAPYCalculator';
import CalculatorPageWrapper from '@/components/analytics/CalculatorPageWrapper';
import { Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'APR to APY Calculator - Convert Interest Rates | UtilityHub',
  description: 'Free APR to APY converter and calculator. Understand the difference between Annual Percentage Rate (APR) and Annual Percentage Yield (APY) and convert between them.',
  keywords: ['apr to apy calculator', 'apy to apr converter', 'annual percentage rate', 'annual percentage yield', 'interest rate calculator', 'effective interest rate'],
};

export default function APRtoAPYCalculatorPage() {
  return (
    <CalculatorPageWrapper calculatorName="apr-apy">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              APR to APY Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Convert between APR (Annual Percentage Rate) and APY (Annual Percentage Yield) to understand
            the true cost of loans or the real return on investments with compound interest.
          </p>
        </div>

        <APRtoAPYCalculator />

      <div className="mt-12 space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            What is APR?
          </h2>
          <p>
            APR (Annual Percentage Rate) is the yearly interest rate without taking compound interest into account.
            It&apos;s the nominal or stated interest rate. APR is commonly used for loans, credit cards, and mortgages
            to show the cost of borrowing money over a year.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            What is APY?
          </h2>
          <p>
            APY (Annual Percentage Yield) is the effective annual rate of return taking into account the effect of
            compounding interest. APY is typically used for savings accounts, CDs, and investments to show the actual
            return you&apos;ll receive over a year. APY is always higher than or equal to APR when interest compounds
            more than once per year.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Key Differences: APR vs APY
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Aspect</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">APR</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">APY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Full Name</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Annual Percentage Rate</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Annual Percentage Yield</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Compounding</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Not included</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Included</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Type</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Nominal rate</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Effective rate</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Common Use</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Loans, credit cards</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Savings, investments</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Value</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Lower or equal to APY</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Higher or equal to APR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Formulas
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">APR to APY:</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                APY = (1 + APR/n)^n - 1
              </div>
              <p className="mt-2 text-sm">Where n is the number of compounding periods per year</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">APY to APR:</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                APR = n × ((1 + APY)^(1/n) - 1)
              </div>
              <p className="mt-2 text-sm">Where n is the number of compounding periods per year</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Why the Difference Matters
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>For Savers:</strong> APY shows your actual earnings. A 5% APR compounded monthly equals 5.12% APY
            </li>
            <li>
              <strong>For Borrowers:</strong> APR shows the base cost, but you&apos;ll actually pay more due to compounding
            </li>
            <li>
              <strong>Comparing Offers:</strong> Always compare APY to APY or APR to APR for accurate comparison
            </li>
            <li>
              <strong>Investment Returns:</strong> APY gives a more accurate picture of investment growth
            </li>
            <li>
              <strong>The Gap Widens:</strong> The difference between APR and APY increases with more frequent compounding
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Compounding Frequency Impact
          </h2>
          <p className="mb-3">
            For a 5% APR, here&apos;s how APY changes based on compounding frequency:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Annually (1x/year):</strong> 5.0000% APY</li>
            <li><strong>Semi-Annually (2x/year):</strong> 5.0625% APY</li>
            <li><strong>Quarterly (4x/year):</strong> 5.0945% APY</li>
            <li><strong>Monthly (12x/year):</strong> 5.1162% APY</li>
            <li><strong>Daily (365x/year):</strong> 5.1267% APY</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            💡 Quick Tip
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            When comparing financial products, always use APY for savings accounts and investments to see your true return.
            For loans, compare APRs, but remember the actual cost will be higher due to compounding.
          </p>
        </div>
      </div>
    </div>
    </CalculatorPageWrapper>
  );
}
