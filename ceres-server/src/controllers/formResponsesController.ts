import logging from 'config/logging';
import { Knex } from 'db/mysql';
import { Request, Response, NextFunction } from 'express';
import { formResponseNegativeOrNanInputError, formDNEError, departmentNegativeOrNanInputError } from 'shared/errorMessages';
import { createItems } from './requestTemplates/createRequest';
import { editItemsById } from './requestTemplates/editByIdRequest';
import { Form } from '../db/models/formModel';
import { FormResponse } from '../db/models/formResponseModel';
import { isInvalidInput } from './controllerTools/isInvalidInput';

const NAMESPACE = 'Form Response Control';
const TABLE_NAME = 'FormResponse';

const getFormResponsesByFormId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toUpperCase()} BY ID`);
  const formId: number = +req.params.formId;
  if (isInvalidInput(formId)) {
    res.status(400).send(formResponseNegativeOrNanInputError);
    return;
  }
  try {
    const retrievedResponses = await Knex.select('Question.*', 'DepartmentQuestion.isRequired', 'FormResponse.*')
      .from('FormResponse')
      .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', '=', 'DepartmentQuestion.id')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .where('formId', formId);
    logging.info(NAMESPACE, `GOT FORM RESPONSES FOR FORM ${formId}`, retrievedResponses);
    if (!retrievedResponses.length) {
      res.status(404).send(formDNEError);
      return;
    }
    res.send(retrievedResponses);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getFormResponsesForLatestFormByDepartmentId = async (req: Request, res: Response, next: NextFunction) => {
  const departmentId: number = +req.params.departmentId;
  logging.info(NAMESPACE, `GETTING FORM RESPONSES FOR LATEST FORM IN DEPARTMENT ${departmentId}`);
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }

  try {
    const latestFormId = await Knex.select('id').from('Form').where('departmentId', departmentId).orderBy('createdAt', 'DESC').first();
    if (!latestFormId) {
      res.status(404).send({ error: 'Could not find any forms for requested department.' });
      return;
    }

    const retrievedResponses = await Knex.select('Question.*', 'DepartmentQuestion.isRequired', 'FormResponse.*')
      .from('FormResponse')
      .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', '=', 'DepartmentQuestion.id')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .where('formId', latestFormId.id);
    logging.info(NAMESPACE, `GOT FORM RESPONSES FOR FORM ${latestFormId.id}`, retrievedResponses);
    if (!retrievedResponses.length) {
      res.status(404).send(formDNEError);
      return;
    }
    res.send(retrievedResponses);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const addNewFormResponses = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const formResponses: FormResponse[] = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  try {
    const form: Form = await Knex.select('*').from('Form').where('id', '=', formId).first();
    await validateFormResponsesBelongToCorrectDepartment(formResponses, form.departmentId);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
    return;
  }
  const formResponseFKName = 'formId';
  await createItems(req, res, next, NAMESPACE, TABLE_NAME, formResponseNegativeOrNanInputError, formResponses, formResponseFKName, formId);
};

const editFormResponsesByFormId = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const responsesToEdit = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  try {
    const form: Form = await Knex.select('*').from('Form').where('id', '=', formId).first();
    await validateFormResponsesBelongToCorrectDepartment(responsesToEdit, form.departmentId);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
    return;
  }
  await editItemsById(req, res, next, NAMESPACE, TABLE_NAME, formResponseNegativeOrNanInputError, formDNEError, responsesToEdit, formId);
};

const validateFormResponsesBelongToCorrectDepartment = async (formResponses: FormResponse[], departmentId: number) => {
  const departmentQuestionsIds: number[] = (await Knex.select('id').from('DepartmentQuestion').where('departmentId', '=', departmentId)).map((dq: any) => dq.id);
  for (const response of formResponses) {
    if (!departmentQuestionsIds.includes(response.departmentQuestionId)) {
      logging.error(NAMESPACE, `TRYING TO ADD OR EDIT RESPONSE FOR QUESTION NOT IN DEPARTMENT ${departmentId}`);
      throw new Error('All responses must belong to the correct department.');
    }
  }
};

export default { getFormResponsesByFormId, addNewFormResponses, editFormResponsesByFormId, getFormResponsesForLatestFormByDepartmentId };
