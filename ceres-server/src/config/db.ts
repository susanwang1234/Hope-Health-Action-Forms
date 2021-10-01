/** database module */
import mysql from 'mysql2';
import config from './config';

export const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.name
});
