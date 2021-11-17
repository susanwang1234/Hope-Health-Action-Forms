import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { agent } from 'supertest';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// stupid test
// Test 1: Create a passing test
describe('dummy testing test', () => {
  it('True should be True', (done) => {
    chai.expect(true).to.be.equal(true);
    done();
  });
});

// test login failure
describe('testUserLoginFailure', () => {
  let testApp: Application;
  let httpServer: http.Server;

  // create the running server to test on before running tests
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableLogging(testApp, 'Test Server');
    enableRoutes(testApp);
    enableErrorHandling(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
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
  let testApp: Application;
  let httpServer: http.Server;

  // create the running server to test on before running tests
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableLogging(testApp, 'Test Server');
    enableRoutes(testApp);
    enableErrorHandling(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
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

const user = {
  username: 'admin',
  password: 'password123'
};

// test authenticated dummy route
describe('test authenticated route success', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let agent: any;

  // create the running server to test on before running tests
  before('Create a working server', (done) => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableLogging(testApp, 'Test Server');
    enableRoutes(testApp);
    enableErrorHandling(testApp);

    agent = chai.request.agent(testApp);

    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);

    agent
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send(user)
      .then(function (res: any) {
        done();
      })
      .catch(function (err: any) {
        done(err);
      });
  });
  // close the server down after completion of the tests
  after('Close a working server', () => {
    agent.close();
    httpServer.close();
  });

  it('Should Allow User to Access an Authenticated Route', (done) => {
    agent.get('/testSecret').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.msg).to.deep.equal('you got through!');
      done();
    });
  });
});

// const agent = chai.request.agent(testApp);

// agent
//   .post('/auth/login')
//   .set('content-type', 'application/json')
//   .send({
//     username: 'admin',
//     password: 'INCORRECT'
//   })
//   .then((res: any) => {
//     expect(res).to.have.cookie('jwt');
//     // The `agent` now has the sessionid cookie saved, and will send it
//     // back to the server in the next request:
//     return agent.get('/testSecret').end((err: any, res: any) => {
//       // expect(err).to.be.null;
//       // expect(res).to.have.status(200);
//       // expect(res).to.have.cookie('jwtasdf');
//       // expect(res).to.have.deep.property('msg');
//       // expect(res.body.msg).to.deep.equal('you got fsdathrough!');
//       expect(res).to.have.status(200);
//     });
//   });
// agent.close();

/* chai
      .request(testApp)
      .get('/testSecret')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      }); */
