import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { caseStudyQuestionsNegativeOrNanInputError, caseStudyQuestionsDNEError } from 'shared/errorMessages';
import { isInvalidInput } from './controllerTools/isInvalidInput';

const NAMESPACE = 'Case Study Questions Control';
const TABLE_NAME = 'Case Study Questions';

const getCaseStudyQuestionsById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING A ${TABLE_NAME.toUpperCase()} BY ID`);
  const caseStudyTypeId: number = +req.params.caseStudyTypeId;
  if (isInvalidInput(caseStudyTypeId)) {
    res.status(400).send(caseStudyQuestionsNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedCaseStudyQuestions = await Knex.select(
      'CaseStudyType.name',
      'CaseStudyTypeQuestion.id AS caseStudyTypeQuestionId',
      'CaseStudyTypeQuestion.caseStudyTypeId',
      'CaseStudyTypeQuestion.caseStudyQuestionId',
      'CaseStudyQuestion.label',
      'CaseStudyQuestion.inputType',
      'CaseStudyQuestion.responseType'
    )
      .from('CaseStudyType')
      .join('CaseStudyTypeQuestion', 'CaseStudyType.id', '=', 'CaseStudyTypeQuestion.caseStudyTypeId')
      .join('CaseStudyQuestion', 'CaseStudyTypeQuestion.caseStudyQuestionId', '=', 'CaseStudyQuestion.id')
      .where('CaseStudyType.id', '=', caseStudyTypeId);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()} FOR CASE STUDY TYPE ${caseStudyTypeId}`, retrievedCaseStudyQuestions);
    if (!retrievedCaseStudyQuestions.length) {
      res.status(404).send(caseStudyQuestionsDNEError);
      return;
    }
    res.status(200).send(retrievedCaseStudyQuestions);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getCaseStudyQuestionsById };
