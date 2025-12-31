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
import ExportButton from '@/components/shared/ExportButton';
import PrintButton from '@/components/shared/PrintButton';
import { calculateLoanPayoff, LoanPayoffResult } from '@/lib/calculations/loan-payoff';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formSchema = z.object({
  currentBalance: z.number().min(0, 'Balance cannot be negative'),
  annualRate: z.number().min(0).max(30, 'Rate must be between 0 and 30'),
  minimumPayment: z.number().min(0, 'Payment cannot be negative'),
  extraPayment: z.number().min(0, 'Extra payment cannot be negative'),
});

type FormData = z.infer<typeof formSchema>;

export default function LoanPayoffCalculator() {
  const [result, setResult] = useState<LoanPayoffResult | null>(null);

  const urlDefaults = useUrlParams({
    currentBalance: 50000,
    annualRate: 6.5,
    minimumPayment: 500,
    extraPayment: 100,
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
    const calculation = calculateLoanPayoff(data);
    setResult(calculation);
  };

  const chartData = result?.breakdown
    .filter((_, index) => index % Math.ceil(result.breakdown.length / 50) === 0)
    .map((item) => ({
      month: item.month,
      balance: item.balance,
      principal: item.principal,
      interest: item.interest,
    })) || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Loan Payoff Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate how extra payments can help you pay off your loan faster
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="currentBalance">Current Loan Balance ($)</Label>
                <InfoTooltip content="Remaining loan balance to be paid off">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="currentBalance"
                type="number"
                step="100"
                {...register('currentBalance', { valueAsNumber: true })}
              />
              {errors.currentBalance && (
                <p className="text-sm text-red-500 mt-1">{errors.currentBalance.message}</p>
              )}
              <InputHint example="$50,000" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
                <InfoTooltip content="Current interest rate on your loan">
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
              <InputHint typical="4% - 10%" example="6.5%" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="minimumPayment">Minimum Monthly Payment ($)</Label>
                <InfoTooltip content="Required monthly payment amount">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="minimumPayment"
                type="number"
                step="10"
                {...register('minimumPayment', { valueAsNumber: true })}
              />
              {errors.minimumPayment && (
                <p className="text-sm text-red-500 mt-1">{errors.minimumPayment.message}</p>
              )}
              <InputHint example="$500" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="extraPayment">Extra Monthly Payment ($)</Label>
                <InfoTooltip content="Additional payment to reduce principal faster">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="extraPayment"
                type="number"
                step="10"
                {...register('extraPayment', { valueAsNumber: true })}
              />
              {errors.extraPayment && (
                <p className="text-sm text-red-500 mt-1">{errors.extraPayment.message}</p>
              )}
              <InputHint example="$100" />
            </div>
          </div>

            <Button type="submit" className="w-full">
              Calculate Payoff
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
                  <SaveShareUrl params={watch()} calculatorName="Loan Payoff Calculator" />
                  <ExportButton calculatorName="Loan Payoff Calculator" resultData={result} />
                  <PrintButton />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Time to Payoff</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {result.monthsToPayoff} months
                    </span>
                    <p className="text-sm text-gray-500">
                      ({Math.floor(result.monthsToPayoff / 12)} years {result.monthsToPayoff % 12} months)
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Payment</span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${result.totalPayment.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Time Saved</span>
                  <div className="text-right">
                    <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                      {result.timeSaved} months
                    </span>
                    <p className="text-sm text-gray-500">
                      ({Math.floor(result.timeSaved / 12)} years {result.timeSaved % 12} months)
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Interest Saved</span>
                  <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                    ${result.interestSaved.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Enter loan details to calculate payoff schedule</p>
            </div>
          )}
        </Card>
      </div>

      {result && (
        <>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Loan Balance Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="Remaining Balance" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Payoff Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Current Balance:</span>
                <span className="font-semibold">${watch('currentBalance').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Interest Rate:</span>
                <span className="font-semibold">{watch('annualRate')}% per year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Minimum Payment:</span>
                <span className="font-semibold">${watch('minimumPayment').toLocaleString()}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Extra Payment:</span>
                <span className="font-semibold">${watch('extraPayment').toLocaleString()}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Monthly Payment:</span>
                <span className="font-semibold text-blue-600">${(watch('minimumPayment') + watch('extraPayment')).toLocaleString()}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payoff Time:</span>
                <span className="font-semibold">{result.monthsToPayoff} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Interest Paid:</span>
                <span className="font-semibold">${result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time Saved:</span>
                <span className="font-semibold text-green-600">{result.timeSaved} months</span>
              </div>
            </div>
          </Card>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
              💡 Impact of Extra Payments
            </h3>
            <p className="text-green-800 dark:text-green-200">
              By paying an extra ${watch('extraPayment').toLocaleString()} per month, you&apos;ll save{' '}
              <strong>${result.interestSaved.toLocaleString()}</strong> in interest and pay off your loan{' '}
              <strong>{result.timeSaved} months</strong> ({Math.floor(result.timeSaved / 12)} years {result.timeSaved % 12} months) earlier!
            </p>
          </div>
        </>
      )}
      
      <RelatedCalculators currentCalculator="loan-payoff" />
    </div>
  );
}
