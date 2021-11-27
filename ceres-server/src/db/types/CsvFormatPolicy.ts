import { FileExportFormatPolicy } from './interfaces/FileExportFormatPolicy';
const { Parser } = require('json2csv');

export class CsvFormatPolicy implements FileExportFormatPolicy {
  formatOrSendFile(formResponses: any): string {
    const fields = formResponses.map((formResponse: any) => formResponse.label);
    const opts = { fields };
    const json2csv = new Parser(opts);

    const inputObj = formResponses.reduce((objectToConvertToCsv: any, currentField: any) => {
      const attribute: string = currentField.label;
      const value: string = currentField.response;
      objectToConvertToCsv[attribute] = value;
      return objectToConvertToCsv;
    }, {});

    const csv = json2csv.parse(inputObj);
    return csv;
  }
}
