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
import { ShareExport } from '@/components/shared/ShareExport';
import PrintButton from '@/components/shared/PrintButton';
import { calculateLoan, LoanResult } from '@/lib/calculations/loan';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const formSchema = z.object({
  principal: z.number().min(1000, 'Loan amount must be at least $1,000'),
  annualRate: z.number().min(0.1).max(30, 'Rate must be between 0.1 and 30'),
  termYears: z.number().min(1).max(30, 'Term must be between 1 and 30 years'),
});

type FormData = z.infer<typeof formSchema>;

export default function LoanCalculator() {
  const [result, setResult] = useState<LoanResult | null>(null);

  const urlDefaults = useUrlParams({
    principal: 200000,
    annualRate: 6.5,
    termYears: 15,
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
    const calculationResult = calculateLoan(data);
    setResult(calculationResult);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Prepare data for pie chart
  const pieData = result ? [
    { name: 'Principal', value: watch('principal'), color: '#10b981' },
    { name: 'Interest', value: result.totalInterest, color: '#ef4444' },
  ] : [];

  // Prepare data for amortization chart (yearly aggregation)
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
      principal: Math.round(data.principal * 100) / 100,
      interest: Math.round(data.interest * 100) / 100,
      balance: Math.round(data.balance * 100) / 100,
    }));
  })() : [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Loan Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate your monthly loan payments and see the complete amortization schedule
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="principal">Loan Amount ($)</Label>
                <InfoTooltip content="The total amount you want to borrow">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="principal"
                type="number"
                step="1000"
                {...register('principal', { valueAsNumber: true })}
              />
              {errors.principal && (
                <p className="text-sm text-red-500">{errors.principal.message}</p>
              )}
              <InputHint typical="$50,000 - $500,000" example="$200,000" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
                <InfoTooltip content="The yearly interest rate charged on the loan">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                {...register('annualRate', { valueAsNumber: true })}
              />
              {errors.annualRate && (
                <p className="text-sm text-red-500">{errors.annualRate.message}</p>
              )}
              <InputHint typical="4% - 12%" example="6.5%" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="termYears">Loan Term (Years)</Label>
                <InfoTooltip content="How long you have to repay the loan">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="termYears"
                type="number"
                {...register('termYears', { valueAsNumber: true })}
              />
              {errors.termYears && (
                <p className="text-sm text-red-500">{errors.termYears.message}</p>
              )}
              <InputHint typical="10-30 years" example="15 years" />
            </div>

            <Button type="submit" className="w-full">
              Calculate
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
                <div className="flex gap-2">
                  <SaveShareUrl params={watch()} calculatorName="Loan Calculator" />
                  <ShareExport calculatorName="Loan Calculator" resultData={result} />
                  <PrintButton />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Monthly Payment</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.monthlyPayment)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Payment</span>
                  <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                    {formatCurrency(result.totalPayment)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Interest</span>
                  <span className="text-xl font-semibold text-red-600 dark:text-red-400">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Principal Amount</span>
                  <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(watch('principal'))}
                  </span>
                </div>
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
                Principal vs Interest
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

            {/* Payment Breakdown */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Number of Payments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {watch('termYears') * 12} months
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {watch('annualRate')}% per year
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(watch('annualRate') / 12).toFixed(4)}%
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Interest Percentage</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Amortization Chart */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Loan Amortization Schedule (Yearly)
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
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Remaining Balance"
                />
                <Line 
                  type="monotone" 
                  dataKey="principal" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Principal Paid"
                />
                <Line 
                  type="monotone" 
                  dataKey="interest" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Interest Paid"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Disclaimer */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> This calculator provides estimates for educational purposes. 
              Actual loan terms and rates depend on creditworthiness, lender policies, and market conditions.
            </p>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="loan" />
    </div>
  );
}
