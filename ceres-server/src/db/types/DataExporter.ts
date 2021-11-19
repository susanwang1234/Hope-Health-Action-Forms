const { Parser } = require('json2csv');
const fs = require('fs');
import { Response } from 'express';
import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';

export class DataExporter {
  private form: any;
  private formResponses: any;
  private fileExportFormatPolicy: FileExportFormatPolicy;

  constructor(form: any, formResponses: any, fileExportFormatPolicy: FileExportFormatPolicy) {
    this.form = form;
    this.formResponses = formResponses;
    this.fileExportFormatPolicy = fileExportFormatPolicy;
  }

  private formatDataIntoFile(): string {
    const csv: string = this.fileExportFormatPolicy.formatFile(this.form, this.formResponses);
    return csv;
  }

  async getFileToSendToUser(res: Response) {
    const csv = this.formatDataIntoFile();
    return res.send(csv);
  }
}
