import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div className={twMerge(clsx('flex border-b border-border gap-6', className))}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'pb-3 text-[14px] leading-[20px] font-semibold transition-all relative whitespace-nowrap flex items-center gap-2',
              isActive
                ? 'text-primary'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'text-[12px] px-2 py-0.5 rounded-full font-medium',
                  isActive
                    ? 'bg-primary-tint text-primary'
                    : 'bg-status-neutralBg text-text-secondary'
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
