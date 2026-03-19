'use client'

import Link from 'next/link'
import { Shield, ArrowLeft, CheckCircle, Star, Zap } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: 99,
      period: 'week',
      coverage: 500,
      features: [
        '₹500 coverage per disruption',
        'Weather monitoring',
        'Basic claim processing',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: 149,
      period: 'week',
      coverage: 1000,
      features: [
        '₹1,000 coverage per disruption',
        'Advanced weather monitoring',
        'Priority claim processing',
        '24/7 chat support',
        'Risk assessment reports'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: 199,
      period: 'week',
      coverage: 2000,
      features: [
        '₹2,000 coverage per disruption',
        'Real-time weather alerts',
        'Instant claim processing',
        'Dedicated support manager',
        'Advanced analytics',
        'Multi-city coverage'
      ],
      popular: false
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
            Choose Your Protection Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the coverage that fits your delivery needs. All plans include AI-powered weather monitoring and automatic claims processing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary-600 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-600 text-white text-center py-2">
                  <span className="text-sm font-medium flex items-center justify-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary-600">₹{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Coverage Amount:</p>
                  <p className="text-lg font-semibold text-gray-900">₹{plan.coverage} per disruption</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`w-full btn-primary text-center block ${
                    plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose GigShield?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Payouts</h3>
              <p className="text-gray-600">
                Get paid within minutes when weather conditions trigger your coverage, not days or weeks.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Protection</h3>
              <p className="text-gray-600">
                Advanced algorithms monitor weather patterns and automatically process claims when thresholds are met.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Deductibles</h3>
              <p className="text-gray-600">
                Unlike traditional insurance, parametric coverage pays out the full amount when conditions are met.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Protect Your Income?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of gig workers who trust GigShield for their income protection.
          </p>
          <Link href="/register" className="btn-primary">
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  )
}