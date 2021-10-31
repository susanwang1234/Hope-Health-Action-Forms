import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { getItem } from './requestTemplates/getRequest';
import { userNegativeInputError, userDNEError } from 'test/testTools/errorMessages';
import { validateParamId } from './requestTemplates/validateParamId';

const NAMESPACE = 'User Control';
const TABLENAME = 'User';

const inputtedBody = (req: Request) => {
  const { username, password, departmentId, roleId } = req.body;
  return { username: username, password: password, departmentId: departmentId, roleId: roleId };
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await getItem(req, res, next, NAMESPACE, TABLENAME);
};

const editUserById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `EDITING A USER BY ID`);
  const userId: number = +req.params.id;
  if (validateParamId(userId)) {
    res.status(400).send(userNegativeInputError);
    return;
  }

  try {
    await Knex.update(inputtedBody(req)).into(TABLENAME).where('id', '=', userId);
    const retrieveEditedUser = await Knex.select('*').from(TABLENAME).where('id', '=', userId);
    logging.info(NAMESPACE, `EDITED USER WITH ID ${userId}`, retrieveEditedUser);
    res.status(201).send(retrieveEditedUser);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `DELETING A USER BY ID`);
  const userId: number = +req.params.id;
  if (validateParamId(userId)) {
    res.status(400).send(userNegativeInputError);
    return;
  }

  try {
    const deleteByUserId = await Knex(TABLENAME).del().where('id', '=', userId);
    if (!deleteByUserId) {
      res.status(404).send(userDNEError);
      return;
    }
    logging.info(NAMESPACE, `DELETED USER WITH ID ${userId}`, deleteByUserId);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `DELETING ALL USERS`);
  try {
    await Knex(TABLENAME).del();
    logging.info(NAMESPACE, `DELETED ALL USERS`);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getUsers, editUserById, deleteUserById, deleteUsers };
