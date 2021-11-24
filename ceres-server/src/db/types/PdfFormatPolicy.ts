import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';
const PDFDocument = require('pdfkit');

export class PdfFormatPolicy implements FileExportFormatPolicy {
  formatFile(formResponses: any): string {
    console.log('formResponses', formResponses);
    return '';
  }
}
