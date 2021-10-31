import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { User } from '../../db/models/appUserModel';
import { Role } from '../../db/models/roleModel';
import { Department } from 'db/models/departmentModel';

export const getItems = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, ITEMTABLE: string) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${ITEMTABLE.toUpperCase}`);
  try {
    let items: User[] | Role[] | Department[] = await Knex.select('*').from(ITEMTABLE);
    logging.info(NAMESPACE, `Retrieved ${ITEMTABLE.toUpperCase}:`, items);
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};
