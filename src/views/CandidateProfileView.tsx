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
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#6B7280] hover:text-[#111827] transition-colors mb-2"
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
                <h1 className="text-[28px] leading-[36px] font-bold text-[#111827]">
                  {candidate.name}
                </h1>
                <StatusPill variant="progress" label={candidate.stage} />
                {candidate.hasOverdueFeedback && (
                  <StatusPill variant="danger" label="Scorecard Overdue" />
                )}
              </div>
              <p className="text-[16px] font-medium text-[#6B7280] mt-0.5">
                {candidate.role} • Applied {candidate.appliedDate}
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#6B7280] mt-2 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  {candidate.phone || '+1 (555) 019-2834'}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  {candidate.location || 'San Francisco, CA'}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="secondary"
              icon={<Calendar className="w-4 h-4 text-[#4F46E5]" />}
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
                  <h3 className="text-[16px] font-bold text-[#111827] mb-3">
                    Candidate Details & Attributes
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#F8F9FC] p-4 rounded-[16px] border border-[#ECECF3]">
                    <div>
                      <span className="text-[12px] font-medium text-[#6B7280] block">Recruiter Owner</span>
                      <span className="text-[14px] font-semibold text-[#111827]">{candidate.recruiter}</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-[#6B7280] block">Source</span>
                      <span className="text-[14px] font-semibold text-[#111827]">{candidate.source}</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-[#6B7280] block">Days in Current Stage</span>
                      <span className="text-[14px] font-semibold text-[#4F46E5]">{candidate.daysInStage} days</span>
                    </div>
                  </div>
                </div>

                {/* Skills & Tags */}
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827] mb-3">Skills & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#EEF0FD] text-[#4F46E5] text-[12px] font-semibold rounded-full border border-[#C7D2FE]"
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
                <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-[16px] border border-[#ECECF3]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#4F46E5]" />
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#111827]">
                        {candidate.name}_Resume_2025.pdf
                      </h4>
                      <p className="text-[12px] text-[#6B7280]">Uploaded 10 Jun 2025 • 1.4 MB</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => alert('Downloading resume preview...')}>
                    Download
                  </Button>
                </div>

                <div className="p-8 border border-dashed border-[#ECECF3] rounded-[16px] text-center bg-[#F5F5FA]/50">
                  <FileText className="w-10 h-10 text-[#9CA3AF] mx-auto mb-2" />
                  <p className="text-[14px] font-semibold text-[#111827]">PDF Preview Container</p>
                  <p className="text-[12px] text-[#6B7280] mt-1">
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
                      className="p-5 rounded-[16px] border border-[#ECECF3] bg-[#F8F9FC] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={scorecard.interviewerName} size="sm" />
                          <div>
                            <h4 className="text-[14px] font-semibold text-[#111827]">
                              {scorecard.interviewerName}
                            </h4>
                            <p className="text-[12px] text-[#6B7280]">{scorecard.interviewerRole}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-[#F59E0B] gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= scorecard.rating ? 'fill-[#F59E0B]' : 'text-[#D1D5DB]'
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[13px]">
                        <div className="bg-white p-3 rounded-[12px] border border-[#ECECF3]">
                          <span className="font-semibold text-[#16A34A] block mb-1">Key Strengths</span>
                          <p className="text-[#374151]">{scorecard.strengths}</p>
                        </div>
                        <div className="bg-white p-3 rounded-[12px] border border-[#ECECF3]">
                          <span className="font-semibold text-[#DC2626] block mb-1">Key Concerns</span>
                          <p className="text-[#374151]">{scorecard.concerns}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-[#F8F9FC] rounded-[16px] text-[#6B7280] text-[14px]">
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
                    className="flex-1 h-[40px] px-3.5 bg-white border border-[#ECECF3] rounded-[12px] text-[14px] font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                  <Button type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
                    Add Note
                  </Button>
                </form>

                <div className="space-y-3">
                  {notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#F8F9FC] rounded-[12px] border border-[#ECECF3] text-[14px] text-[#111827]"
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
          <Card className="bg-[#EEF0FD] border-[#C7D2FE]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-[#4F46E5] text-white shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#4F46E5]">Next Action Required</h4>
                <p className="text-[13px] text-[#374151] mt-1">
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
