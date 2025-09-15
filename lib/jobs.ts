/**
 * In-memory job store for file processing
 * In production, this would be replaced with Redis or a database
 */

import { Job, JobResult, ParsedRow } from './types';
import { findEmissionFactorByActivity } from './factors';
import { convertUnit } from './units';
import { validateRow, cleanRow } from './parse';

// In-memory storage
const jobs = new Map<string, Job>();
const jobResults = new Map<string, JobResult>();

/**
 * Create a new job
 */
export function createJob(userId: string, fileName: string): Job {
  const job: Job = {
    id: generateJobId(),
    userId,
    fileName,
    state: 'queued',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  jobs.set(job.id, job);
  return job;
}

/**
 * Get job by ID
 */
export function getJob(jobId: string): Job | null {
  return jobs.get(jobId) || null;
}

/**
 * Update job state
 */
export function updateJobState(jobId: string, state: Job['state'], progress?: number, error?: string): void {
  const job = jobs.get(jobId);
  if (job) {
    job.state = state;
    job.progress = progress;
    job.error = error;
    job.updatedAt = new Date().toISOString();
    jobs.set(jobId, job);
  }
}

/**
 * Set job result
 */
export function setJobResult(jobId: string, result: JobResult): void {
  const job = jobs.get(jobId);
  if (job) {
    job.result = result;
    job.state = 'done';
    job.updatedAt = new Date().toISOString();
    jobs.set(jobId, job);
    jobResults.set(jobId, result);
  }
}

/**
 * Process uploaded file data
 */
export async function processJob(jobId: string, rows: ParsedRow[]): Promise<void> {
  try {
    updateJobState(jobId, 'processing', 0);

    const acceptedRows: JobResult['accepted'] = [];
    const rejectedRows: JobResult['rejected'] = [];
    let scope1Total = 0;
    let scope2Total = 0;
    let scope3Total = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const progress = Math.round((i / rows.length) * 100);
      updateJobState(jobId, 'processing', progress);

      // Clean and validate row
      const cleanedRow = cleanRow(row);
      const validationErrors = validateRow(cleanedRow);

      if (validationErrors.length > 0) {
        rejectedRows.push({
          rowIndex: cleanedRow.rowIndex,
          reason: validationErrors.map(e => `${e.field}: ${e.message}`).join('; ')
        });
        continue;
      }

      // Find emission factor
      const emissionFactor = findEmissionFactorByActivity(
        cleanedRow.activity_type,
        cleanedRow.unit
      );

      if (!emissionFactor) {
        rejectedRows.push({
          rowIndex: cleanedRow.rowIndex,
          reason: `No emission factor found for activity: ${cleanedRow.activity_type} (${cleanedRow.unit})`
        });
        continue;
      }

      // Convert units if necessary
      let finalQuantity = cleanedRow.quantity;
      let appliedUnit = cleanedRow.unit;

      if (cleanedRow.unit !== emissionFactor.unit) {
        const conversion = convertUnit(cleanedRow.quantity, cleanedRow.unit, emissionFactor.unit);
        if (conversion.success && conversion.convertedQuantity) {
          finalQuantity = conversion.convertedQuantity;
          appliedUnit = conversion.appliedUnit || emissionFactor.unit;
        } else {
          rejectedRows.push({
            rowIndex: cleanedRow.rowIndex,
            reason: `Unit conversion failed: ${conversion.error}`
          });
          continue;
        }
      }

      // Calculate emissions
      const kgco2e = finalQuantity * emissionFactor.kgco2e_per_unit;

      // Add to totals
      if (emissionFactor.scope === 1) scope1Total += kgco2e;
      else if (emissionFactor.scope === 2) scope2Total += kgco2e;
      else if (emissionFactor.scope === 3) scope3Total += kgco2e;

      // Add to accepted rows
      acceptedRows.push({
        rowIndex: cleanedRow.rowIndex,
        date: cleanedRow.date,
        activity_type: cleanedRow.activity_type,
        quantity: cleanedRow.quantity,
        unit: cleanedRow.unit,
        source: cleanedRow.source,
        converted_quantity: finalQuantity,
        applied_unit: appliedUnit,
        scope: emissionFactor.scope,
        factor_key: emissionFactor.key,
        kgco2e: Math.round(kgco2e * 100) / 100 // Round to 2 decimal places
      });
    }

    // Create result
    const result: JobResult = {
      accepted: acceptedRows,
      rejected: rejectedRows,
      totals: {
        scope1: Math.round(scope1Total * 100) / 100,
        scope2: Math.round(scope2Total * 100) / 100,
        scope3: Math.round(scope3Total * 100) / 100,
        total: Math.round((scope1Total + scope2Total + scope3Total) * 100) / 100
      },
      meta: {
        factor_version: 'UK Government 2024',
        processedAt: new Date().toISOString()
      }
    };

    setJobResult(jobId, result);
  } catch (error) {
    updateJobState(jobId, 'error', undefined, error instanceof Error ? error.message : 'Unknown error');
  }
}

/**
 * Get jobs for a user
 */
export function getUserJobs(userId: string): Job[] {
  return Array.from(jobs.values())
    .filter(job => job.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Delete job
 */
export function deleteJob(jobId: string): boolean {
  const deleted = jobs.delete(jobId);
  jobResults.delete(jobId);
  return deleted;
}

/**
 * Generate unique job ID
 */
function generateJobId(): string {
  return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get job statistics
 */
export function getJobStats(userId: string): {
  totalJobs: number;
  completedJobs: number;
  failedJobs: number;
  totalEmissions: number;
} {
  const userJobs = getUserJobs(userId);
  const completedJobs = userJobs.filter(job => job.state === 'done');
  const failedJobs = userJobs.filter(job => job.state === 'error');
  
  let totalEmissions = 0;
  completedJobs.forEach(job => {
    if (job.result) {
      totalEmissions += job.result.totals.total;
    }
  });

  return {
    totalJobs: userJobs.length,
    completedJobs: completedJobs.length,
    failedJobs: failedJobs.length,
    totalEmissions: Math.round(totalEmissions * 100) / 100
  };
}
