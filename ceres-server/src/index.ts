'use strict';
import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import dashboardRoutes from './routes/dashboard';
import departMentRoutes from './routes/department';

// Constants
const NAMESPACE = 'Server';
const app = express();

/** Logging Requests */
app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });

  next();
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

  next();
});

/** Routes */
app.use('', dashboardRoutes);
app.use('/department', departMentRoutes);

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
