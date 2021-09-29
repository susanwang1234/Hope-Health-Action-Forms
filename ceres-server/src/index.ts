'use strict';
import http from 'http';
import express from 'express';
import logging from 'config/logging';
import config from 'config/config';

// Constants
const NAMESPACE = 'Server';
const PORT = 8080;
const app = express();

/** Logging Requests */
app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });
});

/** parsing requests */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of api */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // TODO Change access where routes and ips predefined when deployed to production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }
});

/** Error Handling */
app.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message
  });
});

/** Create the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

/* // Sample GET request
app.get('/', (req, res) => {
  res.send('Ceres');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 */
