import Link from 'next/link'
import { Shield, Zap, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GigShield</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600">How it Works</a>
              <a href="#features" className="text-gray-600 hover:text-primary-600">Features</a>
              <Link href="/register" className="btn-primary">Get Protected</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Protect Your Income from
              <span className="text-primary-600"> Weather Disruptions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered parametric insurance for gig delivery workers. Get instant compensation when rain, pollution, or curfews stop your deliveries. No claims, no paperwork, just protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-lg px-8 py-3">
                Get Protected Now
              </Link>
              <Link href="/policy" className="btn-secondary text-lg px-8 py-3">
                View Coverage Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How GigShield Works</h2>
            <p className="text-lg text-gray-600">Simple, automated protection in 3 steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-600">Sign up with your delivery platform details and location</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Monitor</h3>
              <p className="text-gray-600">AI tracks weather, pollution, and disruptions in real-time</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
              <p className="text-gray-600">Instant payout to your wallet when triggers activate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GigShield?</h2>
            <p className="text-lg text-gray-600">Built specifically for gig delivery workers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <Zap className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Zero-Touch Claims</h3>
              <p className="text-gray-600">No paperwork, no waiting periods. Get paid automatically when disruptions occur.</p>
            </div>

            <div className="card">
              <TrendingUp className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Weekly Premiums</h3>
              <p className="text-gray-600">Affordable weekly payments starting from ₹100, adjusted by your location's risk.</p>
            </div>

            <div className="card">
              <Shield className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Protection</h3>
              <p className="text-gray-600">Advanced algorithms predict disruptions and calculate fair compensation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parametric Triggers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Automatic Protection Triggers</h2>
            <p className="text-lg text-gray-600">Get compensated instantly when these conditions are met</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-red-50 rounded-lg border-2 border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">>40mm</div>
              <p className="text-gray-700 font-medium">Heavy Rain</p>
              <p className="text-sm text-gray-600">Rainfall in 1 hour</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
              <div className="text-2xl font-bold text-orange-600 mb-2">>350</div>
              <p className="text-gray-700 font-medium">Air Quality</p>
              <p className="text-sm text-gray-600">AQI Index</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600 mb-2">>42°C</div>
              <p className="text-gray-700 font-medium">Extreme Heat</p>
              <p className="text-sm text-gray-600">Temperature</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">⚠️</div>
              <p className="text-gray-700 font-medium">Local Curfew</p>
              <p className="text-sm text-gray-600">Government Order</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Income?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of delivery workers who trust GigShield for their income protection.
          </p>
          <Link href="/register" className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg text-lg transition-colors">
            Start Your Protection Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-primary-400" />
                <span className="ml-2 text-lg font-bold">GigShield</span>
              </div>
              <p className="text-gray-400">
                Protecting gig workers from income loss with AI-powered parametric insurance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white">How it Works</a></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/coverage" className="hover:text-white">Coverage</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help-center" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact-us" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Partners</h3>
              <div className="flex space-x-4">
                <div className="text-gray-400">Zepto</div>
                <div className="text-gray-400">Blinkit</div>
                <div className="text-gray-400">Swiggy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 GigShield. All rights reserved. | Guidewire DEVTrails 2026 Hackathon Project</p>
          </div>
        </div>
      </footer>
    </div>
  )
}