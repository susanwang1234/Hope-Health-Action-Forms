import * as userModel from '../db/models/userModel';
import { User as myUser } from '../db/types/userType';
import passport from 'passport';
import * as PassportLocal from 'passport-local';
import PassportJWT from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { Payload } from '../types/indexType';
import config from '../config/config';

passport.serializeUser((user: myUser, done) => {
  if (user.pwd) {
    delete user.pwd; // immediately delete from object incase of incorrect usage
  }
  done(null, user);
});
passport.deserializeUser((user: myUser, done) => done(null, user));

passport.use(
  new PassportLocal.Strategy({}, async (username, password, done) => {
    try {
      userModel.findOne(username, async (err: Error, user: myUser) => {
        if (err) {
          throw new Error('error from user query');
        }

        if (user === undefined) {
          done(null, false);
          return;
        }

        const isMatch = user.pwd === undefined ? false : await bcrypt.compare(password, user.pwd);

        if (isMatch) {
          delete user.pwd; // immediately remove password incase of incorrect jwt usage
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (error) {
      done(null, false);
    }
  })
);

passport.use(
  new PassportJWT.Strategy(
    {
      jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret
    },
    (payload: Payload, done) => {
      try {
        done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);
