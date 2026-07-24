import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { StatusPill } from '../components/ui/StatusPill';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { JobOpening } from '../types';
import { mockJobOpenings } from '../data/mockData';
import { 
  Briefcase, 
  Plus, 
  MapPin, 
  Users, 
  ChevronRight, 
  Building,
  Clock
} from 'lucide-react';

export interface JobsViewProps {
  onViewPipelineForRole: (roleTitle: string) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({ onViewPipelineForRole }) => {
  const [jobs, setJobs] = useState<JobOpening[]>(mockJobOpenings);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('San Francisco, CA');
  const [type, setType] = useState<'Full-time' | 'Contract' | 'Remote'>('Full-time');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newJob: JobOpening = {
      id: `j_${Date.now()}`,
      title,
      department,
      location,
      type,
      isUrgent,
      isActive: true,
      candidateCount: 0,
      funnel: {
        applied: 0,
        screening: 0,
        interview: 0,
        offer: 0,
      },
    };

    setJobs([newJob, ...jobs]);
    setIsAddModalOpen(false);
    setTitle('');
  };

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'Engineering':
        return 'bg-primary-tint text-primary border-primary/20';
      case 'Product':
        return 'bg-accent-teal/15 text-accent-teal border-accent-teal/30';
      case 'Marketing':
        return 'bg-accent-amber/15 text-accent-amber border-accent-amber/30';
      case 'Sales':
        return 'bg-accent-rose/15 text-accent-rose border-accent-rose/30';
      case 'Design':
      default:
        return 'bg-accent-violet/15 text-accent-violet border-accent-violet/30';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-card border border-border shadow-card">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-display text-text-primary">Active Job Openings</h2>
            <span className="px-3 py-1 rounded-full bg-primary-tint text-primary text-[12px] font-bold">
              {jobs.length} Open Roles
            </span>
          </div>
          <p className="text-[14px] text-text-secondary mt-1">
            Manage requisition funnels and candidate assignments per open role.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Job Opening
        </Button>
      </div>

      {/* Grid of Job Cards (3 per row on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="flex flex-col justify-between hover:border-primary/40 transition-all">
            <div>
              {/* Header pills & title */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${getDepartmentColor(job.department)}`}>
                  {job.department}
                </span>
                <div className="flex items-center gap-1.5">
                  {job.isUrgent && <StatusPill variant="danger" label="Urgent" />}
                  <StatusPill variant="success" label="Active" />
                </div>
              </div>

              <h3 className="text-[18px] font-bold text-text-primary mb-1">
                {job.title}
              </h3>

              {/* Location & Type info */}
              <div className="flex items-center gap-3 text-[12px] text-text-secondary mb-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-text-disabled" />
                  {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-text-disabled" />
                  {job.type}
                </span>
              </div>

              {/* 4-column Mini Funnel Row */}
              <div className="bg-surface-muted p-3 rounded-nested border border-border mb-4">
                <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Candidate Funnel</span>
                  <span className="text-text-primary font-bold">{job.candidateCount} Total</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2 rounded-element border border-border">
                    <span className="text-[16px] font-bold text-text-primary block">{job.funnel.applied}</span>
                    <span className="text-[10px] font-semibold text-text-secondary uppercase">Applied</span>
                  </div>
                  <div className="bg-white p-2 rounded-element border border-border">
                    <span className="text-[16px] font-bold text-text-primary block">{job.funnel.screening}</span>
                    <span className="text-[10px] font-semibold text-text-secondary uppercase">Screen</span>
                  </div>
                  <div className="bg-white p-2 rounded-element border border-border">
                    <span className="text-[16px] font-bold text-primary block">{job.funnel.interview}</span>
                    <span className="text-[10px] font-semibold text-primary uppercase">Interview</span>
                  </div>
                  <div className="bg-white p-2 rounded-element border border-border">
                    <span className="text-[16px] font-bold text-status-successText block">{job.funnel.offer}</span>
                    <span className="text-[10px] font-semibold text-status-successText uppercase">Offer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action button */}
            <Button
              variant="secondary"
              className="w-full justify-center"
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={() => onViewPipelineForRole(job.title)}
            >
              View Pipeline
            </Button>
          </Card>
        ))}
      </div>

      {/* Add Job Opening Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Job Opening"
      >
        <form onSubmit={handleAddJobSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-text-secondary mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Backend Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px] font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-text-secondary mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px] font-medium text-text-primary"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-text-secondary mb-1">
                Job Type
              </label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px] font-medium text-text-primary"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-text-secondary mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. San Francisco, CA (Hybrid)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-[40px] px-3.5 bg-white border border-border rounded-element text-[14px] font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isUrgent"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-4 h-4 rounded text-primary border-border focus:ring-primary cursor-pointer"
            />
            <label htmlFor="isUrgent" className="text-[14px] font-semibold text-text-primary cursor-pointer">
              Mark as Urgent Requisition
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Publish Requisition
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
