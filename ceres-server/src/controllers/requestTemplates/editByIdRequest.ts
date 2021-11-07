import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { isInvalidInput } from './isInvalidInput';

export const editItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  namespace: string,
  tableName: string,
  negativeOrNanInputError: object,
  dneError: object,
  inputtedReqBody: object
) => {
<<<<<<< HEAD
  logging.info(namespace, `EDITING A ${tableName.toUpperCase} BY ID`);
=======
  logging.info(NAMESPACE, `EDITING A ${TABLE_NAME.toUpperCase()} BY ID`);
>>>>>>> 05539d8bec76c6e9e3eea38bf5aa4e8f2c011e4d
  const itemId: number = +req.params.id;
  if (isInvalidInput(itemId)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }

  try {
    const editByItemId = await Knex.update(inputtedReqBody).into(tableName).where('id', '=', itemId);
    if (!editByItemId) {
      res.status(404).send(dneError);
      return;
    }
<<<<<<< HEAD
    const retrievedEditedItem = await Knex.select('*').from(tableName).where('id', '=', itemId);
    logging.info(namespace, `EDITED ${tableName.toUpperCase} WITH ID ${itemId}`, retrievedEditedItem);
    res.status(201).send(retrievedEditedItem);
=======
    const retrieveEditedItem = await Knex.select('*').from(TABLE_NAME).where('id', '=', itemId);
    logging.info(NAMESPACE, `EDITED ${TABLE_NAME.toUpperCase()} WITH ID ${itemId}`, retrieveEditedItem);
    res.status(201).send(retrieveEditedItem);
>>>>>>> 05539d8bec76c6e9e3eea38bf5aa4e8f2c011e4d
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};

export const editItemsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  namespace: string,
  tableName: string,
  negativeOrNanInputError: object,
  dneError: object,
  itemsToUpdate: object[]
) => {
  logging.info(namespace, `EDITING INSTANCES OF ${tableName.toUpperCase()}`);
  try {
    const editedItemsIds = await Promise.all(
      itemsToUpdate.map(async (item: any) => {
        return Knex.update(item).into(tableName).where('id', '=', item.id);
      })
    );
    const retrievedEditedItems = await Knex.select('*').from(tableName).whereIn('id', editedItemsIds);
    logging.info(namespace, `EDITED ${tableName.toUpperCase()} ROWS WITH IDS IN ${editedItemsIds}`, retrievedEditedItems);
    res.status(201).send(retrievedEditedItems);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
