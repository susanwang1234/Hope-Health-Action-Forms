import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { Role } from '../db/models/roleModel';

const NAMESPACE = 'Role Control';

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ROLES`);

  try {
    const roles: Role[] = await Knex.select('*').from('Role');
    logging.info(NAMESPACE, 'Retrieved role:', roles);
    res.status(200).send(roles);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { getRoles };
