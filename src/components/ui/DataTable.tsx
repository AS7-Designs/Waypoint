import React from 'react';
import { StatusPill } from './StatusPill';
import { Avatar } from './Avatar';
import { Candidate, StatusPillVariant } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (row: T) => React.ReactNode;
}

export interface DataTableProps {
  candidates: Candidate[];
  onSelectCandidate?: (candidate: Candidate) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  candidates,
  onSelectCandidate,
}) => {
  const [sortField, setSortField] = React.useState<keyof Candidate>('appliedDate');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Candidate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStageVariant = (stage: string): StatusPillVariant => {
    switch (stage) {
      case 'Hired':
        return 'success';
      case 'Offer':
      case 'Interview':
        return 'progress';
      case 'Screening':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-[16px] border border-[#ECECF3] bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#ECECF3] bg-[#F8F9FC] text-[12px] leading-[16px] font-semibold text-[#6B7280]">
            <th
              className="py-3.5 px-4 cursor-pointer select-none"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1.5">
                <span>Candidate</span>
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </th>
            <th className="py-3.5 px-4">Role Applied</th>
            <th className="py-3.5 px-4">Stage</th>
            <th
              className="py-3.5 px-4 cursor-pointer select-none"
              onClick={() => handleSort('appliedDate')}
            >
              <div className="flex items-center gap-1.5">
                <span>Applied Date</span>
                {sortField === 'appliedDate' && (
                  sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </th>
            <th className="py-3.5 px-4">Recruiter</th>
            <th className="py-3.5 px-4">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ECECF3]">
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              onClick={() => onSelectCandidate && onSelectCandidate(candidate)}
              className="hover:bg-[#F8F9FC] transition-colors cursor-pointer text-[14px] leading-[20px]"
            >
              {/* Candidate Avatar + Name */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <Avatar src={candidate.avatar} name={candidate.name} size="sm" />
                  <div>
                    <div className="font-semibold text-[#111827]">
                      {candidate.name}
                    </div>
                    <div className="text-[12px] text-[#6B7280]">
                      {candidate.email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="py-3.5 px-4 font-medium text-[#111827]">
                {candidate.role}
              </td>

              {/* Stage StatusPill */}
              <td className="py-3.5 px-4">
                <StatusPill
                  variant={getStageVariant(candidate.stage)}
                  label={candidate.stage}
                />
              </td>

              {/* Applied Date */}
              <td className="py-3.5 px-4 text-[#6B7280]">
                {candidate.appliedDate}
              </td>

              {/* Recruiter */}
              <td className="py-3.5 px-4 text-[#111827]">
                {candidate.recruiter}
              </td>

              {/* Source */}
              <td className="py-3.5 px-4 text-[#6B7280]">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[12px] font-medium text-[#6B7280]">
                  {candidate.source}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
