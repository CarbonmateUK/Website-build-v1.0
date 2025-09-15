/**
 * SECR Report Export API
 * Generates and downloads SECR compliance reports
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getJob } from '@/lib/jobs';
import { generateSECRReport, calculateIntensityRatio, calculateReductionPercentage } from '@/lib/reports/secr';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { jobId, companyData } = body;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Get job and verify ownership
    const job = getJob(jobId);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (!job.result) {
      return NextResponse.json({ error: 'Job not completed yet' }, { status: 400 });
    }

    // Prepare report data
    const reportData = {
      companyName: companyData.companyName || 'Your Company',
      companyNumber: companyData.companyNumber,
      reportingPeriod: companyData.reportingPeriod || `${new Date().getFullYear() - 1}`,
      scope1Emissions: job.result.totals.scope1,
      scope2Emissions: job.result.totals.scope2,
      scope3Emissions: job.result.totals.scope3,
      totalEmissions: job.result.totals.total,
      intensityRatio: calculateIntensityRatio(job.result.totals.total, companyData.turnover),
      previousYearEmissions: companyData.previousYearEmissions,
      reductionPercentage: companyData.previousYearEmissions 
        ? calculateReductionPercentage(job.result.totals.total, companyData.previousYearEmissions)
        : undefined,
      energyConsumption: companyData.energyConsumption || 0,
      energyConsumptionPreviousYear: companyData.energyConsumptionPreviousYear,
      energyReductionPercentage: companyData.energyConsumptionPreviousYear
        ? calculateReductionPercentage(companyData.energyConsumption || 0, companyData.energyConsumptionPreviousYear)
        : undefined,
      reportingDate: new Date().toLocaleDateString('en-GB'),
      directorName: companyData.directorName || 'Director Name',
      directorTitle: companyData.directorTitle || 'Director',
    };

    // Generate report
    const reportBuffer = await generateSECRReport(reportData, job.result);

    // Return file as download
    return new NextResponse(reportBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="SECR-Report-${reportData.companyName.replace(/[^a-zA-Z0-9]/g, '-')}-${reportData.reportingPeriod}.docx"`,
        'Content-Length': reportBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('SECR report generation error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
