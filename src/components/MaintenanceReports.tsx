'use client';

import { 
  Calendar, 
  Wrench, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Target,
  FileSpreadsheet,
  Presentation,
  Shield,
  BarChart3,
  Zap
} from 'lucide-react';
import { maintenanceRecords, trucks } from '@/lib/demo-data';

export default function MaintenanceReports() {

  const upcomingMaintenance = [
    { truckId: '2', plateNumber: 'DT-002', type: 'Oil Change', dueDate: '2024-02-15', mileage: 98000, priority: 'medium', estimatedCost: 150 },
    { truckId: '1', plateNumber: 'DT-001', type: 'Tire Rotation', dueDate: '2024-02-20', mileage: 125000, priority: 'low', estimatedCost: 200 },
    { truckId: '4', plateNumber: 'DT-004', type: 'DOT Inspection', dueDate: '2024-02-25', mileage: 89000, priority: 'high', estimatedCost: 350 },
    { truckId: '7', plateNumber: 'DT-007', type: 'Brake Service', dueDate: '2024-02-28', mileage: 102000, priority: 'high', estimatedCost: 800 },
    { truckId: '12', plateNumber: 'DT-012', type: 'Transmission Service', dueDate: '2024-03-05', mileage: 135000, priority: 'medium', estimatedCost: 1200 },
  ];

  const totalMaintenanceCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
  const completedRecords = maintenanceRecords.filter(record => record.status === 'completed').length;

  // Calculate executive metrics
  const averageCostPerTruck = totalMaintenanceCost / trucks.length;
  const maintenanceEfficiency = (completedRecords / maintenanceRecords.length) * 100;
  const fleetUptime = 94.2; // Simulated uptime percentage
  const complianceRate = 98.5; // DOT compliance rate
  const preventiveMaintenance = 78; // Percentage of preventive vs reactive maintenance

  // Cost analysis
  const monthlyMaintenanceCost = 28750;
  const budgetVariance = -8.3; // Over budget by 8.3%

  // Maintenance categories with costs
  const maintenanceCategories = [
    { category: 'Engine', cost: 45000, percentage: 35, trend: 'up', change: 12.5 },
    { category: 'Brakes', cost: 25000, percentage: 19, trend: 'down', change: -5.2 },
    { category: 'Tires', cost: 18000, percentage: 14, trend: 'stable', change: 1.1 },
    { category: 'Transmission', cost: 22000, percentage: 17, trend: 'up', change: 8.7 },
    { category: 'Electrical', cost: 12000, percentage: 9, trend: 'up', change: 15.3 },
    { category: 'Other', cost: 8000, percentage: 6, trend: 'stable', change: -1.8 }
  ];

  // Predictive maintenance alerts
  const predictiveAlerts = [
    { truckId: 'DT-003', issue: 'Engine temperature rising', severity: 'high', recommendation: 'Schedule cooling system inspection', estimatedCost: 450, daysUntilFailure: 7 },
    { truckId: 'DT-009', issue: 'Brake wear excessive', severity: 'high', recommendation: 'Replace brake pads immediately', estimatedCost: 350, daysUntilFailure: 3 },
    { truckId: 'DT-015', issue: 'Tire pressure inconsistent', severity: 'medium', recommendation: 'Check for slow leak', estimatedCost: 125, daysUntilFailure: 14 },
    { truckId: 'DT-023', issue: 'Oil pressure fluctuating', severity: 'medium', recommendation: 'Oil system diagnostic', estimatedCost: 200, daysUntilFailure: 10 }
  ];

  const handleExportExcel = () => {
    const csvContent = `Maintenance Report - MONTHLY\n\n` +
      `Generated: ${new Date().toLocaleDateString()}\n\n` +
      `EXECUTIVE SUMMARY:\n` +
      `Fleet Uptime,${fleetUptime}%\n` +
      `Compliance Rate,${complianceRate}%\n` +
      `Total Maintenance Cost,$${totalMaintenanceCost.toLocaleString()}\n` +
      `Average Cost per Truck,$${averageCostPerTruck.toFixed(0)}\n` +
      `Maintenance Efficiency,${maintenanceEfficiency.toFixed(1)}%\n\n` +
      `UPCOMING MAINTENANCE:\n` +
      upcomingMaintenance.map(item => `${item.plateNumber},${item.type},${item.dueDate},$${item.estimatedCost}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maintenance-report-monthly-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPowerPoint = () => {
    const presentationData = `Maintenance Executive Report\n\n` +
      `Report Period: MONTHLY\n` +
      `Generated: ${new Date().toLocaleDateString()}\n\n` +
      `KEY PERFORMANCE INDICATORS:\n` +
      `• Fleet Uptime: ${fleetUptime}%\n` +
      `• DOT Compliance: ${complianceRate}%\n` +
      `• Maintenance Efficiency: ${maintenanceEfficiency.toFixed(1)}%\n` +
      `• Total Cost: $${totalMaintenanceCost.toLocaleString()}\n\n` +
      `CRITICAL ALERTS:\n` +
      predictiveAlerts.filter(alert => alert.severity === 'high').map(alert => 
        `• ${alert.truckId}: ${alert.issue} (${alert.daysUntilFailure} days)`).join('\n');
    
    const blob = new Blob([presentationData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maintenance-executive-report-monthly-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header with Export */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Fleet Maintenance Executive Dashboard</h1>
            <p className="text-blue-100 text-lg">Comprehensive maintenance analytics and predictive insights</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExportExcel}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="h-5 w-5" />
              Export to Excel
            </button>
            <button 
              onClick={handleExportPowerPoint}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Presentation className="h-5 w-5" />
              Export to PowerPoint
            </button>
          </div>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Fleet Uptime</h3>
              <p className="text-3xl font-black text-green-600 mt-1">{fleetUptime}%</p>
              <p className="text-sm text-green-700 mt-1">Industry Target: 95%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">DOT Compliance</h3>
              <p className="text-3xl font-black text-blue-600 mt-1">{complianceRate}%</p>
              <p className="text-sm text-blue-700 mt-1">Required: 95%+</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Efficiency Rate</h3>
              <p className="text-3xl font-black text-purple-600 mt-1">{maintenanceEfficiency.toFixed(1)}%</p>
              <p className="text-sm text-purple-700 mt-1">Completed/Total</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Monthly Cost</h3>
              <p className="text-3xl font-black text-orange-600 mt-1">${monthlyMaintenanceCost.toLocaleString()}</p>
              <p className={`text-sm mt-1 ${budgetVariance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {budgetVariance > 0 ? '+' : ''}{budgetVariance}% vs Budget
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Preventive %</h3>
              <p className="text-3xl font-black text-yellow-600 mt-1">{preventiveMaintenance}%</p>
              <p className="text-sm text-yellow-700 mt-1">Target: 80%+</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-800">Critical Maintenance Alerts</h2>
            <p className="text-red-600">Immediate attention required - potential failure within 14 days</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictiveAlerts.map((alert, index) => (
            <div key={index} className={`bg-white p-4 rounded-lg border-2 ${
              alert.severity === 'high' ? 'border-red-300' : 'border-yellow-300'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{alert.truckId}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{alert.issue}</p>
              <p className="text-gray-600 text-sm mb-2">{alert.recommendation}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Est. Cost: ${alert.estimatedCost}</span>
                <span className={`font-medium ${alert.daysUntilFailure <= 7 ? 'text-red-600' : 'text-yellow-600'}`}>
                  {alert.daysUntilFailure} days left
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            Maintenance Cost Breakdown
          </h2>
          <div className="space-y-4">
            {maintenanceCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500`} 
                       style={{backgroundPosition: `${index * 60}deg`}}></div>
                  <span className="font-semibold text-gray-900">{category.category}</span>
                  <span className="text-sm text-gray-600">({category.percentage}%)</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">${category.cost.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${
                    category.trend === 'up' ? 'text-red-600' : category.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {category.trend === 'up' ? '↗' : category.trend === 'down' ? '↘' : '→'}
                    {Math.abs(category.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 text-purple-600 mr-2" />
            Upcoming Maintenance Schedule
          </h2>
          <div className="space-y-4">
            {upcomingMaintenance.map((item, index) => (
              <div key={index} className={`border-2 rounded-lg p-4 ${
                item.priority === 'high' ? 'border-red-200 bg-red-50' :
                item.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.plateNumber}</h3>
                    <p className="text-gray-700 font-medium">{item.type}</p>
                    <p className="text-sm text-gray-600">Mileage: {item.mileage.toLocaleString()} mi</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.dueDate}</div>
                    <div className="text-lg font-bold text-gray-800">${item.estimatedCost}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-blue-800 font-semibold">
              Total Scheduled Maintenance Cost: ${upcomingMaintenance.reduce((sum, item) => sum + item.estimatedCost, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Records Table */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Wrench className="h-6 w-6 text-gray-600 mr-2" />
          Recent Maintenance Records
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Truck</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Description</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Mechanic</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Cost</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceRecords.map((record) => {
                const truck = trucks.find(t => t.id === record.truckId);
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {truck?.plateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{record.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.mechanic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${record.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        record.status === 'completed' ? 'bg-green-100 text-green-800' :
                        record.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}