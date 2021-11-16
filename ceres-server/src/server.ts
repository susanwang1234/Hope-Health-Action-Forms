/** Import Modules */
import http from 'http';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import authenticationRoutes from './routes/authenticationRoute';
import departmentRoutes from './routes/departmentRoute';
import departmentFormRoutes from './routes/departmentFormRoute';
import formRoutes from './routes/formRoute';
import formResponsesRoutes from './routes/formResponsesRoute';
import imageRoutes from './routes/imageRoute';
import caseStudyRoutes from './routes/caseStudyRoute';
import caseStudiesRoutes from './routes/caseStudiesRoute';
import caseStudyTypesRoutes from './routes/caseStudyTypesRoute';
import caseStudyQuestionsRoutes from './routes/caseStudyQuestionsRoute';
import caseStudyResponsesRoutes from './routes/caseStudiesResponsesRoute';
import roleRoutes from './routes/roleRoute';
import userRoutes from './routes/userRoute';
import employeeOfTheMonthRoutes from './routes/employeeOfTheMonthRoute';
import routes from './routes/indexRoute';
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
  const allowedOrigins = ['http://localhost:3000'];

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
  router.use('', routes);
  router.use('/department', departmentRoutes);
  router.use('/department-form', departmentFormRoutes);
  router.use('/auth', authenticationRoutes);
  router.use('/role', roleRoutes);
  router.use('/user', userRoutes);
  router.use('/form', formRoutes);
  router.use('/form-responses', formResponsesRoutes);
  router.use('/case-study', caseStudyRoutes);
  router.use('/case-studies', caseStudiesRoutes);
  router.use('/case-study-types', caseStudyTypesRoutes);
  router.use('/case-study-questions', caseStudyQuestionsRoutes);
  router.use('/case-study-responses', caseStudyResponsesRoutes);
  router.use('/image', imageRoutes);
  router.use('/employee-of-the-month', employeeOfTheMonthRoutes);
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
