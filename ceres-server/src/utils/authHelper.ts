import bcrypt from 'bcryptjs';
import { User as myUser } from '../db/types/userType';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

const validPassword = async (candidate: string, hash: string) => {
  const isValid = await bcrypt.compare(candidate, hash);
  return isValid;
};

const issueJWT = (user: myUser) => {
  const expiresIn = '1d';

  const payload = {
    sub: user.id,
    iat: Date.now(),
    expiresIn: expiresIn
  };

  const signedToken = jwt.sign(payload, config.jwt.secret, { expiresIn: expiresIn });
  return {
    token: signedToken,
    expiresIn: expiresIn
  };
};

const authUtil = {
  validPassword,
  issueJWT
};
export default authUtil;
