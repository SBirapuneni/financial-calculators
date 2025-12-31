'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Calculator {
  name: string;
  href: string;
  description: string;
  icon: string;
}

interface RelatedCalculatorsProps {
  currentCalculator: string;
}

const allCalculators: Calculator[] = [
  {
    name: 'Mortgage Calculator',
    href: '/calculators/mortgage',
    description: 'Calculate monthly mortgage payments with PMI, taxes, and insurance',
    icon: '🏠',
  },
  {
    name: 'Retirement Calculator',
    href: '/calculators/retirement',
    description: 'Plan your retirement savings and see if you\'re on track',
    icon: '💰',
  },
  {
    name: 'Tax Calculator',
    href: '/calculators/tax',
    description: 'Estimate federal income tax and take-home pay',
    icon: '📊',
  },
  {
    name: 'Loan Calculator',
    href: '/calculators/loan',
    description: 'Calculate loan payments and amortization schedule',
    icon: '💳',
  },
  {
    name: 'EMI Calculator',
    href: '/calculators/emi',
    description: 'Calculate equated monthly installments for loans',
    icon: '📱',
  },
  {
    name: 'SIP Calculator',
    href: '/calculators/sip',
    description: 'Calculate returns on systematic investment plans',
    icon: '📈',
  },
  {
    name: 'Compound Interest Calculator',
    href: '/calculators/compound-interest',
    description: 'See how your money grows with compound interest',
    icon: '💵',
  },
  {
    name: 'FD Calculator',
    href: '/calculators/fd',
    description: 'Calculate fixed deposit returns and maturity amount',
    icon: '🏦',
  },
  {
    name: 'APR to APY Calculator',
    href: '/calculators/apr-apy',
    description: 'Convert between annual percentage rate and annual percentage yield',
    icon: '🔄',
  },
  {
    name: 'Loan Payoff Calculator',
    href: '/calculators/loan-payoff',
    description: 'See how extra payments can reduce your loan term',
    icon: '💸',
  },
];

const relatedCalculatorsMap: Record<string, string[]> = {
  mortgage: ['loan', 'retirement', 'tax', 'compound-interest'],
  retirement: ['sip', 'compound-interest', 'tax', 'fd'],
  tax: ['retirement', 'mortgage', 'loan'],
  loan: ['mortgage', 'emi', 'loan-payoff', 'apr-apy'],
  emi: ['loan', 'mortgage', 'loan-payoff'],
  sip: ['retirement', 'compound-interest', 'fd'],
  'compound-interest': ['sip', 'retirement', 'fd'],
  fd: ['compound-interest', 'sip', 'retirement'],
  'apr-apy': ['loan', 'mortgage', 'fd'],
  'loan-payoff': ['loan', 'emi', 'mortgage'],
};

export function RelatedCalculators({ currentCalculator }: RelatedCalculatorsProps) {
  const relatedIds = relatedCalculatorsMap[currentCalculator] || [];
  const relatedCalculators = allCalculators.filter(calc => 
    relatedIds.includes(calc.href.split('/').pop() || '')
  ).slice(0, 3);

  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Related Calculators
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {relatedCalculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{calc.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {calc.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
