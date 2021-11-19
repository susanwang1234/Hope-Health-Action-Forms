import http from 'http';
import { Application } from 'express';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../../server';
import PORT from './serverPort';
const chai = require('chai');

interface UserAccount {
  username: string;
  password: string;
}

const ADMIN: UserAccount = {
  username: 'admin',
  password: 'password123'
};

const FAIL: UserAccount = {
  username: 'admin',
  password: 'INCORRECT PASSWORD'
};

export const Accounts = {
  ADMIN,
  FAIL
};

export const setupApp = () => {
  const testApp = createServer();
  sendFirstRequest(testApp);
  enableLogging(testApp, 'Test Server');
  enableRoutes(testApp);
  enableErrorHandling(testApp);
  return testApp;
};

export const setupHttpServer = (testApp: Application) => {
  const httpServer = http.createServer(testApp);
  httpServer.listen(PORT);
  return httpServer;
};

export const attemptAuthentication = (agent: any, userAccount: UserAccount = ADMIN, done: Mocha.Done) => {
  agent
    .post('/auth/login')
    .set('content-type', 'application/json')
    .send(userAccount)
    .then(function (res: any) {
      done();
    })
    .catch(function (err: any) {
      done(err);
    });
};
