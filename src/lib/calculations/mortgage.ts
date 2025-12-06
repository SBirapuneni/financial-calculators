export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  loanTerm: number; // in years
  interestRate: number;
  propertyTax: number; // annual
  homeInsurance: number; // annual
  hoa: number; // monthly
  pmi?: number; // monthly (if down payment < 20%)
}

export interface MortgagePayment {
  month: number;
  principalAndInterest: number;
  principal: number;
  interest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  pmi: number;
  totalPayment: number;
  balance: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  principalAndInterest: number;
  totalMonthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  downPaymentPercent: number;
  requiresPMI: boolean;
  schedule: MortgagePayment[];
  costBreakdown: {
    principal: number;
    interest: number;
    propertyTax: number;
    insurance: number;
    hoa: number;
    pmi: number;
  };
}

/**
 * Calculate mortgage payments and amortization schedule
 */
export function calculateMortgage(input: MortgageInput): MortgageResult {
  const {
    homePrice,
    downPayment,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoa,
  } = input;

  const loanAmount = homePrice - downPayment;
  const downPaymentPercent = (downPayment / homePrice) * 100;
  const requiresPMI = downPaymentPercent < 20;
  
  // Calculate PMI (typically 0.5% - 1% of loan amount annually if down payment < 20%)
  const pmiMonthly = requiresPMI ? (loanAmount * 0.0075) / 12 : (input.pmi || 0);
  
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  // Monthly principal and interest payment
  const principalAndInterest =
    monthlyRate === 0
      ? loanAmount / numPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = homeInsurance / 12;

  const totalMonthlyPayment =
    principalAndInterest + monthlyPropertyTax + monthlyInsurance + hoa + pmiMonthly;

  // Generate amortization schedule
  let balance = loanAmount;
  const schedule: MortgagePayment[] = [];
  let totalInterestPaid = 0;
  let totalPMIPaid = 0;

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = principalAndInterest - interestPayment;
    balance -= principalPayment;
    totalInterestPaid += interestPayment;

    // PMI typically drops off when loan-to-value reaches 80%
    const currentLTV = (balance / homePrice) * 100;
    const currentPMI = currentLTV > 80 ? pmiMonthly : 0;
    totalPMIPaid += currentPMI;

    schedule.push({
      month,
      principalAndInterest,
      principal: principalPayment,
      interest: interestPayment,
      propertyTax: monthlyPropertyTax,
      insurance: monthlyInsurance,
      hoa,
      pmi: currentPMI,
      totalPayment: principalAndInterest + monthlyPropertyTax + monthlyInsurance + hoa + currentPMI,
      balance: Math.max(0, balance),
    });
  }

  const totalPayment =
    principalAndInterest * numPayments +
    monthlyPropertyTax * numPayments +
    monthlyInsurance * numPayments +
    hoa * numPayments +
    totalPMIPaid;

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(principalAndInterest * 100) / 100,
    principalAndInterest: Math.round(principalAndInterest * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterestPaid * 100) / 100,
    downPaymentPercent: Math.round(downPaymentPercent * 10) / 10,
    requiresPMI,
    schedule,
    costBreakdown: {
      principal: Math.round(loanAmount * 100) / 100,
      interest: Math.round(totalInterestPaid * 100) / 100,
      propertyTax: Math.round(monthlyPropertyTax * numPayments * 100) / 100,
      insurance: Math.round(monthlyInsurance * numPayments * 100) / 100,
      hoa: Math.round(hoa * numPayments * 100) / 100,
      pmi: Math.round(totalPMIPaid * 100) / 100,
    },
  };
}
