/** Use strict */
'use strict';

/** Import modules */
import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import dashboardRoutes from './routes/dashboard';
import departmentRoutes from './routes/department';
import dummyRoutes from './routes/dummy';
import rehabReportRoutes from './routes/rehabReport';
import routes from './routes/index';

/** Define server */
const NAMESPACE = 'Server';
const router = express();

/** Default request */
router.get('/', (req, res) => {
  res.send('Welcome to Team Ceres');
});

/** Logging Requests */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });

  next();
});

/** parsing requests */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of api */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // TODO Change access where routes and ips predefined when deployed to production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use('', routes);
router.use('', dashboardRoutes);
router.use('/department', departmentRoutes);
router.use('/dummy', dummyRoutes);
router.use('/rehab_report', rehabReportRoutes);

/** Error Handling */
router.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message
  });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
