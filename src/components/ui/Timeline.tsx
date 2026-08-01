import React from 'react';
import { StatusPill } from './StatusPill';
import { StatusPillVariant } from '../../types';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export interface TimelineItem {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  status?: 'completed' | 'active' | 'pending';
  statusPill?: {
    variant: StatusPillVariant;
    label: string;
  };
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={clsx('relative flex flex-col gap-6', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isCompleted = item.status === 'completed';
        const isActive = item.status === 'active';

        return (
          <div key={item.id} className="relative flex gap-4">
            {/* Connecting line */}
            {!isLast && (
              <div
                className={clsx(
                  'absolute left-[15px] top-[30px] bottom-[-24px] w-[2px]',
                  isCompleted ? 'bg-primary' : 'bg-border'
                )}
              />
            )}

            {/* Indicator Circle */}
            <div className="shrink-0 z-10">
              {isCompleted ? (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <Check className="w-4 h-4" />
                </div>
              ) : isActive ? (
                <div className="w-8 h-8 rounded-full bg-primary-tint border-2 border-primary flex items-center justify-center text-primary">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white border-2 border-border flex items-center justify-center text-text-disabled">
                  <div className="w-2 h-2 rounded-full bg-text-disabled" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[14px] leading-[20px] font-semibold text-text-primary">
                  {item.title}
                </h4>
                {item.statusPill && (
                  <StatusPill variant={item.statusPill.variant} label={item.statusPill.label} />
                )}
              </div>
              <p className="text-[12px] leading-[16px] font-medium text-text-secondary mt-0.5">
                {item.timestamp}
              </p>
              {item.description && (
                <p className="text-[14px] leading-[20px] font-normal text-text-secondary mt-1 bg-surface-muted p-2.5 rounded-element border border-border">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
