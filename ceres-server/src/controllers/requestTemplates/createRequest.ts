import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';

export const createItem = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, ITEMTABLE: string, inputtedReqBody: object) => {
  logging.info(NAMESPACE, `CREATING A ${ITEMTABLE.toUpperCase}`);
  try {
    const createItem = await Knex.insert(inputtedReqBody).into(ITEMTABLE);
    const retrievedCreatedItem = await Knex.select('*').from(ITEMTABLE).where('id', '=', createItem);
    logging.info(NAMESPACE, 'CREATED ${ITEMTABLE.toUpperCase}', retrievedCreatedItem);
    res.status(201).send(retrievedCreatedItem);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};
