import React from 'react';

export interface LegendItem {
  label: string;
  percentage: number;
  color: string;
}

export interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  title?: string;
  variant?: 'donut-split' | 'default';
  completedCount?: number;
  totalCount?: number;
  activeTasksCount?: number;
  legends?: LegendItem[];
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 150,
  strokeWidth = 18,
  title = 'Completion Rate',
  variant = 'donut-split',
  completedCount = 14,
  totalCount = 18,
  activeTasksCount = 65,
  legends = [
    { label: 'Documents', percentage: 40, color: '#6366F1' },
    { label: 'Training', percentage: 20, color: '#10B981' },
    { label: 'Equipment', percentage: 10, color: '#8B5CF6' },
    { label: 'Culture', percentage: 7, color: '#F59E0B' },
  ],
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativeOffset = 0;

  const segments = legends.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += (item.percentage / 100) * circumference;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  if (variant === 'donut-split') {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 w-full">
        {/* Left Column: Donut Ring matching Attendance Rate reference */}
        <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            {/* Background circle track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="var(--color-primary-tint)"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="transform -rotate-90 origin-center"
            />
            
            {/* Segments */}
            {segments.map((item, idx) => (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transform -rotate-90 origin-center transition-all duration-500 ease-out"
              />
            ))}
          </svg>
          
          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[28px] font-bold text-text-primary leading-none mb-1">
              {percentage}%
            </span>
            <span className="text-[11px] font-semibold text-text-secondary leading-tight max-w-[80px]">
              {title}
            </span>
          </div>
        </div>

        {/* Right Column: Stacked Statistic Sub-Cards matching reference */}
        <div className="flex-1 space-y-3 w-full">
          <div className="p-3.5 rounded-nested border border-border bg-white flex flex-col justify-center transition-all hover:border-primary/40">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
              <span className="text-[12px] font-semibold text-text-secondary">Completed</span>
            </div>
            <div className="text-[20px] font-bold text-text-primary leading-tight">
              {completedCount} <span className="text-[12px] font-normal text-text-disabled">/ {totalCount} Hires</span>
            </div>
          </div>

          <div className="p-3.5 rounded-nested border border-border bg-white flex flex-col justify-center transition-all hover:border-primary/40">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[12px] font-semibold text-text-secondary">Active Tasks</span>
            </div>
            <div className="text-[20px] font-bold text-text-primary leading-tight">
              {activeTasksCount} <span className="text-[12px] font-medium text-emerald-600">On Track</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="var(--color-primary-tint)"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transform -rotate-90 origin-center"
          />
          {segments.map((item, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={item.strokeDasharray}
              strokeDashoffset={item.strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transform -rotate-90 origin-center transition-all duration-500 ease-out"
            />
          ))}
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[26px] font-bold text-text-primary leading-none mb-0.5">
            {percentage}%
          </span>
          {title && (
            <span className="text-[12px] font-medium text-text-secondary">
              {title}
            </span>
          )}
        </div>
      </div>

      {legends && legends.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-5 w-full max-w-[260px]">
          {legends.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-1.5 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] font-medium text-text-secondary truncate">
                  {item.label}
                </span>
              </div>
              <span className="text-[12px] font-bold text-text-primary shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
