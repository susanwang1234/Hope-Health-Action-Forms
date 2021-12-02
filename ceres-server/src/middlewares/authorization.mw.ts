import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'AUTHORIZATION MIDDLEWARE';

const authorize = (...roles: string[]) => {
  const allowedRoles = new Set<string>(roles);

  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      // return unauthorized request
      res.status(401).json({ error: 'unauthenticated' });
      return;
    }

    if (!isAuthorized(req.user.roleName, allowedRoles)) {
      // return forbidden
      res.status(403).json({ error: 'unauthorized' });
      return;
    }

    next();
  };
};

const isAuthorized = (userRole: string, allowedRoles: Set<string>) => {
  return allowedRoles.has(userRole);
};

export default authorize;
