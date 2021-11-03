import logging from 'config/logging';
import { Knex } from 'db/mysql';
import { Request, Response, NextFunction } from 'express';
import { formNegativeOrNanInputError, formDNEError } from 'shared/errorMessages';
import { createItems } from './requestTemplates/createRequest';
import { isInvalidInput } from './requestTemplates/isInvalidInput';

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
    res.send(retrievedResponses);
    if (!retrievedResponses.length) {
      res.status(404).send(formDNEError);
      return;
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const addNewFormResponses = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const formResponses = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  const formResponseFKName = 'formId';
  await createItems(req, res, next, NAMESPACE, TABLE_NAME, formResponses, formResponseFKName, formId);
};

export default { getFormResponsesByFormId, addNewFormResponses };
