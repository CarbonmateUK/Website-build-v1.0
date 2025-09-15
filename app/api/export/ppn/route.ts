/**
 * PPN 06/21 Report Export API
 * Generates and downloads PPN 06/21 compliance reports
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getJob } from '@/lib/jobs';
import { generatePPNReport, getDefaultCarbonReductionTargets, getDefaultCarbonReductionPlan } from '@/lib/reports/ppn';

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
      reportingPeriod: companyData.reportingPeriod || '2024',
      scope1Emissions: job.result.totals.scope1,
      scope2Emissions: job.result.totals.scope2,
      scope3Emissions: job.result.totals.scope3,
      totalEmissions: job.result.totals.total,
      previousYearEmissions: companyData.previousYearEmissions,
      reductionPercentage: companyData.previousYearEmissions 
        ? ((companyData.previousYearEmissions - job.result.totals.total) / companyData.previousYearEmissions) * 100
        : undefined,
      carbonReductionPlan: companyData.carbonReductionPlan || getDefaultCarbonReductionPlan(),
      carbonReductionTargets: companyData.carbonReductionTargets || getDefaultCarbonReductionTargets(),
      reportingDate: '15 September 2025',
      directorName: companyData.directorName || 'Director Name',
      directorTitle: companyData.directorTitle || 'Director',
    };

    // Generate report
    const reportBuffer = await generatePPNReport(reportData, job.result);

    // Return file as download
    return new NextResponse(reportBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="PPN-Carbon-Reduction-Plan-${reportData.companyName.replace(/[^a-zA-Z0-9]/g, '-')}-${reportData.reportingPeriod}.docx"`,
        'Content-Length': reportBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PPN report generation error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
