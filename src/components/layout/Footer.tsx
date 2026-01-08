import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculators/loan" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/mortgage" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/sip" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  SIP Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} UtilityHub Calculators. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Disclaimer: The calculators provided are for educational purposes
            only. Please consult with a financial advisor for personalized
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
