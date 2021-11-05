/** database module */
import mysql from 'mysql2';
import config from '../config/config';

export const db = mysql.createPool(config.database);

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
