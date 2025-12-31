'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="flex items-center gap-2 print-keep no-print"
      aria-label="Print results"
    >
      <Printer className="w-4 h-4" />
      Print
    </Button>
  );
}
