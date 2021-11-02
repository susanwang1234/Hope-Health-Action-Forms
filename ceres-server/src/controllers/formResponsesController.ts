import { Request, Response, NextFunction } from 'express';

const addNewFormResponses = async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Route created' });
};

export default { addNewFormResponses };
