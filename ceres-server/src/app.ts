/** Use strict */
'use strict';

/** Import Modules */
import { Application } from 'express';
import { createServer, sendFirstRequest, enableCors, enableLogging, linkRoutes, enableErrorHandling, enableServerListening } from 'server';

/** Create instance of Server */
const startServer = () => {
  const app: Application = createServer();
  const NAMESPACE = 'Server';
  sendFirstRequest(app);
  enableCors(app);
  enableLogging(app, NAMESPACE);
  linkRoutes(app);
  enableErrorHandling(app);
  enableServerListening(app, NAMESPACE);
};

/** Start Ceres Server */
startServer();
