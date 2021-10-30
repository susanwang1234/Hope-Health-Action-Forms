import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { User } from '../db/models/appUserModel';
import { negativeInputError } from 'test/testTools/errorMessages';

const NAMESPACE = 'User Control';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF USERS`);
  try {
    const users: User[] = await Knex.select('*').from('User');
    logging.info(NAMESPACE, 'Retrieved role:', users);
    res.status(200).send(users);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
//   logging.info(NAMESPACE, `DELETING A USER BY ID`);
//   const userId: number = +req.params.id;
//   if (!userId || userId < 0) {
//     res.status(400).send(negativeInputError);
//     return;
//   }
// };

export default { getUsers, deleteUserById };
