'use client';

import { useState } from 'react';
import { Calendar, Filter, Download, RefreshCw, FileSpreadsheet, Presentation } from 'lucide-react';

export interface FilterState {
  timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year';
  dateRange: {
    start: string;
    end: string;
  };
  status?: string[];
  driver?: string[];
  route?: string[];
}

interface FilterControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableDrivers?: string[];
  availableRoutes?: string[];
  availableStatuses?: string[];
  showExport?: boolean;
  onExportExcel?: () => void;
  onExportPowerPoint?: () => void;
  onRefresh?: () => void;
}

export default function FilterControls({
  filters,
  onFiltersChange,
  availableDrivers = [],
  availableRoutes = [],
  availableStatuses = [],
  showExport = true,
  onExportExcel,
  onExportPowerPoint,
  onRefresh
}: FilterControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const timeframeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleTimeframeChange = (timeframe: FilterState['timeframe']) => {
    const today = new Date();
    let start = '';
    const end = today.toISOString().split('T')[0];

    switch (timeframe) {
      case 'day':
        start = today.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        start = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        break;
      case 'quarter':
        const quarter = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), quarter * 3, 1).toISOString().split('T')[0];
        break;
      case 'year':
        start = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
        break;
    }

    onFiltersChange({
      ...filters,
      timeframe,
      dateRange: { start, end }
    });
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    onFiltersChange({
      ...filters,
      [key]: newArray
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Timeframe Buttons */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeframeChange(option.value as FilterState['timeframe'])}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filters.timeframe === option.value
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Custom Date Range */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: { ...filters.dateRange, start: e.target.value }
            })}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <span className="text-gray-500 text-sm">to</span>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: { ...filters.dateRange, end: e.target.value }
            })}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm">Advanced Filters</span>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          )}
          {showExport && (onExportExcel || onExportPowerPoint) && (
            <div className="flex items-center space-x-2">
              {onExportExcel && (
                <button
                  onClick={onExportExcel}
                  className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors"
                  title="Export to Excel"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="text-sm">Excel</span>
                </button>
              )}
              {onExportPowerPoint && (
                <button
                  onClick={onExportPowerPoint}
                  className="flex items-center space-x-1 bg-orange-600 text-white px-3 py-1.5 rounded-md hover:bg-orange-700 transition-colors"
                  title="Export to PowerPoint"
                >
                  <Presentation className="h-4 w-4" />
                  <span className="text-sm">PowerPoint</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            {availableStatuses.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableStatuses.map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(filters.status || []).includes(status)}
                        onChange={(e) => handleArrayFilterChange('status', status, e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500 focus:ring-offset-0 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Driver Filter */}
            {availableDrivers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableDrivers.map((driver) => (
                    <label key={driver} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(filters.driver || []).includes(driver)}
                        onChange={(e) => handleArrayFilterChange('driver', driver, e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{driver}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Route Filter */}
            {availableRoutes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableRoutes.map((route) => (
                    <label key={route} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(filters.route || []).includes(route)}
                        onChange={(e) => handleArrayFilterChange('route', route, e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{route}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => onFiltersChange({
                timeframe: 'month',
                dateRange: {
                  start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
                  end: new Date().toISOString().split('T')[0]
                },
                status: [],
                driver: [],
                route: []
              })}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}