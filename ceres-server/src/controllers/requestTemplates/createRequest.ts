import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';
import { isInvalidInput } from './isInvalidInput';

export const createItem = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, inputtedReqBody: object) => {
  logging.info(namespace, `CREATING A ${tableName.toUpperCase()}`);
  try {
    const createdItem = await Knex.insert(inputtedReqBody).into(tableName);
    const retrievedCreatedItem = await Knex.select('*').from(tableName).where('id', '=', createdItem);
    logging.info(namespace, `CREATED ${tableName.toUpperCase()}`, retrievedCreatedItem);
    res.status(201).send(retrievedCreatedItem);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};

export const createItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
  namespace: string,
  tableName: string,
  negativeOrNanInputError: object,
  itemsToInsert: object[],
  itemsRetrievalFKName: string,
  itemsRetrievalFKValue: number
) => {
  logging.info(namespace, `CREATING INSTANCES OF ${tableName.toUpperCase}`);
  if (isInvalidInput(itemsRetrievalFKValue)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }
  try {
    await Knex.insert(itemsToInsert).into(tableName);
    const retrievedCreatedItems = await Knex.select('*').from(tableName).where(`${itemsRetrievalFKName}`, '=', itemsRetrievalFKValue);
    logging.info(namespace, `CREATED ${tableName.toUpperCase}S`, retrievedCreatedItems);
    res.status(201).send(retrievedCreatedItems);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};
