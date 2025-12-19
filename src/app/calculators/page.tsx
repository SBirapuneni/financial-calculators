import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Calculator, Wallet, Home, Receipt, TrendingUp, DollarSign, PiggyBank, CreditCard, ArrowRightLeft, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "All Financial Calculators - Free Tools for Smart Money Decisions",
  description: "Browse our complete collection of free financial calculators including retirement, mortgage, tax, loan, SIP, EMI, FD, and compound interest calculators.",
};

export default function CalculatorsPage() {
  const calculators = [
    {
      title: "SIP Calculator",
      description: "Plan your systematic investment plan (SIP) and calculate potential returns from regular monthly investments.",
      icon: PiggyBank,
      href: "/calculators/sip",
      color: "bg-pink-500",
      features: ["Future value projection", "Return on investment", "Wealth accumulation"],
    },
    {
      title: "EMI Calculator",
      description: "Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans with detailed payment breakdown.",
      icon: CreditCard,
      href: "/calculators/emi",
      color: "bg-indigo-500",
      features: ["Monthly EMI calculation", "Interest breakdown", "Amortization schedule"],
    },
    {
      title: "Loan Calculator",
      description: "Calculate monthly loan payments, total interest, and create an amortization schedule for any type of loan.",
      icon: DollarSign,
      href: "/calculators/loan",
      color: "bg-blue-500",
      features: ["Payment schedule", "Total interest", "Payoff timeline"],
    },
    {
      title: "Loan Payoff Calculator",
      description: "See how extra payments can help you pay off your loan faster and save thousands in interest. Calculate time and money saved.",
      icon: Calculator,
      href: "/calculators/loan-payoff",
      color: "bg-teal-500",
      features: ["Extra payment impact", "Interest savings", "Payoff timeline"],
    },
    {
      title: "Fixed Deposit Calculator",
      description: "Calculate FD maturity amount, interest earned, and returns. Compare compound vs simple interest on your deposits.",
      icon: Landmark,
      href: "/calculators/fd",
      color: "bg-emerald-500",
      features: ["Maturity calculation", "Interest earned", "Compound interest"],
    },
    {
      title: "Compound Interest Calculator",
      description: "Calculate how your money grows over time with compound interest. See the power of compounding on your investments.",
      icon: TrendingUp,
      href: "/calculators/compound-interest",
      color: "bg-green-500",
      features: ["Growth projection", "Interest calculation", "Visual charts"],
    },
    {
      title: "Retirement Calculator",
      description: "Plan your retirement savings and see if you're on track to meet your retirement goals. Calculate how much you need to save.",
      icon: Wallet,
      href: "/calculators/retirement",
      color: "bg-purple-500",
      features: ["Retirement age planning", "Savings projection", "Income needs analysis"],
    },
    {
      title: "Mortgage Calculator",
      description: "Calculate monthly mortgage payments including principal, interest, taxes, insurance, and PMI. Compare loan options.",
      icon: Home,
      href: "/calculators/mortgage",
      color: "bg-orange-500",
      features: ["Monthly payment breakdown", "Amortization schedule", "Total interest cost"],
    },
    {
      title: "Tax Calculator",
      description: "Estimate your 2025 federal income tax, effective tax rate, and take-home pay based on your income and filing status.",
      icon: Receipt,
      href: "/calculators/tax",
      color: "bg-red-500",
      features: ["Federal tax estimate", "Take-home pay", "Effective tax rate"],
    },
    {
      title: "APR to APY Calculator",
      description: "Convert between Annual Percentage Rate (APR) and Annual Percentage Yield (APY) to understand true interest rates.",
      icon: ArrowRightLeft,
      href: "/calculators/apr-apy",
      color: "bg-cyan-500",
      features: ["APR to APY conversion", "APY to APR conversion", "Interest comparison"],
    },
  ];

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
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Free, easy-to-use calculators to help you make informed financial decisions. 
            No signup required, 100% free forever.
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="max-w-6xl mx-auto space-y-8 mb-16">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.title} href={calc.href}>
                <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`inline-block p-4 ${calc.color} rounded-xl group-hover:scale-110 transition-transform`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                        {calc.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                        {calc.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {calc.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-4 font-medium flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                        Try it now
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Use Our Calculators?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">100% Free</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No hidden fees, no subscriptions, completely free to use.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">No Signup Required</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start calculating immediately without creating an account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Accurate Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Industry-standard formulas ensure precision and reliability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Visual Charts</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Interactive graphs help you understand your financial projections.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Mobile Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Works perfectly on all devices - desktop, tablet, and mobile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Private & Secure</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your calculations stay private - we don't store your data.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
