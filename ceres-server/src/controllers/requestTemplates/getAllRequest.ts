import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { User } from '../../db/models/appUserModel';
import { Role } from '../../db/models/roleModel';
import { Department } from 'db/models/departmentModel';

export const getItems = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string) => {
  logging.info(namespace, `GETTING LIST OF ${tableName.toUpperCase}`);
  try {
    let items: User[] | Role[] | Department[] = await Knex.select('*').from(tableName);
    logging.info(namespace, `Retrieved ${tableName.toUpperCase}:`, items);
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};
