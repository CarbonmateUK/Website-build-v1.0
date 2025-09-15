/**
 * PPN 06/21 (Procurement Policy Note) Report Generator
 * Generates Word documents compliant with UK PPN 06/21 requirements
 */

import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel } from 'docx';
import { JobResult } from '../types';

export interface PPNReportData {
  companyName: string;
  companyNumber?: string;
  reportingPeriod: string;
  scope1Emissions: number;
  scope2Emissions: number;
  scope3Emissions: number;
  totalEmissions: number;
  previousYearEmissions?: number;
  reductionPercentage?: number;
  carbonReductionPlan: string;
  carbonReductionTargets: string[];
  reportingDate: string;
  directorName: string;
  directorTitle: string;
}

/**
 * Generate PPN 06/21 report as Word document
 */
export async function generatePPNReport(data: PPNReportData, _jobResult: JobResult): Promise<Buffer> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title Page
        new Paragraph({
          children: [
            new TextRun({
              text: "Carbon Reduction Plan",
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
              text: "Procurement Policy Note 06/21 Compliance",
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
              text: data.companyName,
              bold: true,
              size: 24,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Reporting Period: ${data.reportingPeriod}`,
              size: 20,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Introduction
        new Paragraph({
          children: [
            new TextRun({
              text: "Introduction",
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
              text: "This Carbon Reduction Plan has been prepared in accordance with Procurement Policy Note 06/21 (PPN 06/21) issued by the UK Government. PPN 06/21 requires suppliers bidding for major government contracts to publish a Carbon Reduction Plan demonstrating their commitment to achieving Net Zero emissions by 2050.",
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: `${data.companyName} is committed to reducing its carbon footprint and contributing to the UK's Net Zero target. This plan outlines our current emissions, reduction targets, and the measures we will implement to achieve Net Zero by 2050.`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Current Emissions
        new Paragraph({
          children: [
            new TextRun({
              text: "Current Greenhouse Gas Emissions",
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
              text: `Our total greenhouse gas emissions for the reporting period ${data.reportingPeriod} are ${data.totalEmissions.toFixed(2)} tonnes of CO₂ equivalent (tCO₂e).`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Emissions Breakdown Table
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
                  width: { size: 20, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [new Paragraph("Description")],
                  width: { size: 50, type: WidthType.PERCENTAGE },
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
                  children: [new Paragraph("Direct emissions from owned or controlled sources (e.g., fuel combustion, company vehicles)")],
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
                  children: [new Paragraph("Indirect emissions from purchased energy (e.g., electricity, heating)")],
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
                  children: [new Paragraph("Other indirect emissions (e.g., business travel, waste disposal)")],
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

        // Year-on-Year Comparison
        ...(data.previousYearEmissions ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Year-on-Year Performance",
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

        // Carbon Reduction Plan
        new Paragraph({
          children: [
            new TextRun({
              text: "Carbon Reduction Plan",
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
              text: data.carbonReductionPlan,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Carbon Reduction Targets
        new Paragraph({
          children: [
            new TextRun({
              text: "Carbon Reduction Targets",
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
              text: "We have set the following carbon reduction targets:",
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        ...data.carbonReductionTargets.map(target => 
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${target}`,
                size: 22,
              }),
            ],
            spacing: { after: 100 },
          })
        ),

        // Net Zero Commitment
        new Paragraph({
          children: [
            new TextRun({
              text: "Net Zero Commitment",
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
              text: `${data.companyName} is committed to achieving Net Zero greenhouse gas emissions by 2050, in line with the UK Government's Net Zero target. We will continue to monitor our emissions, implement reduction measures, and report on our progress annually.`,
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
              text: "This Carbon Reduction Plan has been prepared in accordance with PPN 06/21 requirements. Emissions calculations are based on the UK Government's GHG Conversion Factors for Company Reporting (2024) and follow the Greenhouse Gas Protocol standards.",
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
              text: `I confirm that ${data.companyName} is committed to achieving Net Zero greenhouse gas emissions by 2050. The information contained in this Carbon Reduction Plan is accurate and complete to the best of my knowledge.`,
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
 * Default carbon reduction targets for PPN 06/21
 */
export function getDefaultCarbonReductionTargets(): string[] {
  return [
    "Reduce Scope 1 and 2 emissions by 50% by 2030 compared to baseline year",
    "Achieve Net Zero Scope 1 and 2 emissions by 2040",
    "Reduce Scope 3 emissions by 30% by 2030 compared to baseline year",
    "Achieve Net Zero Scope 3 emissions by 2050",
    "Implement energy efficiency measures across all operations",
    "Transition to renewable energy sources where possible",
    "Reduce business travel emissions through remote working and virtual meetings",
    "Implement waste reduction and recycling programs"
  ];
}

/**
 * Default carbon reduction plan text
 */
export function getDefaultCarbonReductionPlan(): string {
  return `Our carbon reduction plan focuses on three key areas: energy efficiency, renewable energy adoption, and operational changes. We will implement energy-saving measures across our operations, transition to renewable energy sources where feasible, and optimize our business processes to reduce emissions. We will also work with our suppliers and partners to reduce Scope 3 emissions throughout our value chain.`;
}
