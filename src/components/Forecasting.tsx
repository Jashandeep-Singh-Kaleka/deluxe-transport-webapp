import { TrendingUp, BarChart3, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const forecastData = [
  { month: 'Feb', predicted: 190000, actual: 185000 },
  { month: 'Mar', predicted: 195000, actual: null },
  { month: 'Apr', predicted: 205000, actual: null },
  { month: 'May', predicted: 210000, actual: null },
  { month: 'Jun', predicted: 215000, actual: null },
];

const maintenanceForecast = [
  { month: 'Feb', predicted: 14000, scheduled: 12000 },
  { month: 'Mar', predicted: 16000, scheduled: 15000 },
  { month: 'Apr', predicted: 13000, scheduled: 11000 },
  { month: 'May', predicted: 18000, scheduled: 17000 },
  { month: 'Jun', predicted: 15000, scheduled: 14000 },
];

const insights = [
  {
    title: 'Revenue Growth Trend',
    description: 'Projected 12% revenue increase over next quarter based on current booking patterns.',
    type: 'positive',
    impact: 'High'
  },
  {
    title: 'Fuel Cost Optimization',
    description: 'Route optimization could reduce fuel costs by 8-10% based on historical data.',
    type: 'neutral',
    impact: 'Medium'
  },
  {
    title: 'Maintenance Schedule Alert',
    description: 'Peak maintenance period approaching in May. Consider scheduling preventive maintenance.',
    type: 'warning',
    impact: 'High'
  },
  {
    title: 'Driver Utilization',
    description: 'Current driver capacity at 85%. Consider hiring 2-3 additional drivers for Q2.',
    type: 'neutral',
    impact: 'Medium'
  }
];

export default function Forecasting() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Forecasting & Insights</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Revenue Forecast</h3>
                <p className="text-xl font-bold text-blue-900">+12%</p>
                <p className="text-xs text-blue-600">Next Quarter</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-green-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Efficiency Gain</h3>
                <p className="text-xl font-bold text-green-900">8%</p>
                <p className="text-xs text-green-600">Potential Savings</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Risk Alerts</h3>
                <p className="text-xl font-bold text-yellow-900">2</p>
                <p className="text-xs text-yellow-600">Require Attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3B82F6" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicted"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Cost Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
              <Bar dataKey="predicted" fill="#EF4444" name="Predicted" />
              <Bar dataKey="scheduled" fill="#F59E0B" name="Scheduled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'positive' ? 'bg-green-100' :
                  insight.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {insight.type === 'positive' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : insight.type === 'warning' ? (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{insight.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                      insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {insight.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Predictive Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-50 rounded-lg p-6 mb-3">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Demand Prediction</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">+15%</p>
              <p className="text-sm text-gray-500">Expected increase in Q2</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-green-50 rounded-lg p-6 mb-3">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Route Optimization</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">-8%</p>
              <p className="text-sm text-gray-500">Potential fuel savings</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-50 rounded-lg p-6 mb-3">
              <AlertCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Maintenance Prediction</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">3</p>
              <p className="text-sm text-gray-500">Vehicles due for service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}