import { Request, Response, NextFunction } from 'express';
import { User as myUser } from '../db/types/userType';
import logging from '../config/logging';
import authUtil from '../utils/authHelper';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Authentication';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user: myUser = await Knex('User')
      .select(['User.id', 'User.username', 'User.password', 'Department.name as departmentName', 'Role.name as roleName'])
      .leftJoin('Role', 'User.roleId', 'Role.id')
      .leftJoin('Department', 'User.departmentId', 'Department.id')
      .where('User.username', username)
      .first();

    logging.info(NAMESPACE, 'Retrieved from db', user);

    if (!user) {
      return res.status(401).json({ isAuthenticated: false, msg: 'entered incorrect username or password' });
    }

    if (user.password) {
      const isValid = await authUtil.validPassword(password, user.password);

      if (isValid) {
        delete user.password;
        const tokenObject = authUtil.issueJWT(user);
        return res.status(200).json({ isAuthenticated: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expiresIn });
      }
    }
    return res.status(401).json({ isAuthenticated: false, msg: 'entered incorrect username or password' });
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).json({ message: 'server error' });
  }
};

export default { login };
