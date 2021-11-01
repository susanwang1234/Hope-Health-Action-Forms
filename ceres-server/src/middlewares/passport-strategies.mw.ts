import { User as myUser } from '../db/types/userType';
import passport from 'passport';
import PassportJWT from 'passport-jwt';
import config from '../config/config';
import logging from '../config/logging';
import { Knex } from '../db/mysql';
import { Request } from 'express';

const NAMESPACE = 'PASSPORT MIDDLEWARE';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

const jwtOptions = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};

const strategyAll = new PassportJWT.Strategy(jwtOptions, async (payload, done) => {
  logging.info(NAMESPACE, 'jwt verification: incoming payload', payload);
  const id = payload.sub;

  try {
    const user: myUser = await Knex('User')
      .select(['User.id', 'User.username', 'User.password', 'Department.name as departmentName', 'Role.name as roleName'])
      .leftJoin('Role', 'User.roleId', 'Role.id')
      .leftJoin('Department', 'User.departmentId', 'Department.id')
      .where('User.id', id)
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
