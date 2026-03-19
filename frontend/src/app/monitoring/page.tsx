'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, ArrowLeft, CloudRain, Wind, Thermometer, AlertTriangle, MapPin } from 'lucide-react'

interface Trigger {
  id: number
  type: string
  condition: string
  threshold: string
  currentValue: number
  activated: boolean
  location: string
  timestamp: string
}

export default function Monitoring() {
  const [activeTriggers, setActiveTriggers] = useState<Trigger[]>([])
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    rainfall: 0,
    aqi: 180,
    windSpeed: 12
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch active triggers
    const fetchTriggers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/triggers/active')
        if (response.ok) {
          const triggers = await response.json()
          setActiveTriggers(triggers)
        }
      } catch (error) {
        console.error('Error fetching triggers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTriggers()

    // Simulate real-time weather updates
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.7) * 5),
        aqi: prev.aqi + (Math.random() - 0.5) * 10,
        windSpeed: prev.windSpeed + (Math.random() - 0.5) * 2
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'rain':
        return <CloudRain className="h-6 w-6" />
      case 'heat':
        return <Thermometer className="h-6 w-6" />
      case 'wind':
        return <Wind className="h-6 w-6" />
      default:
        return <AlertTriangle className="h-6 w-6" />
    }
  }

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-100' }
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' }
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'text-purple-600', bg: 'bg-purple-100' }
    return { status: 'Hazardous', color: 'text-red-800', bg: 'bg-red-200' }
  }

  const aqiInfo = getAQIStatus(weatherData.aqi)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Monitoring disruptions...</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Disruption Monitoring</h1>
          <p className="text-lg text-gray-600">Real-time monitoring of weather and environmental conditions</p>
        </div>

        {/* Weather Dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.temperature.toFixed(1)}°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-red-500" />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500">Threshold: >42°C</div>
              <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                weatherData.temperature > 42 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {weatherData.temperature > 42 ? 'Trigger Active' : 'Normal'}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rainfall</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.rainfall.toFixed(1)}mm</p>
              </div>
              <CloudRain className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500">Threshold: >40mm</div>
              <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                weatherData.rainfall > 40 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {weatherData.rainfall > 40 ? 'Trigger Active' : 'Normal'}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Air Quality</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(weatherData.aqi)}</p>
              </div>
              <AlertTriangle className={`h-8 w-8 ${aqiInfo.color.replace('text-', '')}`} />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500">Threshold: >350</div>
              <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${aqiInfo.bg} ${aqiInfo.color}`}>
                {weatherData.aqi > 350 ? 'Trigger Active' : aqiInfo.status}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed.toFixed(1)} km/h</p>
              </div>
              <Wind className="h-8 w-8 text-gray-500" />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500">Threshold: >50 km/h</div>
              <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                weatherData.windSpeed > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {weatherData.windSpeed > 50 ? 'Trigger Active' : 'Normal'}
              </div>
            </div>
          </div>
        </div>

        {/* Active Triggers */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Triggers</h2>

          {activeTriggers.length > 0 ? (
            <div className="space-y-4">
              {activeTriggers.map((trigger) => (
                <div key={trigger.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{trigger.condition}</p>
                      <p className="text-sm text-gray-600">
                        Current: {trigger.currentValue} | Threshold: {trigger.threshold}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {trigger.location} • {new Date(trigger.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Payout Triggered
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">No active triggers at the moment</p>
              <p className="text-sm text-gray-500">All conditions are within normal ranges</p>
            </div>
          )}
        </div>

        {/* Parametric Triggers Reference */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Parametric Triggers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Weather Triggers</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Heavy Rainfall: &gt;40mm in 1 hour</li>
                <li>• Extreme Heat: &gt;42°C</li>
                <li>• High Winds: &gt;50 km/h</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Other Triggers</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Poor Air Quality: AQI &gt;350</li>
                <li>• Local Curfew: Government order</li>
                <li>• Platform Suspension: Service halt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}