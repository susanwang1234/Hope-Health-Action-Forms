import { Router } from 'express';
import config from '../../config/config';
import * as jwt from 'jsonwebtoken';

const router = Router();

router.get('/', (req, res) => {
  // only get resource if authenticated
  const bearerToken = req.headers.authorization === undefined ? undefined : req.headers.authorization.split(' ');
  const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : null;

  if (!bearerToken || !token) {
    res.status(401).json({ message: 'unauthorized' });
    return;
  }
  // validate token
  const payload = jwt.verify(token, config.jwt.secret);
  res.json({ message: 'sercret obtained endpoint!' });
});

export default router;
