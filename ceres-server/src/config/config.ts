import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.HOST_NAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const DB_PORT = process.env.HOST_NAME || 30061;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'HHA';
const DB_HOST = process.env.DB_HOST || 'localhost';

const DATABASE = {
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
  host: DB_HOST
};

const config = {
  server: SERVER,
  database: DATABASE
};

export default config;
