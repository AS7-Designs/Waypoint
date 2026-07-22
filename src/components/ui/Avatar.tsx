import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps {
  src?: string;
  name: string;
  roleRing?: 'recruiter' | 'manager' | 'none';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  roleRing = 'none',
  size = 'md',
  className,
}) => {
  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const sizes = {
    sm: 'w-8 h-8 text-caption-ui',
    md: 'w-10 h-10 text-body-ui',
    lg: 'w-14 h-14 text-h3',
  };

  const rings = {
    recruiter: 'ring-2 ring-primary ring-offset-2',
    manager: 'ring-2 ring-accent-teal ring-offset-2',
    none: '',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative inline-flex items-center justify-center rounded-full bg-primary-tint text-primary font-semibold overflow-hidden shrink-0 select-none',
          sizes[size],
          rings[roleRing],
          className
        )
      )}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
