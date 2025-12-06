import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Financial Calculators - Learn how we collect, use, and protect your data",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <Card className="p-8 space-y-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: December 5, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Financial Calculators ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Email address (if you subscribe to our newsletter)</li>
              <li>Calculator inputs (stored locally in your browser only)</li>
              <li>Feedback or comments you submit</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you visit our website, we automatically collect certain information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or search terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Providing and improving our calculator services</li>
              <li>Sending newsletters (only if you subscribed)</li>
              <li>Analyzing website usage and improving user experience</li>
              <li>Detecting and preventing fraud or security issues</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics to understand how visitors use our site</li>
              <li><strong>Advertising Cookies:</strong> Google AdSense for displaying relevant ads</li>
              <li><strong>Preference Cookies:</strong> Remember your settings like dark mode</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You can control cookies through your browser settings. Note that disabling cookies may 
              affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Google Analytics</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use Google Analytics to analyze website traffic. Google Analytics uses cookies to 
              collect information about your use of our website. For more information, visit{" "}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google's Privacy Policy
              </a>.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.2 Google AdSense</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use Google AdSense to display advertisements. Google may use cookies to serve ads 
              based on your visits to our site and other sites. You can opt out of personalized 
              advertising by visiting{" "}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Ad Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Storage and Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your calculator inputs are stored locally in your browser using localStorage and are 
              never transmitted to our servers. We implement reasonable security measures to protect 
              any information we do collect, but no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us at privacy@financialcalculators.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. International Users</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website is operated in the United States. If you access our site from outside the 
              U.S., your information may be transferred to and processed in the U.S.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Email: privacy@financialcalculators.com<br />
                Website: <Link href="/" className="text-blue-600 hover:underline">financialcalculators.com</Link>
              </p>
            </div>
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
