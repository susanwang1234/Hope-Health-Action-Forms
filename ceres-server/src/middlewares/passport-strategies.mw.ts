import * as userModel from '../db/models/user';
import { User as myUser } from '../db/types/user';
import passport from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from 'bcrypt';

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
        if (err || !user.pwd) {
          throw Error('error from user query');
        }
        const isMatch = await bcrypt.compare(password, user.pwd);

        if (isMatch) {
          delete user.pwd; // immediately remove password incase of incorrect jwt usage
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (error) {
      done(error);
    }
  })
);
