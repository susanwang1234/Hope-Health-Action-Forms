import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { departmentNegativeInputError, departmentDNEError } from 'test/testTools/errorMessages';
import { validateParamId } from './requestTemplates/validateParamId';

const NAMESPACE = 'Department Form';

const getDepartmentFormById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'FETCHING DEPARTMENT FORM');
  const departmentId: number = +req.params.id;
  validateParamId(departmentId)
    ? () => {}
    : () => {
        res.status(400).send(departmentNegativeInputError);
        return;
      };

  try {
    const questions = await Knex.select('Department.*', 'Question.*', 'DepartmentQuestion.*')
      .from('DepartmentQuestion')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .join('Department', 'DepartmentQuestion.departmentId', '=', 'Department.id')
      .where('Department.id', departmentId);
    logging.info(NAMESPACE, `FETCHED DEPARTMENT FORM FOR DEPARTMENT ${departmentId}`, questions);
    if (!questions.length) {
      res.status(404).send(departmentDNEError);
      return;
    }
    res.send(questions);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getDepartmentFormById };
