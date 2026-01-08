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
            <span className="text-xl font-bold">UtilityHub Calculators</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6">
              <Link
                href="/calculators/sip"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                SIP
              </Link>
              <Link
                href="/calculators/emi"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                EMI
              </Link>
              <Link
                href="/calculators/loan"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                Loan
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
