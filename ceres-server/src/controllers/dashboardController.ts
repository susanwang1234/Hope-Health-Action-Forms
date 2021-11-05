import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Dashboard Control';

// TODO: Delete later (just dummy data for the dashboard)
const dummyDepartmentData = {
  departments: [
    { id: 1, name: 'Rehab' },
    {
      id: 2,
      name: 'NICUPAEDS'
    },
    {
      id: 3,
      name: 'Maternity'
    },
    {
      id: 4,
      name: 'Community Health'
    }
  ]
};

const dashboardHealthCheck = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Sample health check for route called');

  return res.status(200).json(dummyDepartmentData);
};

export default { dashboardHealthCheck };
