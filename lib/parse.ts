/**
 * File parsing utilities for CSV and Excel files
 * Handles validation, cleaning, and normalization of activity data
 */

import * as XLSX from 'xlsx';
import { ParsedRow, ValidationError } from './types';

/**
 * Required columns for activity data
 */
export const REQUIRED_COLUMNS = ['date', 'activity_type', 'quantity', 'unit'];

/**
 * Optional columns
 */
export const OPTIONAL_COLUMNS = ['source', 'notes', 'description'];

/**
 * Parse CSV content into rows
 */
export function parseCSV(content: string): ParsedRow[] {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const dataRows = lines.slice(1);

  return dataRows.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const row: Record<string, string> = { rowIndex: (index + 2).toString() }; // +2 because of header and 0-based index

    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });

    return row as unknown as ParsedRow;
  });
}

/**
 * Parse Excel file buffer into rows
 */
export function parseExcel(buffer: Buffer): ParsedRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  if (jsonData.length < 2) return [];

  const headers = (jsonData[0] as string[]).map(h => h.trim().toLowerCase());
  const dataRows = jsonData.slice(1) as string[][];

  return dataRows.map((row, index) => {
    const parsedRow: Record<string, string> = { rowIndex: (index + 2).toString() }; // +2 because of header and 0-based index

    headers.forEach((header, i) => {
      parsedRow[header] = row[i] || '';
    });

    return parsedRow as unknown as ParsedRow;
  });
}

/**
 * Validate a parsed row
 */
export function validateRow(row: ParsedRow): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check required fields
  if (!row.date || row.date.toString().trim() === '') {
    errors.push({
      rowIndex: row.rowIndex,
      field: 'date',
      message: 'Date is required'
    });
  } else {
    // Validate date format
    const dateStr = row.date.toString().trim();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      errors.push({
        rowIndex: row.rowIndex,
        field: 'date',
        message: 'Invalid date format. Use YYYY-MM-DD or DD/MM/YYYY'
      });
    }
  }

  if (!row.activity_type || row.activity_type.toString().trim() === '') {
    errors.push({
      rowIndex: row.rowIndex,
      field: 'activity_type',
      message: 'Activity type is required'
    });
  }

  if (!row.quantity || row.quantity.toString().trim() === '') {
    errors.push({
      rowIndex: row.rowIndex,
      field: 'quantity',
      message: 'Quantity is required'
    });
  } else {
    // Validate quantity is a number
    const quantity = parseFloat(row.quantity.toString());
    if (isNaN(quantity) || quantity <= 0) {
      errors.push({
        rowIndex: row.rowIndex,
        field: 'quantity',
        message: 'Quantity must be a positive number'
      });
    }
  }

  if (!row.unit || row.unit.toString().trim() === '') {
    errors.push({
      rowIndex: row.rowIndex,
      field: 'unit',
      message: 'Unit is required'
    });
  }

  return errors;
}

/**
 * Clean and normalize a parsed row
 */
export function cleanRow(row: ParsedRow): ParsedRow {
  const cleaned: ParsedRow = {
    rowIndex: row.rowIndex,
    date: row.date ? row.date.toString().trim() : '',
    activity_type: row.activity_type ? row.activity_type.toString().trim().toLowerCase() : '',
    quantity: row.quantity ? parseFloat(row.quantity.toString()) : 0,
    unit: row.unit ? row.unit.toString().trim().toLowerCase() : '',
    source: row.source ? row.source.toString().trim() : undefined
  };

  // Normalize date format
  if (cleaned.date) {
    try {
      const date = new Date(cleaned.date);
      if (!isNaN(date.getTime())) {
        cleaned.date = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      }
    } catch {
      // Keep original if parsing fails
    }
  }

  return cleaned;
}

/**
 * Check if file has required columns
 */
export function validateHeaders(headers: string[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());

  for (const required of REQUIRED_COLUMNS) {
    if (!normalizedHeaders.includes(required)) {
      errors.push({
        rowIndex: 1, // Header row
        field: required,
        message: `Missing required column: ${required}`
      });
    }
  }

  return errors;
}

/**
 * Parse file based on content type
 */
export function parseFile(buffer: Buffer, contentType: string): ParsedRow[] {
  if (contentType.includes('csv') || contentType.includes('text')) {
    const content = buffer.toString('utf-8');
    return parseCSV(content);
  } else if (contentType.includes('spreadsheet') || contentType.includes('excel')) {
    return parseExcel(buffer);
  } else {
    throw new Error(`Unsupported file type: ${contentType}`);
  }
}

/**
 * Get file info from buffer
 */
export function getFileInfo(buffer: Buffer, filename: string): {
  size: number;
  type: string;
  extension: string;
} {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  let type = 'unknown';

  if (extension === 'csv') {
    type = 'text/csv';
  } else if (['xlsx', 'xls'].includes(extension)) {
    type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }

  return {
    size: buffer.length,
    type,
    extension
  };
}
