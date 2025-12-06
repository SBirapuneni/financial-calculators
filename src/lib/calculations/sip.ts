export interface SIPInput {
  monthlyInvestment: number;
  annualReturnRate: number;
  investmentYears: number;
}

export interface SIPResult {
  totalInvested: number;
  totalReturns: number;
  maturityValue: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

/**
 * Calculate SIP (Systematic Investment Plan) returns
 */
export function calculateSIP(input: SIPInput): SIPResult {
  const { monthlyInvestment, annualReturnRate, investmentYears } = input;
  const monthlyRate = annualReturnRate / 100 / 12;
  const totalMonths = investmentYears * 12;

  // SIP Future Value Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
  const maturityValue =
    monthlyRate === 0
      ? monthlyInvestment * totalMonths
      : (monthlyInvestment *
          ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
          (1 + monthlyRate));

  const totalInvested = monthlyInvestment * totalMonths;
  const totalReturns = maturityValue - totalInvested;

  // Generate yearly breakdown
  const yearlyBreakdown = [];
  for (let year = 1; year <= investmentYears; year++) {
    const monthsElapsed = year * 12;
    const invested = monthlyInvestment * monthsElapsed;
    const value =
      monthlyRate === 0
        ? invested
        : monthlyInvestment *
          ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) *
          (1 + monthlyRate);
    const returns = value - invested;

    yearlyBreakdown.push({
      year,
      invested: Math.round(invested * 100) / 100,
      value: Math.round(value * 100) / 100,
      returns: Math.round(returns * 100) / 100,
    });
  }

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalReturns: Math.round(totalReturns * 100) / 100,
    maturityValue: Math.round(maturityValue * 100) / 100,
    yearlyBreakdown,
  };
}
