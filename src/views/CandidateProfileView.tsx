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
  AlertCircle 
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
      title: 'Recruiter Screening Call',
      timestamp: '18 Jun 2025',
      description: 'Candidate demonstrated strong domain knowledge and salary expectations aligned.',
      status: 'completed',
    },
    {
      id: 't3',
      title: 'Technical Panel Interview',
      timestamp: '2 Jul 2025',
      description: 'Live architecture and system design interview with Lead Engineer Michael Chang.',
      status: 'completed',
      statusPill: { variant: 'success', label: 'Passed' },
    },
    {
      id: 't4',
      title: 'Executive & Culture Fit Call',
      timestamp: 'Scheduled for 8 Jul 2025',
      description: '30-minute alignment call with VP of Engineering.',
      status: 'active',
      statusPill: { variant: 'progress', label: 'Upcoming' },
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top back navigation button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-body-ui font-semibold text-text-secondary hover:text-text-primary transition-colors mb-2"
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
                <h1 className="text-display font-bold text-text-primary">
                  {candidate.name}
                </h1>
                <StatusPill variant="progress" label={candidate.stage} />
                {candidate.hasOverdueFeedback && (
                  <StatusPill variant="danger" label="Scorecard Overdue" />
                )}
              </div>
              <p className="text-h3 font-medium text-text-secondary mt-0.5">
                {candidate.role} • Applied {candidate.appliedDate}
              </p>
              <div className="flex items-center gap-4 text-caption-ui text-text-secondary mt-2 flex-wrap">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div>
                  <h3 className="text-h3 font-bold text-text-primary mb-3">
                    Candidate Details & Attributes
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-muted p-4 rounded-element border border-border">
                    <div>
                      <span className="text-caption-ui font-medium text-text-secondary block">Recruiter Owner</span>
                      <span className="text-body-ui font-semibold text-text-primary">{candidate.recruiter}</span>
                    </div>
                    <div>
                      <span className="text-caption-ui font-medium text-text-secondary block">Source</span>
                      <span className="text-body-ui font-semibold text-text-primary">{candidate.source}</span>
                    </div>
                    <div>
                      <span className="text-caption-ui font-medium text-text-secondary block">Days in Current Stage</span>
                      <span className="text-body-ui font-semibold text-primary">{candidate.daysInStage} days</span>
                    </div>
                  </div>
                </div>

                {/* Skills & Tags */}
                <div>
                  <h3 className="text-h3 font-bold text-text-primary mb-3">Skills & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-tint text-primary text-caption-ui font-semibold rounded-full border border-primary-tint2"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RESUME & DOCUMENTS */}
            {activeTab === 'resume' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-element border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="text-body-ui font-semibold text-text-primary">
                        {candidate.name}_Resume_2025.pdf
                      </h4>
                      <p className="text-caption-ui text-text-secondary">Uploaded 10 Jun 2025 • 1.4 MB</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => alert('Downloading resume preview...')}>
                    Download
                  </Button>
                </div>

                <div className="p-8 border border-dashed border-border rounded-element text-center bg-bgCanvas/50">
                  <FileText className="w-10 h-10 text-text-disabled mx-auto mb-2" />
                  <p className="text-body-ui font-semibold text-text-primary">PDF Preview Container</p>
                  <p className="text-caption-ui text-text-secondary mt-1">
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
                      className="p-5 rounded-element border border-border bg-surface-muted space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={scorecard.interviewerName} size="sm" />
                          <div>
                            <h4 className="text-body-ui font-semibold text-text-primary">
                              {scorecard.interviewerName}
                            </h4>
                            <p className="text-caption-ui text-text-secondary">{scorecard.interviewerRole}</p>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-caption-ui">
                        <div className="bg-surface p-3 rounded-element border border-border">
                          <span className="font-semibold text-status-successText block mb-1">Key Strengths</span>
                          <p className="text-text-primary">{scorecard.strengths}</p>
                        </div>
                        <div className="bg-surface p-3 rounded-element border border-border">
                          <span className="font-semibold text-status-dangerText block mb-1">Key Concerns</span>
                          <p className="text-text-primary">{scorecard.concerns}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-surface-muted rounded-element text-text-secondary text-body-ui">
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
                    className="flex-1 h-[40px] px-3.5 bg-surface border border-border rounded-element text-body-ui font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
                    Add Note
                  </Button>
                </form>

                <div className="space-y-3">
                  {notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-surface-muted rounded-element border border-border text-body-ui text-text-primary"
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
                <h4 className="text-body-ui font-bold text-primary">Next Action Required</h4>
                <p className="text-caption-ui text-text-primary mt-1">
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

          {/* Stepper Timeline Card */}
          <Card title="Hiring Journey Timeline">
            <Timeline items={timelineItems} />
          </Card>
        </div>
      </div>
    </div>
  );
};
