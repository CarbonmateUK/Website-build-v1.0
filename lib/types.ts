/**
 * Core domain types for Carbonmate SaaS application
 * Centralized type definitions for strong typing across the application
 */

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: 'customer' | 'admin';
}

export interface Job {
  id: string;
  userId: string;
  fileName: string;
  state: 'queued' | 'processing' | 'done' | 'error';
  progress?: number;
  result?: JobResult;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobResult {
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
  rejected: Array<{ 
    rowIndex: number; 
    reason: string 
  }>;
  totals: { 
    scope1: number; 
    scope2: number; 
    scope3: number; 
    total: number 
  };
  meta: { 
    factor_version: string; 
    processedAt: string 
  };
}

export interface EmissionFactor {
  key: string;
  name: string;
  unit: string;
  kgco2e_per_unit: number;
  scope: 1 | 2 | 3;
  category: string;
  source: string;
}

export interface UnitConversion {
  from: string;
  to: string;
  factor: number;
}

export interface ReportInput {
  jobId: string;
  companyName: string;
  reportingYear: string;
  userId: string;
}

export interface SECRReportData extends ReportInput {
  totals: JobResult['totals'];
  acceptedRows: JobResult['accepted'];
  rejectedRows: JobResult['rejected'];
}

export interface PPNReportData extends ReportInput {
  totals: JobResult['totals'];
  acceptedRows: JobResult['accepted'];
  rejectedRows: JobResult['rejected'];
  reductionTargets?: {
    scope1: number;
    scope2: number;
    scope3: number;
    total: number;
  };
}

export interface ParsedRow {
  rowIndex: number;
  date: string;
  activity_type: string;
  quantity: number;
  unit: string;
  source?: string;
}

export interface ValidationError {
  rowIndex: number;
  field: string;
  message: string;
}

export interface ConversionResult {
  success: boolean;
  convertedQuantity?: number;
  appliedUnit?: string;
  error?: string;
}
