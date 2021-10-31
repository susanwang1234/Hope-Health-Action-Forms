import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { validateParamId } from './validateParamId';

export const editItemById = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, ITEMTABLE: string, negativeInputError: object, dneError: object, inputtedReqBody: object) => {
  logging.info(NAMESPACE, `EDITING A ${ITEMTABLE.toUpperCase} BY ID`);
  const itemId: number = +req.params.id;
  if (validateParamId(itemId)) {
    res.status(400).send(negativeInputError);
    return;
  }

  try {
    const editByItemId = await Knex.update(inputtedReqBody).into(ITEMTABLE).where('id', '=', itemId);
    if (!editByItemId) {
      res.status(404).send(dneError);
      return;
    }
    const retrieveEditedItem = await Knex.select('*').from(ITEMTABLE).where('id', '=', itemId);
    logging.info(NAMESPACE, `EDITED ${ITEMTABLE.toUpperCase} WITH ID ${itemId}`, retrieveEditedItem);
    res.status(201).send(retrieveEditedItem);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};
