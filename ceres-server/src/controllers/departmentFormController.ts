import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { negativeInputError, dneError } from 'test/testTools/errorMessages';

const NAMESPACE = 'Department Form';

const getDepartmentFormById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'FETCHING DEPARTMENT FORM');
  const departmentId: number = +req.params.id;
  if (!departmentId || departmentId < 0) {
    res.status(400).send(negativeInputError);
    return;
  }

  try {
    const questions = await Knex.select('Department.*', 'Question.*', 'DepartmentQuestion.*')
      .from('DepartmentQuestion')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .join('Department', 'DepartmentQuestion.departmentId', '=', 'Department.id')
      .where('Department.id', departmentId);
    logging.info(NAMESPACE, `FETCHED DEPARTMENT FORM FOR DEPARTMENT ${departmentId}`, questions);
    if (!questions.length) {
      res.status(404).send(dneError);
      return;
    }
    res.send(questions);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getDepartmentFormById };
