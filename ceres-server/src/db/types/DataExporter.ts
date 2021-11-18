const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('json2csv');

export class DataExporter {
  private form: any;
  private formResponses: any;

  constructor(form: any, formResponses: any) {
    this.form = form;
    this.formResponses = formResponses;
  }

  private formatDataIntoFile(): void {
    console.log('IN CLASS FORM:', this.form);
    console.log('IN CLASS FORM RESPONSES:', this.formResponses);
  }

  getFileToSendToUser() {
    const fields = ['field1', 'field2', 'field3'];
    const opts = { fields };
    const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };
    const inputPath = 'test.json';
    const outputPath = 'test.csv';

    const input = createReadStream(inputPath, { encoding: 'utf8' });
    const output = createWriteStream(outputPath, { encoding: 'utf8' });
    const json2csv = new Transform(opts, transformOpts);

    const processor = input.pipe(json2csv).pipe(output);
  }
}
