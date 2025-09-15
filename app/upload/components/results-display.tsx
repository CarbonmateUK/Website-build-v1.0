/**
 * Results display component for job results
 */

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompanyDataModal from './company-data-modal';

interface ResultsDisplayProps {
  jobId: string;
}

interface JobResult {
  accepted: Array<{
    rowIndex: number;
    date: string;
    activity_type: string;
    quantity: number;
    unit: string;
    source?: string;
    converted_quantity?: number;
    applied_unit: string;
    scope: 1 | 2 | 3;
    factor_key: string;
    kgco2e: number;
  }>;
  rejected: Array<{ rowIndex: number; reason: string }>;
  totals: { scope1: number; scope2: number; scope3: number; total: number };
  meta: { factor_version: string; processedAt: string };
}

export default function ResultsDisplay({ jobId }: ResultsDisplayProps) {
  const [result, setResult] = useState<JobResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState<'SECR' | 'PPN'>('SECR');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (response.ok) {
          const job = await response.json();
          if (job.result) {
            setResult(job.result);
          }
        }
      } catch (error) {
        console.error('Failed to fetch result:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [jobId]);

  const handleGenerateReport = async (companyData: {
    companyName: string;
    companyNumber?: string;
    reportingPeriod: string;
    directorName: string;
    directorTitle: string;
    turnover?: number;
    previousYearEmissions?: number;
    energyConsumption?: number;
    energyConsumptionPreviousYear?: number;
    carbonReductionPlan?: string;
    carbonReductionTargets?: string[];
  }) => {
    try {
      const response = await fetch(`/api/export/${reportType.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          companyData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-Report-${companyData.companyName.replace(/[^a-zA-Z0-9]/g, '-')}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Report generation error:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  const openReportModal = (type: 'SECR' | 'PPN') => {
    setReportType(type);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center p-8 text-slate-500 dark:text-slate-400">
        No results available yet
      </div>
    );
  }

  const kpiCards = [
    {
      title: 'Total Emissions',
      value: `${result.totals.total.toFixed(1)} tCO₂e`,
      subtitle: 'All Scopes Combined',
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      icon: '🌍'
    },
    {
      title: 'Scope 1',
      value: `${result.totals.scope1.toFixed(1)} tCO₂e`,
      subtitle: 'Direct Emissions',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: '🔥'
    },
    {
      title: 'Scope 2',
      value: `${result.totals.scope2.toFixed(1)} tCO₂e`,
      subtitle: 'Electricity',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      icon: '⚡'
    },
    {
      title: 'Scope 3',
      value: `${result.totals.scope3.toFixed(1)} tCO₂e`,
      subtitle: 'Other Indirect',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      icon: '🚗'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${kpi.color} rounded-xl p-4 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-xs opacity-80">tCO₂e</span>
            </div>
            <div className="text-2xl font-bold mb-1">{kpi.value}</div>
            <div className="text-sm opacity-90">{kpi.subtitle}</div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Accepted Rows</h3>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {result.accepted.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Rejected Rows</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {result.rejected.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Success Rate</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {result.accepted.length > 0 
                  ? Math.round((result.accepted.length / (result.accepted.length + result.rejected.length)) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap gap-4"
      >
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
          onClick={() => openReportModal('SECR')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate SECR Report
        </button>
        
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          onClick={() => openReportModal('PPN')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate PPN Report
        </button>

        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
          onClick={() => {
            // Export data as CSV
            const csvContent = result.accepted.map(row => 
              `${row.date},${row.activity_type},${row.quantity},${row.unit},${row.kgco2e}`
            ).join('\n');
            
            const headers = 'Date,Activity Type,Quantity,Unit,kgCO2e\n';
            const blob = new Blob([headers + csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `carbon-data-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Data
        </button>
      </motion.div>

      {/* Data Tables */}
      {result.accepted.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Processed Data ({result.accepted.length} rows)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Emissions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {result.accepted.slice(0, 10).map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                      {row.activity_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                      {row.quantity} {row.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        row.scope === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        row.scope === 2 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        Scope {row.scope}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {row.kgco2e.toFixed(2)} kgCO₂e
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.accepted.length > 10 && (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Showing first 10 rows of {result.accepted.length} total rows
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Rejected Rows */}
      {result.rejected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Rejected Rows ({result.rejected.length} rows)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              These rows couldn&apos;t be processed due to validation errors
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Row
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {result.rejected.slice(0, 10).map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                      Row {row.rowIndex}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400">
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.rejected.length > 10 && (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Showing first 10 rows of {result.rejected.length} total rejected rows
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Company Data Modal */}
      <CompanyDataModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onGenerateReport={handleGenerateReport}
        reportType={reportType}
      />
    </div>
  );
}
