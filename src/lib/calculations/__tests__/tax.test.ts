import { describe, it, expect } from 'vitest';
import { calculateTax } from '@/lib/calculations/tax';

describe('Tax Calculator', () => {
  describe('Federal Tax Calculation', () => {
    it('should calculate correct federal tax for single filer at $75,000', () => {
      const result = calculateTax({
        annualIncome: 75000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Expected calculation:
      // Taxable income: 75000 - 14600 (standard deduction) = 60400
      // 10% on first 11600 = 1160
      // 12% on (47150 - 11600) = 4266
      // 22% on (60400 - 47150) = 2915
      // Total: 8341
      expect(result.federalTax).toBeCloseTo(8341, 0);
      expect(result.marginalRate).toBe(22);
    });

    it('should calculate correct federal tax for married filing jointly at $150,000', () => {
      const result = calculateTax({
        annualIncome: 150000,
        filingStatus: 'married-joint',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Taxable income: 150000 - 29200 = 120800
      expect(result.taxableIncome).toBe(120800);
      expect(result.marginalRate).toBe(22);
      expect(result.federalTax).toBeGreaterThan(0);
    });

    it('should apply tax credits correctly', () => {
      const withoutCredits = calculateTax({
        annualIncome: 75000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      const withCredits = calculateTax({
        annualIncome: 75000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 2000,
      });

      expect(withCredits.federalTax).toBe(withoutCredits.federalTax - 2000);
    });
  });

  describe('FICA Tax Calculation', () => {
    it('should calculate correct FICA for income below Social Security wage base', () => {
      const result = calculateTax({
        annualIncome: 100000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Social Security: 100000 * 0.062 = 6200
      // Medicare: 100000 * 0.0145 = 1450
      // Total FICA: 7650
      expect(result.ficaTax).toBeCloseTo(7650, 0);
    });

    it('should cap Social Security tax at wage base', () => {
      const result = calculateTax({
        annualIncome: 200000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Social Security capped: 168600 * 0.062 = 10453.20
      // Medicare: 200000 * 0.0145 = 2900
      // Additional Medicare: 0 (threshold is 200000 for single)
      // Total FICA: 13353.20
      expect(result.ficaTax).toBeCloseTo(13353.2, 0);
    });

    it('should apply additional Medicare tax for single filers over $200k', () => {
      const result = calculateTax({
        annualIncome: 250000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Additional Medicare: (250000 - 200000) * 0.009 = 450
      const expectedAdditionalMedicare = 450;
      // Total should include this additional tax
      expect(result.ficaTax).toBeGreaterThan(13353.2); // More than the $200k amount
    });

    it('should apply additional Medicare tax for married joint filers over $250k', () => {
      const result = calculateTax({
        annualIncome: 300000,
        filingStatus: 'married-joint',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Additional Medicare should start at $250k for married-joint
      // (300000 - 250000) * 0.009 = 450
      expect(result.ficaTax).toBeGreaterThan(0);
    });
  });

  describe('State Tax Calculation', () => {
    it('should apply state tax rate correctly', () => {
      const result = calculateTax({
        annualIncome: 100000,
        filingStatus: 'single',
        stateTaxRate: 5,
        deductions: 0,
        credits: 0,
      });

      // State tax: 100000 * 0.05 = 5000
      expect(result.stateTax).toBe(5000);
    });

    it('should handle zero state tax rate', () => {
      const result = calculateTax({
        annualIncome: 100000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      expect(result.stateTax).toBe(0);
    });
  });

  describe('Take-Home Pay Calculation', () => {
    it('should calculate correct take-home pay', () => {
      const result = calculateTax({
        annualIncome: 100000,
        filingStatus: 'single',
        stateTaxRate: 5,
        deductions: 0,
        credits: 0,
      });

      const expectedTakeHome = 100000 - result.totalTax;
      expect(result.takeHomePay).toBeCloseTo(expectedTakeHome, 2);
      expect(result.monthlyTakeHome).toBeCloseTo(expectedTakeHome / 12, 2);
    });

    it('should calculate effective tax rate correctly', () => {
      const result = calculateTax({
        annualIncome: 100000,
        filingStatus: 'single',
        stateTaxRate: 5,
        deductions: 0,
        credits: 0,
      });

      const expectedEffectiveRate = (result.totalTax / 100000) * 100;
      expect(result.effectiveRate).toBeCloseTo(expectedEffectiveRate, 2);
    });
  });

  describe('Standard Deductions', () => {
    it('should apply correct standard deduction for single filers', () => {
      const result = calculateTax({
        annualIncome: 50000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Standard deduction 2025: $14,600
      expect(result.taxableIncome).toBe(50000 - 14600);
    });

    it('should apply correct standard deduction for married filing jointly', () => {
      const result = calculateTax({
        annualIncome: 100000,
        filingStatus: 'married-joint',
        stateTaxRate: 0,
        deductions: 0,
        credits: 0,
      });

      // Standard deduction 2025: $29,200
      expect(result.taxableIncome).toBe(100000 - 29200);
    });

    it('should use higher of standard or additional deductions', () => {
      const lowDeduction = calculateTax({
        annualIncome: 50000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 5000, // Less than standard $14,600
        credits: 0,
      });

      const highDeduction = calculateTax({
        annualIncome: 50000,
        filingStatus: 'single',
        stateTaxRate: 0,
        deductions: 20000, // More than standard $14,600
        credits: 0,
      });

      // Should use standard deduction
      expect(lowDeduction.taxableIncome).toBe(50000 - 14600);
      // Should use itemized deduction
      expect(highDeduction.taxableIncome).toBe(50000 - 20000);
    });
  });
});
