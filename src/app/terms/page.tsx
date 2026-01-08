import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | UtilityHub Calculators",
  description: "Terms of Service for UtilityHub Calculators - User agreement and conditions of use",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <Card className="p-8 space-y-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: January 7, 2026
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing and using UtilityHub Calculators ("the Service"), you accept and agree to 
              be bound by these Terms of Service. If you do not agree to these terms, please do not 
              use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              UtilityHub Calculators provides free online financial calculation tools including but 
              not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Retirement planning calculators</li>
              <li>Mortgage and loan calculators</li>
              <li>Tax estimation tools</li>
              <li>Investment calculators (SIP, compound interest)</li>
              <li>Educational content and blog articles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use the Service for lawful purposes only</li>
              <li>Provide accurate information when using our calculators</li>
              <li>Not attempt to interfere with or disrupt the Service</li>
              <li>Not use automated systems to access the Service without permission</li>
              <li>Not reproduce, duplicate, or copy any part of the Service without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Disclaimer of Financial Advice</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg mb-4">
              <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">
                IMPORTANT: NOT FINANCIAL ADVICE
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The calculators and content provided on this website are for educational and 
                informational purposes only. They do NOT constitute financial, investment, tax, 
                or legal advice. Always consult with qualified professionals before making 
                financial decisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Calculations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we strive to ensure accuracy, we make no warranties or guarantees about:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>The accuracy, completeness, or reliability of calculation results</li>
              <li>The suitability of results for your specific situation</li>
              <li>The applicability of results to current tax laws or regulations</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              You are solely responsible for verifying all calculations and consulting with 
              appropriate professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All content on this website, including text, graphics, logos, calculator algorithms, 
              and software, is the property of UtilityHub Calculators and is protected by copyright 
              and intellectual property laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You may use our calculators for personal, non-commercial purposes. You may not 
              reproduce, redistribute, or create derivative works without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>We are not liable for any direct, indirect, incidental, or consequential damages</li>
              <li>We are not responsible for financial decisions made based on our calculators</li>
              <li>We are not liable for any losses, including financial losses, arising from use of our Service</li>
              <li>Our total liability shall not exceed $100 USD</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links and Content</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our Service may contain links to third-party websites or services. We are not 
              responsible for the content, privacy policies, or practices of third-party sites. 
              Your use of third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Advertising</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We display third-party advertisements (via Google AdSense) on our website. We do not 
              endorse any products or services advertised. Advertisers are responsible for ensuring 
              their ads comply with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Service Availability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We strive to maintain continuous availability but do not guarantee uninterrupted access. 
              We reserve the right to modify, suspend, or discontinue the Service at any time without 
              notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Your use of the Service is also governed by our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              . Please review it to understand our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Modifications to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms of Service at any time. Changes will be 
              effective immediately upon posting. Your continued use of the Service after changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of the 
              United States, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Email: legal@utltyhub.com<br />
                Website: <Link href="/" className="text-blue-600 hover:underline">calculators.utltyhub.com</Link>
              </p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              By using UtilityHub Calculators, you acknowledge that you have read, understood, and 
              agree to be bound by these Terms of Service.
            </p>
          </section>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
