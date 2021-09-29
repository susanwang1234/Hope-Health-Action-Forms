import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Department Control';

const departmentPage = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GET request with ID: ${req.params.id}`);

  const { id } = req.params;

  // business logic here

  res.status(200).json({
    message: `You are in department with id: ${id}`
  });
};

export default { departmentPage };
