import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Case Study Types Control';
const TABLE_NAME = 'CaseStudyType';

const getCaseStudyTypes = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getCaseStudyTypes };
