import { Request, Response, NextFunction } from 'express';
import { createItem } from './requestTemplates/createRequest';

const NAMESPACE = 'Case Study Responses Control';
const TABLE_NAME = 'CaseStudyResponse';

const inputtedReqBody = (req: Request) => {
  const { caseStudyTypeQuestionId, caseStudyId, response } = req.body;
  return { caseStudyTypeQuestionId: caseStudyTypeQuestionId, caseStudyId: caseStudyId, response: response };
};

const addCaseStudyResponse = async (req: Request, res: Response, next: NextFunction) => {
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, inputtedReqBody(req));
};

export default { addCaseStudyResponse };
