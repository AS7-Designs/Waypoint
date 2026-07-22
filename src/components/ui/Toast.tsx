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
      bg: 'bg-[#DCFCE7] border-[#BBF7D0]',
      text: 'text-[#16A34A]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />,
    },
    progress: {
      bg: 'bg-[#E0E7FF] border-[#C7D2FE]',
      text: 'text-[#4F46E5]',
      icon: <Info className="w-5 h-5 text-[#4F46E5] shrink-0" />,
    },
    neutral: {
      bg: 'bg-[#F3F4F6] border-[#E5E7EB]',
      text: 'text-[#6B7280]',
      icon: <Info className="w-5 h-5 text-[#6B7280] shrink-0" />,
    },
    danger: {
      bg: 'bg-[#FEE2E2] border-[#FCA5A5]',
      text: 'text-[#DC2626]',
      icon: <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0" />,
    },
  };

  const activeVariant = variants[variant];

  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-[16px] border shadow-lg max-w-sm w-full animate-slide-up',
        activeVariant.bg
      )}
    >
      {activeVariant.icon}
      <div className="flex-1 min-w-0">
        <h4 className={clsx('text-[14px] leading-[20px] font-semibold', activeVariant.text)}>
          {title}
        </h4>
        {message && (
          <p className="text-[12px] leading-[16px] text-[#4B5563] mt-0.5">
            {message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full text-[#6B7280] hover:text-[#111827] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
