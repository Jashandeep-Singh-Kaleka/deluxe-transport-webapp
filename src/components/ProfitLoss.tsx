import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyMetrics } from '@/lib/demo-data';

const monthlyPL = [
  { month: 'Jan', revenue: 165000, expenses: 142000, profit: 23000 },
  { month: 'Feb', revenue: 175000, expenses: 148000, profit: 27000 },
  { month: 'Mar', revenue: 180000, expenses: 152000, profit: 28000 },
  { month: 'Apr', revenue: 185000, expenses: 158000, profit: 27000 },
];

const expenseBreakdown = [
  { category: 'Fuel', amount: 28000, percentage: 45 },
  { category: 'Maintenance', amount: 12000, percentage: 19 },
  { category: 'Driver Wages', amount: 15000, percentage: 24 },
  { category: 'Insurance', amount: 4500, percentage: 7 },
  { category: 'Other', amount: 3000, percentage: 5 },
];

export default function ProfitLoss() {
  const totalExpenses = monthlyMetrics.fuelCosts + monthlyMetrics.maintenanceCosts + 15000 + 4500 + 3000;
  const profit = monthlyMetrics.totalRevenue - totalExpenses;
  const profitMargin = ((profit / monthlyMetrics.totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profit & Loss Statement</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-blue-900">${monthlyMetrics.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-blue-600">This month</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-900">${totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-red-600">This month</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Net Profit</h3>
            <p className="text-2xl font-bold text-green-900">${profit.toLocaleString()}</p>
            <p className="text-xs text-green-600">This month</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-800">Profit Margin</h3>
            <p className="text-2xl font-bold text-purple-900">{profitMargin}%</p>
            <p className="text-xs text-purple-600">This month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly P&L Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPL}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
          <div className="space-y-4">
            {expenseBreakdown.map((expense) => (
              <div key={expense.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium text-gray-700">{expense.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">${expense.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{expense.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed P&L Statement</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% of Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Revenue</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-green-600">${monthlyMetrics.totalRevenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">100.0%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 pl-8">Fuel Costs</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">-${monthlyMetrics.fuelCosts.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{((monthlyMetrics.fuelCosts / monthlyMetrics.totalRevenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 pl-8">Maintenance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">-${monthlyMetrics.maintenanceCosts.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{((monthlyMetrics.maintenanceCosts / monthlyMetrics.totalRevenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 pl-8">Driver Wages</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">-$15,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">8.1%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 pl-8">Insurance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">-$4,500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">2.4%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 pl-8">Other Expenses</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">-$3,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">1.6%</td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total Expenses</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">-${totalExpenses.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{((totalExpenses / monthlyMetrics.totalRevenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="bg-green-50 font-bold">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net Profit</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">${profit.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{profitMargin}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}