import * as userModel from '../db/models/user';
import { User as myUser } from '../db/types/user';
import passport from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from 'bcrypt';

passport.serializeUser((user: Express.User, done) => done(null, user));
passport.deserializeUser((user: false | Express.User | null | undefined, done) => done(null, user));

passport.use(
  new PassportLocal.Strategy({}, async (username, password, done) => {
    try {
      userModel.findOne(username, async (err: Error, user: myUser) => {
        if (err) {
          throw Error('error from user query');
        }
        const isMatch = await bcrypt.compare(password, user.pwd);

        if (isMatch) {
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
