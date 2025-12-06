export interface LoanInput {
  principal: number;
  annualRate: number;
  termYears: number;
}

export interface LoanPayment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: LoanPayment[];
}

/**
 * Calculate loan amortization schedule
 */
export function calculateLoan(input: LoanInput): LoanResult {
  const { principal, annualRate, termYears } = input;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;

  // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
  const monthlyPayment =
    monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Generate amortization schedule
  let balance = principal;
  const schedule: LoanPayment[] = [];

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(monthlyPayment * numPayments * 100) / 100,
    totalInterest:
      Math.round((monthlyPayment * numPayments - principal) * 100) / 100,
    schedule,
  };
}
