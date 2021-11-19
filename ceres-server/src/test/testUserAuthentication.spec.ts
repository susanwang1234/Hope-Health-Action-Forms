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

// Test 1: Create a passing test
describe('dummy testing test', () => {
  it('True should be True', (done) => {
    chai.expect(true).to.be.equal(true);
    done();
  });
});

// test login failure
describe('testUserLoginFailure', () => {
  // create the running server to test on before running tests
  before('Create a working server', () => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
  });
  // close the server down after completion of the tests
  after('Close a working server', () => {
    httpServer.close();
  });

  // login response success
  it('Should Allow User to Login With Valid Credentials', (done) => {
    chai
      .request(testApp)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({
        username: 'admin',
        password: 'INCORRECT PASSWORD'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
});

// test login success
describe('testUserLoginSuccess', () => {
  // create the running server to test on before running tests
  before('Create a working server', () => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
  });
  // close the server down after completion of the tests
  after('Close a working server', () => {
    httpServer.close();
  });

  // login response success
  it('Should Allow User to Login With Valid Credentials', (done) => {
    chai
      .request(testApp)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({
        username: 'admin',
        password: 'password123'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');

        expect(res.body).to.have.property('isAuthenticated');
        expect(res.body.isAuthenticated).to.equal(true);

        expect(res.body).to.have.property('user');
        expect(res).to.have.cookie('jwt');
        done();
      });
  });
});

describe('testAuthenticationStatus', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, Accounts.ADMIN, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });

  it('Should Maintain User Authentication Status', (done) => {
    agent.get('/auth/authenticate').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('isAuthenticated');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.deep.property('id');
      expect(res.body.user).to.have.deep.property('username');
      expect(res.body.user).to.have.deep.property('departmentId');
      expect(res.body.user).to.have.deep.property('roleId');
      done();
    });
  });
});
