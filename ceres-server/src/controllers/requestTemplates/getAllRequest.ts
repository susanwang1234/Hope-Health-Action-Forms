import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { User } from '../../db/models/appUserModel';
import { Role } from '../../db/models/roleModel';
import { Department } from 'db/models/departmentModel';

export const getItems = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, TABLE_NAME: string) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME.toUpperCase()}`);
  try {
    const items: User[] | Role[] | Department[] = await Knex.select('*').from(TABLE_NAME);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()}S:`, items);
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};
