import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.HOST_NAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 33061;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const config = {
  server: SERVER
};

export default config;
