import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { createItem } from './requestTemplates/createRequest';
import { editItemById } from './requestTemplates/editByIdRequest';
import { deleteItemById } from './requestTemplates/deleteByIdRequest';
import { deleteItems } from './requestTemplates/deleteAllRequest';
import { userNegativeOrNanInputError, userDNEError } from 'shared/errorMessages';

const NAMESPACE = 'User Control';
const TABLE_NAME = 'User';

const inputtedReqBody = (req: Request) => {
  const { username, password, departmentId, roleId } = req.body;
  return { username: username, password: password, departmentId: departmentId, roleId: roleId };
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, inputtedReqBody(req));
};

const editUserById = async (req: Request, res: Response, next: NextFunction) => {
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, userNegativeOrNanInputError, userDNEError, inputtedReqBody(req));
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  await deleteItemById(req, res, next, NAMESPACE, TABLE_NAME, userNegativeOrNanInputError, userDNEError);
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  await deleteItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getUsers, createUser, editUserById, deleteUserById, deleteUsers };
