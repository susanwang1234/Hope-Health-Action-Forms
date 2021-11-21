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
let id = 0;

const departments = ['All Departments', 'Rehab', 'NICUPaeds'];

// Test 1: GET request
describe('testGetDepartmentSuccess', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate department request properties', (done) => {
    agent.get('/department').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('name');
      });
      done();
    });
  });
  it('Validate department request fields', (done) => {
    agent.get('/department').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      res.body.forEach((item: any) => {
        expect(item.id).to.deep.equal(++id);
        expect(item.name).to.deep.equal(departments[id - 1]);
      });
      done();
    });
  });
});

// Test 2: POST request

// Test 3: DELETE request

// Test 4: PUT request
