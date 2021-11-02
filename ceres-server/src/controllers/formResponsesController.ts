import { Request, Response, NextFunction } from 'express';
import { createItems } from './requestTemplates/createRequest';

const NAMESPACE = 'Form Response';
const TABLE_NAME = 'FormResponse';

const addNewFormResponses = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const formResponses = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  const formResponseFKName = 'formID';
  await createItems(req, res, next, NAMESPACE, TABLE_NAME, formResponses, formResponseFKName, formId);
};

export default { addNewFormResponses };
