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
  size = 200,
  strokeWidth = 16,
  title,
  legends = [
    { label: 'Documents', percentage: 40, color: '#4F46E5' },
    { label: 'Training', percentage: 20, color: '#14B8A6' },
    { label: 'Equipment', percentage: 10, color: '#C7D2FE' },
    { label: 'Culture', percentage: 7, color: '#F59E0B' },
  ],
}) => {
  const radius = (size - strokeWidth - 40) / 2; // Leave room for leader lines and labels
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativeOffset = 0;
  let cumulativeAngle = -90; // SVG -90deg is top

  // Pre-calculate segments and leader line coordinates
  const segmentsWithLabels = legends.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += (item.percentage / 100) * circumference;

    const angleSpan = (item.percentage / 100) * 360;
    const midAngleDeg = cumulativeAngle + angleSpan / 2;
    cumulativeAngle += angleSpan;

    const midAngleRad = (midAngleDeg * Math.PI) / 180;
    
    // Leader line start (edge of donut)
    const lineR1 = radius + strokeWidth / 2 + 2;
    const x1 = center + lineR1 * Math.cos(midAngleRad);
    const y1 = center + lineR1 * Math.sin(midAngleRad);

    // Leader line end
    const lineR2 = radius + strokeWidth / 2 + 10;
    const x2 = center + lineR2 * Math.cos(midAngleRad);
    const y2 = center + lineR2 * Math.sin(midAngleRad);

    // Text position
    const textR = radius + strokeWidth / 2 + 16;
    const textX = center + textR * Math.cos(midAngleRad);
    const textY = center + textR * Math.sin(midAngleRad);

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      x1, y1, x2, y2, textX, textY,
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
          {segmentsWithLabels.map((item, idx) => (
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

          {/* Leader Lines and Midpoint Percentage Labels (>= 5% only) */}
          {segmentsWithLabels.map((item, idx) => {
            if (item.percentage < 5) return null;
            return (
              <g key={`label-${idx}`}>
                <line
                  x1={item.x1}
                  y1={item.y1}
                  x2={item.x2}
                  y2={item.y2}
                  stroke={item.color}
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={item.textX}
                  y={item.textY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#1C1917"
                  fontSize="11"
                  fontWeight="700"
                >
                  {item.percentage}%
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[24px] font-bold text-text-primary">
            {percentage}%
          </span>
          {title && (
            <span className="text-[11px] leading-[14px] font-medium text-text-secondary">
              {title}
            </span>
          )}
        </div>
      </div>

      {/* Legend below */}
      {legends && legends.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-4 w-full max-w-[240px]">
          {legends.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[12px] leading-[16px] font-medium text-text-secondary truncate">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
