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
    <header className="h-[72px] bg-[#F5F5FA] pl-[292px] pr-8 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
      {/* Page Title */}
      <h1 className="text-[28px] leading-[36px] font-bold text-[#111827]">
        {title}
      </h1>

      {/* Right controls */}
      <div className="flex items-center gap-5">
        {/* Global Search Pill (360px) */}
        <div className="relative w-[360px]">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates, tasks, interviews..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-white border border-[#ECECF3] rounded-full text-[14px] font-medium text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] shadow-sm transition-all"
          />
        </div>

        {/* Role Segmented Switcher */}
        <div className="flex items-center bg-[#F3F4F6] p-1 rounded-full border border-[#ECECF3]">
          <button
            onClick={() => onRoleToggle('Recruiter')}
            className={`px-3 py-1 text-[12px] font-semibold rounded-full transition-all ${
              userRole === 'Recruiter'
                ? 'bg-white text-[#4F46E5] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Recruiter
          </button>
          <button
            onClick={() => onRoleToggle('Hiring Manager')}
            className={`px-3 py-1 text-[12px] font-semibold rounded-full transition-all ${
              userRole === 'Hiring Manager'
                ? 'bg-white text-[#14B8A6] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Manager
          </button>
        </div>

        {/* Notifications Bell */}
        <button className="relative w-10 h-10 rounded-full bg-white border border-[#ECECF3] flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC] shadow-sm transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FB7185] rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#ECECF3]">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            name="Eve Baker"
            roleRing={userRole === 'Recruiter' ? 'recruiter' : 'manager'}
            size="md"
          />
          <div className="hidden md:block text-left">
            <div className="text-[14px] font-semibold text-[#111827] leading-tight flex items-center gap-1">
              <span>Eve Baker</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
            </div>
            <div className="text-[12px] font-medium text-[#6B7280]">
              {userRole}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
