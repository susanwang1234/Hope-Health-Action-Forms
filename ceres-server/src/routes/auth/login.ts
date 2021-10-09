import { Router } from 'express';
import config from '../../config/config';
import * as jwt from 'jsonwebtoken';
import { authenticate } from 'passport';
import { ReqUser } from '../../types';

const router = Router();

/*     const data = await Knex('User')
      .join('Role', 'User.roleID', 'Role.id')
      .join('Department', 'User.departmentID', 'Department.ID')
      .select('User.username as username', 'User.pwd as password', 'Department.departmentName as departmentName')
      .where('username',username)
      .andWhere('U.roleID',) */

/*       */

router.post('/', authenticate('local'), async (req: ReqUser, res) => {
  try {
    if (!req.user) {
      throw Error('ERROR: req.user is not defined');
    }
    // TODO: reqUser could be either payload or user
    const token = jwt.sign({ id: req.user.id, username: req.user.username, roleName: req.user.roleName, departmentName: req.user.departmentName }, config.jwt.secret, { expiresIn: '15d' });
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'oops server went down' });
  }
});

export default router;
