import { Request, Response, NextFunction } from 'express';
import { createItem } from './requestTemplates/createRequest';

const NAMESPACE = 'Form Response';
const TABLE_NAME = 'FormResponse';

const addNewFormResponses = async (req: Request, res: Response, next: NextFunction) => {
  const formId: number = +req.params.formId;
  const formResponses = req.body.map((formResponse: any) => {
    return { ...formResponse, formId: formId };
  });
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, formResponses);
};

export default { addNewFormResponses };
