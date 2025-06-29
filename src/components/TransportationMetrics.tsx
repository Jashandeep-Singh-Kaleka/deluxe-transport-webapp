import { useState, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { enhancedTrucks, enhancedTrips, enhancedMetrics } from '@/lib/enhanced-demo-data';
import FilterControls, { FilterState } from '@/components/FilterControls';
import MetricCard from '@/components/MetricCard';
import ChartContainer from '@/components/ChartContainer';
import { Truck, MapPin, TrendingUp, Fuel } from 'lucide-react';

export default function TransportationMetrics() {
  const [filters, setFilters] = useState<FilterState>({
    timeframe: 'month',
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    status: [],
    driver: [],
    route: []
  });

  const monthlyData = useMemo(() => {
    switch (filters.timeframe) {
      case 'day':
        return [
          { period: '6 AM', revenue: 1200, miles: 320, trips: 2, efficiency: 7.2 },
          { period: '12 PM', revenue: 2800, miles: 680, trips: 4, efficiency: 7.1 },
          { period: '6 PM', revenue: 4200, miles: 980, trips: 6, efficiency: 7.3 },
          { period: '12 AM', revenue: 5100, miles: 1150, trips: 8, efficiency: 7.0 }
        ];
      case 'week':
        return [
          { period: 'Mon', revenue: 28000, miles: 6800, trips: 18, efficiency: 7.1 },
          { period: 'Tue', revenue: 32000, miles: 7200, trips: 22, efficiency: 7.0 },
          { period: 'Wed', revenue: 30000, miles: 6900, trips: 20, efficiency: 7.2 },
          { period: 'Thu', revenue: 35000, miles: 7500, trips: 24, efficiency: 7.1 },
          { period: 'Fri', revenue: 33000, miles: 7100, trips: 21, efficiency: 7.3 },
          { period: 'Sat', revenue: 15000, miles: 3200, trips: 8, efficiency: 6.9 },
          { period: 'Sun', revenue: 12000, miles: 2800, trips: 6, efficiency: 7.0 }
        ];
      case 'year':
        return [
          { period: 'Q1', revenue: 525000, miles: 128000, trips: 315, efficiency: 6.9 },
          { period: 'Q2', revenue: 580000, miles: 135000, trips: 340, efficiency: 7.0 },
          { period: 'Q3', revenue: 620000, miles: 142000, trips: 365, efficiency: 7.1 },
          { period: 'Q4', revenue: 575000, miles: 138000, trips: 350, efficiency: 7.0 }
        ];
      default: // month
        return [
          { period: 'Week 1', revenue: 46000, miles: 11200, trips: 28, efficiency: 7.1 },
          { period: 'Week 2', revenue: 48000, miles: 11800, trips: 30, efficiency: 7.0 },
          { period: 'Week 3', revenue: 45000, miles: 10900, trips: 27, efficiency: 7.2 },
          { period: 'Week 4', revenue: 46000, miles: 11100, trips: 29, efficiency: 7.1 }
        ];
    }
  }, [filters.timeframe]);

  const statusData = useMemo(() => {
    const trucks = enhancedTrucks;
    return [
      { name: 'Active', value: trucks.filter(t => t.status === 'active').length, color: '#10B981' },
      { name: 'Loading', value: trucks.filter(t => t.status === 'loading').length, color: '#3B82F6' },
      { name: 'Maintenance', value: trucks.filter(t => t.status === 'maintenance').length, color: '#F59E0B' },
      { name: 'Idle', value: trucks.filter(t => t.status === 'idle').length, color: '#6B7280' },
    ];
  }, []);

  const currentMetrics = useMemo(() => {
    const timeframe = filters.timeframe as keyof typeof enhancedMetrics;
    return enhancedMetrics[timeframe] || enhancedMetrics.monthly;
  }, [filters.timeframe]);

  const availableDrivers = useMemo(() => {
    return enhancedTrucks.map(truck => truck.driver.name);
  }, []);

  const availableStatuses = useMemo(() => {
    return ['active', 'loading', 'maintenance', 'idle'];
  }, []);

  const availableRoutes = useMemo(() => {
    return enhancedTrips.map(trip => `${trip.origin.city} → ${trip.destination.city}`);
  }, []);

  const handleExportExcel = () => {
    const data = {
      metrics: currentMetrics,
      chartData: monthlyData,
      filters: filters,
      timestamp: new Date().toISOString()
    };
    
    // Simulate Excel export - in real implementation, use a library like xlsx
    const csvContent = `Transportation Metrics Report - ${filters.timeframe}\n\n` +
      `Generated: ${new Date().toLocaleDateString()}\n\n` +
      `Total Revenue,${currentMetrics.totalRevenue}\n` +
      `Total Miles,${currentMetrics.totalMiles}\n` +
      `Completed Trips,${currentMetrics.completedTrips}\n` +
      `Active Trips,${currentMetrics.activeTrips}\n` +
      `Avg Revenue/Mile,${currentMetrics.averageRevenuePerMile}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transportation-metrics-${filters.timeframe}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPowerPoint = () => {
    const data = {
      metrics: currentMetrics,
      chartData: monthlyData,
      filters: filters,
      timestamp: new Date().toISOString()
    };
    
    // Simulate PowerPoint export - in real implementation, use a library like pptxgenjs
    const presentationData = `Transportation Metrics Presentation\n\n` +
      `Report Period: ${filters.timeframe.toUpperCase()}\n` +
      `Generated: ${new Date().toLocaleDateString()}\n\n` +
      `KEY METRICS:\n` +
      `• Total Revenue: $${currentMetrics.totalRevenue.toLocaleString()}\n` +
      `• Total Miles: ${currentMetrics.totalMiles.toLocaleString()}\n` +
      `• Completed Trips: ${currentMetrics.completedTrips}\n` +
      `• Active Trips: ${currentMetrics.activeTrips}\n` +
      `• Average Revenue per Mile: $${currentMetrics.averageRevenuePerMile}\n`;
    
    const blob = new Blob([presentationData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transportation-metrics-presentation-${filters.timeframe}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transportation Metrics</h1>
        
        <FilterControls
          filters={filters}
          onFiltersChange={setFilters}
          availableDrivers={availableDrivers}
          availableStatuses={availableStatuses}
          availableRoutes={availableRoutes}
          onExportExcel={handleExportExcel}
          onExportPowerPoint={handleExportPowerPoint}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${currentMetrics.totalRevenue.toLocaleString()}`}
            subtitle={`This ${filters.timeframe}`}
            icon={<TrendingUp className="h-5 w-5" />}
            color="red"
            change={{
              value: 8.5,
              type: 'increase',
              period: 'last period'
            }}
          />
          <MetricCard
            title="Total Miles Driven"
            value={currentMetrics.totalMiles.toLocaleString()}
            subtitle={`This ${filters.timeframe}`}
            icon={<MapPin className="h-5 w-5" />}
            color="blue"
            change={{
              value: 5.2,
              type: 'increase',
              period: 'last period'
            }}
          />
          <MetricCard
            title="Completed Trips"
            value={currentMetrics.completedTrips}
            subtitle={`This ${filters.timeframe}`}
            icon={<Truck className="h-5 w-5" />}
            color="green"
            change={{
              value: 12.3,
              type: 'increase',
              period: 'last period'
            }}
          />
          <MetricCard
            title="Fuel Efficiency"
            value={`${currentMetrics.fuelEfficiency} MPG`}
            subtitle="Fleet Average"
            icon={<Fuel className="h-5 w-5" />}
            color="purple"
            change={{
              value: 2.1,
              type: 'increase',
              period: 'last period'
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Revenue & Performance Trend"
          description={`Performance metrics over ${filters.timeframe} periods showing revenue, miles, and efficiency correlation.`}
          formula="Revenue per Mile = Total Revenue ÷ Total Miles"
          insights={[
            "Revenue shows strong positive correlation with miles driven",
            "Fuel efficiency improvements of 2.1% indicate better route optimization",
            "Peak performance typically occurs mid-period due to driver scheduling"
          ]}
        >
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMiles" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" stroke="#6b7280" fontSize={12} />
              <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : 
                  name === 'miles' ? `${value.toLocaleString()} mi` :
                  name === 'trips' ? `${value} trips` :
                  `${value} MPG`,
                  name === 'revenue' ? 'Revenue' :
                  name === 'miles' ? 'Miles' :
                  name === 'trips' ? 'Trips' : 'Efficiency'
                ]}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#DC2626" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Area yAxisId="right" type="monotone" dataKey="miles" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMiles)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Fleet Status Distribution"
          description="Real-time breakdown of vehicle status across the entire 100-truck fleet."
          formula="Utilization Rate = (Active + Loading) ÷ Total Fleet × 100%"
          insights={[
            "85% of fleet actively generating revenue (industry benchmark: 80%)",
            "Only 8% in maintenance - excellent fleet health indicator",
            "High utilization rate of 89% indicates efficient operations"
          ]}
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            {statusData.map((status) => (
              <div key={status.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: status.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{status.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{status.value}</div>
                  <div className="text-xs text-gray-500">
                    {((status.value / 100) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="#ffffff"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} trucks`, 'Count']}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <ChartContainer
        title="Recent Trip Performance"
        description="Detailed breakdown of recent trips showing performance metrics and customer insights."
        insights={[
          "Average revenue per mile: $4.05 (15% above industry standard)",
          "Happy Saini consistently delivers high-value loads for premium customers",
          "Expedited shipments generate 25% higher revenue per mile"
        ]}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trip Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enhancedTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{trip.tripNumber}</div>
                    <div className="text-xs text-gray-500">
                      {trip.cargo.type} • {(trip.cargo.weight / 1000).toFixed(0)}k lbs
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-red-800">
                            {trip.driver.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{trip.driver}</div>
                        <div className="text-xs text-gray-500">CDL Class A</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trip.origin.city}, {trip.origin.state}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-medium">{trip.destination.city}, {trip.destination.state}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{trip.distance} miles</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{trip.customer.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 capitalize">{trip.customer.type}</span>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          trip.customer.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          trip.customer.priority === 'expedited' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {trip.customer.priority}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-semibold">${trip.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        ${(trip.revenue / trip.distance).toFixed(2)}/mile
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trip.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      trip.status === 'delayed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {trip.status.replace('-', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>
    </div>
  );
}