import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';

export class DataFormatter {
  private formResponses: any;
  private fileExportFormatPolicy: FileExportFormatPolicy;

  constructor(formResponses: any, fileExportFormatPolicy: FileExportFormatPolicy) {
    this.formResponses = formResponses;
    this.fileExportFormatPolicy = fileExportFormatPolicy;
  }

  private formatDataOrSendFile(): string {
    const fileStringOrMessage: string = this.fileExportFormatPolicy.formatOrSendFile(this.formResponses);
    return fileStringOrMessage;
  }

  getFileOrSendFileToUser(): string {
    const fileStringOrMessage = this.formatDataOrSendFile();
    return fileStringOrMessage;
  }
}
