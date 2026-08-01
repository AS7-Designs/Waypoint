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
          'bg-white rounded-card p-6 border border-border',
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
            <h2 className="text-[20px] leading-[28px] font-bold text-text-primary">
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
