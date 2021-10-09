/** database module */
import mysql from 'mysql2';
import config from '../config/config';

export const db = mysql.createPool(config.database);

export const Query = <T = any>(query: string, values?: any) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
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
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  }
});
