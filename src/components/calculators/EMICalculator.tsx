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
import { calculateEMI, EMICalculation } from '@/lib/calculations/emi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const formSchema = z.object({
  principal: z.number().min(0, 'Principal cannot be negative'),
  annualRate: z.number().min(0).max(30, 'Rate must be between 0 and 30'),
  tenureYears: z.number().min(1, 'Tenure must be at least 1 year'),
});

type FormData = z.infer<typeof formSchema>;

export default function EMICalculator() {
  const [result, setResult] = useState<EMICalculation | null>(null);

  const urlDefaults = useUrlParams({
    principal: 500000,
    annualRate: 8.5,
    tenureYears: 20,
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
    const tenureMonths = data.tenureYears * 12;
    const calculation = calculateEMI(data.principal, data.annualRate, tenureMonths);
    setResult(calculation);
  };

  const formValues = watch();
  const principal = formValues.principal || 0;

  const pieData = result
    ? [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: result.totalInterest },
      ]
    : [];

  const COLORS = ['#3b82f6', '#ef4444'];

  const lineData = result?.breakdown
    .filter((_, index) => index % Math.ceil(result.breakdown.length / 50) === 0)
    .map((item) => ({
      month: item.month,
      principal: item.principal,
      interest: item.interest,
      balance: item.balance,
    })) || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          EMI Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Calculate your Equated Monthly Installment for loans
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="principal">Loan Amount ($)</Label>
                <InfoTooltip content="Total loan amount to be borrowed">
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
              <InputHint typical="$100,000 - $1,000,000" example="$500,000" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="annualRate">Interest Rate (% per year)</Label>
                <InfoTooltip content="Annual interest rate on the loan">
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
              <InputHint typical="6% - 12%" example="8.5%" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="tenureYears">Loan Tenure (Years)</Label>
                <InfoTooltip content="Loan repayment period in years">
                  <span className="text-gray-400 cursor-help">ⓘ</span>
                </InfoTooltip>
              </div>
              <Input
                id="tenureYears"
                type="number"
                {...register('tenureYears', { valueAsNumber: true })}
              />
              {errors.tenureYears && (
                <p className="text-sm text-red-500 mt-1">{errors.tenureYears.message}</p>
              )}
              <InputHint typical="10-30 years" example="20 years" />
            </div>
          </div>

            <Button type="submit" className="w-full">
              Calculate EMI
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
                  <SaveShareUrl params={watch()} calculatorName="EMI Calculator" />
                  <ExportButton calculatorName="EMI Calculator" resultData={result} />
                  <PrintButton />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Monthly EMI</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${result.monthlyEMI.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Payment</span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${result.totalPayment.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Total Interest</span>
                  <span className="text-xl font-semibold text-red-600 dark:text-red-400">
                    ${result.totalInterest.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Enter loan details to calculate EMI</p>
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
                Payment Breakdown Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="principal" stroke="#3b82f6" name="Principal" />
                  <Line type="monotone" dataKey="interest" stroke="#ef4444" name="Interest" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Loan Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Loan Amount:</span>
                <span className="font-semibold">${principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Interest Rate:</span>
                <span className="font-semibold">{formValues.annualRate}% per year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Loan Tenure:</span>
                <span className="font-semibold">{formValues.tenureYears} years ({formValues.tenureYears * 12} months)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly EMI:</span>
                <span className="font-semibold text-blue-600">${result.monthlyEMI.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Amount Payable:</span>
                <span className="font-semibold">${result.totalPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
                <span className="font-semibold text-red-600">${result.totalInterest.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="emi" />
    </div>
  );
}
