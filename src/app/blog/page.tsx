import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Metadata } from 'next';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial Planning Blog - Tips, Guides & Calculator How-Tos | UtilityHub',
  description: 'Expert financial planning tips, investment guides, and calculator tutorials. Learn about retirement planning, mortgages, taxes, and smart money management.',
  keywords: 'financial planning, investment guide, retirement tips, mortgage advice, tax planning, money management',
};

const blogPosts = [
  {
    slug: 'retirement-planning-guide-2025',
    title: 'Complete Retirement Planning Guide for 2025',
    excerpt: 'Learn how to plan for a comfortable retirement with our comprehensive guide covering savings strategies, investment options, and common mistakes to avoid.',
    category: 'Retirement',
    readTime: '8 min read',
    date: 'December 1, 2025',
    image: '💰',
  },
  {
    slug: 'mortgage-first-time-buyers',
    title: 'Mortgage Guide for First-Time Home Buyers',
    excerpt: 'Everything you need to know about getting your first mortgage, from down payments and PMI to choosing the right loan term.',
    category: 'Mortgages',
    readTime: '10 min read',
    date: 'November 28, 2025',
    image: '🏠',
  },
  {
    slug: 'tax-deductions-2025',
    title: 'Top Tax Deductions You Shouldn\'t Miss in 2025',
    excerpt: 'Maximize your tax refund with these often-overlooked deductions and credits. Learn what you can claim and how much you can save.',
    category: 'Taxes',
    readTime: '6 min read',
    date: 'November 25, 2025',
    image: '📊',
  },
  {
    slug: 'compound-interest-explained',
    title: 'The Power of Compound Interest: A Simple Guide',
    excerpt: 'Understand how compound interest works and why Einstein called it the eighth wonder of the world. Real examples included.',
    category: 'Investing',
    readTime: '5 min read',
    date: 'November 20, 2025',
    image: '📈',
  },
  {
    slug: 'sip-vs-lump-sum',
    title: 'SIP vs Lump Sum Investment: Which is Better?',
    excerpt: 'Compare systematic investment plans with lump sum investments. Learn which strategy works best for your financial goals.',
    category: 'Investing',
    readTime: '7 min read',
    date: 'November 15, 2025',
    image: '💵',
  },
  {
    slug: 'emergency-fund-calculator',
    title: 'How Much Should Your Emergency Fund Be?',
    excerpt: 'Calculate the ideal emergency fund size for your situation and learn the best places to keep your emergency savings.',
    category: 'Savings',
    readTime: '6 min read',
    date: 'November 10, 2025',
    image: '🛡️',
  },
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'UtilityHub Calculators Blog',
            description: 'Financial planning tips, guides, and calculator tutorials',
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Financial Planning Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Expert tips, guides, and tutorials to help you make smarter financial decisions
            </p>
          </div>

          {/* Featured Post */}
          <Card className="mb-12 p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-6xl">{blogPosts[0].image}</span>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                </div>
                <Link href={`/blog/${blogPosts[0].slug}`}>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                </Link>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Link href={`/blog/${blogPosts[0].slug}`}>
                  <button className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.slug} className="p-6 hover:shadow-xl transition-all group">
                <div className="text-5xl mb-4">{post.image}</div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-3 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <button className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <Card className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Get Financial Tips in Your Inbox
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Subscribe to our newsletter for weekly financial planning tips, calculator guides, and exclusive content.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
