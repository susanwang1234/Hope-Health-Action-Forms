/** Use strict */
'use strict';

/** Import Modules */
import http from 'http';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import dashboardRoutes from './routes/dashboard';
import departmentRoutes from './routes/department';
import dummyRoutes from './routes/dummy';
import rehabReportRoutes from './routes/rehabReport';
import routes from './routes/index';
import passport from 'passport';
import './middlewares/passport-strategies.mw.ts';

const router: Application = createServer();
const NAMESPACE = 'Server';

export function createServer() {
  /** Define Server */
  const router: Application = express();
  return router;
}

defaultRequest(router);

export function defaultRequest(router: Application) {
  /** Default Request */
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to Team Ceres');
  });
}

/** Enable CORS */
const allowedOrigins = ['http://localhost:3000'];

/** Define allowed requests and URLs */
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
};

/** Pass Options to CORS */
router.use(cors(options));

/** Logging Requests */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });

  next();
});

/** Parsing Requests */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Passport Initialization */
router.use(passport.initialize());

/** Rules of API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // TODO Change access where routes and ips predefined when deployed to production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }

  next();
});

export function apiRoutes(router: Application) {
  /** Routes */
  router.use('', routes);
  router.use('', dashboardRoutes);
  router.use('/department', departmentRoutes);
  router.use('/dummy', dummyRoutes);
  router.use('/rehab_report', rehabReportRoutes);
}

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
