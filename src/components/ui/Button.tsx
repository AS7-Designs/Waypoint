import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-[12px] transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm',
    secondary: 'bg-white text-[#111827] border border-[#ECECF3] hover:bg-[#F8F9FC] shadow-sm',
    ghost: 'bg-transparent text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]',
    destructive: 'bg-[#FB7185] text-white hover:bg-[#f43f5e]',
  };

  const sizes = {
    sm: 'h-[32px] px-3 text-caption-ui gap-1.5',
    md: 'h-[40px] px-4 text-body-ui gap-2',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
