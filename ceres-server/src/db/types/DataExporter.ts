const { Parser } = require('json2csv');
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
    const inputObj = {
      field1: 1,
      field2: 2,
      field3: 3
    };

    const json2csv = new Parser(opts);
    const csv = json2csv.parse(inputObj);
    console.log('CSV:', csv);
    res.header('Content-Type', 'text/csv');
    res.attachment('test.csv');
    return res.send(csv);
  }
}
