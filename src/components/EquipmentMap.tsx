import { MapPin, Truck, Clock, Navigation, Package, Users } from 'lucide-react';
import { enhancedTrucks } from '@/lib/enhanced-demo-data';

export default function EquipmentMap() {
  const activeVehicles = enhancedTrucks.filter(truck => truck.status === 'active');
  
  // Sample customers and warehouses in the Midwest
  const customers = [
    { id: 1, name: 'Amazon Fulfillment Center', type: 'Warehouse', city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298, orders: 15 },
    { id: 2, name: 'Walmart Distribution', type: 'Retail', city: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786, orders: 8 },
    { id: 3, name: 'Target Regional Hub', type: 'Retail', city: 'Minneapolis', state: 'MN', lat: 44.9537, lng: -93.0900, orders: 12 },
    { id: 4, name: 'Home Depot Supply', type: 'Hardware', city: 'Milwaukee', state: 'WI', lat: 43.0389, lng: -87.9065, orders: 6 },
    { id: 5, name: 'FedEx Ground Hub', type: 'Logistics', city: 'Indianapolis', state: 'IN', lat: 39.7684, lng: -86.1581, orders: 20 },
    { id: 6, name: 'Menards Distribution', type: 'Hardware', city: 'Eau Claire', state: 'WI', lat: 44.8113, lng: -91.4985, orders: 4 }
  ];

  // Active trucks for map display (showing first 15 for better visualization)
  const mapTrucks = enhancedTrucks.slice(0, 15).map(truck => ({
    ...truck,
    isMoving: truck.status === 'active' && Math.random() > 0.3
  }));
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Equipment Tracking Map</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <Truck className="h-6 w-6 text-green-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Active Vehicles</h3>
                <p className="text-xl font-bold text-green-900">{activeVehicles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Navigation className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">En Route</h3>
                <p className="text-xl font-bold text-blue-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-purple-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-purple-800">Idle</h3>
                <p className="text-xl font-bold text-purple-900">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Interactive Fleet Map - Midwest Operations</h2>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 relative overflow-hidden border-2 border-gray-200">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50"></div>
            
            {/* State Outlines (Simplified Midwest) */}
            <div className="absolute inset-0">
              <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
                {/* Illinois */}
                <path d="M180 100 L200 100 L205 150 L185 160 L180 140 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
                {/* Missouri */}
                <path d="M120 140 L180 140 L185 160 L175 180 L125 175 L115 155 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
                {/* Iowa */}
                <path d="M120 80 L180 85 L180 140 L120 140 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
                {/* Wisconsin */}
                <path d="M180 60 L220 65 L225 100 L200 100 L180 85 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
                {/* Indiana */}
                <path d="M200 100 L240 105 L245 150 L205 150 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
                {/* Minnesota */}
                <path d="M120 40 L180 45 L180 85 L120 80 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1"/>
              </svg>
            </div>

            {/* Trucks */}
            {mapTrucks.map((truck, index) => (
              <div
                key={truck.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                  truck.isMoving ? 'animate-pulse' : ''
                }`}
                style={{
                  left: `${20 + (index % 8) * 45}%`,
                  top: `${25 + Math.floor(index / 8) * 35}%`
                }}
              >
                <div className="relative group">
                  <div className={`p-2 rounded-full shadow-lg ${
                    truck.status === 'active' ? 'bg-green-500' :
                    truck.status === 'loading' ? 'bg-blue-500' :
                    truck.status === 'maintenance' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}>
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Truck Info Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-medium">{truck.plateNumber}</div>
                      <div>{truck.driver.name}</div>
                      <div className="text-gray-300">{truck.location.city}, {truck.location.state}</div>
                      <div className="text-green-300">{truck.speed} mph</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Customers */}
            {customers.map((customer, index) => (
              <div
                key={customer.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${25 + (index % 3) * 50}%`,
                  top: `${20 + Math.floor(index / 3) * 40}%`
                }}
              >
                <div className="relative group">
                  <div className="p-2 bg-red-500 rounded-full shadow-lg">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Customer Info Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-gray-300">{customer.city}, {customer.state}</div>
                      <div className="text-blue-300">{customer.orders} active orders</div>
                      <div className="text-yellow-300">{customer.type}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Legend */}
            <div className="absolute bottom-4 left-4 bg-white shadow-xl rounded-xl p-5 border-2 border-gray-200 backdrop-blur-sm">
              <h4 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Map Legend</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full shadow-md border-2 border-green-600"></div>
                  <span className="text-sm font-semibold text-gray-800">Active Trucks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full shadow-md border-2 border-blue-600"></div>
                  <span className="text-sm font-semibold text-gray-800">Loading Status</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full shadow-md border-2 border-yellow-600"></div>
                  <span className="text-sm font-semibold text-gray-800">Maintenance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full shadow-md border-2 border-red-600"></div>
                  <span className="text-sm font-semibold text-gray-800">Customer Hubs</span>
                </div>
              </div>
            </div>

            {/* Real-time Indicator */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>🗺️ Real-time fleet tracking across the Midwest region. Hover over icons for details.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Locations & Customer Hubs</h2>
          
          {/* Customer Locations */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-red-500" />
              Major Customer Locations
            </h3>
            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
              {customers.map((customer) => (
                <div key={customer.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{customer.name}</h4>
                      <p className="text-xs text-gray-600">{customer.type}</p>
                      <p className="text-xs text-gray-500">{customer.city}, {customer.state}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-red-600">{customer.orders}</div>
                      <div className="text-xs text-gray-500">Active Orders</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Locations */}
          <div>
            <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-500" />
              Active Fleet Locations
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mapTrucks.map((truck) => (
              <div key={truck.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      truck.status === 'active' ? 'bg-green-100' :
                      truck.status === 'maintenance' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <Truck className={`h-4 w-4 ${
                        truck.status === 'active' ? 'text-green-600' :
                        truck.status === 'maintenance' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{truck.plateNumber}</h3>
                      <p className="text-sm text-gray-600">{truck.model}</p>
                      <p className="text-sm text-gray-500">Driver: {truck.driver.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      truck.status === 'active' ? 'bg-green-100 text-green-800' :
                      truck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {truck.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{truck.location.city}</span>
                </div>
                
                <div className="mt-2 text-xs text-gray-400">
                  Coordinates: {truck.location.lat.toFixed(4)}, {truck.location.lng.toFixed(4)}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Real-time Vehicle Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mileage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mapTrucks.map((truck) => (
                <tr key={truck.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {truck.plateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truck.driver.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truck.location.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      truck.status === 'active' ? 'bg-green-100 text-green-800' :
                      truck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truck.mileage.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 min ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}