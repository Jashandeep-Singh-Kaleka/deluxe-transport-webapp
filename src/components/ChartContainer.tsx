'use client';

interface ChartContainerProps {
  title: string;
  description?: string;
  formula?: string;
  insights?: string[];
  children: React.ReactNode;
  className?: string;
}

export default function ChartContainer({
  title,
  description,
  formula,
  insights,
  children,
  className = ''
}: ChartContainerProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        {formula && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="text-xs font-medium text-gray-700 mb-1">Formula:</h4>
            <code className="text-xs text-gray-800 font-mono bg-white px-2 py-1 rounded border">
              {formula}
            </code>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {children}
      </div>
      
      {insights && insights.length > 0 && (
        <div className="px-6 pb-6">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
              💡 Key Insights
            </h4>
            <ul className="space-y-1">
              {insights.map((insight, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}