'use client';

import { 
  AlertTriangle, 
  DollarSign, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  PieChart,
  BarChart3
} from 'lucide-react';

export default function FinancialDrillDown() {

  // Calculate financial insights and money leaks
  const fuelEfficiencyLoss = 15420; // Monthly loss due to poor fuel efficiency
  const idleTimeCost = 8750; // Monthly cost of excessive idle time
  const maintenanceOverrun = 12300; // Monthly maintenance cost overruns
  const routeInefficiency = 6890; // Monthly loss due to suboptimal routing
  const driverOvertimeCost = 18950; // Monthly overtime costs
  const totalMoneyLeaks = fuelEfficiencyLoss + idleTimeCost + maintenanceOverrun + routeInefficiency + driverOvertimeCost;

  const costBreakdown = [
    { category: 'Fuel', amount: 245000, percentage: 35, trend: 'up', change: 5.2 },
    { category: 'Driver Wages', amount: 210000, percentage: 30, trend: 'up', change: 3.1 },
    { category: 'Maintenance', amount: 105000, percentage: 15, trend: 'down', change: -2.3 },
    { category: 'Insurance', amount: 70000, percentage: 10, trend: 'stable', change: 0.5 },
    { category: 'Equipment', amount: 42000, percentage: 6, trend: 'up', change: 8.7 },
    { category: 'Other', amount: 28000, percentage: 4, trend: 'stable', change: -0.8 }
  ];

  const savingOpportunities = [
    {
      opportunity: 'Fuel Efficiency Optimization',
      currentCost: fuelEfficiencyLoss,
      potentialSaving: 11560,
      implementation: 'Driver training + route optimization',
      roi: '650%',
      timeframe: '3 months',
      priority: 'high'
    },
    {
      opportunity: 'Reduce Driver Overtime',
      currentCost: driverOvertimeCost,
      potentialSaving: 14210,
      implementation: 'Better scheduling + hire 2 drivers',
      roi: '340%',
      timeframe: '2 months',
      priority: 'high'
    },
    {
      opportunity: 'Preventive Maintenance',
      currentCost: maintenanceOverrun,
      potentialSaving: 9840,
      implementation: 'Predictive maintenance system',
      roi: '280%',
      timeframe: '6 months',
      priority: 'medium'
    },
    {
      opportunity: 'Route Optimization',
      currentCost: routeInefficiency,
      potentialSaving: 5460,
      implementation: 'Advanced routing software',
      roi: '320%',
      timeframe: '1 month',
      priority: 'high'
    },
    {
      opportunity: 'Idle Time Reduction',
      currentCost: idleTimeCost,
      potentialSaving: 7000,
      implementation: 'Driver training + monitoring',
      roi: '400%',
      timeframe: '2 months',
      priority: 'medium'
    }
  ];

  const kpiMetrics = [
    { name: 'Cost per Mile', current: '$2.85', target: '$2.65', variance: '-7.5%', status: 'poor' },
    { name: 'Fuel MPG', current: '6.2', target: '6.8', variance: '-8.8%', status: 'poor' },
    { name: 'Driver Utilization', current: '87%', target: '92%', variance: '-5.4%', status: 'fair' },
    { name: 'Maintenance Cost/Mile', current: '$0.42', target: '$0.38', variance: '-10.5%', status: 'poor' },
    { name: 'Revenue per Mile', current: '$3.45', target: '$3.60', variance: '-4.2%', status: 'fair' },
    { name: 'Profit Margin', current: '17.4%', target: '22%', variance: '-20.9%', status: 'poor' }
  ];

  const handleExportExcel = () => {
    const csvContent = `Financial Drill Down Report\n\n` +
      `Generated: ${new Date().toLocaleDateString()}\n\n` +
      `MONEY LEAKS IDENTIFIED:\n` +
      `Total Monthly Losses,$${totalMoneyLeaks.toLocaleString()}\n` +
      `Fuel Inefficiency,$${fuelEfficiencyLoss.toLocaleString()}\n` +
      `Driver Overtime,$${driverOvertimeCost.toLocaleString()}\n` +
      `Maintenance Overrun,$${maintenanceOverrun.toLocaleString()}\n` +
      `Route Inefficiency,$${routeInefficiency.toLocaleString()}\n` +
      `Idle Time,$${idleTimeCost.toLocaleString()}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-drill-down-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPowerPoint = () => {
    const presentationData = `Financial Drill Down Executive Report\n\n` +
      `Generated: ${new Date().toLocaleDateString()}\n\n` +
      `CRITICAL FINDINGS:\n` +
      `• Total Monthly Money Leaks: $${totalMoneyLeaks.toLocaleString()}\n` +
      `• Annual Impact: $${(totalMoneyLeaks * 12).toLocaleString()}\n` +
      `• Top Priority: Driver Overtime ($${driverOvertimeCost.toLocaleString()}/month)\n` +
      `• Quick Win: Route Optimization ($${routeInefficiency.toLocaleString()}/month)\n\n` +
      `SAVING OPPORTUNITIES:\n` +
      savingOpportunities.slice(0, 3).map(opp => 
        `• ${opp.opportunity}: $${opp.potentialSaving.toLocaleString()}/month (${opp.roi} ROI)`).join('\n');
    
    const blob = new Blob([presentationData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-drill-down-presentation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Financial Drill Down Analysis</h1>
            <p className="text-red-100 text-lg">Executive-level cost analysis and money leak detection</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExportExcel}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="h-5 w-5" />
              Export to Excel
            </button>
            <button 
              onClick={handleExportPowerPoint}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="h-5 w-5" />
              Export to PowerPoint
            </button>
          </div>
        </div>
      </div>

      {/* Money Leaks Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-800">Critical: ${totalMoneyLeaks.toLocaleString()} Monthly Money Leaks Identified</h2>
            <p className="text-red-600">Immediate action required - potential annual loss: ${(totalMoneyLeaks * 12).toLocaleString()}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold text-sm">Fuel Inefficiency</div>
            <div className="text-2xl font-bold text-red-800">${fuelEfficiencyLoss.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold text-sm">Driver Overtime</div>
            <div className="text-2xl font-bold text-red-800">${driverOvertimeCost.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold text-sm">Maintenance Overrun</div>
            <div className="text-2xl font-bold text-red-800">${maintenanceOverrun.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold text-sm">Idle Time</div>
            <div className="text-2xl font-bold text-red-800">${idleTimeCost.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-red-600 font-semibold text-sm">Route Inefficiency</div>
            <div className="text-2xl font-bold text-red-800">${routeInefficiency.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* KPI Performance Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="h-6 w-6 text-blue-600 mr-2" />
          Key Performance Indicators vs Targets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiMetrics.map((kpi, index) => (
            <div key={index} className={`p-6 rounded-xl border-2 ${
              kpi.status === 'poor' ? 'border-red-200 bg-red-50' :
              kpi.status === 'fair' ? 'border-yellow-200 bg-yellow-50' :
              'border-green-200 bg-green-50'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{kpi.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  kpi.status === 'poor' ? 'bg-red-100 text-red-800' :
                  kpi.status === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {kpi.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-bold text-lg">{kpi.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium">{kpi.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Variance:</span>
                  <span className={`font-bold ${
                    kpi.variance.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {kpi.variance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-6 w-6 text-purple-600 mr-2" />
            Monthly Cost Breakdown
          </h2>
          <div className="space-y-4">
            {costBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500`} 
                       style={{backgroundPosition: `${index * 60}deg`}}></div>
                  <span className="font-semibold text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600">({item.percentage}%)</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">${item.amount.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${
                    item.trend === 'up' ? 'text-red-600' : item.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                     item.trend === 'down' ? <ArrowDownRight className="h-3 w-3 mr-1" /> : null}
                    {Math.abs(item.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saving Opportunities */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="h-6 w-6 text-green-600 mr-2" />
            Immediate Saving Opportunities
          </h2>
          <div className="space-y-4">
            {savingOpportunities.slice(0, 3).map((opportunity, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                opportunity.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{opportunity.opportunity}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opportunity.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {opportunity.priority.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Potential Monthly Saving</div>
                    <div className="text-xl font-bold text-green-600">${opportunity.potentialSaving.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">ROI</div>
                    <div className="text-xl font-bold text-blue-600">{opportunity.roi}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Implementation:</strong> {opportunity.implementation}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  <strong>Timeline:</strong> {opportunity.timeframe}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis Table */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
          Comprehensive Cost Analysis & Action Plan
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Cost Category</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Monthly Loss</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Annual Impact</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Potential Saving</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">ROI</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Action Required</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {savingOpportunities.map((opportunity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{opportunity.opportunity}</td>
                  <td className="px-6 py-4 text-red-600 font-bold">${opportunity.currentCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-800 font-bold">${(opportunity.currentCost * 12).toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">${opportunity.potentialSaving.toLocaleString()}</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">{opportunity.roi}</td>
                  <td className="px-6 py-4 text-gray-700">{opportunity.implementation}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      opportunity.timeframe.includes('1') ? 'bg-red-100 text-red-800' :
                      opportunity.timeframe.includes('2') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {opportunity.timeframe}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="font-bold text-green-800">Total Annual Saving Potential: ${(savingOpportunities.reduce((sum, opp) => sum + opp.potentialSaving, 0) * 12).toLocaleString()}</span>
          </div>
          <p className="text-green-700 text-sm">
            Implementing all identified opportunities could save approximately ${(savingOpportunities.reduce((sum, opp) => sum + opp.potentialSaving, 0) * 12).toLocaleString()} annually, 
            representing a {((savingOpportunities.reduce((sum, opp) => sum + opp.potentialSaving, 0) / totalMoneyLeaks) * 100).toFixed(1)}% reduction in current money leaks.
          </p>
        </div>
      </div>
    </div>
  );
}