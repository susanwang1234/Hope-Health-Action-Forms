import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { editItemById } from './requestTemplates/editByIdRequest';
import { employeeOfTheMonthNegativeOrNanInputError, employeeOfTheMonthDNEError } from 'shared/errorMessages';

const NAMESPACE = 'Employee Of The Month Control';
const TABLE_NAME = 'EmployeeOfTheMonth';

const inputtedReqBody = (req: Request) => {
  const { imageId, name, departmentId, description } = req.body;
  return { imageId: imageId, name: name, departmentId: departmentId, description: description };
};

const getEmployeeOfTheMonth = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME.toUpperCase()}S`);
  try {
    const retrievedEmployeeOfTheMonth = await Knex.select(`${TABLE_NAME}.*`, 'Department.name AS department')
      .from(`${TABLE_NAME}`)
      .join('Department', `${TABLE_NAME}.departmentId`, '=', 'Department.id');
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()}:`, retrievedEmployeeOfTheMonth);
    res.status(200).send(retrievedEmployeeOfTheMonth);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

const editEmployeeOfTheMonthById = async (req: Request, res: Response, next: NextFunction) => {
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, employeeOfTheMonthNegativeOrNanInputError, employeeOfTheMonthDNEError, inputtedReqBody(req));
};

export default { getEmployeeOfTheMonth, editEmployeeOfTheMonthById };
