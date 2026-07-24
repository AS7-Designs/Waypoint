import React, { useState } from 'react';
import { Sidebar, NavView } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { JobsView } from './views/JobsView';
import { PipelineView } from './views/PipelineView';
import { CandidateProfileView } from './views/CandidateProfileView';
import { OnboardingView } from './views/OnboardingView';
import { Toast } from './components/ui/Toast';
import { Candidate, StatusPillVariant } from './types';
import { mockCandidates } from './data/mockData';

export function App() {
  const [currentView, setCurrentView] = useState<NavView | 'auth'>('dashboard');
  const [userRole, setUserRole] = useState<'Recruiter' | 'Hiring Manager'>('Recruiter');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(mockCandidates[0]);
  
  // Toast state
  const [toast, setToast] = useState<{
    title: string;
    message?: string;
    variant: StatusPillVariant;
  } | null>({
    title: 'Welcome to Waypoint',
    message: 'Dashboard and hiring pipeline active.',
    variant: 'progress',
  });

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView('candidate-profile');
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    setToast({
      title: 'Interview Invite Sent',
      message: `Scheduled technical interview round for ${candidate.name}.`,
      variant: 'success',
    });
  };

  const handleMoveToOffer = (candidate: Candidate) => {
    setToast({
      title: 'Offer Draft Generated',
      message: `${candidate.name} advanced to Offer stage.`,
      variant: 'success',
    });
  };

  if (currentView === 'auth') {
    return (
      <AuthView
        onLoginSuccess={() => {
          setCurrentView('dashboard');
          setToast({
            title: 'Successfully Signed In',
            message: 'Switched to Recruiter Dashboard view.',
            variant: 'success',
          });
        }}
      />
    );
  }

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard';
      case 'jobs':
        return 'Active Job Openings';
      case 'pipeline':
        return 'Hiring Pipeline';
      case 'candidate-profile':
        return 'Candidate Profile';
      case 'onboarding':
        return 'Onboarding Journeys';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-bgCanvas text-text-primary">
      {/* 260px Fixed Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />

      {/* Top Bar Navigation */}
      <TopBar
        title={getPageTitle()}
        userRole={userRole}
        onRoleToggle={(role) => setUserRole(role)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Main Canvas Area */}
      <main className="pl-[292px] pt-[96px] pr-8 min-h-screen">
        {currentView === 'dashboard' && (
          <DashboardView
            onNavigateToCandidate={(id) => {
              const c = mockCandidates.find((item) => item.id === id) || mockCandidates[0];
              handleSelectCandidate(c);
            }}
            onNavigateToPipeline={() => setCurrentView('pipeline')}
            onNavigateToOnboarding={() => setCurrentView('onboarding')}
            onNavigateToJobs={() => setCurrentView('jobs')}
          />
        )}

        {currentView === 'jobs' && (
          <JobsView
            onViewPipelineForRole={() => setCurrentView('pipeline')}
          />
        )}

        {currentView === 'pipeline' && (
          <PipelineView onSelectCandidate={handleSelectCandidate} />
        )}

        {currentView === 'candidate-profile' && (
          <CandidateProfileView
            candidate={selectedCandidate}
            onBack={() => setCurrentView('pipeline')}
            onScheduleInterview={handleScheduleInterview}
            onMoveToOffer={handleMoveToOffer}
          />
        )}

        {currentView === 'onboarding' && <OnboardingView />}
      </main>

      {/* Global Notification Toast */}
      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
