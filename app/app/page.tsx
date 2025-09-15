"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    completedJobs: 0,
    failedJobs: 0,
    totalEmissions: 0
  });
  const [recentJobs, setRecentJobs] = useState<Array<{
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

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/login');
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchJobStats();
      fetchRecentJobs();
    }
  }, [session]);

  const fetchJobStats = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        const jobs = data.jobs || [];
        
        const stats = {
          totalJobs: jobs.length,
          completedJobs: jobs.filter((job: { state: string }) => job.state === 'done').length,
          failedJobs: jobs.filter((job: { state: string }) => job.state === 'error').length,
          totalEmissions: jobs
            .filter((job: { state: string; result?: { totals: { total: number } } }) => job.state === 'done' && job.result)
            .reduce((sum: number, job: { result: { totals: { total: number } } }) => sum + (job.result.totals.total || 0), 0)
        };
        
        setJobStats(stats);
      }
    } catch (error) {
      console.error('Failed to fetch job stats:', error);
    }
  };

  const fetchRecentJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        const jobs = data.jobs || [];
        setRecentJobs(jobs.slice(0, 3)); // Show last 3 jobs
      }
    } catch (error) {
      console.error('Failed to fetch recent jobs:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  const quickActions = [
    {
      title: 'Upload Data',
      description: 'Upload your activity data files for carbon calculation',
      href: '/upload',
      icon: '📊',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    {
      title: 'View Reports',
      description: 'Access your SECR and PPN 06/21 compliance reports',
      href: '/app/reports',
      icon: '📋',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
    },
    {
      title: 'Data History',
      description: 'Review your previous uploads and calculations',
      href: '/app/history',
      icon: '📈',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    }
  ];

  const stats = [
    {
      label: 'Total Uploads',
      value: jobStats.totalJobs.toString(),
      change: jobStats.totalJobs > 0 ? 'Active' : 'No uploads yet',
      changeType: jobStats.totalJobs > 0 ? 'positive' as const : 'neutral' as const
    },
    {
      label: 'Total Emissions',
      value: `${jobStats.totalEmissions.toFixed(1)} tCO₂e`,
      change: jobStats.totalEmissions > 0 ? 'Calculated' : 'No data',
      changeType: jobStats.totalEmissions > 0 ? 'positive' as const : 'neutral' as const
    },
    {
      label: 'Completed Jobs',
      value: jobStats.completedJobs.toString(),
      change: jobStats.failedJobs > 0 ? `${jobStats.failedJobs} failed` : 'All successful',
      changeType: jobStats.failedJobs === 0 ? 'positive' as const : 'negative' as const
    },
    {
      label: 'Compliance Status',
      value: jobStats.completedJobs > 0 ? 'Ready' : 'Pending',
      change: jobStats.completedJobs > 0 ? 'Reports available' : 'Upload data first',
      changeType: jobStats.completedJobs > 0 ? 'positive' as const : 'neutral' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Welcome back, {session.user.username}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          Ready to streamline your carbon reporting? Upload your data and generate compliance reports in minutes.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : stat.changeType === 'negative'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={action.href}
                className={`block bg-gradient-to-br ${action.bgColor} rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      {recentJobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    job.state === 'done' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                    job.state === 'processing' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                    job.state === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {job.state === 'done' ? '✓' : job.state === 'processing' ? '⏳' : job.state === 'error' ? '✗' : '⏸'}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                      {job.fileName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(job.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
                    {job.state}
                  </p>
                  {job.result && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      {job.result.totals.total.toFixed(1)} tCO₂e
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/upload"
              className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
            >
              View all uploads →
            </Link>
          </div>
        </motion.div>
      )}

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Upload Your Data
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Upload CSV or Excel files containing your activity data (fuel usage, electricity, travel, etc.)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Review Calculations
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Our system automatically calculates your Scope 1, 2, and 3 emissions using UK government factors
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Generate Reports
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Download professional SECR and PPN 06/21 compliance reports ready for submission
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/upload"
            className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm hover:shadow-md active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Start Your First Upload →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
