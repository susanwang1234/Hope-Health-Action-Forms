import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { isInvalidInput } from './controllerTools/isInvalidInput';
import { messageDepartmentNegativeOrNanInputError, departmentDNEError } from 'shared/errorMessages';
import { createItem } from './requestTemplates/createRequest';

const NAMESPACE = 'Message Control';
const TABLE_NAME = 'Messages';

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toUpperCase()} BY DEPARTMENT ID`);
  const departmentId: number = +req.params.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(messageDepartmentNegativeOrNanInputError);
    return;
  }
  try {
    const retrievedResponses = await Knex.select('*').from('Messages').where('departmentId', '=', departmentId);
    if (!retrievedResponses.length) {
      res.status(404).send(departmentDNEError);
      return;
    }
    res.send(retrievedResponses);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const createNewMessage = async (req: Request, res: Response, next: NextFunction) => {
  const departmentId: number = +req.body.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send(messageDepartmentNegativeOrNanInputError);
    return;
  }
  const retrievedDepartmentId: any[] = await Knex.select('id').from('Department').where('id', '=', departmentId);

  if (!retrievedDepartmentId.length) {
    res.status(404).send(departmentDNEError);
    return;
  }
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, req.body);
};

export default { createNewMessage, getMessages };
