import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../db/mysql';

export const deleteItems = async (req: Request, res: Response, next: NextFunction, NAMESPACE: string, ITEMTABLE: string) => {
  logging.info(NAMESPACE, `DELETING ALL ${ITEMTABLE.toUpperCase}`);
  try {
    await Knex(ITEMTABLE).del();
    logging.info(NAMESPACE, `DELETED ALL ${ITEMTABLE.toUpperCase}`);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};
