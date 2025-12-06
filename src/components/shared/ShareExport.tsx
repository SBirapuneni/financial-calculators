'use client';

import { Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareExportProps {
  calculatorName: string;
  resultData: any;
  onExportPDF?: () => void;
}

export function ShareExport({ calculatorName, resultData, onExportPDF }: ShareExportProps) {
  const handleShare = async () => {
    const shareText = `Check out my ${calculatorName} results on Financial Calculators!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: calculatorName,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const handleExport = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      // Fallback: download as JSON
      const dataStr = JSON.stringify(resultData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${calculatorName.toLowerCase().replace(/\s+/g, '-')}-results.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export
      </Button>
    </div>
  );
}
