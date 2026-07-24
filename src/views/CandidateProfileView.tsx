import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { StatusPill } from '../components/ui/StatusPill';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Timeline, TimelineItem } from '../components/ui/Timeline';
import { Candidate } from '../types';
import { 
  ArrowLeft, 
  Calendar, 
  Send, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  User, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Clock,
  TrendingUp,
  MessageSquare,
  Award,
  Target
} from 'lucide-react';

export interface CandidateProfileViewProps {
  candidate: Candidate;
  onBack: () => void;
  onScheduleInterview: (candidate: Candidate) => void;
  onMoveToOffer: (candidate: Candidate) => void;
}

export const CandidateProfileView: React.FC<CandidateProfileViewProps> = ({
  candidate,
  onBack,
  onScheduleInterview,
  onMoveToOffer,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<string[]>(candidate.notes || []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([newNote.trim(), ...notes]);
    setNewNote('');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resume', label: 'Resume & Documents' },
    { id: 'feedback', label: 'Interview Feedback', count: candidate.scorecards.length },
    { id: 'notes', label: 'Notes', count: notes.length },
  ];

  // Pipeline stage progress
  const allStages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
  const currentStageIdx = allStages.indexOf(candidate.stage);

  const timelineItems: TimelineItem[] = [
    {
      id: 't1',
      title: 'Application Received',
      timestamp: candidate.appliedDate,
      description: `Applied via ${candidate.source}. Recruiter assigned: ${candidate.recruiter}`,
      status: 'completed',
    },
    {
      id: 't2',
      title: 'Resume Screened & Shortlisted',
      timestamp: '16 Jun 2025',
      description: 'Resume passed ATS screening. Keywords matched: design systems, Figma, leadership.',
      status: 'completed',
    },
    {
      id: 't3',
      title: 'Recruiter Screening Call',
      timestamp: '18 Jun 2025',
      description: 'Candidate demonstrated strong domain knowledge and salary expectations aligned.',
      status: 'completed',
    },
    {
      id: 't4',
      title: 'Technical Panel Interview',
      timestamp: '2 Jul 2025',
      description: 'Live architecture and system design interview with Lead Engineer Michael Chang.',
      status: 'completed',
      statusPill: { variant: 'success', label: 'Passed' },
    },
    {
      id: 't5',
      title: 'Executive & Culture Fit Call',
      timestamp: 'Scheduled for 8 Jul 2025',
      description: '30-minute alignment call with VP of Engineering.',
      status: 'active',
      statusPill: { variant: 'progress', label: 'Upcoming' },
    },
    {
      id: 't6',
      title: 'Final Decision & Offer',
      timestamp: 'Pending',
      description: 'Hiring committee review and compensation package approval.',
      status: 'pending',
    },
  ];

  // Mock evaluation scores
  const evaluationScores = [
    { label: 'Technical Skills', score: 4.2, max: 5 },
    { label: 'Communication', score: 4.5, max: 5 },
    { label: 'Culture Fit', score: 3.8, max: 5 },
    { label: 'Problem Solving', score: 4.0, max: 5 },
  ];

  const avgScore = (evaluationScores.reduce((sum, e) => sum + e.score, 0) / evaluationScores.length).toFixed(1);

  return (
    <div className="space-y-6 pb-12">
      {/* Top back navigation button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-secondary hover:text-text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Candidate Pipeline</span>
        </button>
      </div>

      {/* Candidate Summary Header Card */}
      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar src={candidate.avatar} name={candidate.name} size="lg" roleRing="recruiter" />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-[28px] leading-[36px] font-bold text-text-primary">
                  {candidate.name}
                </h1>
                <StatusPill variant="progress" label={candidate.stage} />
                {candidate.hasOverdueFeedback && (
                  <StatusPill variant="danger" label="Scorecard Overdue" />
                )}
              </div>
              <p className="text-[16px] font-medium text-text-secondary mt-0.5">
                {candidate.role} • Applied {candidate.appliedDate}
              </p>
              <div className="flex items-center gap-4 text-[12px] text-text-secondary mt-2 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-text-disabled" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-text-disabled" />
                  {candidate.phone || '+1 (555) 019-2834'}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-disabled" />
                  {candidate.location || 'San Francisco, CA'}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="secondary"
              icon={<Calendar className="w-4 h-4 text-primary" />}
              onClick={() => onScheduleInterview(candidate)}
            >
              Schedule Interview
            </Button>
            <Button
              variant="primary"
              icon={<Send className="w-4 h-4" />}
              onClick={() => onMoveToOffer(candidate)}
            >
              Move to Offer
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Grid: Left 2/3 Tabs & Content + Right 1/3 Stepper & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2/3 Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId)}
              className="mb-6"
            />

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Pipeline Stage Progress */}
                <div>
                  <h3 className="text-[16px] font-bold text-text-primary mb-3">
                    Pipeline Progress
                  </h3>
                  <div className="bg-surface-muted p-4 rounded-nested border border-border">
                    <div className="flex items-center justify-between mb-2">
                      {allStages.map((stage, idx) => {
                        const isCompleted = idx < currentStageIdx;
                        const isCurrent = idx === currentStageIdx;
                        return (
                          <div key={stage} className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                              isCompleted
                                ? 'bg-primary text-white'
                                : isCurrent
                                ? 'bg-primary-tint border-2 border-primary text-primary'
                                : 'bg-white border-2 border-border text-text-disabled'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                idx + 1
                              )}
                            </div>
                            <span className={`text-[11px] mt-1.5 font-semibold ${
                              isCurrent ? 'text-primary' : isCompleted ? 'text-text-primary' : 'text-text-disabled'
                            }`}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Progress bar */}
                    <div className="relative h-1.5 bg-border rounded-full mt-1 mx-4">
                      <div
                        className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(currentStageIdx / (allStages.length - 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Candidate Details & Attributes */}
                <div>
                  <h3 className="text-[16px] font-bold text-text-primary mb-3">
                    Candidate Details & Attributes
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-muted p-4 rounded-nested border border-border">
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Recruiter Owner</span>
                      <span className="text-[14px] font-semibold text-text-primary">{candidate.recruiter}</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Source</span>
                      <span className="text-[14px] font-semibold text-text-primary">{candidate.source}</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Days in Current Stage</span>
                      <span className="text-[14px] font-semibold text-primary">{candidate.daysInStage} days</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Applied Date</span>
                      <span className="text-[14px] font-semibold text-text-primary">{candidate.appliedDate}</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Location</span>
                      <span className="text-[14px] font-semibold text-text-primary">{candidate.location || 'San Francisco, CA'}</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Total Interviews</span>
                      <span className="text-[14px] font-semibold text-text-primary">{candidate.scorecards.length} of 3 rounds</span>
                    </div>
                  </div>
                </div>

                {/* Evaluation Summary */}
                <div>
                  <h3 className="text-[16px] font-bold text-text-primary mb-3">
                    Evaluation Summary
                  </h3>
                  <div className="bg-surface-muted p-4 rounded-nested border border-border space-y-3">
                    {evaluationScores.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-[13px] font-medium text-text-secondary w-[140px] shrink-0">{item.label}</span>
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(item.score / item.max) * 100}%` }}
                          />
                        </div>
                        <span className="text-[13px] font-bold text-text-primary w-[36px] text-right">{item.score}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-[13px] font-semibold text-text-primary">Overall Average</span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-accent-amber text-accent-amber" />
                        <span className="text-[16px] font-bold text-primary">{avgScore} / 5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Tags */}
                <div>
                  <h3 className="text-[16px] font-bold text-text-primary mb-3">Skills & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-tint text-primary text-[12px] font-semibold rounded-full border border-primary-tint2"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compensation & Availability */}
                <div>
                  <h3 className="text-[16px] font-bold text-text-primary mb-3">
                    Compensation & Availability
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-muted p-4 rounded-nested border border-border">
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Target Salary</span>
                      <span className="text-[14px] font-semibold text-text-primary">$175,000 - $185,000 / yr</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Notice Period</span>
                      <span className="text-[14px] font-semibold text-text-primary">2 Weeks (Available Aug 1)</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-text-secondary block">Work Preference</span>
                      <span className="text-[14px] font-semibold text-text-primary">Hybrid (2 Days Onsite)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RESUME & DOCUMENTS */}
            {activeTab === 'resume' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-nested border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="text-[14px] font-semibold text-text-primary">
                        {candidate.name}_Resume_2025.pdf
                      </h4>
                      <p className="text-[12px] text-text-secondary">Uploaded 10 Jun 2025 • 1.4 MB</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => alert('Downloading resume preview...')}>
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-nested border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-accent-teal" />
                    <div>
                      <h4 className="text-[14px] font-semibold text-text-primary">
                        {candidate.name}_Portfolio.pdf
                      </h4>
                      <p className="text-[12px] text-text-secondary">Uploaded 10 Jun 2025 • 3.8 MB</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => alert('Downloading portfolio...')}>
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-nested border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-accent-amber" />
                    <div>
                      <h4 className="text-[14px] font-semibold text-text-primary">
                        Cover_Letter.pdf
                      </h4>
                      <p className="text-[12px] text-text-secondary">Uploaded 10 Jun 2025 • 0.4 MB</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => alert('Downloading cover letter...')}>
                    Download
                  </Button>
                </div>

                <div className="p-8 border border-dashed border-border rounded-nested text-center bg-bgCanvas/50">
                  <FileText className="w-10 h-10 text-text-disabled mx-auto mb-2" />
                  <p className="text-[14px] font-semibold text-text-primary">PDF Preview Container</p>
                  <p className="text-[12px] text-text-secondary mt-1">
                    Candidate's resume and portfolio documents are verified and attached.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: INTERVIEW FEEDBACK */}
            {activeTab === 'feedback' && (
              <div className="space-y-4">
                {candidate.scorecards.length > 0 ? (
                  candidate.scorecards.map((scorecard) => (
                    <div
                      key={scorecard.id}
                      className="p-5 rounded-nested border border-border bg-surface-muted space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={scorecard.interviewerName} size="sm" />
                          <div>
                            <h4 className="text-[14px] font-semibold text-text-primary">
                              {scorecard.interviewerName}
                            </h4>
                            <p className="text-[12px] text-text-secondary">{scorecard.interviewerRole}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-accent-amber gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= scorecard.rating ? 'fill-accent-amber' : 'text-text-disabled'
                                }`}
                              />
                            ))}
                          </div>
                          <StatusPill
                            variant={scorecard.recommendHire ? 'success' : 'danger'}
                            label={scorecard.recommendHire ? 'Recommend Hire' : 'Do Not Recommend'}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[14px]">
                        <div className="bg-white p-3 rounded-element border border-border">
                          <span className="font-semibold text-status-successText block mb-1">Key Strengths</span>
                          <p className="text-text-primary">{scorecard.strengths}</p>
                        </div>
                        <div className="bg-white p-3 rounded-element border border-border">
                          <span className="font-semibold text-status-dangerText block mb-1">Key Concerns</span>
                          <p className="text-text-primary">{scorecard.concerns}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-surface-muted rounded-nested text-text-secondary text-[14px]">
                    No scorecards submitted yet for this candidate.
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a team note or feedback memory..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px] font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
                    Add Note
                  </Button>
                </form>

                <div className="space-y-3">
                  {notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-surface-muted rounded-element border border-border text-[14px] text-text-primary"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right 1/3 Stepper Column */}
        <div className="space-y-6">
          {/* Pinned Next Step Card */}
          <Card className="bg-primary-tint border-primary-tint2">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary text-white shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-primary">Next Action Required</h4>
                <p className="text-[14px] text-text-primary mt-1">
                  Technical Panel Scorecard ready. Move {candidate.name.split(' ')[0]} to <strong>Executive Call</strong> or issue an Offer.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-3"
                  onClick={() => onMoveToOffer(candidate)}
                >
                  Advance Stage
                </Button>
              </div>
            </div>
          </Card>

          {/* Candidate Snapshot Card */}
          <Card title="Candidate Snapshot">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-muted rounded-nested p-3 border border-border text-center">
                <div className="w-8 h-8 rounded-full bg-primary-tint flex items-center justify-center mx-auto mb-1.5">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[18px] font-bold text-primary block">{avgScore}</span>
                <span className="text-[11px] font-medium text-text-secondary">Avg Rating</span>
              </div>
              <div className="bg-surface-muted rounded-nested p-3 border border-border text-center">
                <div className="w-8 h-8 rounded-full bg-accent-teal/15 flex items-center justify-center mx-auto mb-1.5">
                  <Clock className="w-4 h-4 text-accent-teal" />
                </div>
                <span className="text-[18px] font-bold text-accent-teal block">{candidate.daysInStage}d</span>
                <span className="text-[11px] font-medium text-text-secondary">In Stage</span>
              </div>
              <div className="bg-surface-muted rounded-nested p-3 border border-border text-center">
                <div className="w-8 h-8 rounded-full bg-accent-amber/15 flex items-center justify-center mx-auto mb-1.5">
                  <Target className="w-4 h-4 text-accent-amber" />
                </div>
                <span className="text-[18px] font-bold text-accent-amber block">{candidate.scorecards.length}/3</span>
                <span className="text-[11px] font-medium text-text-secondary">Rounds Done</span>
              </div>
              <div className="bg-surface-muted rounded-nested p-3 border border-border text-center">
                <div className="w-8 h-8 rounded-full bg-status-successBg flex items-center justify-center mx-auto mb-1.5">
                  <Award className="w-4 h-4 text-status-successText" />
                </div>
                <span className="text-[18px] font-bold text-status-successText block">Yes</span>
                <span className="text-[11px] font-medium text-text-secondary">Hire Rec</span>
              </div>
            </div>
          </Card>

          {/* Stepper Timeline Card */}
          <Card title="Hiring Journey Timeline">
            <Timeline items={timelineItems} />
          </Card>

          {/* Recent Activity Feed */}
          <Card title="Recent Activity">
            <div className="space-y-3">
              {[
                { icon: <MessageSquare className="w-3.5 h-3.5" />, text: 'Eve Baker added a recruiter note', time: '2 hours ago', color: 'text-primary bg-primary-tint' },
                { icon: <Star className="w-3.5 h-3.5" />, text: 'Michael Chang submitted scorecard (4/5)', time: '1 day ago', color: 'text-accent-amber bg-accent-amber/15' },
                { icon: <Calendar className="w-3.5 h-3.5" />, text: 'Executive call scheduled for Jul 8', time: '2 days ago', color: 'text-accent-teal bg-accent-teal/15' },
                { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: 'Technical panel interview completed', time: '5 days ago', color: 'text-status-successText bg-status-successBg' },
                { icon: <Briefcase className="w-3.5 h-3.5" />, text: 'Moved from Screening to Interview', time: '1 week ago', color: 'text-primary bg-primary-tint' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-text-primary leading-tight">{activity.text}</p>
                    <span className="text-[11px] text-text-disabled">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
