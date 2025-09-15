/** Domain types for Carbonmate */

export type Scope = 1 | 2 | 3;

export interface Factor {
  key: string; // e.g., "diesel/litre"
  unit: string; // canonical unit, e.g., "L", "kWh", "mile"
  kgco2ePerUnit: number; // emission factor value
  scope: Scope;
  source?: string;
}

export interface JobRowAccepted {
  rowIndex: number;
  date: string;
  activity_type: string;
  quantity: number;
  unit: string;
  source?: string;
  converted_quantity?: number;
  applied_unit: string;
  scope: Scope;
  factor_key: string;
  kgco2e: number;
}

export interface JobRowRejected {
  rowIndex: number;
  reason: string;
}

export interface JobTotals {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

export interface JobResult {
  accepted: JobRowAccepted[];
  rejected: JobRowRejected[];
  totals: JobTotals;
  meta: { factor_version: string; processedAt: string };
}

export type JobState = "queued" | "processing" | "done" | "error";

export interface Job {
  id: string;
  state: JobState;
  progress?: number;
  result?: JobResult;
  error?: string;
  filename?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ReportInput {
  companyName: string;
  reportingPeriod: string;
  job: JobResult;
  preparedBy?: string;
  approvedBy?: string;
  notes?: string;
}

export interface EnvUser {
  id: string;
  username: string;
  passwordHash: string;
  role: "admin" | "customer";
}

