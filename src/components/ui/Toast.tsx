import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';
import { StatusPillVariant } from '../../types';

export interface ToastProps {
  id?: string;
  variant?: StatusPillVariant;
  title: string;
  message?: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'success',
  title,
  message,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    success: {
      bg: 'bg-status-successBg border-border',
      text: 'text-status-successText',
      icon: <CheckCircle2 className="w-5 h-5 text-status-successText shrink-0" />,
    },
    progress: {
      bg: 'bg-status-progressBg border-primary-tint2',
      text: 'text-primary',
      icon: <Info className="w-5 h-5 text-primary shrink-0" />,
    },
    neutral: {
      bg: 'bg-status-neutralBg border-border',
      text: 'text-text-secondary',
      icon: <Info className="w-5 h-5 text-text-secondary shrink-0" />,
    },
    danger: {
      bg: 'bg-status-dangerBg border-border',
      text: 'text-status-dangerText',
      icon: <AlertCircle className="w-5 h-5 text-status-dangerText shrink-0" />,
    },
  };

  const activeVariant = variants[variant];

  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-nested border max-w-sm w-full animate-slide-up',
        activeVariant.bg
      )}
    >
      {activeVariant.icon}
      <div className="flex-1 min-w-0">
        <h4 className={clsx('text-[14px] leading-[20px] font-semibold', activeVariant.text)}>
          {title}
        </h4>
        {message && (
          <p className="text-[12px] leading-[16px] text-text-secondary mt-0.5">
            {message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full text-text-secondary hover:text-text-primary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
