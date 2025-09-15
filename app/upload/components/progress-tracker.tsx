/**
 * Progress tracker component for job processing
 */

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressTrackerProps {
  jobId: string;
  onComplete: () => void;
  onError: (error: string) => void;
}

interface JobStatus {
  id: string;
  fileName: string;
  state: 'queued' | 'processing' | 'done' | 'error';
  progress?: number;
  error?: string;
}

export default function ProgressTracker({ jobId, onComplete, onError }: ProgressTrackerProps) {
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    if (!isPolling) return;

    const pollJobStatus = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job status');
        }

        const job: JobStatus = await response.json();
        setJobStatus(job);

        if (job.state === 'done') {
          setIsPolling(false);
          onComplete();
        } else if (job.state === 'error') {
          setIsPolling(false);
          onError(job.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error polling job status:', error);
        setIsPolling(false);
        onError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    // Poll immediately, then every 2 seconds
    pollJobStatus();
    const interval = setInterval(pollJobStatus, 2000);

    return () => clearInterval(interval);
  }, [jobId, isPolling, onComplete, onError]);

  if (!jobStatus) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'queued': return 'text-blue-600 dark:text-blue-400';
      case 'processing': return 'text-yellow-600 dark:text-yellow-400';
      case 'done': return 'text-emerald-600 dark:text-emerald-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'queued':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'done':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Info */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
        <div className={`flex items-center gap-2 ${getStatusColor(jobStatus.state)}`}>
          {getStatusIcon(jobStatus.state)}
          <span className="font-medium capitalize">{jobStatus.state}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Processing: <span className="font-medium">{jobStatus.fileName}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {jobStatus.state === 'processing' && jobStatus.progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300">Processing...</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {jobStatus.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-emerald-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${jobStatus.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Processing Steps */}
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">Processing Steps:</h4>
        <div className="space-y-2">
          {[
            { step: 'Parse file', completed: jobStatus.state !== 'queued' },
            { step: 'Validate data', completed: jobStatus.state === 'processing' && (jobStatus.progress || 0) > 25 },
            { step: 'Calculate emissions', completed: jobStatus.state === 'processing' && (jobStatus.progress || 0) > 75 },
            { step: 'Generate results', completed: jobStatus.state === 'done' }
          ].map(({ step, completed }, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 text-sm ${
                completed 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                completed 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}>
                {completed ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                )}
              </div>
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {jobStatus.state === 'error' && jobStatus.error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Processing Failed</h4>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{jobStatus.error}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
