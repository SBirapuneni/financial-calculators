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
import { calculateTax, TaxResult } from '@/lib/calculations/tax';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const formSchema = z.object({
  annualIncome: z.number().min(1, 'Income must be greater than 0'),
  filingStatus: z.enum(['single', 'married-joint', 'married-separate', 'head-of-household']),
  stateTaxRate: z.number().min(0).max(15, 'State tax rate must be between 0 and 15'),
  deductions: z.number().min(0, 'Deductions cannot be negative'),
  credits: z.number().min(0, 'Credits cannot be negative'),
});

type FormData = z.infer<typeof formSchema>;

export default function TaxCalculator() {
  const [result, setResult] = useState<TaxResult | null>(null);

  const urlDefaults = useUrlParams({
    annualIncome: 75000,
    filingStatus: 'single' as const,
    stateTaxRate: 5,
    deductions: 0,
    credits: 0,
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
    const calculationResult = calculateTax(data);
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

  const taxBreakdownData = result ? [
    { name: 'Federal Tax', value: result.federalTax, color: '#ef4444' },
    { name: 'State Tax', value: result.stateTax, color: '#f59e0b' },
    { name: 'FICA Tax', value: result.ficaTax, color: '#3b82f6' },
  ] : [];

  const incomeBreakdownData = result ? [
    { name: 'Take Home', value: result.takeHomePay, color: '#10b981' },
    { name: 'Total Tax', value: result.totalTax, color: '#ef4444' },
  ] : [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Income Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Estimate your 2025 federal income tax and take-home pay
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="annualIncome">Annual Income ($)</Label>
                <InfoTooltip content="Your gross annual income before taxes and deductions">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="annualIncome"
                type="number"
                step="1000"
                {...register('annualIncome', { valueAsNumber: true })}
              />
              {errors.annualIncome && (
                <p className="text-sm text-red-500">{errors.annualIncome.message}</p>
              )}
              <InputHint example="$75,000" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="filingStatus">Filing Status</Label>
                <InfoTooltip content="Your tax filing status affects brackets and deductions">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <select
                id="filingStatus"
                {...register('filingStatus')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="single">Single</option>
                <option value="married-joint">Married Filing Jointly</option>
                <option value="married-separate">Married Filing Separately</option>
                <option value="head-of-household">Head of Household</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="stateTaxRate">State Tax Rate (%)</Label>
                <InfoTooltip content="Your state's income tax rate. Some states have no income tax">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="stateTaxRate"
                type="number"
                step="0.5"
                {...register('stateTaxRate', { valueAsNumber: true })}
              />
              {errors.stateTaxRate && (
                <p className="text-sm text-red-500">{errors.stateTaxRate.message}</p>
              )}
              <InputHint range="0-15%" example="5% (CA: 9.3%, TX/FL: 0%)" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="deductions">Additional Deductions ($)</Label>
                <InfoTooltip content="Itemized deductions beyond the standard deduction (mortgage interest, charitable donations, etc.)">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="deductions"
                type="number"
                step="100"
                {...register('deductions', { valueAsNumber: true })}
              />
              <InputHint example="$5,000" />
              <p className="text-sm text-gray-500">
                Standard deduction is included automatically
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="credits">Tax Credits ($)</Label>
                <InfoTooltip content="Direct reductions to your tax bill (child tax credit, education credits, etc.)">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="credits"
                type="number"
                step="100"
                {...register('credits', { valueAsNumber: true })}
              />
              <InputHint example="$2,000 (per child)" />
              <p className="text-sm text-gray-500">
                Child tax credit, education credits, etc.
              </p>
            </div>

            <Button type="submit" className="w-full">
              Calculate Tax
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
                  <SaveShareUrl params={watch()} calculatorName="Tax Calculator" />
                  <ShareExport calculatorName="Tax Calculator" resultData={result} />
                  <PrintButton />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Annual Take-Home Pay</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.takeHomePay)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Monthly Take-Home</span>
                  <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.monthlyTakeHome)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Tax</span>
                  <span className="text-xl font-semibold text-red-600 dark:text-red-400">
                    {formatCurrency(result.totalTax)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective Rate</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {result.effectiveRate}%
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marginal Rate</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {result.marginalRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Enter your income details to calculate your tax</p>
            </div>
          )}
        </Card>
      </div>

      {/* Charts and Breakdown */}
      {result && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tax Breakdown */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Tax Breakdown
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Federal Tax</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.federalTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">State Tax</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.stateTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">FICA (SS + Medicare)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.ficaTax)}
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={taxBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taxBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Income Distribution */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Income Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="value">
                    {incomeBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Tax Brackets */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Tax Brackets (2025 Federal)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Tax Rate</th>
                    <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Income Range</th>
                    <th className="text-right py-2 px-4 text-gray-700 dark:text-gray-300">Tax Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {result.brackets.map((bracket, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-4">{bracket.rate}%</td>
                      <td className="py-2 px-4">
                        {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}
                      </td>
                      <td className="text-right py-2 px-4 font-semibold">{formatCurrency(bracket.tax)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Marginal vs Effective Rate:</strong> Your marginal rate ({result.marginalRate}%) 
                is the rate on your last dollar earned. Your effective rate ({result.effectiveRate}%) 
                is your average tax rate across all income.
              </p>
            </div>
          </Card>

          {/* Disclaimer */}
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              ⚠️ Important Disclaimer
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              This calculator provides estimates only and should not be considered tax advice. 
              Actual tax liability may vary based on specific circumstances, deductions, and credits. 
              State tax rates vary significantly by state and income level. Please consult a qualified 
              tax professional or use official IRS tools for accurate calculations.
            </p>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="tax" />
    </div>
  );
}
