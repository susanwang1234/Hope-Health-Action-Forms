import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();

router.get('/', authenticate('authAll', { session: false }), (req, res) => {
  try {
    if (!req.user) {
      throw new Error('req.user not instantiated');
    }
    res.json(req.user);
    //res.json({ message: `secret obtained by id:${req.user.id} username:${req.user.username}  of department ${req.user.departmentName} ROLE: ${req.user.roleName}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server error trying to auth' });
  }
});

export default router;
