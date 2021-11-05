import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { caseStudyNegativeOrNanInputError, caseStudyDNEError } from 'shared/errorMessages';
import { isInvalidInput } from './requestTemplates/isInvalidInput';

const NAMESPACE = 'Case Studies Control';
const TABLE_NAME = 'Case Studies';

const getCaseStudies = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME.toUpperCase()}`);
  try {
    const retrievedCaseStudies = await Knex.select('CaseStudy.*', 'CaseStudyResponse.response')
      .from('CaseStudy')
      .join('CaseStudyResponse', 'CaseStudy.id', '=', 'CaseStudyResponse.caseStudyId')
      .join('CaseStudyTypeQuestion', 'CaseStudyResponse.caseStudyTypeQuestionId', '=', 'CaseStudyTypeQuestion.id')
      .where('CaseStudyTypeQuestion.caseStudyQuestionId', '=', '7');
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()}:`, retrievedCaseStudies);
    res.status(200).send(retrievedCaseStudies);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
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
      .from('CaseStudy')
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

export default { getCaseStudies, getCaseStudyById };
