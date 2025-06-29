'use client';

import { useState } from 'react';
import { MapPin, Calculator, Truck, Clock, DollarSign } from 'lucide-react';

interface QuoteData {
  origin: string;
  destination: string;
  distance: number;
  estimatedTime: string;
  baseRate: number;
  fuelSurcharge: number;
  total: number;
}

export default function QuoteEstimator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [truckType, setTruckType] = useState('dry-van');
  const [priority, setPriority] = useState('standard');
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Sample city data with coordinates for distance calculation
  const cities = [
    { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
    { name: 'Kansas City, MO', lat: 39.0997, lng: -94.5786 },
    { name: 'Minneapolis, MN', lat: 44.9537, lng: -93.0900 },
    { name: 'Milwaukee, WI', lat: 43.0389, lng: -87.9065 },
    { name: 'Indianapolis, IN', lat: 39.7684, lng: -86.1581 },
    { name: 'St. Louis, MO', lat: 38.6270, lng: -90.1994 },
    { name: 'Des Moines, IA', lat: 41.5868, lng: -93.6250 },
    { name: 'Detroit, MI', lat: 42.3314, lng: -83.0458 },
    { name: 'Cleveland, OH', lat: 41.4993, lng: -81.6944 },
    { name: 'Louisville, KY', lat: 38.2527, lng: -85.7585 }
  ];

  const calculateDistance = (city1: string, city2: string) => {
    const c1 = cities.find(c => c.name === city1);
    const c2 = cities.find(c => c.name === city2);
    
    if (!c1 || !c2) return Math.floor(Math.random() * 800) + 200; // Random fallback
    
    const R = 3959; // Earth's radius in miles
    const dLat = (c2.lat - c1.lat) * Math.PI / 180;
    const dLng = (c2.lng - c1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const calculateQuote = async () => {
    if (!origin || !destination || !weight) return;
    
    setIsCalculating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const distance = calculateDistance(origin, destination);
    const weightNum = parseInt(weight);
    
    // Base rate calculation (industry standard: $2.50-$4.50 per mile)
    let baseRatePerMile = 3.20;
    
    // Adjustments based on truck type
    const truckMultipliers = {
      'dry-van': 1.0,
      'refrigerated': 1.25,
      'flatbed': 1.15
    };
    
    // Priority adjustments
    const priorityMultipliers = {
      'standard': 1.0,
      'expedited': 1.35,
      'urgent': 1.75
    };
    
    // Weight adjustments (higher rates for heavier loads)
    const weightMultiplier = weightNum > 30000 ? 1.15 : weightNum > 20000 ? 1.1 : 1.0;
    
    baseRatePerMile *= truckMultipliers[truckType as keyof typeof truckMultipliers];
    baseRatePerMile *= priorityMultipliers[priority as keyof typeof priorityMultipliers];
    baseRatePerMile *= weightMultiplier;
    
    const baseRate = Math.round(distance * baseRatePerMile);
    const fuelSurcharge = Math.round(baseRate * 0.18); // 18% fuel surcharge
    const total = baseRate + fuelSurcharge;
    
    // Estimated delivery time
    const hoursPerDay = priority === 'urgent' ? 20 : priority === 'expedited' ? 14 : 11;
    const avgSpeed = 55;
    const totalHours = Math.ceil(distance / avgSpeed);
    const days = Math.ceil(totalHours / hoursPerDay);
    
    const estimatedTime = days === 1 ? 'Same day' : `${days} business days`;
    
    setQuote({
      origin,
      destination,
      distance,
      estimatedTime,
      baseRate,
      fuelSurcharge,
      total
    });
    
    setIsCalculating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Instant Quote Calculator</h2>
        </div>
        <p className="text-red-100">Get an accurate shipping quote in seconds</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Origin */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Origin City
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 font-medium shadow-sm"
            >
              <option value="">Select origin city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Destination City
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 font-medium shadow-sm"
            >
              <option value="">Select destination city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Weight (lbs)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter cargo weight"
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 font-medium shadow-sm"
              min="1"
              max="80000"
            />
          </div>

          {/* Truck Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Truck className="inline h-4 w-4 mr-1" />
              Truck Type
            </label>
            <select
              value={truckType}
              onChange={(e) => setTruckType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 font-medium shadow-sm"
            >
              <option value="dry-van">Dry Van</option>
              <option value="refrigerated">Refrigerated</option>
              <option value="flatbed">Flatbed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Service Priority
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'standard', label: 'Standard', desc: 'Regular delivery', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700' },
                { value: 'expedited', label: 'Expedited', desc: '+35% premium', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500', textColor: 'text-yellow-700' },
                { value: 'urgent', label: 'Urgent', desc: '+75% premium', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriority(option.value)}
                  className={`p-5 border-2 rounded-xl text-center transition-all duration-200 shadow-sm hover:shadow-md ${
                    priority === option.value
                      ? `${option.borderColor} ${option.bgColor} ${option.textColor} transform scale-105 shadow-lg`
                      : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{option.label}</div>
                  <div className={`text-sm font-medium ${priority === option.value ? option.textColor : 'text-gray-600'}`}>{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={calculateQuote}
          disabled={!origin || !destination || !weight || isCalculating}
          className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Calculating Quote...
            </>
          ) : (
            <>
              <Calculator className="h-5 w-5" />
              Calculate Quote
            </>
          )}
        </button>

        {/* Quote Results */}
        {quote && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              Your Quote
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{quote.origin} → {quote.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{quote.distance} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium">{quote.estimatedTime}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Rate:</span>
                  <span className="font-medium">${quote.baseRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Surcharge:</span>
                  <span className="font-medium">${quote.fuelSurcharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-green-600">${quote.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Book This Shipment
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Request Detailed Quote
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              Quote valid for 24 hours • Final pricing may vary based on actual requirements
            </div>
          </div>
        )}
      </div>
    </div>
  );
}