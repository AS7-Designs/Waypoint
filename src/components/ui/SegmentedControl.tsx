import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1 text-caption-ui',
    md: 'px-4 py-2 text-body-ui',
  };

  return (
    <div
      className={twMerge(
        clsx('bg-surface-muted rounded-full p-1 inline-flex items-center gap-1'),
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={clsx(
              'rounded-full font-semibold transition-all cursor-pointer select-none whitespace-nowrap',
              sizeStyles[size],
              isSelected
                ? 'bg-white text-text-primary shadow-sm'
                : 'bg-transparent text-text-secondary hover:text-text-primary'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
