import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';
const { Parser } = require('json2csv');

export class CsvExportPolicy implements FileExportFormatPolicy {
  formatFile(form: any, formResponses: any): string {
    const fields = ['field1', 'field2', 'field3'];
    const opts = { fields };
    const inputObj = {
      field1: 1,
      field2: 2,
      field3: 3
    };

    const json2csv = new Parser(opts);
    const csv = json2csv.parse(inputObj);
    return csv;
  }
}
