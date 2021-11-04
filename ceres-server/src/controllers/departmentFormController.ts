import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { departmentNegativeOrNanInputError, departmentDNEError } from 'shared/errorMessages';
import { isInvalidInput } from './requestTemplates/isInvalidInput';

const NAMESPACE = 'Department Form Control';
const TABLE_NAME = 'Department Form';

const getDepartmentFormById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING A ${TABLE_NAME.toUpperCase} BY ID`);
  const departmentId: number = +req.params.id;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedQuestions = await Knex.select('Department.*', 'Question.*', 'DepartmentQuestion.*')
      .from('DepartmentQuestion')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .join('Department', 'DepartmentQuestion.departmentId', '=', 'Department.id')
      .where('Department.id', departmentId);
    logging.info(NAMESPACE, `GOT ${TABLE_NAME.toUpperCase} FOR DEPARTMENT ${departmentId}`, retrievedQuestions);
    if (!retrievedQuestions.length) {
      res.status(404).send(departmentDNEError);
      return;
    }
    res.send(retrievedQuestions);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getDepartmentFormById };
