import { Request, Response, NextFunction } from 'express';
import { getItem } from './requestTemplates/getRequest';

const NAMESPACE = 'Role Control';

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  await getItem(req, res, next, NAMESPACE, 'Role');
};

export default { getRoles };
