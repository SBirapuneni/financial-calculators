export interface APRtoAPYResult {
  apy: number;
  effectiveRate: number;
  description: string;
}

export interface APYtoAPRResult {
  apr: number;
  nominalRate: number;
  description: string;
}

/**
 * Convert APR (Annual Percentage Rate) to APY (Annual Percentage Yield)
 * APY = (1 + APR/n)^n - 1
 * where n is the number of compounding periods per year
 */
export function aprToApy(apr: number, compoundingPeriods: number): APRtoAPYResult {
  const aprDecimal = apr / 100;
  const apy = (Math.pow(1 + aprDecimal / compoundingPeriods, compoundingPeriods) - 1) * 100;
  
  return {
    apy: Math.round(apy * 10000) / 10000,
    effectiveRate: Math.round(apy * 10000) / 10000,
    description: `An APR of ${apr}% compounded ${compoundingPeriods} times per year equals an APY of ${apy.toFixed(4)}%`,
  };
}

/**
 * Convert APY (Annual Percentage Yield) to APR (Annual Percentage Rate)
 * APR = n * ((1 + APY)^(1/n) - 1)
 * where n is the number of compounding periods per year
 */
export function apyToApr(apy: number, compoundingPeriods: number): APYtoAPRResult {
  const apyDecimal = apy / 100;
  const apr = compoundingPeriods * (Math.pow(1 + apyDecimal, 1 / compoundingPeriods) - 1) * 100;
  
  return {
    apr: Math.round(apr * 10000) / 10000,
    nominalRate: Math.round(apr * 10000) / 10000,
    description: `An APY of ${apy}% with ${compoundingPeriods} compounding periods per year equals an APR of ${apr.toFixed(4)}%`,
  };
}

/**
 * Get compounding periods based on frequency
 */
export function getCompoundingPeriods(frequency: 'daily' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually'): number {
  const periods = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    'semi-annually': 2,
    annually: 1,
  };
  
  return periods[frequency];
}
