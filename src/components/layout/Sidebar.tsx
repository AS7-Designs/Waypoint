import React from 'react';
import { 
  LayoutDashboard, 
  GitPullRequest, 
  CheckSquare, 
  Calendar, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { clsx } from 'clsx';

export type NavView = 'dashboard' | 'pipeline' | 'onboarding' | 'candidate-profile';

export interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const mainMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline & Hiring', icon: GitPullRequest },
    { id: 'onboarding', label: 'Onboarding Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Schedule', icon: Calendar },
  ];

  const othersMenu = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-[#ECECF3] flex flex-col fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="h-[72px] px-6 flex items-center gap-3 border-b border-[#ECECF3]">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="10" fill="#4F46E5"/>
          <path d="M10 22C10 22 13 14 18 14C23 14 26 22 26 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 5"/>
          <circle cx="10" cy="22" r="2.5" fill="white"/>
          <circle cx="18" cy="14" r="2.5" fill="#C7D2FE"/>
          <circle cx="26" cy="22" r="3.5" fill="#14B8A6" stroke="white" strokeWidth="1.5"/>
        </svg>
        <span className="text-[20px] font-bold text-[#111827] tracking-tight">
          Waypoint
        </span>
      </div>

      {/* Nav Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-8">
        {/* Main Menu */}
        <div>
          <div className="px-3 text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'pipeline' && currentView === 'candidate-profile');

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as NavView)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[14px] font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-[#EEF0FD] text-[#4F46E5]'
                      : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC]'
                  )}
                >
                  <Icon className={clsx('w-5 h-5', isActive ? 'text-[#4F46E5]' : 'text-[#6B7280]')} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Others */}
        <div>
          <div className="px-3 text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
            Others
          </div>
          <nav className="space-y-1">
            {othersMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => alert(`Navigating to ${item.label}`)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC] transition-all duration-150"
                >
                  <Icon className="w-5 h-5 text-[#6B7280]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Log Out */}
      <div className="p-4 border-t border-[#ECECF3]">
        <button
          onClick={() => onNavigate('auth' as any)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEE2E2]/50 transition-all duration-150"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
