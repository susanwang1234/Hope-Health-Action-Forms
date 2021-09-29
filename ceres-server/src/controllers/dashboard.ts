import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Dashboard Control';

const dashboardHealthCheck = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Sample health check for route called');

  return res.status(200).json({
    message: 'pong'
  });
};

export default { dashboardHealthCheck };
