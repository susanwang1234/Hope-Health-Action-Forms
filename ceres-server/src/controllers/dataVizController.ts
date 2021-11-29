import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Data Visualization Control';

const getDataForPlots = async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Request received' });
};

export default { getDataForPlots };
