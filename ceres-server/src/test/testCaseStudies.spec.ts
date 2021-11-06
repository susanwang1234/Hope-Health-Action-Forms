import http from 'http';
import { createServer, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { caseStudyNegativeOrNanInputError, caseStudyDNEError } from 'shared/errorMessages';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Test 1: GET request (List of case studies)
describe('testGetCaseStudiesSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let id = 0;
  const title = ['Case Study Dummy 1', 'Case Study Dummy 2'];
  const response = ['Joe Doe is a 69 year old Canadian man who was stuck at the HCBH for 30 days...', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableRoutes(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate case studies request properties', (done) => {
    chai
      .request(testApp)
      .get('/case-studies')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((item: any) => {
          expect(item).to.be.an('object');
          expect(item).to.have.deep.property('id');
          expect(item).to.have.deep.property('caseStudyTypeId');
          expect(item).to.have.deep.property('departmentId');
          expect(item).to.have.deep.property('userId');
          expect(item).to.have.deep.property('title');
          expect(item).to.have.deep.property('createdAt');
          expect(item).to.have.deep.property('response');
        });
        done();
      });
  });
  it('Validate case studies request fields', (done) => {
    chai
      .request(testApp)
      .get('/case-studies')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.forEach((item: any) => {
          expect(item.id).to.deep.equal(++id);
          expect(item.caseStudyTypeId).to.deep.equal(id);
          expect(item.departmentId).to.deep.equal(id);
          expect(item.userId).to.deep.equal(id);
          expect(item.title).to.deep.equal(title[id - 1]);
          expect(item.response).to.deep.equal(response[id - 1]);
        });
        done();
      });
  });
});

// Test 2: GET request (Failure, single case study)
describe('testGetCaseStudyFailure', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableRoutes(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Throw error code 400 for user with a negative number', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/-1')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 400 for invalid URL', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/wow')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 404 for user yet to be created', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/55')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyDNEError));
        done();
      });
  });
});

// Test 2: GET request (Success, single case study)
describe('testGetCaseStudySuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let count = 0;
  const label = [
    'Staff name',
    'Role/Job Title',
    'What department does this staff member work in?',
    'How long have they been working at HCBH?',
    'What do they enjoy most about working at HCBH',
    'Story'
  ];
  const response = ['Name is staff01', 'Nurse', 'Rehab', 'Long enough', 'I like to help people', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableRoutes(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate the case study request properties', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/2')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((item: any) => {
          expect(item).to.be.an('object');
          expect(item).to.have.deep.property('title');
          expect(item).to.have.deep.property('name');
          expect(item).to.have.deep.property('createdAt');
          expect(item).to.have.deep.property('label');
          expect(item).to.have.deep.property('response');
        });
        done();
      });
  });
  it('Validate the case study request fields', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/2')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.forEach((item: any) => {
          expect(item.title).to.deep.equal('Case Study Dummy 2');
          expect(item.name).to.deep.equal('Staff Recognition');
          expect(item.label).to.deep.equal(label[count]);
          expect(item.response).to.deep.equal(response[count++]);
        });
        done();
      });
  });
});
