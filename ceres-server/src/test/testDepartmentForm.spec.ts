import http from 'http';
import { Application } from 'express';
import { departmentDNEError, departmentNegativeOrNanInputError, pageNotFoundError } from '../shared/errorMessages';
import { attemptAuthentication, setupApp, setupHttpServer, Accounts } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

let id = 0;

const labels = [
  'Beds available',
  'Beds days',
  'Patient days',
  'Hospitalized',
  'Discharged alive',
  'Died before 48h',
  'Died after 48h',
  'Days hospitalised',
  'Referrals',
  'Transfers',
  'Self-discharged',
  'Stayed in the ward',
  'Admissions'
];

// Test 1: GET request (Failure)
describe('testGetDepartmentFormFailure', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, Accounts.ADMIN, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('Throw error code 400 for department with a negative number', (done) => {
    agent.get('/department-form/-1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(departmentNegativeOrNanInputError));
      done();
    });
  });
  it('Throw error code 404 for invalid URL', (done) => {
    agent.get('/department-form').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(pageNotFoundError));
      done();
    });
  });
  it('Throw error code 404 for department form yet to be created', (done) => {
    agent.get('/department-form/14').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(departmentDNEError));
      done();
    });
  });
});

// Test 2: GET request (Success)
describe('testGetDepartmentFormSuccess', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, Accounts.ADMIN, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate department form #2 request properties', (done) => {
    agent.get('/department-form/2').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('name');
        expect(item).to.have.deep.property('label');
        expect(item).to.have.deep.property('inputType');
        expect(item).to.have.deep.property('responseType');
        expect(item).to.have.deep.property('isMSPP');
        expect(item).to.have.deep.property('departmentId');
        expect(item).to.have.deep.property('questionId');
        expect(item).to.have.deep.property('isRequired');
      });
      done();
    });
  });
  it('Validate department form #2 request fields', (done) => {
    agent.get('/department-form/2').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      res.body.forEach((item: any) => {
        expect(item.id).to.deep.equal(++id);
        expect(item.name).to.deep.equal('Rehab');
        expect(item.label).to.deep.equal(labels[id - 1]);
        expect(item.inputType).to.deep.equal('text');
        expect(item.responseType).to.deep.equal('number');
        expect(item.isMSPP).to.deep.equal(1);
        expect(item.departmentId).to.deep.equal(2);
        expect(item.questionId).to.deep.equal(id);
        expect(item.isRequired).to.deep.equal(1);
      });
      done();
    });
  });
  it('Validate department form #3 request properties', (done) => {
    agent.get('/department-form/3').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('name');
        expect(item).to.have.deep.property('label');
        expect(item).to.have.deep.property('inputType');
        expect(item).to.have.deep.property('responseType');
        expect(item).to.have.deep.property('isMSPP');
        expect(item).to.have.deep.property('departmentId');
        expect(item).to.have.deep.property('questionId');
        expect(item).to.have.deep.property('isRequired');
      });
      done();
    });
  });
  it('Validate department form #3 request fields', (done) => {
    agent.get('/department-form/3').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      res.body.forEach((item: any) => {
        expect(item.id).to.deep.equal(++id);
        expect(item.name).to.deep.equal('NICUPaeds');
        expect(item.label).to.deep.equal(labels[id - 1 - 13]);
        expect(item.inputType).to.deep.equal('text');
        expect(item.responseType).to.deep.equal('number');
        expect(item.isMSPP).to.deep.equal(1);
        expect(item.departmentId).to.deep.equal(3);
        expect(item.questionId).to.deep.equal(id - 13);
        expect(item.isRequired).to.deep.equal(1);
      });
      done();
    });
  });
});

// Test 3: POST request

// Test 4: DELETE request

// Test 5: PUT request
