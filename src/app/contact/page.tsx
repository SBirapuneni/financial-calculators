"use client";

import { useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl">
              <Mail className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, suggestion, or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    For general inquiries and support:
                  </p>
                  <a 
                    href="mailto:support@utltyhub.com" 
                    className="text-blue-600 hover:underline"
                  >
                    support@utltyhub.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Feedback & Suggestions</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Help us improve:
                  </p>
                  <a 
                    href="mailto:feedback@utltyhub.com" 
                    className="text-blue-600 hover:underline"
                  >
                    feedback@utltyhub.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Card>
        </div>

        {/* FAQ Link */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Looking for Answers?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Check out our FAQ page for quick answers to common questions about our calculators and services.
            </p>
            <a
              href="/faq"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Visit FAQ
            </a>
          </Card>
        </div>
      </main>
    </div>
  );
}
