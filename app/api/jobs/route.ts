/**
 * Jobs API endpoint
 * Handles job creation and listing
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createJob, getUserJobs } from '@/lib/jobs';
import { parseFile, validateHeaders } from '@/lib/parse';
import { processJob } from '@/lib/jobs';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only CSV and Excel files are allowed.' }, { status: 400 });
    }

    // Create job
    const job = createJob(session.user.id, file.name);

    // Process file in background
    const buffer = Buffer.from(await file.arrayBuffer());
    
    try {
      // Parse file
      const rows = parseFile(buffer, file.type);
      
      if (rows.length === 0) {
        throw new Error('No data found in file');
      }

      // Validate headers
      const headers = Object.keys(rows[0]).filter(key => key !== 'rowIndex');
      const headerErrors = validateHeaders(headers);
      
      if (headerErrors.length > 0) {
        throw new Error(`Invalid file format: ${headerErrors.map(e => e.message).join(', ')}`);
      }

      // Start background processing
      processJob(job.id, rows).catch(error => {
        console.error('Job processing error:', error);
      });

      return NextResponse.json({ jobId: job.id });
    } catch (error) {
      // Update job with error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user jobs
    const jobs = getUserJobs(session.user.id);
    
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
