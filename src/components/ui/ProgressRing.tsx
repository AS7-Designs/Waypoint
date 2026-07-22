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
  strokeWidth = 18,
  title,
  legends = [
    { label: 'Documents', percentage: 40, color: '#4F46E5' },
    { label: 'Training', percentage: 20, color: '#14B8A6' },
    { label: 'Equipment', percentage: 10, color: '#C7D2FE' },
    { label: 'Culture', percentage: 7, color: '#A5B4FC' },
  ],
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate segments for multi-color donut if legends provided
  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F3F4F6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Segments */}
          {legends.map((item, idx) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativeOffset;
            cumulativeOffset += (item.percentage / 100) * circumference;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>
        
        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-display font-bold text-text-primary">
            {percentage}%
          </span>
          {title && (
            <span className="text-caption-ui text-text-secondary">
              {title}
            </span>
          )}
        </div>
      </div>

      {/* Legend below */}
      {legends && legends.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-6 w-full max-w-[240px]">
          {legends.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-caption-ui text-text-secondary truncate">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
