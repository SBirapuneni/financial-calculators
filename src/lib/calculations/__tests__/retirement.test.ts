import { describe, it, expect } from 'vitest';
import { calculateRetirement } from '@/lib/calculations/retirement';

describe('Retirement Calculator', () => {
  describe('Basic Retirement Calculation', () => {
    it('should calculate retirement corpus correctly', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.yearsToRetirement).toBe(35);
      expect(result.retirementCorpus).toBeGreaterThan(50000); // Should grow
      expect(result.totalContributions).toBeGreaterThan(50000);
    });

    it('should calculate total contributions correctly', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      // Total contributions = current savings + (monthly * months)
      const expectedContributions = 50000 + (1000 * 35 * 12);
      expect(result.totalContributions).toBe(expectedContributions);
    });

    it('should calculate investment gains', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      const expectedGains = result.retirementCorpus - result.totalContributions;
      expect(result.investmentGains).toBeCloseTo(expectedGains, 2);
      expect(result.investmentGains).toBeGreaterThan(0);
    });
  });

  describe('Yearly Breakdown', () => {
    it('should generate yearly breakdown for all years', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.yearlyBreakdown.length).toBe(35);
      
      // Check first year
      expect(result.yearlyBreakdown[0].year).toBe(1);
      expect(result.yearlyBreakdown[0].age).toBe(31);
      
      // Check last year
      expect(result.yearlyBreakdown[34].year).toBe(35);
      expect(result.yearlyBreakdown[34].age).toBe(65);
    });

    it('should show increasing portfolio value over time', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      // Value should increase each year
      for (let i = 1; i < result.yearlyBreakdown.length; i++) {
        expect(result.yearlyBreakdown[i].value).toBeGreaterThan(
          result.yearlyBreakdown[i - 1].value
        );
      }
    });
  });

  describe('Inflation Adjustment', () => {
    it('should calculate inflation-adjusted monthly income at retirement', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      // After 35 years at 3% inflation, $5000 should be worth much less
      expect(result.monthlyIncomeAtRetirement).toBeGreaterThan(5000);
    });

    it('should calculate how long corpus lasts', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.corpusLastsUntilAge).toBeGreaterThan(65);
      expect(result.corpusLastsUntilAge).toBeLessThan(120); // Reasonable upper bound
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero current savings', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 0,
        monthlyContribution: 1000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.totalContributions).toBe(1000 * 35 * 12);
      expect(result.retirementCorpus).toBeGreaterThan(0);
    });

    it('should handle zero monthly contribution', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 100000,
        monthlyContribution: 0,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.totalContributions).toBe(100000);
      expect(result.retirementCorpus).toBeGreaterThan(100000); // Should still grow
    });

    it('should handle high expected return', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 12,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.retirementCorpus).toBeGreaterThan(0);
      expect(result.investmentGains).toBeGreaterThan(result.totalContributions);
    });

    it('should handle short time horizon', () => {
      const result = calculateRetirement({
        currentAge: 60,
        retirementAge: 65,
        currentSavings: 500000,
        monthlyContribution: 2000,
        expectedReturn: 8,
        inflationRate: 3,
        desiredMonthlyIncome: 5000,
      });

      expect(result.yearsToRetirement).toBe(5);
      expect(result.yearlyBreakdown.length).toBe(5);
    });
  });

  describe('Compound Growth', () => {
    it('should demonstrate compound growth over contributions alone', () => {
      const result = calculateRetirement({
        currentAge: 25,
        retirementAge: 65,
        currentSavings: 0,
        monthlyContribution: 500,
        expectedReturn: 8,
        inflationRate: 2,
        desiredMonthlyIncome: 4000,
      });

      // Investment gains should be significant with 40 years of compounding
      const contributionsAlone = 500 * 40 * 12; // $240,000
      expect(result.retirementCorpus).toBeGreaterThan(contributionsAlone * 2);
    });
  });
});
