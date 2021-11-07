import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';

export const deleteItems = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string) => {
  logging.info(namespace, `DELETING ALL ${tableName.toUpperCase()}`);
  try {
    await Knex(tableName).del();
    logging.info(namespace, `DELETED ALL ${tableName.toUpperCase()}`);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
