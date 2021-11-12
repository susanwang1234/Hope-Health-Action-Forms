import { Request, Response, NextFunction } from 'express';
import { createItems } from './requestTemplates/createRequest';

const NAMESPACE = 'Case Study Responses Control';
const TABLE_NAME = 'CaseStudyResponse';

const addCaseStudyResponsesByCaseStudyId = async (req: Request, res: Response, next: NextFunction) => {
  const caseStudyId: number = +req.params.caseStudyId;
  const caseStudyResponses = req.body.map((caseStudyResponse: any) => {
    return { ...caseStudyResponse, caseStudyId: caseStudyId };
  });
  const caseStudyResponseFKName = 'caseStudyId';
  await createItems(req, res, next, NAMESPACE, TABLE_NAME, caseStudyResponses, caseStudyResponseFKName, caseStudyId);
};

export default { addCaseStudyResponsesByCaseStudyId };
