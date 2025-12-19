import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp, PiggyBank, DollarSign, Home as HomeIcon, Receipt, Wallet, CreditCard, ArrowRightLeft, Landmark } from "lucide-react";
import { Metadata } from "next";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

export const metadata: Metadata = {
  title: "Free Financial Calculators - Retirement, Mortgage, Tax, Loan, EMI & Investment | 2025",
  description: "Free online financial calculators for retirement planning, mortgage payments, tax estimates, loans, EMI, SIP, FD, and compound interest. Make smarter financial decisions with our easy-to-use tools.",
  keywords: "financial calculator, retirement calculator, mortgage calculator, tax calculator, loan calculator, SIP calculator, compound interest calculator, investment calculator, EMI calculator, FD calculator",
  openGraph: {
    title: "Free Financial Calculators - Plan Your Financial Future",
    description: "Calculate retirement savings, mortgage payments, taxes, EMI, and investment returns with our free tools",
    type: "website",
  },
};

export default function Home() {
  const calculators = [
    {
      title: "SIP Calculator",
      description: "Plan your systematic investment plan and see future returns",
      icon: PiggyBank,
      href: "/calculators/sip",
      color: "bg-pink-500",
    },
    {
      title: "EMI Calculator",
      description: "Calculate loan EMI for home, car, and personal loans",
      icon: CreditCard,
      href: "/calculators/emi",
      color: "bg-indigo-500",
    },
    {
      title: "Loan Calculator",
      description: "Calculate your monthly loan payments and total interest",
      icon: DollarSign,
      href: "/calculators/loan",
      color: "bg-blue-500",
    },
    {
      title: "Loan Payoff Calculator",
      description: "See how extra payments help you save on interest",
      icon: Calculator,
      href: "/calculators/loan-payoff",
      color: "bg-teal-500",
    },
    {
      title: "Fixed Deposit Calculator",
      description: "Calculate FD maturity amount and interest earned",
      icon: Landmark,
      href: "/calculators/fd",
      color: "bg-emerald-500",
    },
    {
      title: "Compound Interest Calculator",
      description: "Calculate how your money grows over time with compound interest",
      icon: TrendingUp,
      href: "/calculators/compound-interest",
      color: "bg-green-500",
    },
    {
      title: "Retirement Calculator",
      description: "Plan your retirement savings and see if you're on track",
      icon: Wallet,
      href: "/calculators/retirement",
      color: "bg-purple-500",
    },
    {
      title: "Mortgage Calculator",
      description: "Calculate monthly payments including taxes, insurance, and PMI",
      icon: HomeIcon,
      href: "/calculators/mortgage",
      color: "bg-orange-500",
    },
    {
      title: "Tax Calculator",
      description: "Estimate your 2025 federal income tax and take-home pay",
      icon: Receipt,
      href: "/calculators/tax",
      color: "bg-red-500",
    },
    {
      title: "APR to APY Calculator",
      description: "Convert between APR and APY interest rates",
      icon: ArrowRightLeft,
      href: "/calculators/apr-apy",
      color: "bg-cyan-500",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Financial Calculators',
            description: 'Free financial calculators for retirement, mortgage, tax, and investment planning',
            url: 'https://financialcalculators.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://financialcalculators.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Financial Calculators',
            description: 'Free online financial planning tools and calculators',
            url: 'https://financialcalculators.com',
          }),
        }}
      />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to))' }}>
              <Calculator className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Make informed financial decisions with our easy-to-use calculators. 
            Plan your investments, loans, and savings with precision.
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            const CardContent = (
              <Card className="relative h-full p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group themed-gradient border-2 hover:border-opacity-50" style={{ borderColor: 'var(--color-primary)' }}>
                <div className={`inline-block p-3 ${calc.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {calc.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {calc.description}
                </p>
                <div className="mt-4 font-medium flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                  Try it now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Card>
            );

            return (
              <Link key={calc.title} href={calc.href}>
                {CardContent}
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Use Our Calculators?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Visual Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                See your calculations come to life with interactive charts and graphs
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Instant Calculations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get accurate results immediately as you update your inputs
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                100% Free
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All calculators are completely free with no hidden fees or signups
              </p>
            </div>
          </div>
        </div>

        {/* Blog CTA Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Learn More About Financial Planning
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Read our expert guides on retirement planning, investment strategies, and money management tips
              </p>
              <Link href="/blog">
                <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Visit Our Blog
                </button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </main>
    </div>
    </>
  );
}
