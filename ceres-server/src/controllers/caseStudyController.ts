import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { createItem } from './requestTemplates/createRequest';
import { caseStudyNegativeOrNanInputError, caseStudyDNEError } from 'shared/errorMessages';
import { isInvalidInput } from './requestTemplates/isInvalidInput';

const NAMESPACE = 'Case Study Control';
const TABLE_NAME = 'CaseStudy';

const inputtedReqBody = (req: Request) => {
  const { caseStudyTypeId, departmentId, userId, title } = req.body;
  return { caseStudyTypeId: caseStudyTypeId, departmentId: departmentId, userId: userId, title: title };
};

const getCaseStudyById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING A ${TABLE_NAME.toUpperCase()} BY ID`);
  const caseStudyId: number = +req.params.id;
  if (isInvalidInput(caseStudyId)) {
    res.status(400).send(caseStudyNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedCaseStudy = await Knex.select('CaseStudy.title', 'CaseStudyType.name', 'CaseStudy.createdAt', 'CaseStudyQuestion.label', 'CaseStudyResponse.response')
      .from(TABLE_NAME)
      .join('CaseStudyResponse', 'CaseStudy.id', '=', 'CaseStudyResponse.caseStudyId')
      .join('CaseStudyTypeQuestion', 'CaseStudyResponse.caseStudyTypeQuestionId', '=', 'CaseStudyTypeQuestion.id')
      .join('CaseStudyQuestion', 'CaseStudyTypeQuestion.caseStudyQuestionId', '=', 'CaseStudyQuestion.id')
      .join('CaseStudyType', 'CaseStudyTypeQuestion.caseStudyTypeId', '=', 'CaseStudyType.id')
      .where('CaseStudy.id', '=', caseStudyId);
    logging.info(NAMESPACE, `RETRIEVED CASE STUDY ${caseStudyId}`, retrievedCaseStudy);
    if (!retrievedCaseStudy.length) {
      res.status(404).send(caseStudyDNEError);
      return;
    }
    res.send(retrievedCaseStudy);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const addCaseStudy = async (req: Request, res: Response, next: NextFunction) => {
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, inputtedReqBody(req));
};

export default { getCaseStudyById, addCaseStudy };
