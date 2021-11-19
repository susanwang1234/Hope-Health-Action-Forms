const { createReadStream, createWriteStream } = require('fs');
const { Transform, AsyncParser } = require('json2csv');
const fs = require('fs');
import { Response } from 'express';

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

  async getFileToSendToUser(res: Response) {
    const fields = ['field1', 'field2', 'field3'];
    const opts = { fields };
    const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };
    const inputObj = JSON.stringify({
      field1: 1,
      field2: 2,
      field3: 3
    });
    const outputPath = 'test.csv';
    // const output = createWriteStream(outputPath, { encoding: 'utf8' });

    const asyncParser = new AsyncParser(opts, transformOpts);
    let csv = '';
    asyncParser.processor
      .on('data', (chunk: any) => (csv += chunk.toString()))
      .on('end', () =>
        // fs.writeFile(outputPath, csv, 'utf8', (err: any) => {
        //   console.log('IN CALLBACK');
        // })
        res.send({ file: csv })
      )
      .on('error', (error: any) => console.error(error));

    asyncParser.input.push(inputObj);
    asyncParser.input.push(null);
    // const input = createReadStream(inputObj, { encoding: 'utf8' });
    // const json2csv = new Transform(opts, transformOpts);
    // console.log('json2csv:', json2csv);
    // // const processor = input.pipe(json2csv).pipe(output);
    // json2csv(inputObj).pipe(output);
  }
}
