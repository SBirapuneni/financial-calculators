import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp, Users, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | UtilityHub Calculators",
  description: "Learn about our mission to provide free, accurate financial calculators to help you make informed decisions about your money.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
              <Calculator className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            About UtilityHub Calculators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Empowering individuals to make informed financial decisions through free, easy-to-use calculators and educational resources.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe that everyone deserves access to quality financial planning tools. Our mission is to provide accurate, 
              user-friendly calculators that help people understand their financial futures, make informed decisions about loans, 
              investments, and retirement planning, and ultimately achieve financial wellness.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Accuracy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our calculators use industry-standard formulas and are regularly updated to ensure precision.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                100% free tools with no hidden fees, signups, or paywalls. Financial planning should be available to everyone.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your calculations are private. We don't store your financial data or share it with third parties.
              </p>
            </Card>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What We Offer</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">6 Free Financial Calculators</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Retirement, mortgage, tax, loan, SIP, and compound interest calculators to cover all your financial planning needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Visual Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Interactive charts and graphs that help you understand your financial projections at a glance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Educational Content</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Blog articles, FAQs, and guides to help you understand financial concepts and make better decisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Mobile-Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All tools work seamlessly on desktop, tablet, and mobile devices for calculations on the go.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Important Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              UtilityHub Calculators provides educational tools and information only. We are not financial advisors, and our 
              calculators should not be considered financial advice. Always consult with a qualified financial professional 
              before making important financial decisions. Results from our calculators are estimates based on the information 
              you provide and should be used for general planning purposes only.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
