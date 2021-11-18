export class DataExporter {
  private form: any;
  private formResponses: any;

  constructor(form: any, formResponses: any) {
    this.form = form;
    this.formResponses = formResponses;
  }

  formatDataIntoFile(): void {
    console.log('IN CLASS FORM:', this.form);
    console.log('IN CLASS FORM RESPONSES:', this.formResponses);
  }

  sendFile() {}
}
