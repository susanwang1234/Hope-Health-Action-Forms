import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, knex, Query } from '../config/mysql';

const NAMESPACE = 'Dummies';

const createDummy = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Inserting Dummies');

  let { dummies_name, dummies_info } = req.body;

  let query = `INSERT INTO Dummies (dummies_name, dummies_info) VALUES ("${dummies_name}", "${dummies_info}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, 'Dummy created: ', result);

          return res.status(200).json({
            result
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error
      });
    });
};

const deleteAllDummy = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting all Dummies.');

  let query = 'DELETE FROM Dummies';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, 'Deleted dummies: ', results);

          return res.status(200).json({
            results
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error
      });
    });
};

const getAllDummy = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Dummies.');

  /** Knex Demo */
  // const dummies = await knex.select('*').from('Dummies');
  // console.log('DUMMIES FROM KNEX', dummies)

  let query = 'SELECT * FROM Dummies';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, 'Retrieved dummy: ', results);

          return res.status(200).json({
            results
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error
      });
    });
};

export default { createDummy, deleteAllDummy, getAllDummy };