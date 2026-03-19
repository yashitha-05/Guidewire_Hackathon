'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react'

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'What is GigShield?',
          answer: 'GigShield is a parametric insurance platform designed specifically for gig delivery workers. It protects your income from weather-related disruptions using AI-powered monitoring and automatic payouts.'
        },
        {
          question: 'How does parametric insurance work?',
          answer: 'Unlike traditional insurance that requires claims processing, parametric insurance pays out automatically when predefined weather conditions are met. No paperwork, no waiting periods, no deductibles.'
        },
        {
          question: 'Which cities are covered?',
          answer: 'Currently, we cover 8 major metropolitan areas: Delhi, Mumbai, Bangalore, Chennai, Pune, Hyderabad, Kolkata, and Ahmedabad. We\'re expanding to more cities soon.'
        },
        {
          question: 'How do I sign up?',
          answer: 'Click "Get Protected" on our homepage, fill out your delivery details, and choose your coverage plan. You\'ll be protected within minutes of registration.'
        }
      ]
    },
    {
      category: 'Coverage & Claims',
      questions: [
        {
          question: 'What weather conditions are covered?',
          answer: 'We cover heavy rainfall (50mm+ in 24 hours), extreme heat (45°C+ for 3+ hours), high winds (50km/h+), and severe air pollution (AQI 300+).'
        },
        {
          question: 'How quickly do I get paid?',
          answer: 'Payouts are processed automatically within minutes of trigger conditions being met. Funds are typically available in your account within 1-2 hours.'
        },
        {
          question: 'Can I get coverage for multiple cities?',
          answer: 'Yes, our Premium plan includes multi-city coverage. You can select additional cities through your dashboard.'
        },
        {
          question: 'What happens if conditions improve quickly?',
          answer: 'Once a trigger condition is met and payout is initiated, it cannot be reversed. This ensures you receive protection when you need it most.'
        }
      ]
    },
    {
      category: 'Billing & Payments',
      questions: [
        {
          question: 'How much does coverage cost?',
          answer: 'Plans start at ₹99/week for ₹500 coverage, ₹149/week for ₹1,000 coverage, and ₹199/week for ₹2,000 coverage. Premium plans include additional features.'
        },
        {
          question: 'When am I charged?',
          answer: 'Premiums are charged weekly in advance. You can cancel or modify your plan at any time through your dashboard.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'If you cancel within 7 days of signup, you\'ll receive a full refund. After that, refunds are prorated based on unused coverage days.'
        }
      ]
    },
    {
      category: 'Technical & Support',
      questions: [
        {
          question: 'How accurate is the weather monitoring?',
          answer: 'We use data from multiple reliable sources including government weather stations, satellite imagery, and IoT sensors. Our AI validates all data for accuracy.'
        },
        {
          question: 'Can I monitor weather conditions myself?',
          answer: 'Yes, all users have access to real-time weather monitoring through their dashboard. Premium users get additional analytics and alerts.'
        },
        {
          question: 'What if I have technical issues?',
          answer: 'Our 24/7 support team is available via phone, email, or live chat. Most issues are resolved within minutes.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, we use bank-level encryption and comply with all data protection regulations. Your personal information is never shared with third parties.'
        }
      ]
    }
  ]

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find quick answers to common questions about GigShield's parametric insurance for gig delivery workers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold">{category.category}</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  const isExpanded = expandedItems.has(globalIndex)

                  return (
                    <div key={faqIndex} className="px-6 py-4">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-primary-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Support
            </Link>
            <Link href="/help-center" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Browse Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}