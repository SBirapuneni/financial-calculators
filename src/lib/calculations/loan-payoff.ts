export interface LoanPayoffInput {
  currentBalance: number;
  annualRate: number;
  minimumPayment: number;
  extraPayment: number;
}

export interface LoanPayoffResult {
  monthsToPayoff: number;
  totalPayment: number;
  totalInterest: number;
  timeSaved: number; // months saved compared to minimum payments only
  interestSaved: number; // interest saved compared to minimum payments only
  breakdown: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

/**
 * Calculate loan payoff with extra payments
 */
export function calculateLoanPayoff(input: LoanPayoffInput): LoanPayoffResult {
  const { currentBalance, annualRate, minimumPayment, extraPayment } = input;
  
  const monthlyRate = annualRate / 100 / 12;
  const totalMonthlyPayment = minimumPayment + extraPayment;
  
  // Calculate with extra payments
  let balance = currentBalance;
  let totalPayment = 0;
  let totalInterest = 0;
  const breakdown: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }> = [];
  
  let month = 0;
  while (balance > 0 && month < 600) { // Max 50 years
    month++;
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(totalMonthlyPayment - interestPayment, balance);
    const actualPayment = interestPayment + principalPayment;
    
    balance -= principalPayment;
    totalPayment += actualPayment;
    totalInterest += interestPayment;
    
    breakdown.push({
      month,
      payment: Math.round(actualPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }
  
  // Calculate without extra payments for comparison
  let balanceNoExtra = currentBalance;
  let totalPaymentNoExtra = 0;
  let totalInterestNoExtra = 0;
  let monthsNoExtra = 0;
  
  while (balanceNoExtra > 0 && monthsNoExtra < 600) {
    monthsNoExtra++;
    const interestPayment = balanceNoExtra * monthlyRate;
    const principalPayment = Math.min(minimumPayment - interestPayment, balanceNoExtra);
    
    balanceNoExtra -= principalPayment;
    totalPaymentNoExtra += minimumPayment;
    totalInterestNoExtra += interestPayment;
  }
  
  return {
    monthsToPayoff: month,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    timeSaved: monthsNoExtra - month,
    interestSaved: Math.round((totalInterestNoExtra - totalInterest) * 100) / 100,
    breakdown,
  };
}
