import { Router } from 'express';
import bcrypt from 'bcrypt';
import config from '../../config/config';
import db from '../../db/queries/users';
import * as userModel from '../../db/models/user';
import { User } from '../../db/types/user';
import * as jwt from 'jsonwebtoken';
import { authenticate } from 'passport';
import { Request } from 'express';

const router = Router();

/*     const data = await Knex('User')
      .join('Role', 'User.roleID', 'Role.id')
      .join('Department', 'User.departmentID', 'Department.ID')
      .select('User.username as username', 'User.pwd as password', 'Department.departmentName as departmentName')
      .where('username',username)
      .andWhere('U.roleID',) */

/*       */

export interface ReqUser extends Request {
  user?: {
    id?: number;
    roleName?: string;
    departmentName?: string;
  };
}

router.post('/', authenticate('local'), async (req: ReqUser, res) => {
  const { username, password } = req.body;

  try {
    if (req.user) {
      const token = jwt.sign({ userID: req.user.id, role: req.user.roleName, department: req.user.departmentName }, config.jwt.secret, { expiresIn: '15d' });
      res.json(token);
      return;
    }
    throw Error('ERROR: req.user is not defined');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'oops server went down' });
  }
});

export default router;
