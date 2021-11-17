import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { isInvalidInput } from './controllerTools/isInvalidInput';
import { caseStudiesNegativeOrNanInputError, caseStudiesDNEError } from 'shared/errorMessages';

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

const getCaseStudiesByTypeId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME.toUpperCase()} BY TYPE`);
  const caseStudyTypeId: number = +req.params.caseStudyTypeId;
  if (isInvalidInput(caseStudyTypeId)) {
    res.status(400).send(caseStudiesNegativeOrNanInputError);
    return;
  }
  try {
    const retrievedCaseStudiesByTypeId = await Knex.select('CaseStudy.*', 'CaseStudyResponse.response')
      .from('CaseStudy')
      .join('CaseStudyResponse', 'CaseStudy.id', '=', 'CaseStudyResponse.caseStudyId')
      .join('CaseStudyTypeQuestion', 'CaseStudyResponse.caseStudyTypeQuestionId', '=', 'CaseStudyTypeQuestion.id')
      .where('CaseStudyTypeQuestion.caseStudyQuestionId', '=', '7')
      .andWhere('CaseStudyTypeQuestion.caseStudyTypeId', '=', caseStudyTypeId);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()} BY TYPE ID ${caseStudyTypeId}:`, retrievedCaseStudiesByTypeId);
    if (!retrievedCaseStudiesByTypeId.length) {
      res.status(404).send(caseStudiesDNEError);
      return;
    }
    res.status(200).send(retrievedCaseStudiesByTypeId);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { getCaseStudies, getCaseStudiesByTypeId };
