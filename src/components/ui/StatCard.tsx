import React from 'react';
import { clsx } from 'clsx';

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: {
    value: string;
    isPositive: boolean;
  };
  helperText?: string;
  sparklineData?: number[]; // Array of 5-7 numbers representing trend
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  helperText,
  sparklineData = [40, 65, 50, 80, 70, 95],
  className,
}) => {
  const maxVal = Math.max(...sparklineData, 1);

  return (
    <div
      className={clsx(
        'bg-surface rounded-card shadow-card p-6 flex justify-between items-start border border-border',
        className
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <span className="text-caption-ui text-text-secondary block mb-1 font-medium">{label}</span>
          <div className="text-display text-text-primary font-bold">{value}</div>
        </div>
        {helperText && (
          <span className="text-caption-ui text-text-secondary mt-2 block font-normal">{helperText}</span>
        )}
      </div>

      <div className="flex flex-col items-end justify-between h-full space-y-3">
        {delta && (
          <span
            className={clsx(
              'text-caption-ui font-bold',
              delta.isPositive ? 'text-status-successText' : 'text-status-dangerText'
            )}
          >
            {delta.isPositive ? '↑' : '↓'} {delta.value}
          </span>
        )}

        {/* Sparkline: 5-7 thin bars, rounded end caps, primary-tint2 for historical, primary for latest */}
        <div className="flex items-end gap-1.5 h-[36px] w-[72px] justify-end pt-1">
          {sparklineData.map((val, idx) => {
            const isLast = idx === sparklineData.length - 1;
            const heightPct = Math.max(15, Math.round((val / maxVal) * 100));
            return (
              <div
                key={idx}
                className={clsx(
                  'w-2 rounded-full transition-all duration-300',
                  isLast ? 'bg-primary' : 'bg-primary-tint2'
                )}
                style={{ height: `${heightPct}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
