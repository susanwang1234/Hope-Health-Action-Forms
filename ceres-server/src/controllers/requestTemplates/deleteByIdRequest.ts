import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { isInvalidInput } from '../controllerTools/isInvalidInput';

export const deleteItemById = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, negativeOrNanInputError: object, dneError: object) => {
  logging.info(namespace, `DELETING A ${tableName.toUpperCase()} BY ID`);
  const itemId: number = +req.params.id;
  if (isInvalidInput(itemId)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }

  try {
    const deleteByItemId = await Knex(tableName).del().where('id', '=', itemId);
    if (!deleteByItemId) {
      res.status(404).send(dneError);
      return;
    }
    logging.info(namespace, `DELETED ${tableName.toUpperCase()} WITH ID ${itemId}`, deleteByItemId);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
