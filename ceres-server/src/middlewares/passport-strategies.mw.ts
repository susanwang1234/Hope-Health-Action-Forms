import * as userModel from '../db/models/user';
import { User as myUser } from '../db/types/user';
import passport from 'passport';
import PassportJWT from 'passport-jwt';
import config from '../config/config';
import logging from '../config/logging';
import { Knex } from '../db/mysql';

const NAMESPACE = 'PASSPORT MIDDLEWARE';

const jwtOptions = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};

const strategyAll = new PassportJWT.Strategy(jwtOptions, async (payload, done) => {
  logging.info(NAMESPACE, 'jwt verification: incoming payload', payload);
  const id = payload.sub;

  try {
    const user: myUser = await Knex('User')
      .select(['User.username', 'User.password', 'Department.name as departmentName', 'Role.name as roleName'])
      .leftJoin('Role', 'User.roleId', 'Role.id')
      .leftJoin('Department', 'User.departmentId', 'Department.id')
      .where('User.username', id)
      .first();

    if (!user) {
      return done(null, false);
    } else {
      user.password && delete user.password; // delete so that password is not propagated
      return done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
});
passport.use('authAll', strategyAll);
