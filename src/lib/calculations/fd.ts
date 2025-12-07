export interface FDInput {
  principal: number;
  annualRate: number;
  tenureMonths: number;
  compoundingFrequency: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
}

export interface FDResult {
  maturityAmount: number;
  interestEarned: number;
  effectiveRate: number;
  breakdown: Array<{
    period: number;
    interest: number;
    totalAmount: number;
  }>;
}

/**
 * Calculate Fixed Deposit (FD) returns
 */
export function calculateFD(input: FDInput): FDResult {
  const { principal, annualRate, tenureMonths, compoundingFrequency } = input;
  
  // Determine compounding frequency
  const frequencies = {
    monthly: 12,
    quarterly: 4,
    'half-yearly': 2,
    yearly: 1,
  };
  
  const n = frequencies[compoundingFrequency];
  const r = annualRate / 100;
  const t = tenureMonths / 12; // Convert months to years
  
  // Compound Interest Formula: A = P(1 + r/n)^(nt)
  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = maturityAmount - principal;
  
  // Calculate effective annual rate
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
  
  // Generate breakdown based on compounding frequency
  const breakdown: Array<{
    period: number;
    interest: number;
    totalAmount: number;
  }> = [];
  
  const totalPeriods = Math.ceil(n * t);
  for (let period = 1; period <= totalPeriods; period++) {
    const periodTime = period / n; // Time in years
    const amount = principal * Math.pow(1 + r / n, n * periodTime);
    const interest = amount - principal;
    
    breakdown.push({
      period,
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(amount * 100) / 100,
    });
  }
  
  return {
    maturityAmount: Math.round(maturityAmount * 100) / 100,
    interestEarned: Math.round(interestEarned * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 10000) / 10000,
    breakdown,
  };
}

/**
 * Calculate simple interest FD (for comparison)
 */
export function calculateSimpleFD(principal: number, annualRate: number, tenureMonths: number): number {
  const r = annualRate / 100;
  const t = tenureMonths / 12;
  const interest = principal * r * t;
  return Math.round((principal + interest) * 100) / 100;
}
