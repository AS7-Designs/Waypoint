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
  icon = <FolderOpen className="w-8 h-8 text-text-disabled" />,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-card bg-surface-muted border border-dashed border-border ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="text-h3 font-semibold text-text-primary mb-1">
        {title}
      </h3>
      <p className="text-body-regular text-text-secondary max-w-sm mb-5">
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
