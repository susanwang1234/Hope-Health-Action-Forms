import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Dummies';

const createDummy = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Creating Dummy');

  try {
    const { dummyName, dummyInfo } = req.body;
    const createdDummyId = await Knex.insert({ dummies_name: dummyName, dummies_info: dummyInfo }).into('Dummies');
    const createdDummy = await Knex.select('*').from('Dummies').where('id', '=', createdDummyId);
    logging.info(NAMESPACE, 'Created dummy:', createdDummy);
    res.status(201).send(createdDummy);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

const deleteAllDummy = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting all Dummies.');

  try {
    await Knex('Dummies').del();
    logging.info(NAMESPACE, 'Deleted all dummies');
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getAllDummy = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Dummies.');

  try {
    const dummies = await Knex.select('*').from('Dummies');
    logging.info(NAMESPACE, 'Retrieved dummies:', dummies);
    res.status(200).send(dummies);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { createDummy, deleteAllDummy, getAllDummy };
