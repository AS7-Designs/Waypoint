export type PipelineStage = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired';

export type StatusPillVariant = 'success' | 'progress' | 'neutral' | 'danger';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  stage: PipelineStage;
  appliedDate: string;
  recruiter: string;
  source: string;
  tags: string[];
  daysInStage: number;
  hasOverdueFeedback?: boolean;
  scorecards: Scorecard[];
  phone?: string;
  location?: string;
  resumeUrl?: string;
  notes?: string[];
}

export interface Scorecard {
  id: string;
  candidateId: string;
  interviewerName: string;
  interviewerRole: string;
  rating: number; // 1 to 5
  strengths: string;
  concerns: string;
  recommendHire: boolean;
  date: string;
}

export type TaskOwner = 'IT' | 'HR' | 'Manager' | 'New Hire';
export type OnboardingPhase = 'Pre-boarding' | 'Day 1' | 'Week 1' | 'Month 1';
export type TaskStatus = 'Not Started' | 'Process' | 'Done';

export interface OnboardingTask {
  id: string;
  title: string;
  owner: TaskOwner;
  phase: OnboardingPhase;
  dueDate: string;
  status: TaskStatus;
  isRequiredDoc?: boolean;
}

export interface NewHire {
  id: string;
  candidateId?: string;
  name: string;
  role: string;
  avatar: string;
  startDate: string;
  manager: string;
  buddy: string;
  progress: number; // 0 to 100
  tasks: OnboardingTask[];
  missingRequiredDocs?: boolean;
}

export interface TodoItem {
  id: string;
  title: string;
  timestamp: string;
  status: TaskStatus;
  category: 'hiring' | 'onboarding';
  avatar?: string;
}

export interface ActiveInterview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  role: string;
  type: 'Phone' | 'Technical' | 'Onsite' | 'Panel';
  time: string;
  status: 'Scheduled' | 'Completed' | 'In Progress';
}

export interface CalendarScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'interview' | 'onboarding';
}

export interface QuickActionItem {
  id: string;
  label: string;
  iconName: string;
  bgColor: string;
  iconColor: string;
  actionKey: string;
}
