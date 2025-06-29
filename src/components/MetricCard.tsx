'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'purple' | 'yellow' | 'indigo';
  size?: 'small' | 'medium' | 'large';
}

export default function MetricCard({
  title,
  value,
  subtitle,
  change,
  icon,
  color,
  size = 'medium'
}: MetricCardProps) {
  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      borderLeft: 'border-l-red-500',
      text: 'text-red-900',
      subtitle: 'text-red-600',
      icon: 'text-red-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      borderLeft: 'border-l-blue-500',
      text: 'text-blue-900',
      subtitle: 'text-blue-600',
      icon: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      borderLeft: 'border-l-green-500',
      text: 'text-green-900',
      subtitle: 'text-green-600',
      icon: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      borderLeft: 'border-l-purple-500',
      text: 'text-purple-900',
      subtitle: 'text-purple-600',
      icon: 'text-purple-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      borderLeft: 'border-l-yellow-500',
      text: 'text-yellow-900',
      subtitle: 'text-yellow-600',
      icon: 'text-yellow-600'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      borderLeft: 'border-l-indigo-500',
      text: 'text-indigo-900',
      subtitle: 'text-indigo-600',
      icon: 'text-indigo-600'
    }
  };

  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const textSizes = {
    small: {
      title: 'text-xs',
      value: 'text-lg',
      subtitle: 'text-xs'
    },
    medium: {
      title: 'text-sm',
      value: 'text-2xl',
      subtitle: 'text-xs'
    },
    large: {
      title: 'text-base',
      value: 'text-3xl',
      subtitle: 'text-sm'
    }
  };

  const colors = colorClasses[color];
  const sizes = textSizes[size];

  return (
    <div className={`
      ${colors.bg} ${colors.border} ${colors.borderLeft}
      ${sizeClasses[size]}
      border border-l-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200
      relative overflow-hidden
    `}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {icon && (
                <div className={`${colors.icon} flex-shrink-0`}>
                  {icon}
                </div>
              )}
              <h3 className={`${sizes.title} font-medium ${colors.text} tracking-wide`}>
                {title}
              </h3>
            </div>
            
            <div className={`${sizes.value} font-bold ${colors.text} leading-none mb-1`}>
              {typeof value === 'number' && value >= 1000000 
                ? `${(value / 1000000).toFixed(1)}M`
                : typeof value === 'number' && value >= 1000
                ? `${(value / 1000).toFixed(0)}K`
                : value
              }
            </div>
            
            {subtitle && (
              <p className={`${sizes.subtitle} ${colors.subtitle} font-medium`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {change && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-1">
              <span className={`
                text-xs font-semibold px-2 py-1 rounded-full
                ${change.type === 'increase' ? 'bg-green-100 text-green-800' :
                  change.type === 'decrease' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'}
              `}>
                {change.type === 'increase' ? '↗' : change.type === 'decrease' ? '↘' : '→'} 
                {Math.abs(change.value)}%
              </span>
              {change.period && (
                <span className="text-xs text-gray-500">vs {change.period}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}