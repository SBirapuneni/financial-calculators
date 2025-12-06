import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer about Financial Calculators - Limitations and legal notices",
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Disclaimer
          </h1>
        </div>
        
        <Card className="p-8 space-y-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: December 5, 2025
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              PLEASE READ CAREFULLY
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The information and calculators provided on Financial Calculators are for educational 
              and informational purposes only and should not be construed as professional financial, 
              investment, tax, or legal advice.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. No Financial Advice</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Financial Calculators does not provide financial, investment, tax, or legal advice. 
              The calculators and content on this website are tools to help you understand financial 
              concepts and estimate potential outcomes. They should not be used as the sole basis 
              for financial decisions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              Always consult with qualified professionals (financial advisors, CPAs, attorneys) 
              before making important financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Accuracy of Calculations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we make every effort to ensure our calculators are accurate and up-to-date:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Calculations are estimates and may not reflect actual results</li>
              <li>Tax laws, interest rates, and regulations change frequently</li>
              <li>Individual circumstances vary and affect outcomes</li>
              <li>Historical performance does not guarantee future results</li>
              <li>We do not guarantee the accuracy, completeness, or timeliness of any information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Calculator Limitations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our calculators have limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Simplifications:</strong> Calculators use simplified models and may not account for all variables</li>
              <li><strong>Assumptions:</strong> Results depend on assumptions that may not apply to your situation</li>
              <li><strong>Tax Estimates:</strong> Tax calculators use general federal rates and don't include state/local taxes</li>
              <li><strong>Investment Returns:</strong> Projected returns are hypothetical and not guaranteed</li>
              <li><strong>Market Changes:</strong> Financial markets and economic conditions change constantly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. No Warranty</h2>
            <p className="text-gray-700 dark:text-gray-300">
              THE WEBSITE AND ALL CALCULATORS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Financial Calculators and its operators shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Any financial losses resulting from use of our calculators</li>
              <li>Decisions made based on calculator results</li>
              <li>Errors, inaccuracies, or omissions in calculations or content</li>
              <li>Loss of data or interruption of service</li>
              <li>Any direct, indirect, incidental, or consequential damages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Tax Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tax calculators provide estimates only:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Tax laws are complex and change frequently</li>
              <li>Results may not include state, local, or AMT taxes</li>
              <li>Your actual tax liability may differ significantly</li>
              <li>Consult a licensed tax professional or CPA for tax advice</li>
              <li>We are not responsible for tax filing errors based on our calculators</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Investment Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Investment calculators and projections:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Are hypothetical and for illustrative purposes only</li>
              <li>Do not represent actual investment results</li>
              <li>Do not guarantee future performance</li>
              <li>May not reflect fees, expenses, or taxes</li>
              <li>Cannot predict market fluctuations or economic changes</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4 font-semibold">
              Past performance does not indicate future results. All investments carry risk, 
              including potential loss of principal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Loan and Mortgage Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Loan and mortgage calculators provide estimates only. Actual loan terms, interest 
              rates, fees, and requirements vary by lender. Always compare offers from multiple 
              lenders and read all loan documents carefully before signing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Third-Party Content</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website may contain links to third-party websites or display third-party 
              advertisements. We are not responsible for the content, accuracy, or practices of 
              third parties. Your use of third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Educational Purpose</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This website is designed to educate users about financial concepts and provide tools 
              for preliminary planning. It is not a substitute for professional advice tailored to 
              your specific circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. User Responsibility</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By using this website, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>You are solely responsible for your financial decisions</li>
              <li>You will verify all calculations independently</li>
              <li>You will consult with qualified professionals before acting</li>
              <li>You understand the limitations and disclaimers stated here</li>
              <li>You use this website entirely at your own risk</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to update this disclaimer at any time. Changes will be effective 
              immediately upon posting. Please review this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have questions about this disclaimer:
            </p>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Email: legal@financialcalculators.com<br />
                Website: <Link href="/" className="text-blue-600 hover:underline">financialcalculators.com</Link>
              </p>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              By using Financial Calculators, you acknowledge that you have read and understood 
              this disclaimer and agree to its terms. If you do not agree, please do not use 
              this website.
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Also review our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>
          </p>
          <Link href="/" className="inline-block text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
