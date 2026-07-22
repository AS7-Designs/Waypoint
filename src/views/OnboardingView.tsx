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
      IT: 'bg-[#E0E7FF] text-[#4F46E5]',
      HR: 'bg-[#DCFCE7] text-[#16A34A]',
      Manager: 'bg-[#FEF3C7] text-[#D97706]',
      'New Hire': 'bg-[#F3F4F6] text-[#6B7280]',
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
                  className={`p-3.5 rounded-[16px] border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#EEF0FD] border-[#4F46E5] shadow-sm'
                      : 'bg-white border-[#ECECF3] hover:bg-[#F8F9FC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={hire.avatar} name={hire.name} size="md" roleRing="manager" />
                    <div>
                      <h4 className="text-[14px] font-bold text-[#111827]">
                        {hire.name}
                      </h4>
                      <p className="text-[12px] text-[#6B7280] font-medium">
                        {hire.role}
                      </p>
                      <span className="text-[11px] text-[#6B7280] block mt-0.5">
                        Starts: {hire.startDate}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#4F46E5]">
                      {hire.progress}%
                    </span>
                    {hire.missingRequiredDocs && (
                      <span className="block text-[10px] text-[#DC2626] font-semibold">
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
                  <h2 className="text-[22px] font-bold text-[#111827]">
                    {selectedHire.name}
                  </h2>
                  <p className="text-[14px] text-[#6B7280] font-medium">
                    {selectedHire.role} • Start Date: <span className="text-[#111827] font-semibold">{selectedHire.startDate}</span>
                  </p>
                  <div className="flex items-center gap-4 text-[12px] text-[#6B7280] mt-2">
                    <span>Manager: <strong className="text-[#111827]">{selectedHire.manager}</strong></span>
                    <span>Onboarding Buddy: <strong className="text-[#111827]">{selectedHire.buddy}</strong></span>
                  </div>
                </div>
              </div>

              {/* Progress Donut Badge */}
              <div className="flex items-center gap-4 bg-[#F8F9FC] p-3 px-5 rounded-[16px] border border-[#ECECF3]">
                <div className="text-center">
                  <span className="text-[24px] font-bold text-[#4F46E5] block">
                    {selectedHire.progress}%
                  </span>
                  <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Complete</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[#ECECF3] flex-wrap">
              <Button
                variant="secondary"
                size="sm"
                icon={<Mail className="w-3.5 h-3.5 text-[#4F46E5]" />}
                onClick={() => alert(`Welcome email dispatched to ${selectedHire.name}!`)}
              >
                Send Welcome Email
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<FileText className="w-3.5 h-3.5 text-[#4F46E5]" />}
                onClick={() => alert(`Viewing signed offer letter for ${selectedHire.name}...`)}
              >
                View Offer Letter
              </Button>
            </div>
          </Card>

          {/* Missing Document Block Alert (Danger Tint) */}
          {selectedHire.missingRequiredDocs && (
            <div className="p-4 rounded-[16px] bg-[#FEE2E2] border border-[#FCA5A5] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[14px] font-bold text-[#DC2626]">
                  Action Required: Required Onboarding Document Missing
                </h4>
                <p className="text-[13px] text-[#991B1B] mt-0.5">
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
                    className={`p-4 rounded-[16px] border flex items-center justify-between cursor-pointer transition-all ${
                      isDone
                        ? 'bg-[#F8F9FC] border-[#ECECF3]'
                        : 'bg-white border-[#ECECF3] hover:border-[#4F46E5]/40 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button className="text-[#4F46E5] shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#16A34A] fill-[#DCFCE7]" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#9CA3AF]" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-[14px] font-semibold ${
                              isDone ? 'line-through text-[#9CA3AF]' : 'text-[#111827]'
                            }`}
                          >
                            {task.title}
                          </h4>
                          {task.isRequiredDoc && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626]">
                              Required Doc
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-[#6B7280] flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          Due: {task.dueDate} • Owner: {getOwnerBadge(task.owner)}
                        </p>
                      </div>
                    </div>

                    <StatusPill variant={getStatusVariant(task.status)} label={task.status} />
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="text-center py-8 bg-[#F8F9FC] rounded-[16px] text-[#6B7280] text-[14px]">
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
