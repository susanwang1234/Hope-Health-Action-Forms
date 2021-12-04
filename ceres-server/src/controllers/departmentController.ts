import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { Knex } from 'db/mysql';

const NAMESPACE = 'Department Control';
const TABLE_NAME = 'Department';

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'FETCHING DEPARTMENT BY ID');
  const departmentId = +req.params.departmentId;
  if (!departmentId) {
    res.status(404).send({ error: 'Department id must be positive integer' });
    return;
  }

  try {
    const department = await Knex.select('*').from('Department').where('id', departmentId).first();
    logging.info('NAMESPACE', `RETRIEVED DEPARTMENT WITH ID ${departmentId}`);
    res.send(department);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getDepartments, getDepartmentById };
