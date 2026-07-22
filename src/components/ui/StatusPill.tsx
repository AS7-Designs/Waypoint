import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StatusPillVariant } from '../../types';

export interface StatusPillProps {
  variant: StatusPillVariant;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  variant,
  label,
  children,
  className,
}) => {
  const styles = {
    success: 'bg-status-successBg text-status-successText',
    progress: 'bg-status-progressBg text-status-progressText',
    neutral: 'bg-status-neutralBg text-status-neutralText',
    danger: 'bg-status-dangerBg text-status-dangerText',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center rounded-full text-caption-ui py-1 px-3 whitespace-nowrap',
          styles[variant],
          className
        )
      )}
    >
      {label || children}
    </span>
  );
};
