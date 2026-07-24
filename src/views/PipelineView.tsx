import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { StatusPill } from '../components/ui/StatusPill';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Drawer';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { Candidate, PipelineStage } from '../types';
import { mockCandidates } from '../data/mockData';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Star, 
  Clock, 
  UserPlus, 
  ChevronRight, 
  Check, 
  ArrowRight,
  GripVertical
} from 'lucide-react';

export interface PipelineViewProps {
  onSelectCandidate: (candidate: Candidate) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ onSelectCandidate }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Drag & Drop State
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);

  // Filters
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add Candidate Form state
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateRole, setNewCandidateRole] = useState('Senior Product Designer');
  const [newCandidateEmail, setNewCandidateEmail] = useState('');

  // Schedule Interview state inside drawer
  const [interviewType, setInterviewType] = useState<'Phone' | 'Technical' | 'Onsite' | 'Panel'>('Technical');
  const [interviewDate, setInterviewDate] = useState('2025-07-12T10:00');
  const [interviewer, setInterviewer] = useState('Michael Chang');
  
  // Scorecard state
  const [scoreRating, setScoreRating] = useState(4);
  const [scoreStrengths, setScoreStrengths] = useState('');
  const [scoreConcerns, setScoreConcerns] = useState('');
  const [scoreRecommend, setScoreRecommend] = useState(true);

  const stages: { stage: PipelineStage; avgDays: number }[] = [
    { stage: 'Applied', avgDays: 3 },
    { stage: 'Screening', avgDays: 2 },
    { stage: 'Interview', avgDays: 5 },
    { stage: 'Offer', avgDays: 2 },
    { stage: 'Hired', avgDays: 1 },
  ];

  const handleCardClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const handleMoveStage = (candidateId: string, newStage: PipelineStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage, daysInStage: 0 } : c))
    );
  };

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    e.dataTransfer.setData('text/plain', candidateId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCandidateId(candidateId);
  };

  const handleDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStage !== stage) {
      setDragOverStage(stage);
    }
  };

  const handleDragLeave = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (dragOverStage === stage) {
      setDragOverStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain') || draggedCandidateId;
    if (candidateId) {
      handleMoveStage(candidateId, targetStage);
    }
    setDraggedCandidateId(null);
    setDragOverStage(null);
  };

  const handleDragEnd = () => {
    setDraggedCandidateId(null);
    setDragOverStage(null);
  };

  const handleAddCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidateName || !newCandidateEmail) return;

    const newC: Candidate = {
      id: `c_${Date.now()}`,
      name: newCandidateName,
      email: newCandidateEmail,
      role: newCandidateRole,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
      stage: 'Applied',
      appliedDate: 'Just now',
      recruiter: 'Eve Baker',
      source: 'Direct Add',
      tags: ['New Candidate'],
      daysInStage: 0,
      scorecards: [],
    };

    setCandidates([newC, ...candidates]);
    setIsAddModalOpen(false);
    setNewCandidateName('');
    setNewCandidateEmail('');
  };

  const handleSaveScorecard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    const newScorecard = {
      id: `sc_${Date.now()}`,
      candidateId: selectedCandidate.id,
      interviewerName: interviewer,
      interviewerRole: 'Interviewer',
      rating: scoreRating,
      strengths: scoreStrengths || 'Strong technical baseline.',
      concerns: scoreConcerns || 'None reported.',
      recommendHire: scoreRecommend,
      date: 'Today',
    };

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id
          ? {
              ...c,
              scorecards: [newScorecard, ...c.scorecards],
              hasOverdueFeedback: false,
            }
          : c
      )
    );

    setIsDrawerOpen(false);
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesRole = roleFilter === 'All' || c.role === roleFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar with Filters & Add Candidate */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-text-disabled absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter pipeline candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[36px] pl-9 pr-3 bg-white border border-border rounded-full text-[14px] font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-caption-ui font-semibold text-text-secondary flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Role:
            </span>
            <SegmentedControl
              options={['All', 'Senior Product Designer', 'UX Researcher', 'Frontend Engineer'].map((r) => ({
                value: r,
                label: r === 'All' ? 'All Roles' : r.split(' ')[0],
              }))}
              value={roleFilter}
              onChange={setRoleFilter}
              size="sm"
            />
          </div>
        </div>

        {/* Primary Add Button */}
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Candidate
        </Button>
      </div>

      {/* Kanban Board Columns with Drag & Drop */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start select-none">
        {stages.map(({ stage, avgDays }) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);
          const isTargetStage = dragOverStage === stage;

          return (
            <div
              key={stage}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={(e) => handleDragLeave(e, stage)}
              onDrop={(e) => handleDrop(e, stage)}
              className={`p-3.5 rounded-card border transition-all duration-200 min-h-[520px] flex flex-col justify-between ${
                isTargetStage
                  ? 'bg-primary-tint/40 border-primary ring-2 ring-primary/40 shadow-md scale-[1.01]'
                  : 'bg-white border-border shadow-card'
              }`}
            >
              <div>
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-bold text-text-primary">{stage}</h3>
                    <span className="w-5 h-5 rounded-full bg-primary-tint text-primary text-[12px] font-bold flex items-center justify-center">
                      {stageCandidates.length}
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-text-disabled">
                    avg {avgDays}d
                  </span>
                </div>

                {/* Column Cards List */}
                <div className="space-y-3">
                  {stageCandidates.map((candidate) => {
                    const isDraggingThis = draggedCandidateId === candidate.id;

                    return (
                      <div
                        key={candidate.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, candidate.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleCardClick(candidate)}
                        className={`bg-surface-muted p-4 rounded-nested border transition-all cursor-grab active:cursor-grabbing group relative ${
                          isDraggingThis
                            ? 'opacity-40 border-dashed border-primary bg-primary-tint/30 scale-[0.98]'
                            : 'border-border hover:border-primary/40 hover:bg-white hover:shadow-card'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar src={candidate.avatar} name={candidate.name} size="sm" />
                            <div>
                              <h4 className="text-[14px] font-bold text-text-primary group-hover:text-primary transition-colors flex items-center gap-1">
                                {candidate.name}
                              </h4>
                              <p className="text-[12px] text-text-secondary font-medium">
                                {candidate.role}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-text-disabled group-hover:text-primary transition-colors p-0.5" title="Drag to move card">
                            <GripVertical className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {candidate.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-status-neutralBg text-text-secondary text-[12px] font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Attention Pill if overdue feedback */}
                        {candidate.hasOverdueFeedback && (
                          <div className="mb-2">
                            <StatusPill variant="danger" label="Overdue Feedback" />
                          </div>
                        )}

                        {/* Footer / Quick move stage dropdown & profile link */}
                        <div className="flex items-center justify-between border-t border-border pt-2 mt-2 text-[12px] text-text-secondary">
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <span className="text-[11px] text-text-disabled font-medium">Move:</span>
                            <select
                              value={candidate.stage}
                              onChange={(e) => handleMoveStage(candidate.id, e.target.value as PipelineStage)}
                              className="h-6 text-[11px] font-semibold bg-white border border-border rounded-element text-primary px-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50"
                            >
                              {stages.map((s) => (
                                <option key={s.stage} value={s.stage}>
                                  {s.stage}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCandidate(candidate);
                            }}
                            className="text-primary font-semibold hover:underline flex items-center gap-0.5"
                          >
                            Profile <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {stageCandidates.length === 0 && (
                    <EmptyState
                      icon={<UserPlus className="w-5 h-5 text-primary" />}
                      title={`No candidates in ${stage}`}
                      description="Add a candidate or drag one here"
                      actionLabel="+ Add Candidate"
                      onAction={() => setIsAddModalOpen(true)}
                      className="py-8 px-3 my-2"
                    />
                  )}
                </div>
              </div>

              {/* High-contrast, readable Add candidate button at column bottom */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full mt-3 py-2.5 px-3 rounded-nested bg-primary-tint/60 text-primary hover:bg-primary-tint hover:border-primary/50 border border-dashed border-primary/40 transition-all flex items-center justify-center gap-1.5 text-[13px] font-semibold shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-primary shrink-0" />
                <span>Add candidate</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Right Drawer: Candidate Quick Actions & Scorecard Submission */}
      {selectedCandidate && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={`Manage ${selectedCandidate.name}`}
        >
          <div className="space-y-6">
            {/* Stage Quick Advancement */}
            <div className="bg-surface-muted p-4 rounded-nested border border-border">
              <label className="text-[12px] font-semibold text-text-secondary uppercase block mb-2">
                Move Stage
              </label>
              <SegmentedControl
                options={stages.map((s) => ({ value: s.stage, label: s.stage }))}
                value={selectedCandidate.stage}
                onChange={(v) => handleMoveStage(selectedCandidate.id, v as any)}
                className="w-full"
                size="sm"
              />
            </div>

            {/* Schedule Interview Section */}
            <div className="space-y-3">
              <h3 className="text-[16px] font-bold text-text-primary flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" /> Schedule Next Round
              </h3>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Interview Type</label>
                <select
                  value={interviewType}
                  onChange={(e: any) => setInterviewType(e.target.value)}
                  className="w-full h-[36px] px-3 bg-white border border-border rounded-element text-[14px] font-medium"
                >
                  <option value="Phone">Phone Screening</option>
                  <option value="Technical">Technical Live Code</option>
                  <option value="Onsite">Onsite / Workspace</option>
                  <option value="Panel">Executive Panel</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Interviewer</label>
                <select
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className="w-full h-[36px] px-3 bg-white border border-border rounded-element text-[14px] font-medium"
                >
                  <option value="Michael Chang">Michael Chang (Lead Designer)</option>
                  <option value="Sarah Connor">Sarah Connor (Engineering Manager)</option>
                  <option value="Eve Baker">Eve Baker (Recruiter Lead)</option>
                  <option value="Alex Mercer">Alex Mercer (Research Lead)</option>
                  <option value="Marcus Vance">Marcus Vance (DevOps Lead)</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full h-[36px] px-3 bg-white border border-border rounded-element text-[14px] font-medium"
                />
              </div>
            </div>

            {/* Submit Scorecard Section */}
            <form onSubmit={handleSaveScorecard} className="space-y-3 border-t border-border pt-5">
              <h3 className="text-[16px] font-bold text-text-primary flex items-center gap-2">
                <Star className="w-4 h-4 text-accent-amber" /> Submit Scorecard
              </h3>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setScoreRating(star)}
                      className="p-1 text-accent-amber"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= scoreRating ? 'fill-accent-amber' : 'text-text-disabled'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Key Strengths</label>
                <textarea
                  rows={2}
                  value={scoreStrengths}
                  onChange={(e) => setScoreStrengths(e.target.value)}
                  placeholder="Strong technical capabilities, clear communicator..."
                  className="w-full p-2.5 bg-white border border-border rounded-element text-[14px] focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Key Concerns</label>
                <textarea
                  rows={2}
                  value={scoreConcerns}
                  onChange={(e) => setScoreConcerns(e.target.value)}
                  placeholder="Any reservation..."
                  className="w-full p-2.5 bg-white border border-border rounded-element text-[14px] focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="recommend"
                  checked={scoreRecommend}
                  onChange={(e) => setScoreRecommend(e.target.checked)}
                  className="w-4 h-4 text-primary rounded"
                />
                <label htmlFor="recommend" className="text-[14px] font-semibold text-text-primary">
                  Recommend for Hire
                </label>
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full mt-2">
                Save Scorecard & Update Status
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full mt-2"
                onClick={() => {
                  setIsDrawerOpen(false);
                  onSelectCandidate(selectedCandidate);
                }}
              >
                View Full Profile
              </Button>
            </form>
          </div>
        </Drawer>
      )}

      {/* Add Candidate Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Candidate"
      >
        <form onSubmit={handleAddCandidateSubmit} className="space-y-4">
          <div>
            <label className="text-[14px] font-semibold text-text-primary block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
              placeholder="e.g. Alexandra Vance"
              className="w-full h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px]"
            />
          </div>

          <div>
            <label className="text-[14px] font-semibold text-text-primary block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={newCandidateEmail}
              onChange={(e) => setNewCandidateEmail(e.target.value)}
              placeholder="alexandra@example.com"
              className="w-full h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px]"
            />
          </div>

          <div>
            <label className="text-[14px] font-semibold text-text-primary block mb-1">Role Applied For</label>
            <select
              value={newCandidateRole}
              onChange={(e) => setNewCandidateRole(e.target.value)}
              className="w-full h-[40px] px-3 bg-white border border-border rounded-element text-[14px]"
            >
              <option value="Senior Product Designer">Senior Product Designer</option>
              <option value="UX Researcher">UX Researcher</option>
              <option value="Frontend Engineer">Frontend Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 mt-6 border-t border-border shrink-0">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Candidate
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
