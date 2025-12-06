import Link from 'next/link';
import { Calculator } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Financial Calculators</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6">
              <Link
                href="/calculators/loan"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                Loan
              </Link>
              <Link
                href="/calculators/investment"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                Investment
              </Link>
              <Link
                href="/calculators/tax"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                Tax
              </Link>
              <Link
                href="/calculators"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                All Calculators
              </Link>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
