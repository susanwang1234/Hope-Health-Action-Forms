import http from 'http';
import { Application } from 'express';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../../server';
import PORT from './serverPort';
const chai = require('chai');

const userSuccess = {
  username: 'admin',
  password: 'password123'
};

const userFail = {
  username: 'admin',
  password: 'INCORRECT PASSWORD'
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

export const attemptAuthentication = (agent: any, done: Mocha.Done) => {
  agent
    .post('/auth/login')
    .set('content-type', 'application/json')
    .send(userSuccess)
    .then(function (res: any) {
      done();
    })
    .catch(function (err: any) {
      done(err);
    });
};

export const testExportBefore = (testApp: Application, httpServer: http.Server, agent: any) => {
  // create the running server to test on before running tests
  before('Create a working server', (done) => {
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);

    agent = chai.request.agent(testApp);

    agent
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send(userSuccess)
      .then(function (res: any) {
        done();
      })
      .catch(function (err: any) {
        done(err);
      });
  });
};
