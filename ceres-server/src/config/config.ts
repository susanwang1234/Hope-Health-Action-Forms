import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const SERVER_HOSTNAME = process.env.HOST_NAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8080;
const CORS_ORIGIN_URL = process.env.CORS_ORIGIN_URL || 'http://localhost:3000';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  corsOriginUrl: CORS_ORIGIN_URL
};

const MYSQL_HOST = process.env.MYSQL_HOST || 'ceres-database';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'ceresdb';
const MYSQL_USER = process.env.MYSQL_HOST || 'HHA';
const MYSQL_PASS = process.env.MYSQL_HOST || 'password';

const MYSQL = {
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST
};

const JWT_SECRET = process.env.JWT_SECRET || 'this-is-a-dev-secret';
const NODE_ENV = process.env.NODE_ENV || 'production';

const JWT = {
  secret: JWT_SECRET
};

const ENV = {
  nodeEnvironment: NODE_ENV
};

const config = {
  server: SERVER,
  database: MYSQL,
  jwt: JWT,
  environement: ENV
};

export default config;
