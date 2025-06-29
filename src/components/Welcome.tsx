import { Truck, Users, MapPin, TrendingUp } from 'lucide-react';
import { enhancedMetrics, enhancedTrucks, companyInfo } from '@/lib/enhanced-demo-data';
import Image from 'next/image';

export default function Welcome() {
  const activeVehicles = enhancedTrucks.filter(truck => truck.status === 'active').length;
  const maintenanceVehicles = enhancedTrucks.filter(truck => truck.status === 'maintenance').length;
  const monthlyMetrics = enhancedMetrics.monthly;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/Deluxe_logo.png"
            alt="Deluxe Transport Logo"
            width={64}
            height={64}
            className="h-16 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to {companyInfo.name}</h1>
            <p className="text-gray-600 text-lg">{companyInfo.tagline}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">
            💼 Fleet Management Dashboard - Real-time operations monitoring for {companyInfo.fleetSize} trucks across {companyInfo.serviceArea}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
          <div className="flex items-center">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-md">
              <Truck className="h-10 w-10 text-blue-700" />
            </div>
            <div className="ml-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Total Fleet</h3>
              <p className="text-4xl font-black text-gray-900 mt-1">{companyInfo.fleetSize}</p>
              <p className="text-sm font-medium text-blue-700 mt-1">Active Vehicles</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300">
          <div className="flex items-center">
            <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-md">
              <MapPin className="h-10 w-10 text-green-700" />
            </div>
            <div className="ml-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">On Road</h3>
              <p className="text-4xl font-black text-gray-900 mt-1">{activeVehicles}</p>
              <p className="text-sm font-medium text-green-700 mt-1">Currently Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-200 hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
          <div className="flex items-center">
            <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl shadow-md">
              <Users className="h-10 w-10 text-yellow-700" />
            </div>
            <div className="ml-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Maintenance</h3>
              <p className="text-4xl font-black text-gray-900 mt-1">{maintenanceVehicles}</p>
              <p className="text-sm font-medium text-yellow-700 mt-1">Under Service</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
          <div className="flex items-center">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md">
              <TrendingUp className="h-10 w-10 text-purple-700" />
            </div>
            <div className="ml-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Monthly Revenue</h3>
              <p className="text-4xl font-black text-gray-900 mt-1">${monthlyMetrics.totalRevenue.toLocaleString()}</p>
              <p className="text-sm font-medium text-purple-700 mt-1">This Month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Overview</h2>
          <div className="space-y-3 text-gray-600">
            <p><strong>Founded:</strong> 1995</p>
            <p><strong>Headquarters:</strong> Texas, United States</p>
            <p><strong>Fleet Size:</strong> 100 Trucks</p>
            <p><strong>Service Area:</strong> Continental United States</p>
            <p><strong>Specialization:</strong> Long-haul freight transportation</p>
            <p><strong>DOT Number:</strong> 123456</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            Monthly Performance Metrics
          </h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <span className="text-gray-800 font-semibold text-lg">Total Miles This Month:</span>
              <span className="font-black text-2xl text-blue-800">{monthlyMetrics.totalMiles.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <span className="text-gray-800 font-semibold text-lg">Completed Trips:</span>
              <span className="font-black text-2xl text-green-800">{monthlyMetrics.completedTrips}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <span className="text-gray-800 font-semibold text-lg">Active Trips:</span>
              <span className="font-black text-2xl text-orange-800">{monthlyMetrics.activeTrips}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <span className="text-gray-800 font-semibold text-lg">Avg Revenue/Mile:</span>
              <span className="font-black text-2xl text-purple-800">${monthlyMetrics.averageRevenuePerMile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}