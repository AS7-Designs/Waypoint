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
  Plus 
} from 'lucide-react';

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

  const getOwnerBadge = (owner: TaskOwner) => {
    const bgMap: Record<TaskOwner, string> = {
      IT: 'bg-primary-tint text-primary',
      HR: 'bg-status-successBg text-status-successText',
      Manager: 'bg-amber-100 text-amber-800',
      'New Hire': 'bg-status-neutralBg text-status-neutralText',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-caption-ui font-semibold ${bgMap[owner]}`}>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1/3): Roster List */}
        <Card title="Active New Hires">
          <div className="space-y-3">
            {newHires.map((hire) => {
              const isSelected = hire.id === selectedHire.id;
              return (
                <div
                  key={hire.id}
                  onClick={() => setSelectedHireId(hire.id)}
                  className={`p-3.5 rounded-element border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-primary-tint border-primary shadow-sm'
                      : 'bg-surface border-border hover:bg-surface-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={hire.avatar} name={hire.name} size="md" roleRing="manager" />
                    <div>
                      <h4 className="text-body-ui font-bold text-text-primary">
                        {hire.name}
                      </h4>
                      <p className="text-caption-ui text-text-secondary font-medium">
                        {hire.role}
                      </p>
                      <span className="text-caption-ui text-text-secondary block mt-0.5">
                        Starts: {hire.startDate}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-body-ui font-bold text-primary">
                      {hire.progress}%
                    </span>
                    {hire.missingRequiredDocs && (
                      <span className="block text-caption-ui text-status-dangerText font-semibold">
                        Doc Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Column (2/3): Onboarding Details & Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar src={selectedHire.avatar} name={selectedHire.name} size="lg" />
                <div>
                  <h2 className="text-display font-bold text-text-primary">
                    {selectedHire.name}
                  </h2>
                  <p className="text-body-ui text-text-secondary font-medium">
                    {selectedHire.role} • Start Date: <span className="text-text-primary font-semibold">{selectedHire.startDate}</span>
                  </p>
                  <div className="flex items-center gap-4 text-caption-ui text-text-secondary mt-2">
                    <span>Manager: <strong className="text-text-primary">{selectedHire.manager}</strong></span>
                    <span>Onboarding Buddy: <strong className="text-text-primary">{selectedHire.buddy}</strong></span>
                  </div>
                </div>
              </div>

              {/* Progress Donut Badge */}
              <div className="flex items-center gap-4 bg-surface-muted p-3 px-5 rounded-element border border-border">
                <div className="text-center">
                  <span className="text-display font-bold text-primary block">
                    {selectedHire.progress}%
                  </span>
                  <span className="text-caption-ui font-semibold text-text-secondary uppercase">Complete</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border flex-wrap">
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
          </Card>

          {/* Missing Document Block Alert (Danger Tint) */}
          {selectedHire.missingRequiredDocs && (
            <div className="p-4 rounded-element bg-status-dangerBg border border-red-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-status-dangerText shrink-0 mt-0.5" />
              <div>
                <h4 className="text-body-ui font-bold text-status-dangerText">
                  Action Required: Required Onboarding Document Missing
                </h4>
                <p className="text-caption-ui text-red-900 mt-0.5">
                  {selectedHire.name} has not completed the required Photo ID & Tax Form upload. Subsequent onboarding steps are on hold until verified.
                </p>
              </div>
            </div>
          )}

          {/* Checklist Panel */}
          <Card>
            <Tabs
              tabs={phaseTabs}
              activeTab={activePhase}
              onChange={(p: any) => setActivePhase(p)}
              className="mb-6"
            />

            {/* Phase Task Checklist */}
            <div className="space-y-3">
              {filteredTasks.map((task) => {
                const isDone = task.status === 'Done';

                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskToggle(task.id)}
                    className={`p-4 rounded-element border flex items-center justify-between cursor-pointer transition-all ${
                      isDone
                        ? 'bg-surface-muted border-border'
                        : 'bg-surface border-border hover:border-primary/40 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button className="text-primary shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-status-successText fill-status-successBg" />
                        ) : (
                          <Circle className="w-5 h-5 text-text-disabled" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-body-ui font-semibold ${
                              isDone ? 'line-through text-text-disabled' : 'text-text-primary'
                            }`}
                          >
                            {task.title}
                          </h4>
                          {task.isRequiredDoc && (
                            <span className="text-caption-ui font-bold px-2 py-0.5 rounded-full bg-status-dangerBg text-status-dangerText">
                              Required Doc
                            </span>
                          )}
                        </div>
                        <p className="text-caption-ui text-text-secondary flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5 text-text-disabled" />
                          Due: {task.dueDate} • Owner: {getOwnerBadge(task.owner)}
                        </p>
                      </div>
                    </div>

                    <StatusPill variant={getStatusVariant(task.status)} label={task.status} />
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="text-center py-8 bg-surface-muted rounded-element text-text-secondary text-body-ui">
                  No tasks configured for {activePhase} phase.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
