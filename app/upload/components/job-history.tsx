/**
 * Job history component showing past uploads
 */

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface JobHistoryProps {
  jobs: Array<{
    id: string;
    fileName: string;
    state: string;
    createdAt: string;
    result?: {
      totals: { total: number };
      accepted: Array<{ rowIndex: number; kgco2e: number }>;
      rejected: Array<{ rowIndex: number; reason: string }>;
    };
  }>;
  onRefresh: () => void;
}

export default function JobHistory({ jobs, onRefresh }: JobHistoryProps) {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'queued': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'processing': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'done': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30';
      case 'error': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700';
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'queued':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'done':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Upload History
        </h3>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Refresh"
        >
          <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-500 dark:text-slate-400">No uploads yet</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Upload your first file to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(job.state)}`}>
                      {getStatusIcon(job.state)}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        {job.fileName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(job.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.result && (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {job.result.totals.total.toFixed(1)} tCO₂e
                      </span>
                    )}
                    <svg 
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        expandedJob === job.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {expandedJob === job.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-700/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.state)}`}>
                        {job.state.charAt(0).toUpperCase() + job.state.slice(1)}
                      </span>
                    </div>
                    
                    {job.result && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">Total Emissions:</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {job.result.totals.total.toFixed(2)} tCO₂e
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">Accepted Rows:</span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            {job.result.accepted.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">Rejected Rows:</span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {job.result.rejected.length}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <button
                        className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                        onClick={() => {
                          // TODO: Navigate to results view
                          alert('View results functionality coming soon!');
                        }}
                      >
                        View Results
                      </button>
                      <button
                        className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this job?')) {
                            try {
                              const response = await fetch(`/api/jobs/${job.id}`, {
                                method: 'DELETE'
                              });
                              if (response.ok) {
                                onRefresh();
                              } else {
                                alert('Failed to delete job');
                              }
                            } catch {
                              alert('Error deleting job');
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
