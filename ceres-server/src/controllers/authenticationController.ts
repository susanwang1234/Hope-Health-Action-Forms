import { Request, Response, NextFunction } from 'express';
import { User as myUser } from '../db/types/userType';
import logging from '../config/logging';
import authUtil from '../utils/authHelper';
import userModel from 'db/models/userModel';
import config from '../config/config';

const NAMESPACE = 'Authentication';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user: myUser = await userModel.findOne('User.username', username);

    logging.info(NAMESPACE, 'Retrieved from db', user);

    if (!user) {
      res.status(401).json({ isAuthenticated: false, msg: 'User not found' });
      return;
    }

    if (user.password) {
      const isValid = await authUtil.validPassword(password, user.password);

      if (isValid) {
        delete user.password;
        const tokenObject = authUtil.issueJWT(user);
        const cookieName = 'jwt';

        if (config.environement.nodeEnvironment === 'production') {
          res.cookie(cookieName, tokenObject.token, { httpOnly: true, sameSite: 'none' });
        } else {
          res.cookie(cookieName, tokenObject.token, { httpOnly: true, sameSite: true });
        }
        res.status(200).json({ isAuthenticated: true, user: user, msg: 'success' });
        return;
      }
    }
    return res.status(401).json({ isAuthenticated: false, msg: 'Entered incorrect username or password' });
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).json({ isAuthenticated: false, message: 'Server error from login' });
  }
};

// persists authentication state with front end and back end
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('jwt');
  res.status(200).json({ success: true, isAuthenticated: false, user: null });
};

export default { login, logout, authenticate };
