import { Router } from 'express';
import bcrypt from 'bcrypt';
import config from '../../config/config';
import db from '../../db/queries/users';
import * as userModel from '../../db/models/user';
import { User } from '../../db/types/user';
import * as jwt from 'jsonwebtoken';

const router = Router();

/*     const data = await Knex('User')
      .join('Role', 'User.roleID', 'Role.id')
      .join('Department', 'User.departmentID', 'Department.ID')
      .select('User.username as username', 'User.pwd as password', 'Department.departmentName as departmentName')
      .where('username',username)
      .andWhere('U.roleID',) */

/*       */

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    userModel.findOne(username, async (err: Error, user: User) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const isMatch = await bcrypt.compare(password, user.pwd);

      if (isMatch) {
        const token = jwt.sign({ userID: user.id, role: user.roleName, department: user.departmentName }, config.jwt.secret, { expiresIn: '15d' });
        res.json(token);
        return;
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'oops server went down' });
  }
});

export = router;
