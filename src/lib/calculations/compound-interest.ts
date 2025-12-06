export interface CompoundInterestInput {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: 'yearly' | 'quarterly' | 'monthly' | 'daily';
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    amount: number;
    interest: number;
  }>;
}

/**
 * Calculate compound interest
 */
export function calculateCompoundInterest(
  input: CompoundInterestInput
): CompoundInterestResult {
  const { principal, annualRate, years, compoundingFrequency } = input;

  // Determine compounding frequency
  const frequencies = {
    yearly: 1,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  const n = frequencies[compoundingFrequency];
  const r = annualRate / 100;

  // Compound Interest Formula: A = P(1 + r/n)^(nt)
  const finalAmount = principal * Math.pow(1 + r / n, n * years);
  const totalInterest = finalAmount - principal;

  // Generate yearly breakdown
  const yearlyBreakdown = [];
  for (let year = 1; year <= years; year++) {
    const amount = principal * Math.pow(1 + r / n, n * year);
    const interest = amount - principal;

    yearlyBreakdown.push({
      year,
      amount: Math.round(amount * 100) / 100,
      interest: Math.round(interest * 100) / 100,
    });
  }

  return {
    finalAmount: Math.round(finalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    yearlyBreakdown,
  };
}
