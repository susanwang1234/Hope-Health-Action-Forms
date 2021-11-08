import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Department Control';
const TABLE_NAME = 'Department';

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getDepartments };
