export interface TaxInput {
  annualIncome: number;
  filingStatus: 'single' | 'married-joint' | 'married-separate' | 'head-of-household';
  deductions: number;
  credits: number;
  state?: string; // For state tax calculation
}

export interface TaxBracket {
  rate: number;
  min: number;
  max: number;
  tax: number;
}

export interface TaxResult {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  takeHomePay: number;
  monthlyTakeHome: number;
  brackets: TaxBracket[];
}

// 2025 Federal Tax Brackets (Single)
const TAX_BRACKETS_2025 = {
  single: [
    { rate: 10, min: 0, max: 11600 },
    { rate: 12, min: 11600, max: 47150 },
    { rate: 22, min: 47150, max: 100525 },
    { rate: 24, min: 100525, max: 191950 },
    { rate: 32, min: 191950, max: 243725 },
    { rate: 35, min: 243725, max: 609350 },
    { rate: 37, min: 609350, max: Infinity },
  ],
  'married-joint': [
    { rate: 10, min: 0, max: 23200 },
    { rate: 12, min: 23200, max: 94300 },
    { rate: 22, min: 94300, max: 201050 },
    { rate: 24, min: 201050, max: 383900 },
    { rate: 32, min: 383900, max: 487450 },
    { rate: 35, min: 487450, max: 731200 },
    { rate: 37, min: 731200, max: Infinity },
  ],
  'married-separate': [
    { rate: 10, min: 0, max: 11600 },
    { rate: 12, min: 11600, max: 47150 },
    { rate: 22, min: 47150, max: 100525 },
    { rate: 24, min: 100525, max: 191950 },
    { rate: 32, min: 191950, max: 243725 },
    { rate: 35, min: 243725, max: 365600 },
    { rate: 37, min: 365600, max: Infinity },
  ],
  'head-of-household': [
    { rate: 10, min: 0, max: 16550 },
    { rate: 12, min: 16550, max: 63100 },
    { rate: 22, min: 63100, max: 100500 },
    { rate: 24, min: 100500, max: 191950 },
    { rate: 32, min: 191950, max: 243700 },
    { rate: 35, min: 243700, max: 609350 },
    { rate: 37, min: 609350, max: Infinity },
  ],
};

const STANDARD_DEDUCTION_2025 = {
  single: 14600,
  'married-joint': 29200,
  'married-separate': 14600,
  'head-of-household': 21900,
};

/**
 * Calculate federal income tax
 */
export function calculateTax(input: TaxInput): TaxResult {
  const { annualIncome, filingStatus, deductions, credits } = input;

  const standardDeduction = STANDARD_DEDUCTION_2025[filingStatus];
  const totalDeductions = Math.max(deductions, standardDeduction);
  const adjustedGrossIncome = annualIncome;
  const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

  // Calculate federal tax using brackets
  const brackets = TAX_BRACKETS_2025[filingStatus];
  let federalTax = 0;
  let marginalRate = 0;
  const bracketBreakdown: TaxBracket[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(
        taxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      const taxInBracket = (taxableInBracket * bracket.rate) / 100;
      federalTax += taxInBracket;
      marginalRate = bracket.rate;

      bracketBreakdown.push({
        rate: bracket.rate,
        min: bracket.min,
        max: bracket.max === Infinity ? taxableIncome : bracket.max,
        tax: Math.round(taxInBracket * 100) / 100,
      });
    }
  }

  // Apply tax credits
  federalTax = Math.max(0, federalTax - credits);

  // Calculate FICA (Social Security + Medicare)
  const socialSecurityWageBase = 168600; // 2025 limit
  const socialSecurityTax = Math.min(annualIncome, socialSecurityWageBase) * 0.062;
  const medicareTax = annualIncome * 0.0145;
  const additionalMedicareTax = annualIncome > 200000 ? (annualIncome - 200000) * 0.009 : 0;
  const ficaTax = socialSecurityTax + medicareTax + additionalMedicareTax;

  // State tax (simplified - using 5% flat rate as example)
  const stateTax = annualIncome * 0.05;

  const totalTax = federalTax + ficaTax + stateTax;
  const effectiveRate = (totalTax / annualIncome) * 100;
  const takeHomePay = annualIncome - totalTax;
  const monthlyTakeHome = takeHomePay / 12;

  return {
    grossIncome: Math.round(annualIncome * 100) / 100,
    adjustedGrossIncome: Math.round(adjustedGrossIncome * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    federalTax: Math.round(federalTax * 100) / 100,
    stateTax: Math.round(stateTax * 100) / 100,
    ficaTax: Math.round(ficaTax * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    marginalRate,
    takeHomePay: Math.round(takeHomePay * 100) / 100,
    monthlyTakeHome: Math.round(monthlyTakeHome * 100) / 100,
    brackets: bracketBreakdown,
  };
}
