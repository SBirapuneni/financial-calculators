'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { History, Trash2, X, Clock } from 'lucide-react';
import {
  getCalculationHistory,
  deleteCalculation,
  clearCalculationHistory,
  formatHistoryDate,
  type CalculationHistoryItem,
} from '@/lib/utils/calculationHistory';

interface CalculationHistoryProps {
  calculatorType?: string;
  onLoadCalculation?: (item: CalculationHistoryItem) => void;
}

export default function CalculationHistory({
  calculatorType,
  onLoadCalculation,
}: CalculationHistoryProps) {
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [calculatorType]);

  const loadHistory = () => {
    const items = getCalculationHistory(calculatorType);
    setHistory(items);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCalculation(id);
    loadHistory();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all calculation history?')) {
      clearCalculationHistory(calculatorType);
      loadHistory();
    }
  };

  const handleLoad = (item: CalculationHistoryItem) => {
    if (onLoadCalculation) {
      onLoadCalculation(item);
      setShowHistory(false);
    }
  };

  if (history.length === 0 && !showHistory) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowHistory(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors no-print"
      >
        <History className="w-4 h-4" />
        History ({history.length})
      </button>

      {showHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-print">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Calculation History</h2>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {history.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No calculation history yet</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleLoad(item)}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {formatHistoryDate(item.timestamp)}
                          </p>
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                            {Object.entries(item.inputs).slice(0, 3).map(([key, value]) => (
                              <span key={key} className="mr-3">
                                {key}: {typeof value === 'number' ? value.toLocaleString() : value}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t">
                  <button
                    onClick={handleClearAll}
                    className="w-full py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
                  >
                    Clear All History
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
