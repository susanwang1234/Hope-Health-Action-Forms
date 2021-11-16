import logging from 'config/logging';
import { Knex } from 'db/mysql';
import { Request, Response, NextFunction } from 'express';
import { formNegativeOrNanInputError, formDNEError } from 'shared/errorMessages';
import { createItems } from './requestTemplates/createRequest';
import { editItemsById } from './requestTemplates/editByIdRequest';
import { isInvalidInput } from './requestTemplates/isInvalidInput';
import { Form } from '../db/models/formModel';
import { FormResponse } from '../db/models/formResponseModel';

const NAMESPACE = 'Form Response';
const TABLE_NAME = 'FormResponse';

const getFormResponsesByFormId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING FORM RESPONSES FOR BY ID`);
  const formId: number = +req.params.formId;
  if (isInvalidInput(formId)) {
    res.status(400).send(formNegativeOrNanInputError);
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

const addNewFormResponses = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const formResponses: FormResponse[] = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  const form: Form = await Knex.select('*').from('Form').where('id', '=', formId).first();
  try {
    await validateFormResponsesBelongToCorrectDepartment(formResponses, form.departmentId);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
    return;
  }
  const formResponseFKName = 'formId';
  await createItems(req, res, next, NAMESPACE, TABLE_NAME, formResponses, formResponseFKName, formId);
};

const editFormResponsesByFormId = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const responsesToEdit = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  const form: Form = await Knex.select('*').from('Form').where('id', '=', formId).first();
  const departmentQuestionIds: number[] = (await Knex.select('id').from('DepartmentQuestion').where('departmentId', '=', form.departmentId)).map((d: any) => d.id);
  responsesToEdit.forEach((response: FormResponse) => {
    if (!departmentQuestionIds.includes(response.departmentQuestionId)) {
      logging.error(NAMESPACE, `TRYING TO EDIT RESPONSE FOR QUESTION NOT IN DEPARTMENT ${form.departmentId}`);
      res.status(400).send({ error: 'All responses must belong to the correct department.' });
      return;
    }
  });
  await editItemsById(req, res, next, NAMESPACE, TABLE_NAME, formNegativeOrNanInputError, formDNEError, responsesToEdit);
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

export default { getFormResponsesByFormId, addNewFormResponses, editFormResponsesByFormId };
