import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { Department } from '../db/models/departmentModel';

const NAMESPACE = 'Department Control';

const departmentPage = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GET request with ID: ${req.params.id}`);

  const { id } = req.params;

  // business logic here

  res.status(200).json({
    message: `You are in department with id: ${id}`
  });
};

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF DEPARTMENTS`);
  try {
    const departments: Department[] = await Knex.select('*').from('Department');
    logging.info(NAMESPACE, 'Retrieved departments:', departments);
    res.status(200).send(departments);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { departmentPage, getDepartments };
