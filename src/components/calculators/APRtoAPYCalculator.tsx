'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip as InfoTooltip, InputHint } from '@/components/ui/tooltip';
import { RelatedCalculators } from '@/components/shared/RelatedCalculators';
import { aprToApy, apyToApr, getCompoundingPeriods } from '@/lib/calculations/apr-apy';
import { ArrowRightLeft } from 'lucide-react';

type CompoundingFrequency = 'daily' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually';

export default function APRtoAPYCalculator() {
  const [calculationType, setCalculationType] = useState<'apr-to-apy' | 'apy-to-apr'>('apr-to-apy');
  const [inputRate, setInputRate] = useState<number>(5.0);
  const [frequency, setFrequency] = useState<CompoundingFrequency>('monthly');
  const [result, setResult] = useState<{ rate: number; description: string } | null>(null);

  const handleCalculate = () => {
    const periods = getCompoundingPeriods(frequency);
    
    if (calculationType === 'apr-to-apy') {
      const apyResult = aprToApy(inputRate, periods);
      setResult({
        rate: apyResult.apy,
        description: apyResult.description,
      });
    } else {
      const aprResult = apyToApr(inputRate, periods);
      setResult({
        rate: aprResult.apr,
        description: aprResult.description,
      });
    }
  };

  const toggleCalculationType = () => {
    setCalculationType(calculationType === 'apr-to-apy' ? 'apy-to-apr' : 'apr-to-apy');
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {calculationType === 'apr-to-apy' ? 'APR to APY' : 'APY to APR'} Calculator
          </h2>
          <button
            onClick={toggleCalculationType}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Switch
          </button>
        </div>

        <div className="space-y-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="inputRate">
                {calculationType === 'apr-to-apy' ? 'APR (Annual Percentage Rate)' : 'APY (Annual Percentage Yield)'} (%)
              </Label>
              <InfoTooltip content={calculationType === 'apr-to-apy' ? 'Nominal annual rate without compounding' : 'Effective annual rate with compounding'}>
                <span className="text-gray-400 cursor-help">ⓘ</span>
              </InfoTooltip>
            </div>
            <Input
              id="inputRate"
              type="number"
              value={inputRate}
              onChange={(e) => setInputRate(Number(e.target.value))}
              step="0.01"
              min="0"
            />
            <InputHint typical="1% - 10%" example="5.0%" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="frequency">Compounding Frequency</Label>
              <InfoTooltip content="How often interest is compounded per year">
                <span className="text-gray-400 cursor-help">ⓘ</span>
              </InfoTooltip>
            </div>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as CompoundingFrequency)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="daily">Daily (365 times/year)</option>
              <option value="monthly">Monthly (12 times/year)</option>
              <option value="quarterly">Quarterly (4 times/year)</option>
              <option value="semi-annually">Semi-Annually (2 times/year)</option>
              <option value="annually">Annually (1 time/year)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate {calculationType === 'apr-to-apy' ? 'APY' : 'APR'}
        </button>
      </Card>

      {result && (
        <>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {calculationType === 'apr-to-apy' ? 'APY (Annual Percentage Yield)' : 'APR (Annual Percentage Rate)'}
            </h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">
              {result.rate.toFixed(4)}%
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {result.description}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Comparison
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {calculationType === 'apr-to-apy' ? 'APR (Nominal Rate)' : 'APY (Effective Rate)'}:
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {inputRate.toFixed(4)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {calculationType === 'apr-to-apy' ? 'APY (Effective Rate)' : 'APR (Nominal Rate)'}:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {result.rate.toFixed(4)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">Difference:</span>
                <span className="text-2xl font-bold text-green-600">
                  {Math.abs(result.rate - inputRate).toFixed(4)}%
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Example: ₹10,000 Investment for 1 Year
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Principal:</span>
                <span className="font-semibold">₹10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Compounding:</span>
                <span className="font-semibold capitalize">{frequency.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {calculationType === 'apr-to-apy' ? 'Using APR' : 'Using APY'} ({inputRate}%):
                </span>
                <span className="font-semibold">
                  ₹{(10000 * (1 + inputRate / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {calculationType === 'apr-to-apy' ? 'Using APY' : 'Using APR'} ({result.rate.toFixed(4)}%):
                </span>
                <span className="font-semibold text-blue-600">
                  ₹{(10000 * (1 + result.rate / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </Card>
        </>
      )}
      
      <RelatedCalculators currentCalculator="apr-apy" />
    </div>
  );
}
