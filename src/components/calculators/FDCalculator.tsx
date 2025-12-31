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
import { calculateFD, calculateSimpleFD, FDResult } from '@/lib/calculations/fd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

type CompoundingFrequency = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

const formSchema = z.object({
  principal: z.number().min(0, 'Principal cannot be negative'),
  annualRate: z.number().min(0).max(30, 'Rate must be between 0 and 30'),
  tenureMonths: z.number().min(1, 'Tenure must be at least 1 month'),
  frequency: z.enum(['monthly', 'quarterly', 'half-yearly', 'yearly']),
});

type FormData = z.infer<typeof formSchema>;

export default function FDCalculator() {
  const [result, setResult] = useState<FDResult | null>(null);
  const [simpleInterestAmount, setSimpleInterestAmount] = useState<number>(0);

  const urlDefaults = useUrlParams({
    principal: 100000,
    annualRate: 4.5,
    tenureMonths: 12,
    frequency: 'quarterly' as CompoundingFrequency,
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
    const calculation = calculateFD({
      principal: data.principal,
      annualRate: data.annualRate,
      tenureMonths: data.tenureMonths,
      compoundingFrequency: data.frequency,
    });
    const simpleAmount = calculateSimpleFD(data.principal, data.annualRate, data.tenureMonths);
    setResult(calculation);
    setSimpleInterestAmount(simpleAmount);
  };

  const formValues = watch();
  const principal = formValues.principal || 0;
  const tenureMonths = formValues.tenureMonths || 1;

  const pieData = result
    ? [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: result.interestEarned },
      ]
    : [];

  const COLORS = ['#3b82f6', '#10b981'];

  const chartData = result?.breakdown.map((item) => ({
    period: item.period,
    totalAmount: item.totalAmount,
    interest: item.interest,
  })) || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Fixed Deposit Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate returns on your Fixed Deposit investments
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="principal">Deposit Amount ($)</Label>
                <InfoTooltip content="Initial amount to deposit in the fixed deposit">
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
                <p className="text-sm text-red-500 mt-1">{errors.principal.message}</p>
              )}
              <InputHint typical="$10,000 - $500,000" example="$100,000" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
                <InfoTooltip content="Interest rate offered on the fixed deposit">
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
                <p className="text-sm text-red-500 mt-1">{errors.annualRate.message}</p>
              )}
              <InputHint typical="3% - 6%" example="4.5%" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="tenureMonths">Tenure (Months)</Label>
                <InfoTooltip content="Lock-in period for the fixed deposit">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="tenureMonths"
                type="number"
                {...register('tenureMonths', { valueAsNumber: true })}
              />
              {errors.tenureMonths && (
                <p className="text-sm text-red-500 mt-1">{errors.tenureMonths.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {(tenureMonths / 12).toFixed(1)} years
              </p>
              <InputHint typical="6-60 months" example="12 months" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="frequency">Compounding Frequency</Label>
                <InfoTooltip content="How often interest is compounded">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <select
                id="frequency"
                {...register('frequency')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
              {errors.frequency && (
                <p className="text-sm text-red-500 mt-1">{errors.frequency.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Calculate Maturity Amount
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
                  <SaveShareUrl params={watch()} calculatorName="Fixed Deposit Calculator" />
                  <ShareExport calculatorName="Fixed Deposit Calculator" resultData={result} />
                  <PrintButton />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Maturity Amount</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${result.maturityAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Interest Earned</span>
                  <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                    ${result.interestEarned.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Effective Rate</span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    {result.effectiveRate.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Enter deposit details to calculate maturity amount</p>
            </div>
          )}
        </Card>
      </div>

      {result && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Principal vs Interest
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${((percent || 0) * 100).toFixed(1)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                FD Growth Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" label={{ value: 'Period', position: 'insideBottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalAmount" stroke="#3b82f6" name="Total Amount" strokeWidth={2} />
                  <Line type="monotone" dataKey="interest" stroke="#10b981" name="Interest Earned" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              FD Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Deposit Amount:</span>
                <span className="font-semibold">${principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Interest Rate:</span>
                <span className="font-semibold">{formValues.annualRate}% per year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tenure:</span>
                <span className="font-semibold">{tenureMonths} months ({(tenureMonths / 12).toFixed(1)} years)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Compounding:</span>
                <span className="font-semibold capitalize">{formValues.frequency.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Maturity Amount:</span>
                <span className="font-semibold text-blue-600">${result.maturityAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Interest Earned:</span>
                <span className="font-semibold text-green-600">${result.interestEarned.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Effective Annual Rate:</span>
                <span className="font-semibold">{result.effectiveRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Return on Investment:</span>
                <span className="font-semibold">{((result.interestEarned / principal) * 100).toFixed(2)}%</span>
              </div>
            </div>
          </Card>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
              💡 Compound vs Simple Interest
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">With Compound Interest:</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ${result.maturityAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">With Simple Interest:</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ${simpleInterestAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-blue-800 dark:text-blue-200 mt-3">
              You earn <strong>${(result.maturityAmount - simpleInterestAmount).toLocaleString()}</strong> more with compound interest!
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Interest rates shown are examples. Actual CD/Fixed Deposit rates vary by institution and market conditions. 
              Always verify current rates with your financial institution.
            </p>
          </div>
        </>
      )}
      
      <RelatedCalculators currentCalculator="fd" />
    </div>
  );
}
