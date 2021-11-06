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

const getAllFormsByDepartmentId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'GETTING LIST OF FORMS FOR A CERTAIN DEPARTMENT');
  const departmentId: number = +req.params.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }

  try {
    const forms = await Knex.select('*').from('Form').where('departmentId', '=', departmentId);
    logging.info(NAMESPACE, `GOT FORMS FOR DEPARTMENT ${departmentId}`, forms);
    res.status(200).send(forms);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { createNewForm, getAllFormsByDepartmentId };
