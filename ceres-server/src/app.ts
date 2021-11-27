/** Use strict */
'use strict';

/** Import Modules */
import { Application } from 'express';
import { scheduleMonthyForms } from 'lib/formScheduler';
import { createServer, sendFirstRequest, enableCors, enableLogging, enableRoutes, enableErrorHandling, enableServerListening } from 'server';

/** Create instance of Server */
const startServer = () => {
  const app: Application = createServer();
  const NAMESPACE = 'Server';
  sendFirstRequest(app);
  enableCors(app);
  enableLogging(app, NAMESPACE);
  enableRoutes(app);
  enableErrorHandling(app);
  enableServerListening(app, NAMESPACE);
  scheduleMonthyForms();
};

/** Start Ceres Server */
startServer();
