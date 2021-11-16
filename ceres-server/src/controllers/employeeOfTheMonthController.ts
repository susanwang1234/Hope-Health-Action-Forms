import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Employee Of The Month Control';
const TABLE_NAME = 'EmployeeOfTheMonth';

const getEmployeeOfTheMonth = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getEmployeeOfTheMonth };
