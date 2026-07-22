import React from 'react';
import { Button } from './Button';
import { FolderOpen } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FolderOpen className="w-8 h-8 text-[#9CA3AF]" />,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-[20px] bg-[#F8F9FC] border border-dashed border-[#ECECF3] ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="text-[16px] leading-[24px] font-semibold text-[#111827] mb-1">
        {title}
      </h3>
      <p className="text-[14px] leading-[20px] font-normal text-[#6B7280] max-w-sm mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
