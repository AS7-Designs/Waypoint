import React from 'react';
import { ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AppTileProps {
  label: string;
  icon: React.ReactNode;
  bgColor?: string;
  onClick?: () => void;
  className?: string;
}

export const AppTile: React.FC<AppTileProps> = ({
  label,
  icon,
  bgColor = 'bg-primary-tint',
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        clsx(
          'flex items-center justify-between p-3.5 bg-white hover:bg-surface-muted border border-border rounded-nested transition-all duration-150 ease-out group text-left w-full shadow-card',
          className
        )
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={twMerge(
            clsx(
              'w-10 h-10 rounded-element flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 bg-primary-tint text-primary',
              bgColor
            )
          )}
        >
          {icon}
        </div>
        <span className="text-[14px] leading-[20px] font-semibold text-text-primary truncate">
          {label}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-text-disabled group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
    </button>
  );
};
