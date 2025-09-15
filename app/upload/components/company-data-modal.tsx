/**
 * Company data collection modal for report generation
 */

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompanyDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: (data: {
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
  }) => void;
  reportType: 'SECR' | 'PPN';
}

export default function CompanyDataModal({ isOpen, onClose, onGenerateReport, reportType }: CompanyDataModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    companyNumber: '',
    reportingPeriod: '2024',
    directorName: '',
    directorTitle: 'Director',
    turnover: '',
    previousYearEmissions: '',
    energyConsumption: '',
    energyConsumptionPreviousYear: '',
    carbonReductionPlan: '',
    carbonReductionTargets: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string values to numbers where needed
    const processedData = {
      ...formData,
      turnover: formData.turnover ? parseFloat(formData.turnover) : undefined,
      previousYearEmissions: formData.previousYearEmissions ? parseFloat(formData.previousYearEmissions) : undefined,
      energyConsumption: formData.energyConsumption ? parseFloat(formData.energyConsumption) : undefined,
      energyConsumptionPreviousYear: formData.energyConsumptionPreviousYear ? parseFloat(formData.energyConsumptionPreviousYear) : undefined,
      carbonReductionTargets: formData.carbonReductionTargets.filter(target => target.trim() !== ''),
    };

    onGenerateReport(processedData);
    onClose();
  };

  const addTarget = () => {
    setFormData(prev => ({
      ...prev,
      carbonReductionTargets: [...prev.carbonReductionTargets, '']
    }));
  };

  const removeTarget = (index: number) => {
    setFormData(prev => ({
      ...prev,
      carbonReductionTargets: prev.carbonReductionTargets.filter((_, i) => i !== index)
    }));
  };

  const updateTarget = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      carbonReductionTargets: prev.carbonReductionTargets.map((target, i) => i === index ? value : target)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Generate {reportType} Report
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Please provide your company information to generate a compliant {reportType} report.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Company Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your Company Ltd"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Number
                    </label>
                    <input
                      type="text"
                      value={formData.companyNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="12345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Reporting Period *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reportingPeriod}
                    onChange={(e) => setFormData(prev => ({ ...prev, reportingPeriod: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="2023"
                  />
                </div>
              </div>

              {/* Director Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Director Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Director Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.directorName}
                      onChange={(e) => setFormData(prev => ({ ...prev, directorName: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Director Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.directorTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, directorTitle: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Managing Director"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information (SECR only) */}
              {reportType === 'SECR' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Financial Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Annual Turnover (£)
                    </label>
                    <input
                      type="number"
                      value={formData.turnover}
                      onChange={(e) => setFormData(prev => ({ ...prev, turnover: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="1000000"
                    />
                  </div>
                </div>
              )}

              {/* Historical Data */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Historical Data (Optional)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Previous Year Emissions (tCO₂e)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.previousYearEmissions}
                      onChange={(e) => setFormData(prev => ({ ...prev, previousYearEmissions: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="150.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Energy Consumption (kWh)
                    </label>
                    <input
                      type="number"
                      value={formData.energyConsumption}
                      onChange={(e) => setFormData(prev => ({ ...prev, energyConsumption: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>

              {/* PPN-specific fields */}
              {reportType === 'PPN' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Carbon Reduction Plan
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Carbon Reduction Plan Description
                    </label>
                    <textarea
                      value={formData.carbonReductionPlan}
                      onChange={(e) => setFormData(prev => ({ ...prev, carbonReductionPlan: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Describe your company's carbon reduction plan..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Carbon Reduction Targets
                    </label>
                    {formData.carbonReductionTargets.map((target, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={target}
                          onChange={(e) => updateTarget(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g., Reduce emissions by 50% by 2030"
                        />
                        {formData.carbonReductionTargets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTarget(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTarget}
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                    >
                      + Add Target
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Generate {reportType} Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
