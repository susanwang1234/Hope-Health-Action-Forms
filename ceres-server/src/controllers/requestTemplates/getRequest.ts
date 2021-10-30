import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../db/models/appUserModel';
import { Role } from '../../db/models/roleModel';
import { Department } from 'db/models/departmentModel';
import { Knex } from '../../db/mysql';

export const getItem = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, itemTable: string) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${itemTable.toUpperCase}`);
  try {
    let items: User[] | Role[] | Department[] = await Knex.select('*').from(`${itemTable}`);
    logging.info(NAMESPACE, `Retrieved ${itemTable}:`, items);
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};
