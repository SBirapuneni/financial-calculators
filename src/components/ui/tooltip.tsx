'use client';

import { ReactNode, useState } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
}

interface InputHintProps {
  range?: string;
  typical?: string;
  example?: string;
}

export function InputHint({ range, typical, example }: InputHintProps) {
  return (
    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-0.5">
      {range && <div>Range: {range}</div>}
      {typical && <div>Typical: {typical}</div>}
      {example && <div>Example: {example}</div>}
    </div>
  );
}
