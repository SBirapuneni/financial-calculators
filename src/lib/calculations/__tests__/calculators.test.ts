import { describe, it, expect } from 'vitest';
import { calculateCompoundInterest } from '@/lib/calculations/compound-interest';
import { calculateSIP } from '@/lib/calculations/sip';
import { calculateEMI } from '@/lib/calculations/emi';
import { calculateLoan } from '@/lib/calculations/loan';

describe('Compound Interest Calculator', () => {
  it('should calculate compound interest correctly', () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 8,
      years: 10,
      compoundingFrequency: 'yearly',
    });

    // Using formula: A = P(1 + r/n)^(nt)
    // A = 10000(1 + 0.08/1)^(1*10) = 10000 * 1.08^10 ≈ 21589.25
    expect(result.finalAmount).toBeCloseTo(21589.25, 0);
    expect(result.totalInterest).toBeCloseTo(11589.25, 0);
  });

  it('should handle different compounding frequencies', () => {
    const yearly = calculateCompoundInterest({
      principal: 10000,
      annualRate: 8,
      years: 10,
      compoundingFrequency: 'yearly',
    });

    const monthly = calculateCompoundInterest({
      principal: 10000,
      annualRate: 8,
      years: 10,
      compoundingFrequency: 'monthly',
    });

    const daily = calculateCompoundInterest({
      principal: 10000,
      annualRate: 8,
      years: 10,
      compoundingFrequency: 'daily',
    });

    // More frequent compounding should yield higher returns
    expect(monthly.finalAmount).toBeGreaterThan(yearly.finalAmount);
    expect(daily.finalAmount).toBeGreaterThan(monthly.finalAmount);
  });
});

describe('SIP Calculator', () => {
  it('should calculate SIP returns correctly', () => {
    const result = calculateSIP({
      monthlyInvestment: 5000,
      annualReturnRate: 12,
      investmentYears: 10,
    });

    expect(result.totalInvested).toBe(5000 * 12 * 10); // 600,000
    expect(result.maturityValue).toBeGreaterThan(result.totalInvested);
    const expectedReturns = result.maturityValue - result.totalInvested;
    expect(result.totalReturns).toBeCloseTo(expectedReturns, 2);
  });

  it('should generate yearly breakdown', () => {
    const result = calculateSIP({
      monthlyInvestment: 1000,
      annualReturnRate: 12,
      investmentYears: 5,
    });

    expect(result.yearlyBreakdown.length).toBe(5);
    
    // Each year should show increasing values
    for (let i = 1; i < result.yearlyBreakdown.length; i++) {
      expect(result.yearlyBreakdown[i].value).toBeGreaterThan(
        result.yearlyBreakdown[i - 1].value
      );
    }
  });

  it('should handle zero return rate', () => {
    const result = calculateSIP({
      monthlyInvestment: 1000,
      annualReturnRate: 0,
      investmentYears: 5,
    });

    // With 0% return, maturity value should equal total invested
    expect(result.maturityValue).toBe(result.totalInvested);
    expect(result.totalReturns).toBe(0);
  });
});

describe('EMI Calculator', () => {
  it('should calculate EMI correctly', () => {
    const result = calculateEMI(100000, 10, 12);

    // Monthly payment should be positive
    expect(result.monthlyEMI).toBeGreaterThan(0);
    
    // Total payment should be greater than principal
    expect(result.totalPayment).toBeGreaterThan(100000);
    
    // Interest should be positive
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it('should generate correct number of payment periods', () => {
    const result = calculateEMI(100000, 10, 24); // 24 months

    expect(result.breakdown.length).toBe(24);
  });

  it('should have balance reach zero at end', () => {
    const result = calculateEMI(100000, 10, 12);

    const lastPayment = result.breakdown[result.breakdown.length - 1];
    expect(lastPayment.balance).toBeCloseTo(0, 0);
  });

  it('should handle zero interest rate', () => {
    const result = calculateEMI(120000, 0, 12);

    // With 0% interest, EMI should be principal / months
    const expectedEMI = 120000 / 12;
    expect(result.monthlyEMI).toBeCloseTo(expectedEMI, 2);
    expect(result.totalInterest).toBe(0);
  });
});

describe('Loan Calculator', () => {
  it('should calculate loan payment correctly', () => {
    const result = calculateLoan({
      principal: 200000,
      annualRate: 6.5,
      termYears: 15,
    });

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalPayment).toBeGreaterThan(200000);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it('should generate amortization schedule', () => {
    const result = calculateLoan({
      principal: 200000,
      annualRate: 6.5,
      termYears: 15,
    });

    expect(result.schedule.length).toBe(180); // 15 years * 12 months
    
    // First and last payment should have different principal/interest ratios
    const firstPayment = result.schedule[0];
    const lastPayment = result.schedule[179];
    
    expect(firstPayment.interest).toBeGreaterThan(lastPayment.interest);
    expect(firstPayment.principal).toBeLessThan(lastPayment.principal);
  });

  it('should have consistent monthly payments', () => {
    const result = calculateLoan({
      principal: 200000,
      annualRate: 6.5,
      termYears: 15,
    });

    // All payments should be the same
    const firstPayment = result.schedule[0].payment;
    result.schedule.forEach(payment => {
      expect(payment.payment).toBeCloseTo(firstPayment, 2);
    });
  });
});
