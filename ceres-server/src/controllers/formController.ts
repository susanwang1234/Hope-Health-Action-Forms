import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { createItem } from './requestTemplates/createRequest';
import { isInvalidInput } from './controllerTools/isInvalidInput';
import { departmentNegativeOrNanInputError, formNegativeOrNanInputError } from 'shared/errorMessages';
import { DataFormatter } from '../db/types/DataFormatter';
import { CsvFormatPolicy } from 'db/types/CsvFormatPolicy';
import { FileExportFormatPolicy } from 'db/types/interfaces/FileExportFormatPolicy';
const PDFDocument = require('pdfkit');

const NAMESPACE = 'Form Control';
const TABLE_NAME = 'Form';
// TODO: Implement better error catching, start by using this for foreign key constraint errors
const SQL_FOREIGN_KEY_CONSTRAINT_ERROR_CODE: number = 1452;

const createNewForm = async (req: Request, res: Response, next: NextFunction) => {
  const departmentId: number = +req.body.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, req.body);
};

const getAllFormsByDepartmentId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'GETTING LIST OF FORMS FOR A CERTAIN DEPARTMENT');
  const departmentId: number = +req.params.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }

  try {
    const forms = await Knex.select('*').from('Form').where('departmentId', '=', departmentId);
    logging.info(NAMESPACE, `GOT FORMS FOR DEPARTMENT ${departmentId}`, forms);
    res.status(200).send(forms);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

const exportFormAsCsv = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  if (isInvalidInput(formId)) {
    res.status(400).send(formNegativeOrNanInputError);
    return;
  }

  try {
    const form = await Knex.select(Knex.raw('month(createdAt) AS month'), Knex.raw('year(createdAt) as year'), 'Department.name')
      .from('Form')
      .join('Department', 'Form.departmentId', '=', 'Department.id')
      .where('Form.id', formId)
      .first();

    if (!form) {
      res.status(400).send({ message: 'Form does not exist' });
      return;
    }

    const formResponses = await Knex.select('*')
      .from('FormResponse')
      .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', '=', 'DepartmentQuestion.id')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .where('FormResponse.formId', formId);

    const filename = `${form.name}-report-${form.month}-${form.year}.csv`;
    res.header('Content-Type', 'text/csv');
    res.attachment(filename);

    const fileExportFormatPolicy: FileExportFormatPolicy = new CsvFormatPolicy();
    const dataExporter: DataFormatter = new DataFormatter(formResponses, fileExportFormatPolicy);
    const file = dataExporter.getFileToSendToUser();
    res.send(file);
  } catch (error: any) {
    res.status(500).send(error);
  }
};

const exportFormAsPdf = async (req: Request, res: Response, next: NextFunction) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=test.pdf'
  });
  const doc = new PDFDocument();
  doc.fontSize(25).text('Some heading!');
  doc.on('data', (chunk: any) => stream.write(chunk));
  doc.on('end', () => {
    console.log('CLOSING STREAM');
    stream.end();
  });
  doc.end();
};

export default { createNewForm, getAllFormsByDepartmentId, exportFormAsCsv, exportFormAsPdf };
