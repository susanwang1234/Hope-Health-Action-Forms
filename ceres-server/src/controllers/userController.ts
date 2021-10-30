import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { getItem } from './requestTemplates/getRequest';
import { userNegativeInputError, userDNEError } from 'test/testTools/errorMessages';

const NAMESPACE = 'User Control';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await getItem(req, res, next, NAMESPACE, 'User');
};

// const editUserById = async (req: Request, res: Response, next: NextFunction) => {
//   logging.info(NAMESPACE, `EDITING A USER BY ID`);
//   const userId: number = +req.params.id;
//   if (!userId || userId < 0) {
//     res.status(400).send(userNegativeInputError);
//     return;
//   }
// };

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `DELETING A USER BY ID`);
  const userId: number = +req.params.id;
  if (!userId || userId < 0) {
    res.status(400).send(userNegativeInputError);
    return;
  }

  try {
    const deleteByUserId = await Knex('User').del().where('id', '=', userId);
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
    await Knex('User').del();
    logging.info(NAMESPACE, `DELETED ALL USERS`);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getUsers, deleteUserById, deleteUsers };
