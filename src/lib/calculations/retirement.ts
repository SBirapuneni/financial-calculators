export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  desiredMonthlyIncome: number;
}

export interface RetirementResult {
  retirementCorpus: number;
  totalContributions: number;
  investmentGains: number;
  yearsToRetirement: number;
  monthlyIncomeAtRetirement: number;
  corpusLastsUntilAge: number;
  yearlyBreakdown: Array<{
    year: number;
    age: number;
    invested: number;
    value: number;
    gains: number;
  }>;
}

/**
 * Calculate retirement savings and projections
 */
export function calculateRetirement(input: RetirementInput): RetirementResult {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    inflationRate,
    desiredMonthlyIncome,
  } = input;

  const yearsToRetirement = retirementAge - currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;

  // Calculate future value with current savings and monthly contributions
  let corpus = currentSavings;
  const yearlyBreakdown = [];
  let totalContributions = currentSavings;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const startCorpus = corpus;
    
    // Add monthly contributions for the year
    for (let month = 1; month <= 12; month++) {
      corpus = corpus * (1 + monthlyRate) + monthlyContribution;
      totalContributions += monthlyContribution;
    }

    const gains = corpus - totalContributions;

    yearlyBreakdown.push({
      year,
      age: currentAge + year,
      invested: Math.round(totalContributions * 100) / 100,
      value: Math.round(corpus * 100) / 100,
      gains: Math.round(gains * 100) / 100,
    });
  }

  const retirementCorpus = corpus;
  const investmentGains = retirementCorpus - totalContributions;

  // Adjust desired income for inflation at retirement
  const monthlyIncomeAtRetirement =
    desiredMonthlyIncome * Math.pow(1 + monthlyInflation, monthsToRetirement);

  // Calculate how long the corpus will last (assuming 4% withdrawal rate adjusted for inflation)
  const withdrawalRate = 0.04 / 12;
  let remainingCorpus = retirementCorpus;
  let monthsLasting = 0;
  const maxMonths = 40 * 12; // Cap at 40 years

  while (remainingCorpus > 0 && monthsLasting < maxMonths) {
    const withdrawal = monthlyIncomeAtRetirement * Math.pow(1 + monthlyInflation, monthsLasting);
    remainingCorpus = remainingCorpus * (1 + monthlyRate) - withdrawal;
    monthsLasting++;
  }

  const corpusLastsUntilAge = retirementAge + Math.floor(monthsLasting / 12);

  return {
    retirementCorpus: Math.round(retirementCorpus * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    investmentGains: Math.round(investmentGains * 100) / 100,
    yearsToRetirement,
    monthlyIncomeAtRetirement: Math.round(monthlyIncomeAtRetirement * 100) / 100,
    corpusLastsUntilAge,
    yearlyBreakdown,
  };
}
