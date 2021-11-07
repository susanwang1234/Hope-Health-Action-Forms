import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { User } from '../../db/models/appUserModel';
import { Role } from '../../db/models/roleModel';
import { Department } from 'db/models/departmentModel';
import { CaseStudyType } from 'db/models/caseStudyTypeModel';

<<<<<<< HEAD
export const getItems = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string) => {
  logging.info(namespace, `GETTING LIST OF ${tableName.toUpperCase}`);
  try {
    let items: User[] | Role[] | Department[] = await Knex.select('*').from(tableName);
    logging.info(namespace, `Retrieved ${tableName.toUpperCase}:`, items);
=======
export const getItems = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, TABLE_NAME: string) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME.toUpperCase()}S`);
  try {
    const items: User[] | Role[] | Department[] | CaseStudyType[] = await Knex.select('*').from(TABLE_NAME);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()}S:`, items);
>>>>>>> 05539d8bec76c6e9e3eea38bf5aa4e8f2c011e4d
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};
