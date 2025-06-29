import { Calendar, Wrench, DollarSign, AlertTriangle } from 'lucide-react';
import { maintenanceRecords, trucks } from '@/lib/demo-data';

export default function MaintenanceReports() {
  const upcomingMaintenance = [
    { truckId: '2', plateNumber: 'DT-002', type: 'Oil Change', dueDate: '2024-02-15', mileage: 98000 },
    { truckId: '1', plateNumber: 'DT-001', type: 'Tire Rotation', dueDate: '2024-02-20', mileage: 125000 },
    { truckId: '4', plateNumber: 'DT-004', type: 'DOT Inspection', dueDate: '2024-02-25', mileage: 89000 },
  ];

  const totalMaintenanceCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
  const pendingRecords = maintenanceRecords.filter(record => record.status === 'pending').length;
  const inProgressRecords = maintenanceRecords.filter(record => record.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Maintenance Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Wrench className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Total Maintenance</h3>
                <p className="text-xl font-bold text-blue-900">{maintenanceRecords.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">In Progress</h3>
                <p className="text-xl font-bold text-yellow-900">{inProgressRecords}</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-red-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Pending</h3>
                <p className="text-xl font-bold text-red-900">{pendingRecords}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-green-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Total Cost</h3>
                <p className="text-xl font-bold text-green-900">${totalMaintenanceCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Maintenance</h2>
          <div className="space-y-4">
            {upcomingMaintenance.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.plateNumber}</h3>
                    <p className="text-sm text-gray-600">{item.type}</p>
                    <p className="text-xs text-gray-500">Mileage: {item.mileage.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">{item.dueDate}</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Due Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fleet Status Overview</h2>
          <div className="space-y-4">
            {trucks.map((truck) => (
              <div key={truck.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{truck.plateNumber}</h3>
                  <p className="text-sm text-gray-600">{truck.model} ({truck.year})</p>
                  <p className="text-xs text-gray-500">Last service: {truck.lastService}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    truck.status === 'active' ? 'bg-green-100 text-green-800' :
                    truck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {truck.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{truck.mileage.toLocaleString()} mi</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Maintenance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceRecords.map((record) => {
                const truck = trucks.find(t => t.id === record.truckId);
                return (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {truck?.plateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{record.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.mechanic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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