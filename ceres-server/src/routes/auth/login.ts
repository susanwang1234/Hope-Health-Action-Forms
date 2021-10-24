import { Router } from 'express';
import { User as myUser } from '../../db/types/user';
import * as userModel from '../../db/models/user';
import authUtil from '../../utils/authHelper';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    await userModel.findOne(username, async (err: Error, user: myUser) => {
      if (err) {
        throw new Error('error from user query');
      }

      if (!user) {
        res.status(401).json({ success: false, msg: 'entered incorrect username or password' });
      }

      if (user.password) {
        const isValid = await authUtil.validPassword(password, user.password);

        if (isValid) {
          delete user.password;
          const tokenObject = authUtil.issueJWT(user);
          res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expiresIn });
        } else {
          res.status(401).json({ success: false, msg: 'entered incorrect username or password' });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
});

export default router;
