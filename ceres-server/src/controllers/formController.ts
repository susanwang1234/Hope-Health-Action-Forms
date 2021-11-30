import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { createItem } from './requestTemplates/createRequest';
import { isInvalidInput } from './controllerTools/isInvalidInput';
import { departmentNegativeOrNanInputError, formDNEError, formNegativeOrNanInputError } from 'shared/errorMessages';
import { DataFormatter } from '../db/types/DataFormatter';
import { CsvFormatPolicy } from 'db/types/CsvFormatPolicy';
import { FileExportFormatPolicy } from 'db/types/interfaces/FileExportFormatPolicy';
import { PdfFormatPolicy } from 'db/types/PdfFormatPolicy';

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

const getLatestFormByDepartmentId = async (req: Request, res: Response, next: NextFunction) => {
  const departmentId: number = +req.params.departmentId;
  logging.info(NAMESPACE, `GETTING FORM FOR LATEST FORM IN DEPARTMENT ${departmentId}`);
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }

  try {
    const latestForm = await Knex.select('*').from('Form').where('departmentId', departmentId).orderBy('createdAt', 'DESC').first();
    console.log('ddsddasxsa');
    if (latestForm == 446) {
      res.status(404).send({ error: 'Could not find any forms for requested department.' });
      return;
    }
    res.send(latestForm);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
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
    const file = dataExporter.getFileOrSendFileToUser();
    res.send(file);
  } catch (error: any) {
    res.status(500).send(error);
  }
};

const exportFormAsPdf = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  if (isInvalidInput(formId)) {
    res.status(400).send(formNegativeOrNanInputError);
    return;
  }

  try {
    const formResponses = await Knex.select('FormResponse.response', 'Question.label', 'Department.name', Knex.raw(`MONTHNAME(Form.createdAt) as month`), Knex.raw('year(Form.createdAt) as year'))
      .from('FormResponse')
      .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', '=', 'DepartmentQuestion.id')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .join('Form', 'FormResponse.formId', 'Form.id')
      .join('Department', 'Form.departmentId', 'Department.id')
      .where('FormResponse.formId', formId)
      .andWhere('Question.isMSPP', 1);

    const fileExportFormatPolicy: FileExportFormatPolicy = new PdfFormatPolicy(res);
    const dataExporter: DataFormatter = new DataFormatter(formResponses, fileExportFormatPolicy);
    dataExporter.getFileOrSendFileToUser();
  } catch (error: any) {
    switch (error.message) {
      case 'Form responses cannot be empty.':
        res.status(400).send({ error: 'Error trying to export form to pdf' });
        break;
      default:
        res.status(500).send(error);
        break;
    }
  }
};

export default { createNewForm, getAllFormsByDepartmentId, exportFormAsCsv, exportFormAsPdf, getLatestFormByDepartmentId };
