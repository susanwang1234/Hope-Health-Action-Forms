/** database module */
import mysql from 'mysql2';
import config from '../config/config';

const pool = mysql.createPool(config.database);

export const Query = <T = any>(query: string, values?: any) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const Knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.database.host,
    port: 3306,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database
  }
});

import users from './queries/users';

export default {
  users
};
