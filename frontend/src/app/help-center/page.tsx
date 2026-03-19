'use client'

import Link from 'next/link'
import { Shield, ArrowLeft, Search, MessageCircle, FileText, CreditCard, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react'

export default function HelpCenter() {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: CheckCircle,
      articles: [
        'How to create your GigShield account',
        'Understanding parametric insurance',
        'Setting up your coverage preferences',
        'Linking your delivery platform account'
      ]
    },
    {
      title: 'Coverage & Claims',
      icon: Shield,
      articles: [
        'How coverage triggers work',
        'What weather conditions are covered',
        'Understanding payout amounts',
        'Claim processing timeline'
      ]
    },
    {
      title: 'Billing & Payments',
      icon: CreditCard,
      articles: [
        'Premium payment options',
        'Understanding your billing cycle',
        'Modifying your coverage plan',
        'Refund policy and procedures'
      ]
    },
    {
      title: 'Technical Support',
      icon: AlertTriangle,
      articles: [
        'App troubleshooting guide',
        'Weather data accuracy',
        'Account security best practices',
        'System maintenance notifications'
      ]
    }
  ]

  const faqs = [
    {
      question: 'How quickly do I receive payouts?',
      answer: 'Payouts are processed automatically within minutes of a trigger condition being met. Funds are typically available in your account within 1-2 hours.'
    },
    {
      question: 'Can I change my coverage amount?',
      answer: 'Yes, you can modify your coverage amount at any time through your dashboard. Changes take effect immediately for future weather events.'
    },
    {
      question: 'What happens if I miss a premium payment?',
      answer: 'Your coverage remains active for 7 days after a missed payment. After that period, coverage is temporarily suspended until payment is received.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. You only pay your weekly premium. All processing, monitoring, and payout costs are included in your premium.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">GigShield</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to your questions and get the support you need to make the most of your GigShield coverage.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>

                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link href="/faq" className="text-primary-600 hover:text-primary-800 hover:underline">
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-primary-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl mb-8">
            Our support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Support
            </Link>
            <Link href="/faq" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              View All FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}