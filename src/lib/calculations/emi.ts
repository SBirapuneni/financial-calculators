export interface EMICalculation {
  monthlyEMI: number;
  totalPayment: number;
  totalInterest: number;
  breakdown: {
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMICalculation {
  const monthlyRate = annualRate / 100 / 12;
  
  // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
  const emi =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  let balance = principal;
  const breakdown: EMICalculation['breakdown'] = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    breakdown.push({
      month,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    });
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEMI: Math.round(emi * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    breakdown,
  };
}
