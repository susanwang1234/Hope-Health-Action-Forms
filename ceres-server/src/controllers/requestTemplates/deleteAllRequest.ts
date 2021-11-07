import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';

export const deleteItems = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, TABLE_NAME: string) => {
  logging.info(NAMESPACE, `DELETING ALL ${TABLE_NAME.toUpperCase()}`);
  try {
    await Knex(TABLE_NAME).del();
    logging.info(NAMESPACE, `DELETED ALL ${TABLE_NAME.toUpperCase()}`);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
