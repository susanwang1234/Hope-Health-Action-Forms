import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';

export class CsvExportPolicy implements FileExportFormatPolicy {
  formatFile(): string {
    return 'String';
  }
}
