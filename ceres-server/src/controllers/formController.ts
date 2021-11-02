import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { createItem } from './requestTemplates/createRequest';
import { isInvalidInput } from './requestTemplates/isInvalidInput';
import { departmentNegativeOrNanInputError } from 'shared/errorMessages';

const NAMESPACE = 'Form';
const TABLE_NAME = 'Form';
// TODO: Implement better error catching, start by using this for foreign key constraint errors
const SQL_FOREIGN_KEY_CONSTRAINT_ERROR_CODE: number = 1452;

const createNewForm = async (req: Request, res: Response, next: NextFunction) => {
  const departmentId: number = +req.body.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, req.body);
};

export default { createNewForm };
