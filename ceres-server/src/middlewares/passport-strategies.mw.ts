import * as userModel from '../db/models/user';
import { User as myUser } from '../db/types/user';
import passport from 'passport';
import PassportJWT from 'passport-jwt';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'PASSPORT MIDDLEWARE';

const jwtOptions = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};

const strategyAll = new PassportJWT.Strategy(jwtOptions, async (payload, done) => {
  logging.info(NAMESPACE, 'jwt verification: incoming payload', payload);

  const username = payload.sub;

  try {
    await userModel.findOne(username, async (err: Error, user: myUser) => {
      if (err) {
        throw new Error('error from user query');
      }
      if (user) {
        user.password && delete user.password;
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  } catch (error) {
    done(error, false);
  }
});

passport.use('authAll', strategyAll);
