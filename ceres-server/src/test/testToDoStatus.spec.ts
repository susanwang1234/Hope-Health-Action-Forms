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

// Test 1: GET request
describe('getToDoStatus', () => {
  let id = 1;
  const caseStudies = [1, 0];
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return the to-do status for each department successfully', (done) => {
    agent.get('/to-do').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('departmentId');
        expect(item).to.have.deep.property('dataForm');
        expect(item).to.have.deep.property('caseStudies');
        expect(item).to.have.deep.property('employeeOfTheMonth');
      });
      res.body.forEach((item: any) => {
        expect(item.departmentId).to.deep.equal(++id);
        expect(item.dataForm).to.deep.equal(0);
        expect(item.caseStudies).to.deep.equal(caseStudies[id - 2]);
        expect(item.employeeOfTheMonth).to.deep.equal(caseStudies[id - 2]);
      });
      done();
    });
  });
});
