import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { AppTile } from '../components/ui/AppTile';
import { StatusPill } from '../components/ui/StatusPill';
import { Avatar } from '../components/ui/Avatar';
import { ProgressRing } from '../components/ui/ProgressRing';
import { StatCard } from '../components/ui/StatCard';
import { 
  mockHiringFunnelData, 
  mockHiringSummaryData,
  mockTodoList, 
  mockActiveInterviews, 
  mockScheduleItems 
} from '../data/mockData';
import { 
  Briefcase, 
  Calendar as CalendarIcon, 
  UserPlus, 
  FileCheck, 
  MessageSquare,
  Code, 
  Send, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Video, 
  FileText, 
  Clock, 
  Plus, 
  ChevronLeft,
  Building2,
  Users,
  Phone,
  Presentation,
  TrendingUp
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TodoItem, StatusPillVariant } from '../types';

export interface DashboardViewProps {
  onNavigateToCandidate: (candidateId: string) => void;
  onNavigateToPipeline: () => void;
  onNavigateToOnboarding: () => void;
  onNavigateToJobs?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToCandidate,
  onNavigateToPipeline,
  onNavigateToOnboarding,
  onNavigateToJobs,
}) => {
  const [todos, setTodos] = useState<TodoItem[]>(mockTodoList);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState('3');

  const calendarDays = [
    { num: '1', name: 'Mo' },
    { num: '2', name: 'Tu' },
    { num: '3', name: 'We' },
    { num: '4', name: 'Th' },
    { num: '5', name: 'Fr' },
    { num: '6', name: 'Sa' },
    { num: '7', name: 'Su' },
  ];

  const workCalendarEvents = [
    {
      id: 'e1',
      title: 'Employee Safety Workshop',
      location: 'Online',
      time: '01:30 PM',
      icon: (
        <div className="w-10 h-10 rounded-element bg-blue-50 border border-blue-200/70 flex items-center justify-center shrink-0">
          <Video className="w-5 h-5 text-blue-600" />
        </div>
      ),
    },
    {
      id: 'e2',
      title: 'Team Huddle',
      location: 'Online',
      time: '08:30 AM',
      icon: (
        <div className="w-10 h-10 rounded-element bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0">
          <Video className="w-5 h-5 text-emerald-600" />
        </div>
      ),
    },
    {
      id: 'e3',
      title: 'Business Presentation',
      location: 'Conference Room',
      time: '11:00 AM',
      icon: (
        <div className="w-10 h-10 rounded-element bg-violet-50 border border-violet-200/70 flex items-center justify-center shrink-0">
          <Presentation className="w-5 h-5 text-violet-600" />
        </div>
      ),
    },
  ];

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'Done' ? 'Not Started' : 'Done',
            }
          : t
      )
    );
  };

  const getPillVariant = (status: string): StatusPillVariant => {
    switch (status) {
      case 'Done': return 'success';
      case 'Process':
      case 'In Progress': return 'progress';
      default: return 'neutral';
    }
  };

  // Top 4 prioritized quick actions (CATEGORICAL mode colors)
  const primaryQuickActions = [
    {
      id: 'qa-schedule',
      label: 'Schedule Interview',
      icon: <CalendarIcon className="w-5 h-5" />,
      bgColor: 'bg-primary-tint text-primary',
      onClick: onNavigateToPipeline,
    },
    {
      id: 'qa-add',
      label: 'Add Candidate',
      icon: <UserPlus className="w-5 h-5" />,
      bgColor: 'bg-accent-teal/15 text-accent-teal',
      onClick: onNavigateToPipeline,
    },
    {
      id: 'qa-onboard',
      label: 'Assign Onboarding',
      icon: <FileCheck className="w-5 h-5" />,
      bgColor: 'bg-accent-amber/15 text-accent-amber',
      onClick: onNavigateToOnboarding,
    },
    {
      id: 'qa-post',
      label: 'Post a Job',
      icon: <Briefcase className="w-5 h-5" />,
      bgColor: 'bg-accent-violet/15 text-accent-violet',
      onClick: () => onNavigateToJobs ? onNavigateToJobs() : alert('Post a Job action'),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Row 0: Top-line StatCard KPI summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Open Roles"
          value={12}
          delta={{ value: "2 this month", isPositive: true }}
          helperText="vs last month"
          sparklineData={[8, 9, 10, 11, 10, 12]}
        />
        <StatCard
          label="Active Candidates"
          value={48}
          delta={{ value: "8 this month", isPositive: true }}
          helperText="vs last month"
          sparklineData={[32, 35, 40, 42, 45, 48]}
        />
        <StatCard
          label="Interviews Scheduled"
          value={18}
          delta={{ value: "4 this month", isPositive: true }}
          helperText="vs last month"
          sparklineData={[12, 14, 13, 16, 15, 18]}
        />
        <StatCard
          label="Offers Sent"
          value={6}
          delta={{ value: "1 this month", isPositive: true }}
          helperText="vs last month"
          sparklineData={[4, 3, 5, 4, 5, 6]}
        />
      </div>

      {/* Row 1: Quick Actions (4 prioritized items) */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-bold text-text-primary">Quick Actions</h2>
          </div>
        }
        action={
          <button 
            onClick={onNavigateToPipeline}
            className="text-[14px] font-semibold text-primary hover:underline flex items-center gap-1"
          >
            See all
          </button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryQuickActions.map((action) => (
            <AppTile
              key={action.id}
              label={action.label}
              icon={action.icon}
              bgColor={action.bgColor}
              onClick={action.onClick}
            />
          ))}
        </div>
      </Card>

      {/* Row 2: Hiring Funnel Chart (2/3) + To-do List (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hiring Funnel Summary Area Chart (matches Attendance Summary reference design) */}
        <Card
          className="lg:col-span-2 flex flex-col justify-between"
          title={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-element border border-border bg-white flex items-center justify-center text-text-primary shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-[18px] leading-[26px] font-bold text-text-primary">
                Hiring Funnel Summary
              </h2>
            </div>
          }
          action={
            <button
              onClick={onNavigateToPipeline}
              className="text-[14px] font-semibold text-primary hover:underline cursor-pointer"
            >
              See Detail
            </button>
          }
        >
          {/* Metrics & Legend Top Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-border/40">
            {/* KPI 1 & KPI 2 */}
            <div className="flex items-center gap-8 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[24px] font-bold text-text-primary leading-none">75.4%</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[12px] font-bold">
                    2.8% ↑
                  </span>
                </div>
                <span className="text-[12px] font-medium text-text-secondary mt-1 block">
                  Offer Acceptance Rate
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[24px] font-bold text-text-primary leading-none">1,349</span>
                  <span className="text-text-disabled text-[14px] font-medium">/ 1,597</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[12px] font-bold">
                    1.2% ↑
                  </span>
                </div>
                <span className="text-[12px] font-medium text-text-secondary mt-1 block">
                  Active Pipeline Total
                </span>
              </div>
            </div>

            {/* Right Legend Items with Top Pill Markers */}
            <div className="flex items-center gap-6 sm:ml-auto">
              <div className="text-center">
                <div className="w-7 h-1.5 rounded-full bg-primary mx-auto mb-1" />
                <span className="text-[11px] font-medium text-text-secondary block">Applied</span>
                <span className="text-[14px] font-bold text-text-primary">65%</span>
              </div>
              <div className="text-center">
                <div className="w-7 h-1.5 rounded-full bg-emerald-500 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-text-secondary block">Screened</span>
                <span className="text-[14px] font-bold text-text-primary">25%</span>
              </div>
              <div className="text-center">
                <div className="w-7 h-1.5 rounded-full bg-amber-500 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-text-secondary block">Hired</span>
                <span className="text-[14px] font-bold text-text-primary">10%</span>
              </div>
            </div>
          </div>

          {/* Smooth Wave Area Chart */}
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockHiringSummaryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="appliedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="screenedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="hiredGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#E2E8F0"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  stroke="#E2E8F0"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                  domain={[0, 800]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    borderColor: '#E2E8F0',
                    boxShadow: 'none',
                    fontSize: '13px',
                    padding: '10px 14px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applied"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#appliedGrad)"
                  name="Applied"
                />
                <Area
                  type="monotone"
                  dataKey="screened"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#screenedGrad)"
                  name="Screened"
                />
                <Area
                  type="monotone"
                  dataKey="hired"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#hiredGrad)"
                  name="Hired"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* To-Do List Card */}
        <Card title="To-do list">
          <div className="space-y-3.5">
            {todos.map((todo) => {
              const isDone = todo.status === 'Done';
              return (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className="flex items-center justify-between p-3 rounded-element hover:bg-surface-muted border border-border cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="text-primary shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-status-successText fill-status-successBg" />
                      ) : (
                        <Circle className="w-5 h-5 text-text-disabled group-hover:text-primary" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-semibold truncate text-text-primary">
                        {todo.title}
                      </h4>
                      <p className="text-[12px] text-text-secondary flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-text-disabled" />
                        {todo.timestamp}
                      </p>
                    </div>
                  </div>

                  <StatusPill variant={getPillVariant(todo.status)} label={todo.status} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 3: Active Interviews (1/3) + Onboarding Donut (1/3) + Calendar & Schedule (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Interviews / Training List */}
        <Card
          title="Active Interviews"
          action={
            <button
              onClick={onNavigateToPipeline}
              className="text-[14px] font-semibold text-primary hover:underline"
            >
              View Pipeline
            </button>
          }
        >
          <div className="space-y-3">
            {mockActiveInterviews.map((interview) => (
              <div
                key={interview.id}
                onClick={() => onNavigateToCandidate('c1')}
                className="flex items-center justify-between p-3 rounded-element bg-surface-muted border border-border hover:border-primary/30 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-element bg-white border border-border flex items-center justify-center text-primary shrink-0">
                    {interview.type === 'Onsite' ? (
                      <Building2 className="w-4 h-4" />
                    ) : interview.type === 'Panel' ? (
                      <Users className="w-4 h-4" />
                    ) : interview.type === 'Technical' ? (
                      <Code className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-text-primary">
                      ({interview.type}) {interview.candidateName}
                    </h4>
                    <p className="text-[12px] text-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3 text-text-disabled" />
                      {interview.time}
                    </p>
                  </div>
                </div>

                <StatusPill variant={getPillVariant(interview.status)} label={interview.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Onboarding Completion Donut */}
        <Card title="Onboarding Completion">
          <ProgressRing percentage={77} title="Onboarded" />
        </Card>

        {/* Work Calendar Card */}
        <Card
          title={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-element border border-border bg-white flex items-center justify-center text-text-primary shrink-0">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] leading-[26px] font-bold text-text-primary">
                Work Calendar
              </h2>
            </div>
          }
        >
          {/* Days Strip with Day Numbers on top and Day Names below */}
          <div className="border-b border-border pb-3 mb-4">
            <div className="grid grid-cols-7 text-center">
              {calendarDays.map((d) => {
                const isSelected = d.num === selectedCalendarDay;
                return (
                  <button
                    key={d.num}
                    onClick={() => setSelectedCalendarDay(d.num)}
                    className="flex flex-col items-center py-0.5 cursor-pointer group select-none"
                  >
                    <span
                      className={`w-8 h-8 rounded-element flex items-center justify-center text-[14px] font-semibold transition-all mb-1 ${
                        isSelected
                          ? 'bg-primary-tint text-primary font-bold'
                          : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {d.num}
                    </span>
                    <span
                      className={`text-[12px] font-semibold transition-all relative pb-2 ${
                        isSelected
                          ? 'text-primary font-bold'
                          : 'text-text-disabled group-hover:text-text-secondary'
                      }`}
                    >
                      {d.name}
                      {isSelected && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-primary rounded-full" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Cards List */}
          <div className="space-y-3">
            {workCalendarEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => alert(`Opening event: ${event.title}`)}
                className="p-3.5 rounded-nested border border-border bg-white hover:border-primary/40 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {event.icon}
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-bold text-text-primary truncate group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-[12px] font-medium text-text-secondary mt-0.5 flex items-center gap-1.5 truncate">
                      <span>{event.location}</span>
                      <span className="w-1 h-1 rounded-full bg-text-disabled shrink-0" />
                      <span>{event.time}</span>
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-text-disabled group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
