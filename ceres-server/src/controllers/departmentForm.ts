import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Department Form';

const getDepartmentFormById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'FETCHING DEPARTMENT FORM');
  res.send({ message: 'Received Request' });
};

export default { getDepartmentFormById };
