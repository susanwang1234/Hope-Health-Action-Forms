import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';

export const createItem = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, TABLE_NAME: string, inputtedReqBody: object) => {
  logging.info(NAMESPACE, `CREATING A ${TABLE_NAME.toUpperCase()}`);
  try {
    const createItem = await Knex.insert(inputtedReqBody).into(TABLE_NAME);
    const retrievedCreatedItem = await Knex.select('*').from(TABLE_NAME).where('id', '=', createItem);
    logging.info(NAMESPACE, 'CREATED ${TABLE_NAME.toUpperCase()}', retrievedCreatedItem);
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
  itemsToInsert: object[],
  itemsRetrievalFKName: string,
  itemsRetrievalFKValue: number
) => {
  logging.info(namespace, `CREATING INSTANCES OF ${tableName.toUpperCase}`);
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
