'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateFD, calculateSimpleFD, FDResult } from '@/lib/calculations/fd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

type CompoundingFrequency = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

export default function FDCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [annualRate, setAnnualRate] = useState<number>(4.5);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [frequency, setFrequency] = useState<CompoundingFrequency>('quarterly');
  const [result, setResult] = useState<FDResult | null>(null);
  const [simpleInterestAmount, setSimpleInterestAmount] = useState<number>(0);

  const handleCalculate = () => {
    const calculation = calculateFD({
      principal,
      annualRate,
      tenureMonths,
      compoundingFrequency: frequency,
    });
    const simpleAmount = calculateSimpleFD(principal, annualRate, tenureMonths);
    setResult(calculation);
    setSimpleInterestAmount(simpleAmount);
  };

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
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Fixed Deposit Calculator
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="principal">Deposit Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="tenure">Tenure (Months)</Label>
            <Input
              id="tenure"
              type="number"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              min="1"
            />
            <p className="text-sm text-gray-500 mt-1">
              {(tenureMonths / 12).toFixed(1)} years
            </p>
          </div>

          <div>
            <Label htmlFor="frequency">Compounding Frequency</Label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as CompoundingFrequency)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate Maturity Amount
        </button>
      </Card>

      {result && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Maturity Amount
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                ${result.maturityAmount.toLocaleString()}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Interest Earned
              </h3>
              <p className="text-3xl font-bold text-green-600">
                ${result.interestEarned.toLocaleString()}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Effective Rate
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {result.effectiveRate.toFixed(2)}%
              </p>
            </Card>
          </div>

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
                <span className="font-semibold">{annualRate}% per year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tenure:</span>
                <span className="font-semibold">{tenureMonths} months ({(tenureMonths / 12).toFixed(1)} years)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Compounding:</span>
                <span className="font-semibold capitalize">{frequency.replace('-', ' ')}</span>
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
    </div>
  );
}
