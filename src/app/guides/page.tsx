import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, PiggyBank, Home, GraduationCap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Financial Planning Guides - Learn to Manage Your Money | UtilityHub",
  description: "Comprehensive guides on retirement planning, investing, mortgages, taxes, and personal finance. Expert tips to help you achieve financial freedom.",
};

export default function GuidesPage() {
  const guideCategories = [
    {
      title: "Retirement Planning",
      description: "Learn how to plan for a comfortable retirement with our comprehensive guides on 401(k)s, IRAs, and pension planning.",
      icon: PiggyBank,
      color: "bg-purple-500",
      guides: [
        "How Much Do I Need to Retire?",
        "401(k) vs IRA: Which is Better?",
        "Retirement Planning in Your 20s, 30s, 40s",
        "Social Security Benefits Guide",
      ],
    },
    {
      title: "Investing Basics",
      description: "Master the fundamentals of investing, from stocks and bonds to mutual funds and ETFs.",
      icon: TrendingUp,
      color: "bg-green-500",
      guides: [
        "Introduction to Stock Market Investing",
        "Understanding Compound Interest",
        "SIP vs Lump Sum Investment",
        "Building a Diversified Portfolio",
      ],
    },
    {
      title: "Home Buying & Mortgages",
      description: "Everything you need to know about buying a home, getting a mortgage, and managing homeownership costs.",
      icon: Home,
      color: "bg-orange-500",
      guides: [
        "First-Time Home Buyer's Guide",
        "How to Get the Best Mortgage Rate",
        "Understanding PMI and How to Avoid It",
        "Fixed vs Adjustable-Rate Mortgages",
      ],
    },
    {
      title: "Tax Planning",
      description: "Maximize your tax savings with expert tips on deductions, credits, and tax-efficient strategies.",
      icon: GraduationCap,
      color: "bg-blue-500",
      guides: [
        "2025 Tax Brackets and Deductions",
        "Tax-Saving Investment Strategies",
        "Self-Employment Tax Guide",
        "Common Tax Deductions You Might Miss",
      ],
    },
    {
      title: "Debt Management",
      description: "Strategies to pay off debt faster and manage loans effectively without sacrificing your lifestyle.",
      icon: Heart,
      color: "bg-red-500",
      guides: [
        "Debt Snowball vs Debt Avalanche",
        "Student Loan Repayment Strategies",
        "How to Consolidate and Refinance Debt",
        "Credit Score Improvement Tips",
      ],
    },
    {
      title: "Financial Literacy",
      description: "Build your financial knowledge with our guides on budgeting, saving, and money management basics.",
      icon: BookOpen,
      color: "bg-indigo-500",
      guides: [
        "Creating a Budget That Actually Works",
        "Emergency Fund: How Much Do You Need?",
        "Understanding Your Credit Report",
        "Beginner's Guide to Personal Finance",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Financial Planning Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Expert advice and comprehensive guides to help you make smarter financial decisions 
            and achieve your money goals.
          </p>
        </div>

        {/* Guide Categories */}
        <div className="max-w-6xl mx-auto space-y-8 mb-16">
          {guideCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`inline-block p-4 ${category.color} rounded-xl`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                      {category.description}
                    </p>

                    {/* Guide List */}
                    <div className="grid md:grid-cols-2 gap-3">
                      {category.guides.map((guide) => (
                        <div
                          key={guide}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-blue-600 dark:text-blue-400">📘</span>
                          <span>{guide}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              📚 Guides Coming Soon!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              We're currently working on creating comprehensive, easy-to-understand guides 
              covering all these topics. Check back soon for detailed articles and expert advice!
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              In the meantime, explore our free calculators to start planning your financial future:
            </p>
            <Link
              href="/calculators"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Explore Calculators
            </Link>
          </Card>
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Get Notified When Guides are Published
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Subscribe to our newsletter to be the first to know when new guides and articles are published.
            </p>
            <Link
              href="/#newsletter"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Subscribe to Newsletter
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
}
