import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Form';

const createNewForm = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Creating new form');
  res.send({});
};

export default { createNewForm };
