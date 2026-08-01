import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { StatusPill } from '../components/ui/StatusPill';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { ProgressRing } from '../components/ui/ProgressRing';
import { NewHire, OnboardingPhase, OnboardingTask, StatusPillVariant, TaskOwner } from '../types';
import { mockNewHires } from '../data/mockData';
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Mail, 
  FileText, 
  Calendar, 
  UserCheck, 
  ShieldAlert, 
  Clock, 
  Plus,
  Users,
  ClipboardCheck,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

/* ── Mini progress ring (SVG) for the hire roster ─────────── */
const MiniRing: React.FC<{ pct: number; size?: number }> = ({ pct, size = 36 }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const color = pct >= 75 ? '#10B981' : pct >= 50 ? '#4F46E5' : '#F59E0B';
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ECECF3" strokeWidth="4" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="#111827" fontSize="10" fontWeight="700">
        {pct}%
      </text>
    </svg>
  );
};

export const OnboardingView: React.FC = () => {
  const [newHires, setNewHires] = useState<NewHire[]>(mockNewHires);
  const [selectedHireId, setSelectedHireId] = useState<string>(mockNewHires[0].id);
  const [activePhase, setActivePhase] = useState<OnboardingPhase>('Pre-boarding');

  const selectedHire = newHires.find((h) => h.id === selectedHireId) || newHires[0];

  const handleTaskToggle = (taskId: string) => {
    setNewHires((prev) =>
      prev.map((hire) => {
        if (hire.id !== selectedHire.id) return hire;

        const updatedTasks = hire.tasks.map((t) => {
          if (t.id === taskId) {
            const nextStatus = t.status === 'Done' ? 'Not Started' : 'Done';
            return { ...t, status: nextStatus as any };
          }
          return t;
        });

        const doneCount = updatedTasks.filter((t) => t.status === 'Done').length;
        const newProgress = Math.round((doneCount / updatedTasks.length) * 100);

        const hasMissingRequired = updatedTasks.some(
          (t) => t.isRequiredDoc && t.status !== 'Done'
        );

        return {
          ...hire,
          tasks: updatedTasks,
          progress: newProgress,
          missingRequiredDocs: hasMissingRequired,
        };
      })
    );
  };

  const phaseTabs = [
    { id: 'Pre-boarding', label: 'Pre-boarding' },
    { id: 'Day 1', label: 'Day 1' },
    { id: 'Week 1', label: 'Week 1' },
    { id: 'Month 1', label: 'Month 1' },
  ];

  const filteredTasks = selectedHire.tasks.filter((t) => t.phase === activePhase);
  const doneTasks = filteredTasks.filter((t) => t.status === 'Done').length;
  const phasePct = filteredTasks.length > 0 ? Math.round((doneTasks / filteredTasks.length) * 100) : 100;

  // Overall stats
  const totalTasks = selectedHire.tasks.length;
  const totalDone = selectedHire.tasks.filter((t) => t.status === 'Done').length;
  const totalPending = selectedHire.tasks.filter((t) => t.status === 'Not Started').length;
  const totalInProgress = selectedHire.tasks.filter((t) => t.status === 'Process').length;

  const getOwnerBadge = (owner: TaskOwner) => {
    const bgMap: Record<TaskOwner, string> = {
      IT: 'bg-status-progressBg text-primary',
      HR: 'bg-status-successBg text-status-successText',
      Manager: 'bg-accent-amber/15 text-accent-amber',
      'New Hire': 'bg-status-neutralBg text-text-secondary',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${bgMap[owner]}`}>
        {owner}
      </span>
    );
  };

  const getStatusVariant = (status: string): StatusPillVariant => {
    switch (status) {
      case 'Done': return 'success';
      case 'Process': return 'progress';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Summary stat cards across the top ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-element border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-tint flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="text-[22px] font-bold text-text-primary block leading-tight">{newHires.length}</span>
            <span className="text-[12px] font-medium text-text-secondary">Active New Hires</span>
          </div>
        </div>
        <div className="bg-white rounded-element border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-status-successBg flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-status-successText" />
          </div>
          <div>
            <span className="text-[22px] font-bold text-text-primary block leading-tight">{totalDone}</span>
            <span className="text-[12px] font-medium text-text-secondary">Tasks Completed</span>
          </div>
        </div>
        <div className="bg-white rounded-element border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-amber/15 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-accent-amber" />
          </div>
          <div>
            <span className="text-[22px] font-bold text-text-primary block leading-tight">{totalPending + totalInProgress}</span>
            <span className="text-[12px] font-medium text-text-secondary">Tasks Remaining</span>
          </div>
        </div>
        <div className="bg-white rounded-element border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-status-dangerBg flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-status-dangerText" />
          </div>
          <div>
            <span className="text-[22px] font-bold text-text-primary block leading-tight">
              {newHires.filter((h) => h.missingRequiredDocs).length}
            </span>
            <span className="text-[12px] font-medium text-text-secondary">Docs Pending</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── Left Column (1/3): Roster ── */}
        <Card title="Active New Hires">
          <div className="space-y-2">
            {newHires.map((hire) => {
              const isSelected = hire.id === selectedHire.id;
              return (
                <div
                  key={hire.id}
                  onClick={() => setSelectedHireId(hire.id)}
                  className={`p-3 rounded-nested border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-primary-tint border-primary font-semibold'
                      : 'bg-white border-border hover:bg-surface-muted'
                  }`}
                >
                  <Avatar src={hire.avatar} name={hire.name} size="sm" roleRing="manager" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[13px] font-bold text-text-primary truncate">
                        {hire.name}
                      </h4>
                      {hire.missingRequiredDocs && (
                        <span className="w-2 h-2 rounded-full bg-status-dangerText shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-text-secondary font-medium truncate">
                      {hire.role} • {hire.startDate}
                    </p>
                  </div>
                  <MiniRing pct={hire.progress} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── Right Column (2/3): Onboarding Details ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header row with progress ring */}
          <Card>
            <div className="flex items-start gap-5">
              <Avatar src={selectedHire.avatar} name={selectedHire.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[22px] font-bold text-text-primary leading-tight">
                      {selectedHire.name}
                    </h2>
                    <p className="text-[14px] text-text-secondary font-medium mt-0.5">
                      {selectedHire.role} • Start Date: <span className="text-text-primary font-semibold">{selectedHire.startDate}</span>
                    </p>
                  </div>
                  <MiniRing pct={selectedHire.progress} size={64} />
                </div>

                {/* Metadata row */}
                <div className="flex items-center gap-5 text-[12px] text-text-secondary mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-text-disabled" />
                    Manager: <strong className="text-text-primary">{selectedHire.manager}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-text-disabled" />
                    Buddy: <strong className="text-text-primary">{selectedHire.buddy}</strong>
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Mail className="w-3.5 h-3.5 text-primary" />}
                    onClick={() => alert(`Welcome email dispatched to ${selectedHire.name}!`)}
                  >
                    Send Welcome Email
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<FileText className="w-3.5 h-3.5 text-primary" />}
                    onClick={() => alert(`Viewing signed offer letter for ${selectedHire.name}...`)}
                  >
                    View Offer Letter
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Missing Document Alert */}
          {selectedHire.missingRequiredDocs && (
            <div className="p-3.5 rounded-nested bg-status-dangerBg border border-status-dangerText/30 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-status-dangerText shrink-0" />
              <div className="flex-1">
                <h4 className="text-[13px] font-bold text-status-dangerText">
                  Required Document Missing
                </h4>
                <p className="text-[12px] text-status-dangerText/80 mt-0.5">
                  {selectedHire.name} has not completed the required Photo ID & Tax Form upload.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => alert('Sending reminder...')}>
                Send Reminder
              </Button>
            </div>
          )}

          {/* Checklist Card */}
          <Card>
            {/* Phase tabs + phase progress bar in same row */}
            <div className="flex items-center justify-between gap-4 mb-5">
              <Tabs
                tabs={phaseTabs}
                activeTab={activePhase}
                onChange={(p: any) => setActivePhase(p)}
              />
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${phasePct}%`,
                      backgroundColor: phasePct === 100 ? '#10B981' : '#4F46E5',
                    }}
                  />
                </div>
                <span className="text-[12px] font-bold text-primary whitespace-nowrap">{phasePct}%</span>
              </div>
            </div>

            {/* Task list */}
            <div className="space-y-2">
              {filteredTasks.map((task) => {
                const isDone = task.status === 'Done';

                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskToggle(task.id)}
                    className={`group p-3.5 rounded-nested border flex items-center gap-3 cursor-pointer transition-all ${
                      isDone
                        ? 'bg-surface-muted/60 border-border'
                        : 'bg-white border-border hover:border-primary/40'
                    }`}
                  >
                    {/* Checkbox */}
                    <button className="shrink-0 mt-0.5">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-status-successText fill-status-successBg" />
                      ) : (
                        <Circle className="w-5 h-5 text-text-disabled group-hover:text-primary transition-colors" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4
                          className={`text-[13px] font-semibold ${
                            isDone ? 'line-through text-text-disabled' : 'text-text-primary'
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.isRequiredDoc && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-status-dangerBg text-status-dangerText uppercase tracking-wide">
                            Required
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-text-disabled" />
                          {task.dueDate}
                        </span>
                        {getOwnerBadge(task.owner)}
                      </div>
                    </div>

                    {/* Status */}
                    <StatusPill variant={getStatusVariant(task.status)} label={task.status} />
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="text-center py-10 bg-surface-muted rounded-nested">
                  <ClipboardCheck className="w-8 h-8 text-text-disabled mx-auto mb-2" />
                  <p className="text-[14px] font-semibold text-text-primary">No tasks for this phase</p>
                  <p className="text-[12px] text-text-secondary mt-0.5">Tasks for {activePhase} haven't been configured yet.</p>
                </div>
              )}
            </div>

            {/* Phase footer */}
            {filteredTasks.length > 0 && (
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border text-[12px] text-text-secondary">
                <span className="font-medium">
                  {doneTasks} of {filteredTasks.length} {activePhase} tasks completed
                </span>
                <span className={`font-bold ${phasePct === 100 ? 'text-status-successText' : 'text-primary'}`}>
                  {phasePct === 100 ? '✓ Phase Complete' : `${phasePct}% Phase Completion`}
                </span>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
