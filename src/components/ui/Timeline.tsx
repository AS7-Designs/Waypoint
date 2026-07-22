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
                  isCompleted ? 'bg-[#4F46E5]' : 'bg-[#ECECF3]'
                )}
              />
            )}

            {/* Indicator Circle */}
            <div className="shrink-0 z-10">
              {isCompleted ? (
                <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
              ) : isActive ? (
                <div className="w-8 h-8 rounded-full bg-[#EEF0FD] border-2 border-[#4F46E5] flex items-center justify-center text-[#4F46E5]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#ECECF3] flex items-center justify-center text-[#9CA3AF]">
                  <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[14px] leading-[20px] font-semibold text-[#111827]">
                  {item.title}
                </h4>
                {item.statusPill && (
                  <StatusPill variant={item.statusPill.variant} label={item.statusPill.label} />
                )}
              </div>
              <p className="text-[12px] leading-[16px] font-medium text-[#6B7280] mt-0.5">
                {item.timestamp}
              </p>
              {item.description && (
                <p className="text-[14px] leading-[20px] font-normal text-[#6B7280] mt-1 bg-[#F8F9FC] p-2.5 rounded-[12px] border border-[#ECECF3]">
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
