import { Metadata } from 'next';
import EMICalculator from '@/components/calculators/EMICalculator';
import { Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EMI Calculator - Calculate Loan EMI | Financial Calculators',
  description: 'Free EMI calculator to calculate your loan EMI (Equated Monthly Installment), total interest, and payment breakdown. Plan your home loan, car loan, or personal loan repayment.',
  keywords: ['emi calculator', 'loan emi', 'home loan calculator', 'car loan emi', 'personal loan calculator', 'monthly installment calculator', 'loan repayment calculator'],
};

export default function EMICalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            EMI Calculator
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate your Equated Monthly Installment (EMI) for loans including home loans, car loans, and personal loans.
          Get a detailed breakdown of principal and interest payments over the loan tenure.
        </p>
      </div>

      <EMICalculator />

      <div className="mt-12 space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            What is EMI?
          </h2>
          <p>
            EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay a loan.
            It includes both the principal amount and the interest charged on the loan. The EMI amount
            remains constant throughout the loan tenure, making it easier to plan your monthly budget.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            How is EMI Calculated?
          </h2>
          <p className="mb-3">
            The EMI is calculated using the following formula:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
            EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
          </div>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>P = Principal loan amount</li>
            <li>r = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
            <li>n = Loan tenure in months</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Understanding Your EMI Breakdown
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Principal Component:</strong> The portion of your EMI that goes toward repaying the actual loan amount
            </li>
            <li>
              <strong>Interest Component:</strong> The portion that covers the interest charges on the outstanding loan balance
            </li>
            <li>
              In the initial months, the interest component is higher. As you pay down the principal, the interest component decreases
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Factors Affecting Your EMI
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Loan Amount:</strong> Higher loan amounts result in higher EMIs
            </li>
            <li>
              <strong>Interest Rate:</strong> A higher interest rate increases your EMI and total interest paid
            </li>
            <li>
              <strong>Loan Tenure:</strong> Longer tenure reduces monthly EMI but increases total interest paid
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Tips to Reduce Your EMI Burden
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Make a larger down payment to reduce the principal amount</li>
            <li>Opt for a longer tenure if you need lower monthly payments (but be aware of higher total interest)</li>
            <li>Compare interest rates from different lenders</li>
            <li>Consider making prepayments when possible to reduce principal and save on interest</li>
            <li>Maintain a good credit score to qualify for better interest rates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
