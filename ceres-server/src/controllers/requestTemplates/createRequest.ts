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
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};
