'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip as InfoTooltip, InputHint } from '@/components/ui/tooltip';
import { RelatedCalculators } from '@/components/shared/RelatedCalculators';
import { SaveShareUrl, useUrlParams } from '@/components/shared/SaveShareUrl';
import { calculateMortgage, MortgageResult } from '@/lib/calculations/mortgage';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const formSchema = z.object({
  homePrice: z.number().min(10000, 'Home price must be at least $10,000'),
  downPayment: z.number().min(0, 'Down payment cannot be negative'),
  loanTerm: z.number().min(1).max(30, 'Loan term must be between 1 and 30 years'),
  interestRate: z.number().min(0.1).max(20, 'Interest rate must be between 0.1 and 20'),
  propertyTax: z.number().min(0, 'Property tax cannot be negative'),
  homeInsurance: z.number().min(0, 'Insurance cannot be negative'),
  hoa: z.number().min(0, 'HOA cannot be negative'),
});

type FormData = z.infer<typeof formSchema>;

export default function MortgageCalculator() {
  const [result, setResult] = useState<MortgageResult | null>(null);

  // Load values from URL parameters if available
  const urlDefaults = useUrlParams({
    homePrice: 400000,
    downPayment: 80000,
    loanTerm: 30,
    interestRate: 6.5,
    propertyTax: 4800,
    homeInsurance: 1200,
    hoa: 0,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: urlDefaults,
  });

  const onSubmit = (data: FormData) => {
    const calculationResult = calculateMortgage(data);
    setResult(calculationResult);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = result ? [
    { name: 'Principal', value: result.costBreakdown.principal, color: '#10b981' },
    { name: 'Interest', value: result.costBreakdown.interest, color: '#ef4444' },
    { name: 'Property Tax', value: result.costBreakdown.propertyTax, color: '#f59e0b' },
    { name: 'Insurance', value: result.costBreakdown.insurance, color: '#3b82f6' },
    { name: 'HOA', value: result.costBreakdown.hoa, color: '#8b5cf6' },
    { name: 'PMI', value: result.costBreakdown.pmi, color: '#ec4899' },
  ].filter(item => item.value > 0) : [];

  // Aggregate yearly data
  const yearlyData = result ? (() => {
    const years: { [key: number]: { principal: number; interest: number; balance: number } } = {};
    result.schedule.forEach((payment) => {
      const year = Math.ceil(payment.month / 12);
      if (!years[year]) {
        years[year] = { principal: 0, interest: 0, balance: payment.balance };
      }
      years[year].principal += payment.principal;
      years[year].interest += payment.interest;
      years[year].balance = payment.balance;
    });
    return Object.entries(years).map(([year, data]) => ({
      year: parseInt(year),
      principal: Math.round(data.principal),
      interest: Math.round(data.interest),
      balance: Math.round(data.balance),
    }));
  })() : [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Mortgage Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate your monthly mortgage payment including taxes, insurance, and HOA
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="homePrice">Home Price ($)</Label>
                <InfoTooltip content="The total purchase price of the home you're buying">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="homePrice"
                type="number"
                step="10000"
                {...register('homePrice', { valueAsNumber: true })}
              />
              {errors.homePrice && (
                <p className="text-sm text-red-500">{errors.homePrice.message}</p>
              )}
              <InputHint typical="$200,000 - $800,000" example="$400,000" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <InfoTooltip content="Amount paid upfront. 20% down avoids PMI insurance">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="downPayment"
                type="number"
                step="5000"
                {...register('downPayment', { valueAsNumber: true })}
              />
              {errors.downPayment && (
                <p className="text-sm text-red-500">{errors.downPayment.message}</p>
              )}
              {watch('homePrice') > 0 && watch('downPayment') > 0 && (
                <p className="text-sm text-gray-500">
                  {((watch('downPayment') / watch('homePrice')) * 100).toFixed(1)}% down
                  {watch('downPayment') / watch('homePrice') < 0.2 && ' - PMI required'}
                </p>
              )}
              <InputHint typical="10-20% of home price" example="$80,000 (20%)" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <InfoTooltip content="Length of mortgage. Common terms are 15 or 30 years">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                  </InfoTooltip>
                </div>
                <Input
                  id="loanTerm"
                  type="number"
                  {...register('loanTerm', { valueAsNumber: true })}
                />
                {errors.loanTerm && (
                  <p className="text-sm text-red-500">{errors.loanTerm.message}</p>
                )}
                <InputHint typical="15 or 30 years" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <InfoTooltip content="Annual interest rate on your mortgage loan">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                  </InfoTooltip>
                </div>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.125"
                  {...register('interestRate', { valueAsNumber: true })}
                />
                {errors.interestRate && (
                  <p className="text-sm text-red-500">{errors.interestRate.message}</p>
                )}
                <InputHint typical="5.5% - 7.5%" example="6.5%" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
                <InfoTooltip content="Yearly property tax. Typically 0.5-2% of home value">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="propertyTax"
                type="number"
                step="100"
                {...register('propertyTax', { valueAsNumber: true })}
              />
              <InputHint typical="0.5-2% of home value" example="$4,800/year" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="homeInsurance">Annual Home Insurance ($)</Label>
                <InfoTooltip content="Yearly homeowners insurance premium">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="homeInsurance"
                type="number"
                step="100"
                {...register('homeInsurance', { valueAsNumber: true })}
              />
              <InputHint typical="$800 - $2,000/year" example="$1,200/year" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="hoa">Monthly HOA ($)</Label>
                <InfoTooltip content="Homeowners Association monthly fees (if applicable)">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="hoa"
                type="number"
                step="10"
                {...register('hoa', { valueAsNumber: true })}
              />
              <InputHint typical="$0 - $500/month" example="$150/month" />
            </div>

            <Button type="submit" className="w-full">
              Calculate Mortgage
            </Button>
          </form>
        </Card>

        {/* Results */}
        <Card className="p-6">
          {result ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Results
                </h2>
                <SaveShareUrl params={watch()} calculatorName="Mortgage Calculator" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Monthly Payment</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.totalMonthlyPayment)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Principal & Interest</span>
                  <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                    {formatCurrency(result.principalAndInterest)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Loan Amount</span>
                  <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(result.loanAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Interest</span>
                  <span className="text-xl font-semibold text-red-600 dark:text-red-400">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>

                {result.requiresPMI && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      ⚠️ PMI required (down payment &lt; 20%)
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Enter values and click Calculate to see results</p>
            </div>
          )}
        </Card>
      </div>

      {/* Charts */}
      {result && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Total Cost Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Payment Summary */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Down Payment</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(watch('downPayment'))} ({result.downPaymentPercent}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Loan Amount</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Payments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.totalPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Amortization Chart */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Amortization Schedule (Yearly)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={2} name="Balance" />
                <Line type="monotone" dataKey="principal" stroke="#10b981" strokeWidth={2} name="Principal Paid" />
                <Line type="monotone" dataKey="interest" stroke="#ef4444" strokeWidth={2} name="Interest Paid" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Disclaimer */}
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              ⚠️ Important Disclaimer
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              This calculator provides estimates only. Actual mortgage terms, rates, and costs vary by lender and borrower qualifications. 
              PMI, property taxes, and insurance rates are estimates. Please consult with a licensed mortgage professional for accurate quotes.
            </p>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="mortgage" />
    </div>
  );
}
