import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';

export class DataFormatter {
  private formResponses: any;
  private fileExportFormatPolicy: FileExportFormatPolicy;

  constructor(formResponses: any, fileExportFormatPolicy: FileExportFormatPolicy) {
    this.formResponses = formResponses;
    this.fileExportFormatPolicy = fileExportFormatPolicy;
  }

  private formatDataIntoFile(): string {
    const fileString: string = this.fileExportFormatPolicy.formatFile(this.formResponses);
    return fileString;
  }

  getFileToSendToUser(): string {
    const fileString = this.formatDataIntoFile();
    return fileString;
  }
}
