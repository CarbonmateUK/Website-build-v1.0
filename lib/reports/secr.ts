/**
 * SECR (Streamlined Energy and Carbon Reporting) Report Generator
 * Generates Word documents compliant with UK SECR requirements
 */

import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel } from 'docx';
import { JobResult } from '../types';

export interface SECRReportData {
  companyName: string;
  companyNumber?: string;
  reportingPeriod: string;
  scope1Emissions: number;
  scope2Emissions: number;
  scope3Emissions: number;
  totalEmissions: number;
  intensityRatio: number; // tCO2e per £1M turnover
  previousYearEmissions?: number;
  reductionPercentage?: number;
  energyConsumption: number; // kWh
  energyConsumptionPreviousYear?: number;
  energyReductionPercentage?: number;
  reportingDate: string;
  directorName: string;
  directorTitle: string;
}

/**
 * Generate SECR report as Word document
 */
export async function generateSECRReport(data: SECRReportData, _jobResult: JobResult): Promise<Buffer> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title Page
        new Paragraph({
          children: [
            new TextRun({
              text: "Streamlined Energy and Carbon Reporting (SECR)",
              bold: true,
              size: 32,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: data.companyName,
              bold: true,
              size: 28,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Reporting Period: ${data.reportingPeriod}`,
              size: 24,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Executive Summary
        new Paragraph({
          children: [
            new TextRun({
              text: "Executive Summary",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `${data.companyName} is required to report on its energy use and carbon emissions under the Streamlined Energy and Carbon Reporting (SECR) regulations. This report covers the reporting period ${data.reportingPeriod} and includes our total greenhouse gas emissions, energy consumption, and any energy efficiency measures implemented.`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Emissions Summary Table
        new Paragraph({
          children: [
            new TextRun({
              text: "Greenhouse Gas Emissions Summary",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("Scope")],
                  width: { size: 30, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [new Paragraph("Description")],
                  width: { size: 40, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [new Paragraph("Emissions (tCO₂e)")],
                  width: { size: 30, type: WidthType.PERCENTAGE },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("Scope 1")],
                }),
                new TableCell({
                  children: [new Paragraph("Direct emissions from owned or controlled sources")],
                }),
                new TableCell({
                  children: [new Paragraph(data.scope1Emissions.toFixed(2))],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("Scope 2")],
                }),
                new TableCell({
                  children: [new Paragraph("Indirect emissions from purchased energy")],
                }),
                new TableCell({
                  children: [new Paragraph(data.scope2Emissions.toFixed(2))],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("Scope 3")],
                }),
                new TableCell({
                  children: [new Paragraph("Other indirect emissions")],
                }),
                new TableCell({
                  children: [new Paragraph(data.scope3Emissions.toFixed(2))],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("Total")],
                }),
                new TableCell({
                  children: [new Paragraph("Total greenhouse gas emissions")],
                }),
                new TableCell({
                  children: [new Paragraph(data.totalEmissions.toFixed(2))],
                }),
              ],
            }),
          ],
        }),

        // Energy Consumption
        new Paragraph({
          children: [
            new TextRun({
              text: "Energy Consumption",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `Total energy consumption for the reporting period: ${data.energyConsumption.toLocaleString()} kWh`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Intensity Ratio
        new Paragraph({
          children: [
            new TextRun({
              text: "Emissions Intensity",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `Emissions intensity ratio: ${data.intensityRatio.toFixed(2)} tCO₂e per £1M turnover`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Year-on-Year Comparison
        ...(data.previousYearEmissions ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Year-on-Year Comparison",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Previous year emissions: ${data.previousYearEmissions.toFixed(2)} tCO₂e`,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Change from previous year: ${data.reductionPercentage && data.reductionPercentage > 0 ? 'Reduction' : 'Increase'} of ${Math.abs(data.reductionPercentage || 0).toFixed(1)}%`,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),
        ] : []),

        // Energy Efficiency Measures
        new Paragraph({
          children: [
            new TextRun({
              text: "Energy Efficiency Measures",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "During the reporting period, we have implemented the following energy efficiency measures:",
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "• Automated carbon tracking and reporting system",
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "• Regular monitoring of energy consumption patterns",
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "• Implementation of energy-saving initiatives where identified",
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Methodology
        new Paragraph({
          children: [
            new TextRun({
              text: "Methodology",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "This report has been prepared in accordance with the UK Government's Streamlined Energy and Carbon Reporting (SECR) requirements. Emissions calculations are based on the UK Government's GHG Conversion Factors for Company Reporting (2024).",
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "The data has been processed using Carbonmate's automated carbon calculation system, which applies the latest UK Government emission factors to activity data provided by the company.",
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Sign-off
        new Paragraph({
          children: [
            new TextRun({
              text: "Director's Statement",
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `I confirm that the information contained in this report is accurate and complete to the best of my knowledge.`,
              size: 22,
            }),
          ],
          spacing: { after: 400 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: data.directorName,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: data.directorTitle,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: data.companyName,
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `Date: ${data.reportingDate}`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}

/**
 * Calculate intensity ratio (tCO2e per £1M turnover)
 * This is a placeholder - in practice, you'd need actual turnover data
 */
export function calculateIntensityRatio(totalEmissions: number, turnover?: number): number {
  // Default to £1M if no turnover provided
  const defaultTurnover = 1000000;
  const actualTurnover = turnover || defaultTurnover;
  return (totalEmissions / actualTurnover) * 1000000;
}

/**
 * Calculate year-on-year reduction percentage
 */
export function calculateReductionPercentage(currentYear: number, previousYear: number): number {
  if (previousYear === 0) return 0;
  return ((previousYear - currentYear) / previousYear) * 100;
}
