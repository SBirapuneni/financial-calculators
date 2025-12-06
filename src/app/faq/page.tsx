import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Answers to common questions about our financial calculators, privacy, and how to use our tools",
};

export default function FAQ() {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "Are these calculators really free?",
          answer: "Yes! All our calculators are 100% free to use with no hidden fees, subscriptions, or signup required. We're supported by ads to keep the service free for everyone."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account is needed. You can use all calculators anonymously. Your calculations are stored only in your browser's local storage for your convenience."
        },
        {
          question: "Is my data private and secure?",
          answer: "Absolutely. Your calculator inputs are never sent to our servers - they're stored only in your browser. We don't collect or store your financial information. Check our Privacy Policy for details."
        },
        {
          question: "Can I use these calculators on my phone?",
          answer: "Yes! Our calculators are fully responsive and work great on phones, tablets, and desktops. You can even install our PWA for offline access."
        }
      ]
    },
    {
      category: "Calculator Accuracy",
      questions: [
        {
          question: "How accurate are these calculators?",
          answer: "Our calculators use industry-standard formulas and are regularly updated. However, they provide estimates only. Always verify results with a financial professional before making major decisions."
        },
        {
          question: "Why don't tax calculations include state taxes?",
          answer: "Our tax calculator focuses on federal taxes because state tax laws vary significantly. We recommend checking your state's tax authority website for state-specific calculations."
        },
        {
          question: "Do investment calculators guarantee returns?",
          answer: "No. Investment calculators show hypothetical projections based on assumed rates of return. Actual investment returns vary and are never guaranteed. Past performance doesn't indicate future results."
        },
        {
          question: "Are mortgage calculations exact?",
          answer: "Mortgage calculations are estimates. Actual payments may vary based on your lender's specific terms, fees, and interest rates. Always get quotes from multiple lenders."
        }
      ]
    },
    {
      category: "Using the Calculators",
      questions: [
        {
          question: "How do I save my calculations?",
          answer: "Your calculations are automatically saved in your browser. You can also use the Export button to download results as JSON, or use the Share button to share via social media or copy a link."
        },
        {
          question: "Can I print my results?",
          answer: "Yes! Use your browser's print function (Ctrl+P or Cmd+P) to print calculator results. The page will automatically format for printing."
        },
        {
          question: "What if I clear my browser data?",
          answer: "Clearing browser data will remove your saved calculations. We recommend exporting important calculations before clearing your browser cache."
        },
        {
          question: "Do calculators work offline?",
          answer: "Yes, if you've installed our PWA (Progressive Web App). Once cached, calculators will work without an internet connection."
        }
      ]
    },
    {
      category: "Financial Advice",
      questions: [
        {
          question: "Can I rely on these calculators for financial decisions?",
          answer: "Our calculators are educational tools to help you understand financial concepts. They should NOT be your only resource for major financial decisions. Always consult with qualified financial advisors."
        },
        {
          question: "Do you provide financial advice?",
          answer: "No. We provide calculators and educational content only. We are not financial advisors, and our content does not constitute financial, investment, or tax advice."
        },
        {
          question: "Should I hire a financial advisor?",
          answer: "For complex financial planning (retirement, large investments, tax strategies), we strongly recommend working with a certified financial planner (CFP) or qualified advisor."
        },
        {
          question: "What's the difference between a financial calculator and professional advice?",
          answer: "Calculators use general formulas and assumptions. Professional advisors consider your unique situation, goals, risk tolerance, and can provide personalized strategies."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          question: "Why isn't the calculator loading?",
          answer: "Try refreshing the page or clearing your browser cache. If issues persist, try a different browser or device. Contact us if problems continue."
        },
        {
          question: "Why are my results not showing?",
          answer: "Ensure all required fields are filled with valid numbers. Check for error messages below input fields. Some browsers may block JavaScript - ensure it's enabled."
        },
        {
          question: "Can I use ad blockers?",
          answer: "Ad blockers may interfere with some functionality. While we understand their use, ads help keep our service free. Consider whitelisting our site."
        },
        {
          question: "Which browsers are supported?",
          answer: "We support all modern browsers: Chrome, Firefox, Safari, and Edge. For best experience, use the latest version of your browser."
        }
      ]
    },
    {
      category: "Features & Updates",
      questions: [
        {
          question: "Can you add [specific feature]?",
          answer: "We're always improving! Send us feature requests through our contact form. We prioritize features based on user demand and feasibility."
        },
        {
          question: "How often are calculators updated?",
          answer: "We update calculators annually (especially tax calculators) and whenever there are significant changes to formulas, laws, or interest rates."
        },
        {
          question: "Will you add more calculators?",
          answer: "Yes! We're continuously adding new calculators based on user requests. Subscribe to our newsletter for updates on new features."
        },
        {
          question: "Can I embed your calculators on my website?",
          answer: "Currently, we don't offer embeddable widgets. Contact us if you're interested in a licensing arrangement for commercial use."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about our financial calculators
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => (
                  <details
                    key={qIdx}
                    className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    
                    <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Card className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Can't find the answer you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-center"
            >
              Read Our Blog
            </Link>
          </div>
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
