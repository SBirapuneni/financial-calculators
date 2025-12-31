import { describe, it, expect } from 'vitest';
import { calculateMortgage } from '@/lib/calculations/mortgage';

describe('Mortgage Calculator', () => {
  describe('Basic Mortgage Calculation', () => {
    it('should calculate correct monthly payment', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      // Loan amount: 400000 - 80000 = 320000
      expect(result.loanAmount).toBe(320000);
      
      // Monthly P&I should be around $2,022
      expect(result.principalAndInterest).toBeGreaterThan(2000);
      expect(result.principalAndInterest).toBeLessThan(2100);
    });

    it('should calculate total payment with all costs', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 100,
      });

      // Total should include P&I + tax + insurance + HOA
      const expectedTotal = result.principalAndInterest + (4800/12) + (1200/12) + 100;
      expect(result.totalMonthlyPayment).toBeCloseTo(expectedTotal, 2);
    });
  });

  describe('PMI Calculation', () => {
    it('should require PMI when down payment is less than 20%', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 60000, // 15% down
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      expect(result.requiresPMI).toBe(true);
      expect(result.downPaymentPercent).toBe(15);
    });

    it('should not require PMI when down payment is 20% or more', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000, // 20% down
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      expect(result.requiresPMI).toBe(false);
      expect(result.downPaymentPercent).toBe(20);
    });

    it('should remove PMI when LTV reaches 80%', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 60000, // 15% down, requires PMI
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      // Find the month where PMI drops off
      const pmiDropMonth = result.schedule.find((payment, index) => {
        if (index === 0) return false;
        const currentLTV = (payment.balance / 400000) * 100;
        return currentLTV <= 80;
      });

      if (pmiDropMonth) {
        expect(pmiDropMonth.pmi).toBe(0);
      }
    });
  });

  describe('Amortization Schedule', () => {
    it('should generate correct number of payments', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      // 30 years * 12 months = 360 payments
      expect(result.schedule.length).toBe(360);
    });

    it('should have balance reach zero at final payment', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      const finalPayment = result.schedule[result.schedule.length - 1];
      expect(finalPayment.balance).toBeCloseTo(0, 0);
    });

    it('should have principal + interest = monthly payment', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      const firstPayment = result.schedule[0];
      const sum = firstPayment.principal + firstPayment.interest;
      expect(sum).toBeCloseTo(result.principalAndInterest, 2);
    });

    it('should have decreasing interest and increasing principal over time', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      const firstPayment = result.schedule[0];
      const middlePayment = result.schedule[180]; // 15 years in
      const lastPayment = result.schedule[359];

      // Interest should decrease
      expect(firstPayment.interest).toBeGreaterThan(middlePayment.interest);
      expect(middlePayment.interest).toBeGreaterThan(lastPayment.interest);

      // Principal should increase
      expect(firstPayment.principal).toBeLessThan(middlePayment.principal);
      expect(middlePayment.principal).toBeLessThan(lastPayment.principal);
    });
  });

  describe('Cost Breakdown', () => {
    it('should calculate total interest paid', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      // Total interest = total payments - principal
      const totalPandI = result.principalAndInterest * 360;
      const expectedInterest = totalPandI - result.loanAmount;
      // Allow for small rounding differences
      expect(Math.abs(result.totalInterest - expectedInterest)).toBeLessThan(2);
    });

    it('should include all costs in cost breakdown', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 100,
      });

      expect(result.costBreakdown.principal).toBe(320000);
      expect(result.costBreakdown.propertyTax).toBeCloseTo(4800 * 30, 0);
      expect(result.costBreakdown.insurance).toBeCloseTo(1200 * 30, 0);
      expect(result.costBreakdown.hoa).toBeCloseTo(100 * 360, 0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 0,
        propertyTax: 0,
        homeInsurance: 0,
        hoa: 0,
      });

      // With 0% interest, payment should be principal / months
      const expectedPayment = 320000 / 360;
      expect(result.principalAndInterest).toBeCloseTo(expectedPayment, 2);
      expect(result.totalInterest).toBe(0);
    });

    it('should handle 15-year mortgage', () => {
      const result = calculateMortgage({
        homePrice: 400000,
        downPayment: 80000,
        loanTerm: 15,
        interestRate: 5.5,
        propertyTax: 4800,
        homeInsurance: 1200,
        hoa: 0,
      });

      expect(result.schedule.length).toBe(180); // 15 * 12
      // 15-year should have less total interest than 30-year
      expect(result.totalInterest).toBeLessThan(320000); // Rough estimate
    });
  });
});
