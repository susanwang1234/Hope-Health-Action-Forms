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

const roles = ['hhaAdmin', 'hospitalAdmin', 'departmentHead', 'user'];
const labels = ['HHA Admin', 'Hospital Admin', 'Department Head', 'Staff'];

// Test 1: GET request
describe('testGetRoleSuccess', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate role request properties', (done) => {
    agent.get('/role').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('name');
        expect(item).to.have.deep.property('label');
      });
      done();
    });
  });
  it('Validate role request fields', (done) => {
    agent.get('/role').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      res.body.forEach((item: any) => {
        expect(item.id).to.deep.equal(++id);
        expect(item.name).to.deep.equal(roles[id - 1]);
        expect(item.label).to.deep.equal(labels[id - 1]);
      });
      done();
    });
  });
});
