import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export interface MatchScoreProps {
  score: number; // 0 - 100
  size?: 'sm' | 'md' | 'lg'; // sm for compact cards, md/lg for candidate profile header
  className?: string;
}

export const MatchScore: React.FC<MatchScoreProps> = ({
  score,
  size = 'sm',
  className,
}) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(score);
    }, 50);
    return () => clearTimeout(timer);
  }, [score]);

  const getFillColor = (s: number) => {
    if (s >= 85) return 'bg-status-successText';
    if (s >= 60) return 'bg-primary';
    return 'bg-accent-amber';
  };

  const getScoreTextColor = (s: number) => {
    if (s >= 85) return 'text-status-successText';
    if (s >= 60) return 'text-primary';
    return 'text-accent-amber';
  };

  const sizeClasses = {
    sm: {
      label: 'text-caption-ui text-text-secondary font-medium',
      score: 'text-[13px] font-bold',
      trackHeight: 'h-1.5',
    },
    md: {
      label: 'text-caption-ui text-text-secondary font-medium',
      score: 'text-h3 font-bold',
      trackHeight: 'h-2',
    },
    lg: {
      label: 'text-body-ui text-text-secondary font-medium',
      score: 'text-h2 font-bold',
      trackHeight: 'h-2.5',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={clsx('w-full space-y-1', className)}>
      <div className="flex items-center justify-between">
        <span className={currentSize.label}>Match Score</span>
        <span className={clsx(currentSize.score, getScoreTextColor(score))}>
          {score}%
        </span>
      </div>
      <div className={clsx('w-full bg-status-neutralBg rounded-full overflow-hidden', currentSize.trackHeight)}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500 ease-out', getFillColor(score))}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  );
};
