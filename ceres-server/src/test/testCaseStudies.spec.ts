import http from 'http';
import { createServer, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const title = ['Case Study Dummy 1', 'Case Study Dummy 2'];
const response = ['Joe Doe is a 69 year old Canadian man who was stuck at the HCBH for 30 days...', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];

// Test 1: GET request (List of case studies)
describe('testGetCaseStudiesSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let id = 0;
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
