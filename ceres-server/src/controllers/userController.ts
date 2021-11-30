import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { createItem } from './requestTemplates/createRequest';
import { editItemById } from './requestTemplates/editByIdRequest';
import { deleteItemById } from './requestTemplates/deleteByIdRequest';
import { deleteItems } from './requestTemplates/deleteAllRequest';
import { userNegativeOrNanInputError, userDNEError } from 'shared/errorMessages';
import authUtil from '../utils/authHelper';
import userModel from '../db/models/userModel';
import logging from '../config/logging';
import { isInvalidInput } from './controllerTools/isInvalidInput';

const NAMESPACE = 'User Control';
const TABLE_NAME = 'User';

const inputtedReqBody = (req: Request) => {
  const { username, password, departmentId, roleId } = req.body;
  return { username: username, password: password, departmentId: departmentId, roleId: roleId };
};

const isUsernameUnique = async (username: string) => {
  const userFound = await userModel.findOne('User.username', username);
  return userFound;
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = inputtedReqBody(req);
    const userFound = await userModel.findOne('User.username', newUser.username);

    if (userFound) {
      res.status(400).send({ error: 'Username already exists' });
      return;
    }
    newUser.password = await authUtil.hashPassword(newUser.password);
    await createItem(req, res, next, NAMESPACE, TABLE_NAME, newUser);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const editUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editedUser = inputtedReqBody(req);
    const userFound = await userModel.findOne('User.username', editedUser.username);
    let isSameUser: boolean = true;

    const userId: number = +req.params.id;
    if (isInvalidInput(userId)) {
      res.status(400).send(userNegativeOrNanInputError);
      return;
    }

    if (userFound) {
      isSameUser = userId === userFound.id;
    }

    if (!isSameUser) {
      res.status(400).send({ error: 'Username already in use by other account' });
      return;
    }
    editedUser.password = await authUtil.hashPassword(editedUser.password);
    await editItemById(req, res, next, NAMESPACE, TABLE_NAME, userNegativeOrNanInputError, userDNEError, editedUser);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  await deleteItemById(req, res, next, NAMESPACE, TABLE_NAME, userNegativeOrNanInputError, userDNEError);
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  await deleteItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getUsers, createUser, editUserById, deleteUserById, deleteUsers };
