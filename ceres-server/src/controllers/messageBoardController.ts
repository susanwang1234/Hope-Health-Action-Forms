import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { isInvalidInput } from './controllerTools/isInvalidInput';
import { departmentNegativeOrNanInputError, formDNEError } from 'shared/errorMessages';

const NAMESPACE = 'Message Control';
const TABLE_NAME = 'Messages';

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toUpperCase()} BY ID`);
  const departmentId: number = +req.params.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(departmentNegativeOrNanInputError);
    return;
  }
  try {
    const retrievedResponses = await Knex.select('message_content.*', 'createdAt.*', 'author.*')
      .from('Messages')
      .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', '=', 'DepartmentQuestion.id')
      .join('Question', 'DepartmentQuestion.questionId', '=', 'Question.id')
      .where('Department.id', departmentId);
    if (!retrievedResponses.length) {
      res.status(404).send(formDNEError);
      return;
    }
    res.send(retrievedResponses);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const createNewMessage = async (req: Request, res: Response, next: NextFunction) => {};

export default { createNewMessage, getMessages };
