/**
 * Upload page for carbon data files
 * Handles file upload, progress tracking, and results display
 */

"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FileUpload from './components/file-upload';
import ProgressTracker from './components/progress-tracker';
import ResultsDisplay from './components/results-display';
import JobHistory from './components/job-history';

export default function UploadPage() {
  const { status } = useSession();
  const router = useRouter();
  const [currentJob, setCurrentJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Array<{
    id: string;
    fileName: string;
    state: string;
    createdAt: string;
    result?: {
      totals: { total: number };
      accepted: Array<{ rowIndex: number; kgco2e: number }>;
      rejected: Array<{ rowIndex: number; reason: string }>;
    };
  }>>([]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  }, []);

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/jobs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const { jobId } = await response.json();
      setCurrentJob(jobId);
      
      // Refresh job list
      await fetchJobs();
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleJobComplete = () => {
    setCurrentJob(null);
    fetchJobs();
  };

  const handleJobError = (error: string) => {
    setCurrentJob(null);
    alert(`Job failed: ${error}`);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Upload Your Carbon Data
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Upload your activity data in CSV or Excel format. We&apos;ll automatically calculate your 
            carbon emissions using UK Government factors and generate audit-ready reports.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Upload File
              </h2>
              
              <AnimatePresence mode="wait">
                {!currentJob ? (
                  <FileUpload onUpload={handleFileUpload} />
                ) : (
                  <ProgressTracker 
                    jobId={currentJob}
                    onComplete={handleJobComplete}
                    onError={handleJobError}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Results Display */}
            {currentJob && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <ResultsDisplay jobId={currentJob} />
              </motion.div>
            )}
          </motion.div>

          {/* Job History Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <JobHistory jobs={jobs} onRefresh={fetchJobs} />
          </motion.div>
        </div>

        {/* File Format Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            File Format Requirements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Required Columns:
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <li>• <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">date</code> - Activity date (YYYY-MM-DD)</li>
                <li>• <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">activity_type</code> - Type of activity</li>
                <li>• <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">quantity</code> - Amount consumed</li>
                <li>• <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">unit</code> - Unit of measurement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Supported Activities:
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <li>• Diesel, Petrol, Natural Gas, LPG</li>
                <li>• Electricity consumption</li>
                <li>• Business travel (car, train, flights)</li>
                <li>• Waste disposal (landfill, recycling)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
