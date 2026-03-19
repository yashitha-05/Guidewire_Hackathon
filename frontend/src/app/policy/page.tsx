'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, ArrowLeft, CheckCircle, CreditCard } from 'lucide-react'

export default function Policy() {
  const [selectedCoverage, setSelectedCoverage] = useState(1000)
  const [riskData, setRiskData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch risk assessment for Delhi
    const fetchRiskData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/risk-assessment/delhi')
        if (response.ok) {
          const data = await response.json()
          setRiskData(data)
        }
      } catch (error) {
        console.error('Error fetching risk data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRiskData()
  }, [])

  const coverageOptions = [
    { amount: 500, premium: 80 },
    { amount: 1000, premium: 150 },
    { amount: 1500, premium: 210 },
    { amount: 2000, premium: 280 }
  ]

  const calculatePremium = (coverage: number) => {
    const baseOption = coverageOptions.find(opt => opt.amount === coverage)
    if (!baseOption) return 0

    // Adjust premium based on risk score
    const riskMultiplier = riskData ? (riskData.riskScore / 50) : 1
    return Math.round(baseOption.premium * riskMultiplier)
  }

  const handlePurchase = () => {
    alert(`Policy purchased! Coverage: ₹${selectedCoverage}, Premium: ₹${calculatePremium(selectedCoverage)}/week`)
    // In a real app, this would redirect to payment gateway
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Calculating your premium...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">GigShield</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Coverage</h1>
          <p className="text-lg text-gray-600">Select the protection amount that fits your needs</p>
        </div>

        {/* Risk Assessment Display */}
        {riskData && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Assessment for Delhi</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Risk Score</span>
                  <span className="text-lg font-bold text-gray-900">{riskData.riskScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-red-500 h-3 rounded-full"
                    style={{ width: `${riskData.riskScore}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Risk Factors</p>
                <div className="flex flex-wrap gap-2">
                  {riskData.riskFactors.map((factor: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coverage Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {coverageOptions.map((option) => (
            <div
              key={option.amount}
              className={`card cursor-pointer transition-all ${
                selectedCoverage === option.amount
                  ? 'ring-2 ring-primary-500 bg-primary-50'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedCoverage(option.amount)}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">₹{option.amount}</div>
                <p className="text-sm text-gray-600 mb-3">Coverage Amount</p>
                <div className="text-lg font-semibold text-primary-600 mb-2">
                  ₹{calculatePremium(option.amount)}/week
                </div>
                <p className="text-xs text-gray-500">Premium</p>

                {selectedCoverage === option.amount && (
                  <CheckCircle className="h-6 w-6 text-primary-600 mx-auto mt-3" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Policy Details */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Coverage Includes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Income loss from heavy rain (>40mm)</li>
                <li>• Income loss from poor air quality (AQI >350)</li>
                <li>• Income loss from extreme heat (>42°C)</li>
                <li>• Income loss from local curfews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Policy Terms:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Weekly premium payment required</li>
                <li>• Automatic payout within 15 minutes</li>
                <li>• No claim forms or documentation</li>
                <li>• Coverage valid for 7 days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <div className="text-center">
          <div className="card inline-block">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Selected Coverage</p>
              <p className="text-2xl font-bold text-gray-900">₹{selectedCoverage}</p>
              <p className="text-lg text-primary-600">₹{calculatePremium(selectedCoverage)}/week</p>
            </div>

            <button
              onClick={handlePurchase}
              className="w-full btn-primary flex items-center justify-center"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Purchase Policy
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}