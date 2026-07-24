import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { AppTile } from '../components/ui/AppTile';
import { StatusPill } from '../components/ui/StatusPill';
import { Avatar } from '../components/ui/Avatar';
import { ProgressRing } from '../components/ui/ProgressRing';
import { StatCard } from '../components/ui/StatCard';
import { 
  mockHiringFunnelData, 
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
  Phone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
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
        {/* Hiring Funnel Bar Chart */}
        <Card
          className="lg:col-span-2 flex flex-col justify-between"
          title="Hiring Funnel"
          action={
            <button className="text-[14px] font-semibold text-primary hover:bg-primary-tint px-3 py-1.5 rounded-element transition-colors">
              Month ▾
            </button>
          }
        >
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockHiringFunnelData} barGap={8} barSize={14}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#78716C', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#78716C', fontSize: 12, fontWeight: 500 }}
                  domain={[0, 80]}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(245, 242, 237, 0.6)' }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    borderColor: '#EAE5DC',
                    boxShadow: '0 4px 12px rgba(28,25,23,0.08)',
                    fontSize: '13px',
                  }}
                />
                <Bar dataKey="applied" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Applied" />
                <Bar dataKey="hired" fill="#C7D2FE" radius={[6, 6, 0, 0]} name="Hired" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-[12px] font-medium text-text-secondary">Applied</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-tint2" />
              <span className="text-[12px] font-medium text-text-secondary">Hired</span>
            </div>
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

        {/* Calendar & Schedule Card */}
        <Card title="Calendar">
          {/* Mini Calendar Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-bold text-text-primary">July 2025</span>
              <div className="flex items-center gap-1 text-text-secondary">
                <button className="p-1 hover:bg-status-neutralBg rounded-full">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-status-neutralBg rounded-full">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days strip */}
            <div className="grid grid-cols-7 text-center gap-1 text-[12px] font-semibold text-text-secondary">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div className="grid grid-cols-7 text-center gap-1 text-[12px] font-medium text-text-primary mt-2">
              <span className="py-1">5</span>
              <span className="py-1">6</span>
              <span className="py-1">7</span>
              <span className="py-1 bg-primary text-white rounded-full font-bold">8</span>
              <span className="py-1">9</span>
              <span className="py-1">10</span>
              <span className="py-1">11</span>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-bold text-text-primary">Schedule</h3>
              <button className="p-1 text-primary hover:bg-primary-tint rounded-full">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {mockScheduleItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-nested flex items-center justify-between border transition-all ${
                    item.type === 'interview'
                      ? 'bg-primary-tint border-primary-tint2 text-primary'
                      : 'bg-accent-amber/15 border-accent-amber/30 text-accent-amber'
                  }`}
                >
                  <div>
                    <h4 className="text-[14px] font-bold text-text-primary">
                      {item.title}
                    </h4>
                    <p className="text-[12px] font-medium opacity-80 mt-0.5">
                      {item.time}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
