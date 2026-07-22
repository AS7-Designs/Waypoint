import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  action,
  children,
  className,
  headerClassName,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-[20px] p-6 shadow-[0_2_8px_rgba(17,24,39,0.04),0_1_2px_rgba(17,24,39,0.03)] border border-[#ECECF3]',
          className
        )
      )}
    >
      {(title || action) && (
        <div
          className={twMerge(
            clsx(
              'flex items-center justify-between mb-5 pb-1',
              headerClassName
            )
          )}
        >
          {typeof title === 'string' ? (
            <h2 className="text-[20px] leading-[28px] font-bold text-[#111827]">
              {title}
            </h2>
          ) : (
            title
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
