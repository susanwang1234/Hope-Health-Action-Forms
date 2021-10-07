import { Router } from 'express';
import bcrypt from 'bcrypt';
import { Knex } from '../../db/mysql';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [userFound] = await Knex.raw(
      `SELECT U.username, U.pwd,  R.roleName, D.departmentName
      FROM User AS U, Role AS R, Department AS D
      WHERE (U.username = ? AND R.id = U.roleID)`,
      [username]
    );
    console.log(userFound);
    // console.log(userFound);
    // console.log(password);

    // const isValid = await bcrypt.compare(password, userFound.pwd);

    // if (userFound && isValid) {
    //   return res.json('successful!');
    // }
    return res.status(401).json({ message: 'wrong username or password' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'oops server went down' });
  }
});

export = router;
