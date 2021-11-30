import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { createItem } from './requestTemplates/createRequest';
import { editItemById } from './requestTemplates/editByIdRequest';
import { deleteItemById } from './requestTemplates/deleteByIdRequest';
import { emailNegativeOrNanInputError, emailDNEError } from 'shared/errorMessages';

const NAMESPACE = 'Email Control';
const TABLE_NAME = 'Email';

const inputtedReqBody = (req: Request) => {
  const { email } = req.body;
  return { email: email };
};

const getEmails = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const createEmail = async (req: Request, res: Response, next: NextFunction) => {
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, inputtedReqBody(req));
};

const editEmailById = async (req: Request, res: Response, next: NextFunction) => {
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, emailNegativeOrNanInputError, emailDNEError, inputtedReqBody(req));
};

const deleteEmailById = async (req: Request, res: Response, next: NextFunction) => {
  await deleteItemById(req, res, next, NAMESPACE, TABLE_NAME, emailNegativeOrNanInputError, emailDNEError);
};

export default { getEmails, createEmail, editEmailById, deleteEmailById };
