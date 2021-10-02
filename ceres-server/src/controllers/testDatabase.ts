import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'testDatabase';

const createTestDatabase = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Inserting Rehab Deaths');

  let { report_id, before_48, cause } = req.body;

  let query = `INSERT INTO Rehab_Report.Rehab_Deaths' (report_id, before_48, cause) VALUES ("${report_id}", "${before_48}", "${cause}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, 'Rehab Death created: ', result);

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

const deleteAllTestDatabase = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting Rehab Deaths.');

  let query = 'DELETE FROM Rehab_Report.Rehab_Deaths';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, 'Deleted Rehab Deaths: ', results);

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

const getAllTestDatabase = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Rehab Deaths.');

  let query = 'SELECT * FROM Rehab_Report.Rehab_Deaths';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, 'Retrieved Rehab Deaths: ', results);

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

export default { createTestDatabase, deleteAllTestDatabase, getAllTestDatabase };