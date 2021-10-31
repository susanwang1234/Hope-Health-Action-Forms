import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { validateParamId } from './validateParamId';

export const deleteItemById = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, ITEMTABLE: string, negativeInputError: object, dneError: object) => {
  logging.info(NAMESPACE, `DELETING A ${ITEMTABLE.toUpperCase} BY ID`);
  const itemId: number = +req.params.id;
  if (validateParamId(itemId)) {
    res.status(400).send(negativeInputError);
    return;
  }

  try {
    const deleteByItemId = await Knex(ITEMTABLE).del().where('id', '=', itemId);
    if (!deleteByItemId) {
      res.status(404).send(dneError);
      return;
    }
    logging.info(NAMESPACE, `DELETED ${ITEMTABLE.toUpperCase} WITH ID ${itemId}`, deleteByItemId);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};
