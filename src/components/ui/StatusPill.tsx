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
    success: 'bg-status-successBg text-status-successText border border-emerald-500/30',
    progress: 'bg-status-progressBg text-primary border border-primary/30',
    neutral: 'bg-status-neutralBg text-text-secondary border border-slate-300/60',
    danger: 'bg-status-dangerBg text-status-dangerText border border-rose-500/30',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center rounded-full text-[12px] leading-[16px] font-medium py-1 px-3 whitespace-nowrap',
          styles[variant],
          className
        )
      )}
    >
      {label || children}
    </span>
  );
};
