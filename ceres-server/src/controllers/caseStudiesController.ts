import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Case Studies Control';
const TABLE_NAME = 'Case Studies';

const getCaseStudies = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME.toUpperCase}`);
  try {
    let retrievedCaseStudies = await Knex.select('*').from(TABLE_NAME);
    logging.info(NAMESPACE, `Retrieved ${TABLE_NAME.toUpperCase}:`, retrievedCaseStudies);
    res.status(200).send(retrievedCaseStudies);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { getCaseStudies };
