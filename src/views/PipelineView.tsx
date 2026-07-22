import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { StatusPill } from '../components/ui/StatusPill';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Drawer';
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
  ArrowRight 
} from 'lucide-react';

export interface PipelineViewProps {
  onSelectCandidate: (candidate: Candidate) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ onSelectCandidate }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
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
              className="h-[36px] pl-9 pr-3 bg-surface border border-border rounded-full text-caption-ui font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>

          <div className="flex items-center bg-surface border border-border rounded-full p-1 shadow-sm">
            <span className="px-3 text-caption-ui font-semibold text-text-secondary flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Role:
            </span>
            {['All', 'Senior Product Designer', 'UX Researcher', 'Frontend Engineer'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1 text-caption-ui font-semibold rounded-full transition-all ${
                  roleFilter === role
                    ? 'bg-primary-tint text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {role === 'All' ? 'All Roles' : role.split(' ')[0]}
              </button>
            ))}
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

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {stages.map(({ stage, avgDays }) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);

          return (
            <div key={stage} className="bg-surface-muted p-3.5 rounded-card border border-border min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-body-ui font-bold text-text-primary">{stage}</h3>
                  <span className="w-5 h-5 rounded-full bg-primary-tint text-primary text-caption-ui font-bold flex items-center justify-center">
                    {stageCandidates.length}
                  </span>
                </div>
                <span className="text-caption-ui font-medium text-text-disabled">
                  avg {avgDays}d
                </span>
              </div>

              {/* Column Cards List */}
              <div className="space-y-3">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-surface p-4 rounded-element border border-border shadow-card hover:border-primary/40 transition-all cursor-pointer group"
                    onClick={() => handleCardClick(candidate)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar src={candidate.avatar} name={candidate.name} size="sm" />
                        <div>
                          <h4 className="text-body-ui font-bold text-text-primary group-hover:text-primary transition-colors">
                            {candidate.name}
                          </h4>
                          <p className="text-caption-ui text-text-secondary font-medium">
                            {candidate.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {candidate.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-status-neutralBg text-status-neutralText text-caption-ui font-medium rounded-full"
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

                    {/* Footer / Quick move stage dropdown */}
                    <div className="flex items-center justify-between border-t border-border pt-2 mt-2 text-caption-ui text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-text-disabled" />
                        {candidate.daysInStage}d in stage
                      </span>

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
                ))}

                {stageCandidates.length === 0 && (
                  <EmptyState
                    title="No candidates"
                    description={`No candidates in ${stage}`}
                    className="p-4 py-8"
                  />
                )}
              </div>
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
          footer={
            <div className="flex gap-2 w-full">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setIsDrawerOpen(false);
                  onSelectCandidate(selectedCandidate);
                }}
              >
                View Full Profile
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Stage Quick Advancement */}
            <div className="bg-surface-muted p-4 rounded-element border border-border">
              <label className="text-caption-ui font-semibold text-text-secondary uppercase block mb-2">
                Move Stage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {stages.map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => handleMoveStage(selectedCandidate.id, s.stage)}
                    className={`py-1.5 px-2 text-caption-ui font-semibold rounded-element border transition-all ${
                      selectedCandidate.stage === s.stage
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface text-text-secondary border-border hover:bg-primary-tint'
                    }`}
                  >
                    {s.stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Interview Section */}
            <div className="space-y-3">
              <h3 className="text-h3 font-bold text-text-primary flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" /> Schedule Next Round
              </h3>

              <div>
                <label className="text-caption-ui font-semibold text-text-secondary block mb-1">Interview Type</label>
                <select
                  value={interviewType}
                  onChange={(e: any) => setInterviewType(e.target.value)}
                  className="w-full h-[36px] px-3 bg-surface border border-border rounded-element text-caption-ui font-medium text-text-primary"
                >
                  <option value="Phone">Phone Screening</option>
                  <option value="Technical">Technical Live Code</option>
                  <option value="Onsite">Onsite / Workspace</option>
                  <option value="Panel">Executive Panel</option>
                </select>
              </div>

              <div>
                <label className="text-caption-ui font-semibold text-text-secondary block mb-1">Interviewer</label>
                <input
                  type="text"
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className="w-full h-[36px] px-3 bg-surface border border-border rounded-element text-caption-ui font-medium text-text-primary"
                />
              </div>

              <div>
                <label className="text-caption-ui font-semibold text-text-secondary block mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full h-[36px] px-3 bg-surface border border-border rounded-element text-caption-ui font-medium text-text-primary"
                />
              </div>
            </div>

            {/* Submit Scorecard Section */}
            <form onSubmit={handleSaveScorecard} className="space-y-3 border-t border-border pt-5">
              <h3 className="text-h3 font-bold text-text-primary flex items-center gap-2">
                <Star className="w-4 h-4 text-accent-amber" /> Submit Scorecard
              </h3>

              <div>
                <label className="text-caption-ui font-semibold text-text-secondary block mb-1">Overall Rating</label>
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
                <label className="text-caption-ui font-semibold text-text-secondary block mb-1">Key Strengths</label>
                <textarea
                  rows={2}
                  value={scoreStrengths}
                  onChange={(e) => setScoreStrengths(e.target.value)}
                  placeholder="Strong technical capabilities, clear communicator..."
                  className="w-full p-2.5 bg-surface border border-border rounded-element text-caption-ui text-text-primary focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="text-caption-ui font-semibold text-text-secondary block mb-1">Key Concerns</label>
                <textarea
                  rows={2}
                  value={scoreConcerns}
                  onChange={(e) => setScoreConcerns(e.target.value)}
                  placeholder="Any reservation..."
                  className="w-full p-2.5 bg-surface border border-border rounded-element text-caption-ui text-text-primary focus:ring-2 focus:ring-primary outline-none"
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
                <label htmlFor="recommend" className="text-caption-ui font-semibold text-text-primary">
                  Recommend for Hire
                </label>
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full mt-2">
                Save Scorecard & Update Status
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
            <label className="text-caption-ui font-semibold text-text-primary block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
              placeholder="e.g. Alexandra Vance"
              className="w-full h-[40px] px-3.5 bg-surface border border-border rounded-element text-body-ui text-text-primary"
            />
          </div>

          <div>
            <label className="text-caption-ui font-semibold text-text-primary block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={newCandidateEmail}
              onChange={(e) => setNewCandidateEmail(e.target.value)}
              placeholder="alexandra@example.com"
              className="w-full h-[40px] px-3.5 bg-surface border border-border rounded-element text-body-ui text-text-primary"
            />
          </div>

          <div>
            <label className="text-caption-ui font-semibold text-text-primary block mb-1">Role Applied For</label>
            <select
              value={newCandidateRole}
              onChange={(e) => setNewCandidateRole(e.target.value)}
              className="w-full h-[40px] px-3 bg-surface border border-border rounded-element text-body-ui text-text-primary"
            >
              <option value="Senior Product Designer">Senior Product Designer</option>
              <option value="UX Researcher">UX Researcher</option>
              <option value="Frontend Engineer">Frontend Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add to Applied Stage
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
