import http from 'http';
import { Application } from 'express';
import { attemptAuthentication, setupApp, setupHttpServer, Accounts } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

describe('Authorization As hhaAdmin', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should allow admin account to pass through', (done) => {
    agent.get('/user').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });
});
