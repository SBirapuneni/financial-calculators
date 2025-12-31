'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Tooltip as InfoTooltip, InputHint } from '@/components/ui/tooltip';
import { RelatedCalculators } from '@/components/shared/RelatedCalculators';
import { SaveShareUrl, useUrlParams } from '@/components/shared/SaveShareUrl';
import ExportButton from '@/components/shared/ExportButton';
import PrintButton from '@/components/shared/PrintButton';
import { calculateCompoundInterest, CompoundInterestResult } from '@/lib/calculations/compound-interest';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formSchema = z.object({
  principal: z.number().min(1, 'Principal must be greater than 0'),
  annualRate: z.number().min(0.01).max(100, 'Rate must be between 0.01 and 100'),
  years: z.number().min(1).max(50, 'Years must be between 1 and 50'),
  compoundingFrequency: z.enum(['yearly', 'quarterly', 'monthly', 'daily']),
});

type FormData = z.infer<typeof formSchema>;

export default function CompoundInterestCalculator() {
  const [result, setResult] = useState<CompoundInterestResult | null>(null);

  const urlDefaults = useUrlParams({
    principal: 10000,
    annualRate: 8,
    years: 10,
    compoundingFrequency: 'yearly' as const,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: urlDefaults,
  });

  const onSubmit = (data: FormData) => {
    const calculationResult = calculateCompoundInterest(data);
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
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate the future value of your investment with compound interest
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="principal">Initial Investment ($)</Label>
                <InfoTooltip content="The starting amount you invest">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="principal"
                type="number"
                step="0.01"
                {...register('principal', { valueAsNumber: true })}
              />
              {errors.principal && (
                <p className="text-sm text-red-500">{errors.principal.message}</p>
              )}
              <InputHint typical="$1,000 - $100,000" example="$10,000" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
                <InfoTooltip content="The yearly interest rate earned">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="annualRate"
                type="number"
                step="0.01"
                {...register('annualRate', { valueAsNumber: true })}
              />
              {errors.annualRate && (
                <p className="text-sm text-red-500">{errors.annualRate.message}</p>
              )}
              <InputHint typical="3% - 12%" example="8%" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="years">Investment Period (Years)</Label>
                <InfoTooltip content="How long your money will be invested">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="years"
                type="number"
                {...register('years', { valueAsNumber: true })}
              />
              {errors.years && (
                <p className="text-sm text-red-500">{errors.years.message}</p>
              )}
              <InputHint typical="5-30 years" example="10 years" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
                <InfoTooltip content="How often interest is calculated and added">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <select
                id="compoundingFrequency"
                {...register('compoundingFrequency')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
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
                  <SaveShareUrl params={watch()} calculatorName="Compound Interest Calculator" />
                  <ExportButton calculatorName="Compound Interest Calculator" resultData={result} />
                  <PrintButton />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Final Amount</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.finalAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Interest Earned</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Principal Amount</span>
                  <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">
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

      {/* Chart */}
      {result && result.yearlyBreakdown.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Growth Over Time
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
                dataKey="amount" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Total Amount"
              />
              <Line 
                type="monotone" 
                dataKey="interest" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Interest Earned"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}
      
      <RelatedCalculators currentCalculator="compound-interest" />
    </div>
  );
}
