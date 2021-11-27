import { Response } from 'express';
import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';
const PDFDocument = require('pdfkit');

export class PdfFormatPolicy implements FileExportFormatPolicy {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  formatFile(formResponses: any): string {
    const formResponseLabelsAndValues = formResponses.map((current: any) => {
      const label: string = current.label;
      const value: string = current.response;
      return { label: label, value: value };
    });
    console.log('formResponses', formResponseLabelsAndValues);

    const stream = this.res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=test.pdf'
    });
    const doc = new PDFDocument();
    doc.fontSize(20).text('Rehab report: Nov 2021', { align: 'center', underline: true, lineGap: 16 });
    doc.fontSize(16);
    formResponseLabelsAndValues.map((formResponse: any) => {
      doc.text(`${formResponse.label}: ${formResponse.value}`, {
        underline: true,
        lineGap: 10
      });
    });
    doc.on('data', (chunk: any) => stream.write(chunk));
    doc.on('end', () => {
      console.log('CLOSING STREAM');
      stream.end();
    });
    doc.end();

    return '';
  }
}
