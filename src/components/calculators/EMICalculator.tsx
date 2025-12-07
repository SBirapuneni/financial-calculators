'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateEMI, EMICalculation } from '@/lib/calculations/emi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [annualRate, setAnnualRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [result, setResult] = useState<EMICalculation | null>(null);

  const handleCalculate = () => {
    const tenureMonths = tenureYears * 12;
    const calculation = calculateEMI(principal, annualRate, tenureMonths);
    setResult(calculation);
  };

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
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          EMI Calculator
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="principal">Loan Amount (₹)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="rate">Interest Rate (% per year)</Label>
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
            <Label htmlFor="tenure">Loan Tenure (Years)</Label>
            <Input
              id="tenure"
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate EMI
        </button>
      </Card>

      {result && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Monthly EMI
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                ₹{result.monthlyEMI.toLocaleString()}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Payment
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{result.totalPayment.toLocaleString()}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Interest
              </h3>
              <p className="text-3xl font-bold text-red-600">
                ₹{result.totalInterest.toLocaleString()}
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
                <span className="font-semibold">₹{principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Interest Rate:</span>
                <span className="font-semibold">{annualRate}% per year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Loan Tenure:</span>
                <span className="font-semibold">{tenureYears} years ({tenureYears * 12} months)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly EMI:</span>
                <span className="font-semibold text-blue-600">₹{result.monthlyEMI.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Amount Payable:</span>
                <span className="font-semibold">₹{result.totalPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
                <span className="font-semibold text-red-600">₹{result.totalInterest.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
