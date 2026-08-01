import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, UserCheck, Shield } from 'lucide-react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] bg-bgCanvas pl-[292px] pr-8 flex items-center justify-between fixed top-0 left-0 right-0 z-20 border-b border-border/50">
      {/* Page Title */}
      <h1 className="text-[28px] leading-[36px] font-bold text-text-primary">
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
            className="w-full h-[40px] pl-10 pr-4 bg-white border border-border rounded-full text-[14px] font-medium text-text-primary placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Notifications Bell */}
        <button className="relative w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-all cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-rose rounded-full" />
        </button>

        {/* User Profile with Role Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 pl-2 cursor-pointer group focus:outline-none"
          >
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              name="Eve Baker"
              roleRing={userRole === 'Recruiter' ? 'recruiter' : 'manager'}
              size="md"
            />
            <div className="hidden md:block text-left">
              <div className="text-[14px] font-semibold text-text-primary leading-tight flex items-center gap-1 group-hover:text-primary transition-colors">
                <span>Eve Baker</span>
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
              </div>
              <div className="text-[12px] font-medium text-text-secondary">
                {userRole}
              </div>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-nested py-2 z-30 space-y-1">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-[14px] font-bold text-text-primary">Eve Baker</p>
                <p className="text-[12px] text-text-secondary">eve.baker@waypoint.co</p>
              </div>

              <div className="px-2 py-1">
                <span className="px-2 text-[11px] font-bold text-text-disabled uppercase tracking-wider block mb-1">
                  Switch Persona View
                </span>
                <button
                  onClick={() => {
                    onRoleToggle('Recruiter');
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-element text-[13px] font-semibold flex items-center justify-between transition-colors ${
                    userRole === 'Recruiter'
                      ? 'bg-primary-tint text-primary'
                      : 'text-text-primary hover:bg-surface-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" /> Recruiter / Talent
                  </span>
                  {userRole === 'Recruiter' && <span className="text-[12px] font-bold">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onRoleToggle('Hiring Manager');
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-element text-[13px] font-semibold flex items-center justify-between transition-colors ${
                    userRole === 'Hiring Manager'
                      ? 'bg-primary-tint text-primary'
                      : 'text-text-primary hover:bg-surface-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Hiring Manager
                  </span>
                  {userRole === 'Hiring Manager' && <span className="text-[12px] font-bold">✓</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
