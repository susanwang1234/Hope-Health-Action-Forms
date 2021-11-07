import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { isInvalidInput } from './isInvalidInput';

export const editItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  NAMESPACE: string,
  TABLE_NAME: string,
  negativeOrNanInputError: object,
  dneError: object,
  inputtedReqBody: object
) => {
  logging.info(NAMESPACE, `EDITING A ${TABLE_NAME.toUpperCase()} BY ID`);
  const itemId: number = +req.params.id;
  if (isInvalidInput(itemId)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }

  try {
    const editByItemId = await Knex.update(inputtedReqBody).into(TABLE_NAME).where('id', '=', itemId);
    if (!editByItemId) {
      res.status(404).send(dneError);
      return;
    }
    const retrieveEditedItem = await Knex.select('*').from(TABLE_NAME).where('id', '=', itemId);
    logging.info(NAMESPACE, `EDITED ${TABLE_NAME.toUpperCase()} WITH ID ${itemId}`, retrieveEditedItem);
    res.status(201).send(retrieveEditedItem);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};
