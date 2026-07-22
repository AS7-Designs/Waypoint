import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { StatusPill } from '../components/ui/StatusPill';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface AuthViewProps {
  onLoginSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<'Recruiter' | 'Hiring Manager'>('Recruiter');
  const [email, setEmail] = useState('eve.baker@waypoint.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-bgCanvas">
      {/* Left Form Section (45%) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12 z-10">
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="10" fill="#4F46E5"/>
            <path d="M10 22C10 22 13 14 18 14C23 14 26 22 26 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 5"/>
            <circle cx="10" cy="22" r="2.5" fill="white"/>
            <circle cx="18" cy="14" r="2.5" fill="#C7D2FE"/>
            <circle cx="26" cy="22" r="3.5" fill="#14B8A6" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="text-h2 font-bold text-text-primary tracking-tight">Waypoint</span>
        </div>

        {/* Auth Form Card */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-6">
            <h2 className="text-display font-bold text-text-primary">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-body-regular text-text-secondary mt-1">
              {isSignUp
                ? 'Start managing your hiring pipeline and new-hire onboarding in one place.'
                : 'Log in to manage candidates and team onboarding milestones.'}
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex bg-primary-tint/50 p-1 rounded-element mb-6">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-body-ui font-semibold rounded-element transition-all ${
                !isSignUp ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-body-ui font-semibold rounded-element transition-all ${
                isSignUp ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign up
            </button>
          </div>

          {/* SSO Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={onLoginSuccess}
              className="w-full h-[40px] px-4 bg-surface border border-border rounded-element text-body-ui font-semibold text-text-primary hover:bg-surface-muted flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-border w-full" />
            <span className="bg-bgCanvas px-3 text-caption-ui font-medium text-text-disabled uppercase">
              or continue with email
            </span>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-caption-ui font-semibold text-text-secondary uppercase mb-1.5">
                  Your Primary Role
                </label>
                <div className="grid grid-cols-2 gap-2 bg-primary-tint/30 p-1 rounded-element border border-border">
                  <button
                    type="button"
                    onClick={() => setRole('Recruiter')}
                    className={`py-2 text-body-ui font-semibold rounded-element transition-all ${
                      role === 'Recruiter' ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary'
                    }`}
                  >
                    Recruiter / Talent
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Hiring Manager')}
                    className={`py-2 text-body-ui font-semibold rounded-element transition-all ${
                      role === 'Hiring Manager' ? 'bg-surface text-accent-teal shadow-sm' : 'text-text-secondary'
                    }`}
                  >
                    Hiring Manager
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-body-ui font-semibold text-text-primary mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[40px] px-3.5 bg-surface border border-border rounded-element text-body-ui text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-body-ui font-semibold text-text-primary">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-caption-ui font-medium text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[40px] px-3.5 bg-surface border border-border rounded-element text-body-ui text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-caption-ui font-medium text-status-dangerText bg-status-dangerBg p-2.5 rounded-element">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <span className="flex items-center gap-2">
                  {isSignUp ? 'Create Waypoint Account' : 'Sign In to Waypoint'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <span className="text-body-ui text-text-secondary">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-body-ui font-semibold text-primary hover:underline"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-caption-ui text-text-disabled text-center lg:text-left">
          © 2026 Waypoint Inc. All rights reserved. • Privacy & Terms
        </div>
      </div>

      {/* Right Hero Panel (55%) */}
      <div className="hidden lg:flex w-[55%] bg-gradient-to-br from-primary via-primary-dark to-[#312E81] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative background routes */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="240" stroke="white" strokeWidth="2" strokeDasharray="6 8"/>
          <circle cx="300" cy="300" r="160" stroke="white" strokeWidth="2" strokeDasharray="4 6"/>
          <path d="M100 500 C 200 300, 400 400, 500 100" stroke="#14B8A6" strokeWidth="4" fill="none"/>
        </svg>

        <div className="relative z-10 flex justify-end">
          <StatusPill variant="progress" className="bg-white/10 text-white border border-white/20 backdrop-blur-md">
            ✨ Guided Hiring & Onboarding Co-pilot
          </StatusPill>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h1 className="text-[36px] leading-[44px] font-bold tracking-tight">
            From first interview to Day 90 success — all in one guided journey.
          </h1>
          <p className="text-[16px] leading-[24px] text-indigo-100 font-normal">
            Waypoint simplifies the candidate pipeline and connects hiring managers directly to new-hire onboarding checklists.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-element backdrop-blur-md border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-accent-teal shrink-0" />
              <span className="text-body-ui font-medium">Unified candidate pipeline & interview scorecards</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-element backdrop-blur-md border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-accent-teal shrink-0" />
              <span className="text-body-ui font-medium">Automated Day 1 / Week 1 / Month 1 task assignment</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-element backdrop-blur-md border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-accent-teal shrink-0" />
              <span className="text-body-ui font-medium">Clear metrics for recruiters and team managers</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-indigo-200 text-caption-ui border-t border-white/10 pt-6">
          <span>Trusted by 450+ high-growth talent teams</span>
          <span>Security Compliant & Encrypted</span>
        </div>
      </div>
    </div>
  );
};
