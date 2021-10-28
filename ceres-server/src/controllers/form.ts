import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Form';

const createNewForm = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Creating new form');
  const departmentId: number = +req.body.department_id;
  if (!departmentId || departmentId < 0) {
    res.status(400).send({ error: 'Incorrect usage for /form/:department_id , department_id must be a positive integer' });
  }
  res.send({ id: departmentId });
};

export default { createNewForm };
