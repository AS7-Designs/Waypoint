import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export interface TopBarProps {
  title: string;
  userRole: 'Recruiter' | 'Hiring Manager';
  onRoleToggle: (role: 'Recruiter' | 'Hiring Manager') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  userRole,
  onRoleToggle,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="h-[72px] bg-bgCanvas pl-[292px] pr-8 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
      {/* Page Title */}
      <h1 className="text-display text-text-primary">
        {title}
      </h1>

      {/* Right controls */}
      <div className="flex items-center gap-5">
        {/* Global Search Pill (360px) */}
        <div className="relative w-[360px]">
          <Search className="w-4 h-4 text-text-disabled absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates, tasks, interviews..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-surface border border-border rounded-full text-body-ui text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
          />
        </div>

        {/* Role Segmented Switcher */}
        <div className="flex items-center bg-status-neutralBg p-1 rounded-full border border-border">
          <button
            onClick={() => onRoleToggle('Recruiter')}
            className={`px-3 py-1 text-caption-ui font-semibold rounded-full transition-all ${
              userRole === 'Recruiter'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Recruiter
          </button>
          <button
            onClick={() => onRoleToggle('Hiring Manager')}
            className={`px-3 py-1 text-caption-ui font-semibold rounded-full transition-all ${
              userRole === 'Hiring Manager'
                ? 'bg-surface text-accent-teal shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Manager
          </button>
        </div>

        {/* Notifications Bell */}
        <button className="relative w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-muted shadow-sm transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-rose rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-border">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            name="Eve Baker"
            roleRing={userRole === 'Recruiter' ? 'recruiter' : 'manager'}
            size="md"
          />
          <div className="hidden md:block text-left">
            <div className="text-body-ui font-semibold text-text-primary leading-tight flex items-center gap-1">
              <span>Eve Baker</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            </div>
            <div className="text-caption-ui text-text-secondary">
              {userRole}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
