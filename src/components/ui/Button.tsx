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
  const baseStyles = 'inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-element transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-primary text-white !text-white hover:bg-primary-dark shadow-sm active:scale-[0.98]',
    secondary: 'bg-white text-text-primary border border-border hover:bg-surface-muted shadow-sm active:scale-[0.98]',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-status-neutralBg',
    destructive: 'bg-accent-rose text-white !text-white hover:bg-rose-600 shadow-sm active:scale-[0.98]',
  };

  const sizes = {
    sm: 'h-[36px] px-4 text-caption-ui gap-2',
    md: 'h-[42px] px-6 text-body-ui gap-2.5',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="font-semibold whitespace-nowrap leading-none">{children}</span>
    </button>
  );
};
