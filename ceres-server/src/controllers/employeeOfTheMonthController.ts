import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { editItemById } from './requestTemplates/editByIdRequest';
import { employeeOfTheMonthNegativeOrNanInputError, employeeOfTheMonthDNEError } from 'shared/errorMessages';

const NAMESPACE = 'Employee Of The Month Control';
const TABLE_NAME = 'EmployeeOfTheMonth';

const inputtedReqBody = (req: Request) => {
  const { imageId, name, department, departmentId, description } = req.body;
  return { imageId: imageId, name: name, department: department, departmentId: departmentId, description: description };
};

const getEmployeeOfTheMonth = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const editEmployeeOfTheMonthById = async (req: Request, res: Response, next: NextFunction) => {
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, employeeOfTheMonthNegativeOrNanInputError, employeeOfTheMonthDNEError, inputtedReqBody(req));
};

export default { getEmployeeOfTheMonth, editEmployeeOfTheMonthById };
