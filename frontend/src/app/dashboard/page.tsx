'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, TrendingUp, Clock, CheckCircle, AlertTriangle, DollarSign, Calendar, MapPin, ArrowLeft } from 'lucide-react'

interface User {
  id: number
  name: string
  phone: string
  email?: string
  platform: string
  city: string
  coverageStatus: string
  weeklyPremium: number
  coverageAmount: number
  riskScore: number
}

interface Claim {
  id: string
  userId: number
  date: string
  trigger: string
  amount: number
  status: string
  location: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState<User | null>(null)
  const [claimsHistory, setClaimsHistory] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data and claims
    const fetchData = async () => {
      try {
        const [userResponse, claimsResponse] = await Promise.all([
          fetch('http://localhost:3001/api/users/1'),
          fetch('http://localhost:3001/api/users/1/claims')
        ])

        if (userResponse.ok) {
          const user = await userResponse.json()
          setUserData(user)
        }

        if (claimsResponse.ok) {
          const claims = await claimsResponse.json()
          setClaimsHistory(claims)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load dashboard data</p>
          <Link href="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Coverage Status Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Coverage Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  userData.coverageStatus === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {userData.coverageStatus === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Weekly Premium</p>
                  <p className="text-2xl font-bold text-gray-900">₹{userData.weeklyPremium}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coverage Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{userData.coverageAmount}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Renewal</span>
                  <span className="text-sm font-medium text-gray-900">{userData.nextRenewal}</span>
                </div>
              </div>
            </div>

            {/* Risk Score */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Current Risk Score</span>
                <span className="text-lg font-bold text-gray-900">{userData.riskScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-red-500 h-3 rounded-full"
                  style={{ width: `${userData.riskScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Moderate risk - Premium adjusted based on Delhi weather patterns
              </p>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-primary text-sm py-2">Renew Coverage</button>
                <Link href="/monitoring" className="btn-secondary text-sm py-2 text-center">View Monitoring</Link>
                <button className="btn-secondary text-sm py-2">Update Location</button>
                <button className="btn-secondary text-sm py-2">Contact Support</button>
              </div>
            </div>
          </div>
        )

      case 'claims':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Claims History</h3>
              <span className="text-sm text-gray-600">Total Payouts: ₹1,250</span>
            </div>

            <div className="space-y-4">
              {claimsHistory.map((claim) => (
                <div key={claim.id} className="card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium text-gray-900">Claim {claim.id}</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">₹{claim.amount}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Trigger</p>
                      <p className="font-medium">{claim.trigger}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium">{claim.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{claim.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Paid
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center py-8">
              <p className="text-gray-600">No recent claims</p>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <TrendingUp className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Deliveries This Week</p>
              </div>

              <div className="card text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">₹2,400</p>
                <p className="text-sm text-gray-600">Earnings This Week</p>
              </div>
            </div>

            <div className="card">
              <h4 className="font-medium text-gray-900 mb-3">Risk Trends</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Weather Risk</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm font-medium">High</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pollution Risk</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium">Very High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {userData.name}</span>
              <button className="text-gray-600 hover:text-gray-900">
                <AlertTriangle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="font-semibold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-600">{userData.platform} • {userData.city}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('claims')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'claims'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Claims History
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'analytics'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}