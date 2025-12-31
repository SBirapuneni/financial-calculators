'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportButtonProps {
  calculatorName: string;
  resultData: any;
}

export default function ExportButton({ calculatorName, resultData }: ExportButtonProps) {
  const handleExport = () => {
    // Export as JSON
    const dataStr = JSON.stringify(resultData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${calculatorName.toLowerCase().replace(/\s+/g, '-')}-results.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Export
    </Button>
  );
}
