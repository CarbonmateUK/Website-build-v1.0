# API Documentation

## Overview

This document provides comprehensive documentation for all API endpoints in the Carbonmate platform.

## Authentication

All protected endpoints require authentication via NextAuth.js session cookies.

### Authentication Flow
1. User submits credentials to `/api/auth/signin`
2. NextAuth validates credentials against `USERS_JSON`
3. Session cookie is set for subsequent requests
4. Protected endpoints verify session validity

## Endpoints

### Authentication Endpoints

#### `POST /api/auth/signin`
Authenticate user with credentials.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "role": "string"
  }
}
```

#### `POST /api/auth/signout`
Sign out current user.

**Response:**
```json
{
  "message": "Signed out successfully"
}
```

---

### Job Management Endpoints

#### `POST /api/jobs`
Create a new job for file processing.

**Request:** Multipart form data
- `file`: CSV/Excel file
- `userId`: User ID (from session)

**Response:**
```json
{
  "jobId": "string",
  "status": "processing",
  "message": "Job created successfully"
}
```

**Error Responses:**
- `400`: Invalid file format or missing file
- `401`: Unauthorized
- `413`: File too large

#### `GET /api/jobs`
Get all jobs for the authenticated user.

**Response:**
```json
{
  "jobs": [
    {
      "id": "string",
      "fileName": "string",
      "state": "completed|processing|failed",
      "createdAt": "string",
      "result": {
        "totals": {
          "scope1": "number",
          "scope2": "number", 
          "scope3": "number",
          "total": "number"
        },
        "accepted": [
          {
            "rowIndex": "number",
            "kgco2e": "number"
          }
        ],
        "rejected": [
          {
            "rowIndex": "number",
            "reason": "string"
          }
        ],
        "meta": {
          "factor_version": "string",
          "processedAt": "string"
        }
      }
    }
  ]
}
```

#### `GET /api/jobs/[jobId]`
Get specific job details.

**Parameters:**
- `jobId`: Job identifier

**Response:**
```json
{
  "id": "string",
  "fileName": "string",
  "state": "completed|processing|failed",
  "progress": "number",
  "status": "string",
  "createdAt": "string",
  "result": {
    "totals": {
      "scope1": "number",
      "scope2": "number",
      "scope3": "number", 
      "total": "number"
    },
    "accepted": "array",
    "rejected": "array",
    "meta": "object"
  },
  "error": "string"
}
```

#### `DELETE /api/jobs/[jobId]`
Delete a specific job.

**Parameters:**
- `jobId`: Job identifier

**Response:**
```json
{
  "message": "Job deleted successfully"
}
```

---

### Report Generation Endpoints

#### `POST /api/export/secr`
Generate SECR compliance report.

**Request Body:**
```json
{
  "jobId": "string",
  "companyData": {
    "companyName": "string",
    "companyNumber": "string",
    "reportingPeriod": "string",
    "directorName": "string",
    "directorTitle": "string",
    "turnover": "number",
    "previousYearEmissions": "number",
    "energyConsumption": "number",
    "energyConsumptionPreviousYear": "number"
  }
}
```

**Response:** Word document (.docx file)

**Error Responses:**
- `400`: Invalid job ID or missing company data
- `401`: Unauthorized
- `403`: Job belongs to different user
- `404`: Job not found
- `500`: Report generation failed

#### `POST /api/export/ppn`
Generate PPN 06/21 Carbon Reduction Plan.

**Request Body:**
```json
{
  "jobId": "string",
  "companyData": {
    "companyName": "string",
    "companyNumber": "string",
    "reportingPeriod": "string",
    "directorName": "string",
    "directorTitle": "string",
    "previousYearEmissions": "number",
    "carbonReductionPlan": "string",
    "carbonReductionTargets": ["string"]
  }
}
```

**Response:** Word document (.docx file)

**Error Responses:**
- `400`: Invalid job ID or missing company data
- `401`: Unauthorized
- `403`: Job belongs to different user
- `404`: Job not found
- `500`: Report generation failed

---

## Data Models

### Job
```typescript
interface Job {
  id: string;
  userId: string;
  fileName: string;
  state: 'processing' | 'completed' | 'failed';
  progress: number;
  status: string;
  createdAt: string;
  result?: JobResult;
  error?: string;
}
```

### JobResult
```typescript
interface JobResult {
  totals: {
    scope1: number;
    scope2: number;
    scope3: number;
    total: number;
  };
  accepted: Array<{
    rowIndex: number;
    kgco2e: number;
  }>;
  rejected: Array<{
    rowIndex: number;
    reason: string;
  }>;
  meta: {
    factor_version: string;
    processedAt: string;
  };
}
```

### User
```typescript
interface User {
  username: string;
  password: string; // bcrypt hashed
  role: string;
}
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "error": "string",
  "message": "string",
  "statusCode": "number"
}
```

### Common Error Codes
- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `413`: Payload Too Large - File size exceeded
- `500`: Internal Server Error - Server error

---

## Rate Limiting

Currently no rate limiting implemented. For production, consider:
- File upload limits (10MB per file)
- Request rate limiting (100 requests/minute per user)
- Job processing limits (5 concurrent jobs per user)

---

## Security Considerations

### Input Validation
- File type validation (CSV, Excel only)
- File size limits (10MB maximum)
- Data sanitization for all inputs
- SQL injection prevention (parameterized queries)

### Authentication Security
- bcryptjs password hashing (12 rounds)
- JWT session tokens
- Secure cookie settings
- CSRF protection via NextAuth

### Data Protection
- User data isolation
- Secure file upload handling
- No sensitive data in error messages
- Audit logging for compliance

---

## Performance Considerations

### File Processing
- Background job processing
- Progress tracking with polling
- Efficient memory usage
- Chunked file processing for large files

### Database Operations
- In-memory store for development
- Connection pooling for production
- Indexed queries for performance
- Caching for frequently accessed data

### Report Generation
- Streaming file generation
- Efficient Word document creation
- Memory-optimized processing
- Parallel processing where possible

---

## Monitoring and Logging

### Application Metrics
- Job processing times
- File upload success rates
- Report generation performance
- User activity patterns

### Error Tracking
- Comprehensive error logging
- Stack trace capture
- User context preservation
- Performance bottleneck identification

### Compliance Monitoring
- Data processing audit trails
- User access logging
- Report generation tracking
- Security event monitoring
