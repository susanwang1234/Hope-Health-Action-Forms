import { Router } from 'express';
import { ReqUser } from '../../types';

const router = Router();

router.get('/', (req: ReqUser, res) => {
  try {
    if (!req.user) {
      throw new Error('req.user not instantiated');
    }
    res.json({ message: `secret obtained by ${req.user.username}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error trying to auth' });
  }
});

export default router;
