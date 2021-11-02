import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Form';
const SQL_FOREIGN_KEY_CONSTRAINT_ERROR_CODE: number = 1452;

const createNewForm = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Creating new form');
  const departmentId: number = +req.body.department_id;
  if (!departmentId || departmentId < 0) {
    res.status(400).send({ error: 'Incorrect usage for POST /form, department_id must be a positive integer' });
  }

  try {
    const newFormId = await Knex('Form').insert({ departmentId: departmentId });
    const newForm = await Knex.select('*').from('Form').where('id', newFormId);
    logging.info(NAMESPACE, `Created new form for department ${departmentId}`, newForm);
    res.status(201).send(newForm);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    if (error.errno === SQL_FOREIGN_KEY_CONSTRAINT_ERROR_CODE) {
      res.status(404).send({ error: `Cannot find department with id ${departmentId}` });
      return;
    }
    res.status(500).send(error);
  }
};

export default { createNewForm };
