'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ShareExport } from '@/components/shared/ShareExport';
import { Tooltip as InfoTooltip, InputHint } from '@/components/ui/tooltip';
import { RelatedCalculators } from '@/components/shared/RelatedCalculators';
import { calculateRetirement, RetirementResult } from '@/lib/calculations/retirement';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const formSchema = z.object({
  currentAge: z.number().min(18).max(100, 'Age must be between 18 and 100'),
  retirementAge: z.number().min(50).max(100, 'Retirement age must be between 50 and 100'),
  currentSavings: z.number().min(0, 'Savings cannot be negative'),
  monthlyContribution: z.number().min(0, 'Contribution cannot be negative'),
  expectedReturn: z.number().min(0).max(30, 'Return must be between 0 and 30'),
  inflationRate: z.number().min(0).max(20, 'Inflation must be between 0 and 20'),
  desiredMonthlyIncome: z.number().min(100, 'Income must be at least $100'),
});

type FormData = z.infer<typeof formSchema>;

export default function RetirementCalculator() {
  const [result, setResult] = useState<RetirementResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 1000,
      expectedReturn: 8,
      inflationRate: 3,
      desiredMonthlyIncome: 5000,
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.retirementAge <= data.currentAge) {
      alert('Retirement age must be greater than current age');
      return;
    }
    const calculationResult = calculateRetirement(data);
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Retirement Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Plan your retirement and see if you're on track to meet your goals
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <InfoTooltip content="Your age today">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                  </InfoTooltip>
                </div>
                <Input
                  id="currentAge"
                  type="number"
                  {...register('currentAge', { valueAsNumber: true })}
                />
                {errors.currentAge && (
                  <p className="text-sm text-red-500">{errors.currentAge.message}</p>
                )}
                <InputHint range="18-100 years" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <InfoTooltip content="Age when you plan to retire">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                  </InfoTooltip>
                </div>
                <Input
                  id="retirementAge"
                  type="number"
                  {...register('retirementAge', { valueAsNumber: true })}
                />
                {errors.retirementAge && (
                  <p className="text-sm text-red-500">{errors.retirementAge.message}</p>
                )}
                <InputHint typical="62-67 years" example="65" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="currentSavings">Current Savings ($)</Label>
                <InfoTooltip content="Total retirement savings you have right now (401k, IRA, etc.)">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="currentSavings"
                type="number"
                step="1000"
                {...register('currentSavings', { valueAsNumber: true })}
              />
              {errors.currentSavings && (
                <p className="text-sm text-red-500">{errors.currentSavings.message}</p>
              )}
              <InputHint example="$50,000" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <InfoTooltip content="Amount you plan to save each month for retirement">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="monthlyContribution"
                type="number"
                step="100"
                {...register('monthlyContribution', { valueAsNumber: true })}
              />
              {errors.monthlyContribution && (
                <p className="text-sm text-red-500">{errors.monthlyContribution.message}</p>
              )}
              <InputHint typical="10-15% of income" example="$1,000" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                  <InfoTooltip content="Average annual investment return before retirement">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                  </InfoTooltip>
                </div>
                <Input
                  id="expectedReturn"
                  type="number"
                  step="0.5"
                  {...register('expectedReturn', { valueAsNumber: true })}
                />
                {errors.expectedReturn && (
                  <p className="text-sm text-red-500">{errors.expectedReturn.message}</p>
                )}
                <InputHint typical="6-10%" example="8%" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <InfoTooltip content="Expected average inflation rate">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                  </InfoTooltip>
                </div>
                <Input
                  id="inflationRate"
                  type="number"
                  step="0.5"
                  {...register('inflationRate', { valueAsNumber: true })}
                />
                {errors.inflationRate && (
                  <p className="text-sm text-red-500">{errors.inflationRate.message}</p>
                )}
                <InputHint typical="2-3%" example="3%" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="desiredMonthlyIncome">Desired Monthly Income in Retirement ($)</Label>
                <InfoTooltip content="Monthly income you want in retirement (in today's dollars)">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="desiredMonthlyIncome"
                type="number"
                step="500"
                {...register('desiredMonthlyIncome', { valueAsNumber: true })}
              />
              {errors.desiredMonthlyIncome && (
                <p className="text-sm text-red-500">{errors.desiredMonthlyIncome.message}</p>
              )}
              <InputHint typical="70-80% of current income" example="$5,000" />
            </div>

            <Button type="submit" className="w-full">
              Calculate Retirement Plan
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
                <ShareExport calculatorName="Retirement Calculator" resultData={result} />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Retirement Corpus</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.retirementCorpus)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Contributions</span>
                  <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrency(result.totalContributions)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Investment Gains</span>
                  <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                    {formatCurrency(result.investmentGains)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Years to Retirement</span>
                  <span className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                    {result.yearsToRetirement} years
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Corpus Lasts Until Age</span>
                  <span className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                    {result.corpusLastsUntilAge}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 At retirement, your {formatCurrency(watch('desiredMonthlyIncome'))} 
                  /month will be equivalent to {formatCurrency(result.monthlyIncomeAtRetirement)}
                  /month in today's dollars (adjusted for inflation).
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Enter your details and click Calculate to see your retirement projection</p>
            </div>
          )}
        </Card>
      </div>

      {/* Chart */}
      {result && result.yearlyBreakdown.length > 0 && (
        <>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Retirement Savings Growth
            </h2>
            <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={result.yearlyBreakdown}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="age" 
                label={{ value: 'Age', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Age ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                fillOpacity={1}
                fill="url(#colorValue)"
                name="Portfolio Value"
              />
              <Area 
                type="monotone" 
                dataKey="invested" 
                stroke="#3b82f6" 
                fillOpacity={1}
                fill="url(#colorInvested)"
                name="Total Invested"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

          {/* Disclaimer */}
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              ⚠️ Important Disclaimer
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
              This calculator provides estimates based on assumptions and should not be considered financial advice. 
              Actual investment returns vary and are not guaranteed. The calculator assumes:
            </p>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 list-disc list-inside space-y-1">
              <li>Conservative returns during retirement (60% of accumulation rate)</li>
              <li>Constant inflation rate (actual inflation varies)</li>
              <li>No major market corrections or emergencies</li>
              <li>Regular monthly contributions without interruption</li>
            </ul>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
              Please consult a qualified financial advisor for personalized retirement planning.
            </p>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="retirement" />
    </div>
  );
}
