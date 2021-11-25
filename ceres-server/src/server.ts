/** Import Modules */
import http from 'http';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import { apiRouter, authRouter } from 'routes';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import './middlewares/passport-strategies.mw.ts';

export const createServer = () => {
  /** Define Server */
  const router: Application = express();
  return router;
};

export const sendFirstRequest = (router: Application) => {
  /** Default Request */
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to Team Ceres');
  });
};

export const enableCors = (router: Application) => {
  /** Enable CORS */
  const allowedOrigins = config.server.corsOriginUrl;
  logging.debug('origins', 'ALLOWED ORIGINS IS', allowedOrigins);

  /** Define allowed requests and URLs */
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
  };

  /** Pass Options to CORS */
  router.use(cors(options));

  /** Rules of API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowedOrigins); // TODO Change access where routes and ips predefined when deployed to production
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization,');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
      return res.status(200).json({});
    }
    next();
  });
};

export const enableLogging = (router: Application, namespace: string) => {
  /** Logging Requests */
  router.use((req, res, next) => {
    logging.info(namespace, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      logging.info(namespace, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
  });

  /** Parsing Requests */
  const morgan = require('morgan');
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(morgan('dev'));
  router.use(cookieParser());

  /** Passport Initialization */
  router.use(passport.initialize());
};

export const enableRoutes = (router: Application) => {
  /** Routes */
  // order of route initialization matters
  router.use('', authRouter);
  // all routes below must be authenticated to be granted access
  // router.use(passport.authenticate('authAll', { session: false }));
  router.use('', apiRouter);
};

export const enableErrorHandling = (router: Application) => {
  /** Error Handling */
  router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
      message: error.message
    });
  });
};

export const enableServerListening = (router: Application, namespace: string) => {
  /** Create the server */
  const httpServer = http.createServer(router);
  httpServer.listen(config.server.port, () => logging.info(namespace, `Server running on ${config.server.hostname}:${config.server.port}`));
};
