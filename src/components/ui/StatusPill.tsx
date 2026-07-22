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
    success: 'bg-[#DCFCE7] text-[#16A34A]',
    progress: 'bg-[#E0E7FF] text-[#4F46E5]',
    neutral: 'bg-[#F3F4F6] text-[#6B7280]',
    danger: 'bg-[#FEE2E2] text-[#DC2626]',
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
