import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Department Control';
const TABLE_NAME = 'Department';

const departmentPage = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GET request with ID: ${req.params.id}`);

  const { id } = req.params;

  // business logic here

  res.status(200).json({
    message: `You are in department with id: ${id}`
  });
};

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { departmentPage, getDepartments };
