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
import { calculateSIP, SIPResult } from '@/lib/calculations/sip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const formSchema = z.object({
  monthlyInvestment: z.number().min(100, 'Monthly investment must be at least $100'),
  annualReturnRate: z.number().min(1).max(50, 'Expected return must be between 1 and 50'),
  investmentYears: z.number().min(1).max(40, 'Investment period must be between 1 and 40 years'),
});

type FormData = z.infer<typeof formSchema>;

export default function SIPCalculator() {
  const [result, setResult] = useState<SIPResult | null>(null);

  const urlDefaults = useUrlParams({
    monthlyInvestment: 5000,
    annualReturnRate: 12,
    investmentYears: 10,
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
    const calculationResult = calculateSIP(data);
    setResult(calculationResult);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          SIP Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate returns on your Systematic Investment Plan (SIP)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="monthlyInvestment">Monthly Investment ($)</Label>
                <InfoTooltip content="Amount you invest every month in the SIP">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="monthlyInvestment"
                type="number"
                step="100"
                {...register('monthlyInvestment', { valueAsNumber: true })}
              />
              {errors.monthlyInvestment && (
                <p className="text-sm text-red-500">{errors.monthlyInvestment.message}</p>
              )}
              <InputHint typical="$500 - $10,000" example="$5,000" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="annualReturnRate">Expected Annual Return (%)</Label>
                <InfoTooltip content="Expected average yearly return on your investment">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="annualReturnRate"
                type="number"
                step="0.5"
                {...register('annualReturnRate', { valueAsNumber: true })}
              />
              {errors.annualReturnRate && (
                <p className="text-sm text-red-500">{errors.annualReturnRate.message}</p>
              )}
              <InputHint typical="8% - 15%" example="12%" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="investmentYears">Investment Period (Years)</Label>
                <InfoTooltip content="How long you plan to invest regularly">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="investmentYears"
                type="number"
                {...register('investmentYears', { valueAsNumber: true })}
              />
              {errors.investmentYears && (
                <p className="text-sm text-red-500">{errors.investmentYears.message}</p>
              )}
              <InputHint typical="5-20 years" example="10 years" />
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
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Results
                </h2>
                <div className="flex gap-2 flex-wrap">
                  <SaveShareUrl params={watch()} calculatorName="SIP Calculator" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Maturity Value</span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(result.maturityValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Invested</span>
                  <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.totalInvested)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Returns</span>
                  <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(result.totalReturns)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Return Percentage</span>
                  <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                    {((result.totalReturns / result.totalInvested) * 100).toFixed(1)}%
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
      {result && result.yearlyBreakdown.length > 0 && (
        <>
          {/* Bar Chart - Invested vs Returns */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Invested Amount vs Returns (Yearly)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={result.yearlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Bar dataKey="invested" fill="#3b82f6" name="Amount Invested" />
                <Bar dataKey="returns" fill="#10b981" name="Returns Earned" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Line Chart - Growth Over Time */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Portfolio Growth Over Time
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={result.yearlyBreakdown}>
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
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Portfolio Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Total Invested"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Investment Summary */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Investment Summary
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Monthly Investment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(watch('monthlyInvestment'))}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Months</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {watch('investmentYears') * 12}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Expected Annual Return</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {watch('annualReturnRate')}%
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Power of Compounding
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Your {formatCurrency(watch('monthlyInvestment'))} monthly investment will grow to{' '}
                <span className="text-purple-600 dark:text-purple-400">
                  {formatCurrency(result.maturityValue)}
                </span>{' '}
                in {watch('investmentYears')} years, earning you{' '}
                <span className="text-green-600 dark:text-green-400">
                  {formatCurrency(result.totalReturns)}
                </span>{' '}
                in returns!
              </p>
            </div>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="sip" />
    </div>
  );
}
