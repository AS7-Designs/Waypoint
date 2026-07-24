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
  legends?: LegendItem[];
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 180,
  strokeWidth = 16,
  title,
  legends = [
    { label: 'Documents', percentage: 40, color: '#4F46E5' },
    { label: 'Training', percentage: 20, color: '#14B8A6' },
    { label: 'Equipment', percentage: 10, color: '#C7D2FE' },
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

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="var(--color-neutral-bg)"
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

      {/* Legend below with inline percentages */}
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
