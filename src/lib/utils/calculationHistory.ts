// Calculation history management
export interface CalculationHistoryItem {
  id: string;
  calculatorType: string;
  timestamp: number;
  inputs: Record<string, any>;
  results: Record<string, any>;
  title: string;
}

const STORAGE_KEY = 'calculator-history';
const MAX_HISTORY_ITEMS = 50;

export function saveCalculation(
  calculatorType: string,
  title: string,
  inputs: Record<string, any>,
  results: Record<string, any>
): void {
  if (typeof window === 'undefined') return;

  const historyItem: CalculationHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    calculatorType,
    timestamp: Date.now(),
    inputs,
    results,
    title,
  };

  const history = getCalculationHistory();
  const updated = [historyItem, ...history].slice(0, MAX_HISTORY_ITEMS);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save calculation history:', error);
  }
}

export function getCalculationHistory(
  calculatorType?: string
): CalculationHistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history: CalculationHistoryItem[] = JSON.parse(stored);
    
    if (calculatorType) {
      return history.filter((item) => item.calculatorType === calculatorType);
    }
    
    return history;
  } catch (error) {
    console.error('Failed to load calculation history:', error);
    return [];
  }
}

export function deleteCalculation(id: string): void {
  if (typeof window === 'undefined') return;

  const history = getCalculationHistory();
  const updated = history.filter((item) => item.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete calculation:', error);
  }
}

export function clearCalculationHistory(calculatorType?: string): void {
  if (typeof window === 'undefined') return;

  if (calculatorType) {
    const history = getCalculationHistory();
    const updated = history.filter((item) => item.calculatorType !== calculatorType);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to clear calculation history:', error);
    }
  } else {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear calculation history:', error);
    }
  }
}

export function formatHistoryDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}
