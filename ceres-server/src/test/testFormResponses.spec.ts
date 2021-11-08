import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('getFormResponsesByFormId', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableLogging(testApp, 'Test Server');
    enableRoutes(testApp);
    enableErrorHandling(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });

  it('should get all form responses for form id', () => {});

  it('should return error code 400 for form id that is negative or NaN', () => {});

  it('should return error code 404 for form that does not exist or has no responses', () => {});
});

describe('addNewFormResponses', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableLogging(testApp, 'Test Server');
    enableRoutes(testApp);
    enableErrorHandling(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });

  it('should add new form responses for form id', (done) => {
    const formResponses = [
      { departmentQuestionId: 1, response: 19 },
      { departmentQuestionId: 2, response: 12 }
    ];
    chai
      .request(testApp)
      .post('/form-responses/1')
      .set('Content-Type', 'application/json')
      .send(formResponses)
      .end((err: any, res: any) => {
        console.log('RES.BODY', res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(201);

        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('departmentQuestionId');
        expect(res.body[0].departmentQuestionId).to.deep.equal(1);
        expect(res.body[0]).to.have.deep.property('formId');
        expect(res.body[0].formId).to.deep.equal(1);
        expect(res.body[0]).to.have.deep.property('response');
        expect(res.body[0].response).to.deep.equal('19');

        expect(res.body[1]).to.be.an('object');
        expect(res.body[1]).to.have.deep.property('id');
        expect(res.body[1]).to.have.deep.property('departmentQuestionId');
        expect(res.body[1].departmentQuestionId).to.deep.equal(2);
        expect(res.body[1]).to.have.deep.property('formId');
        expect(res.body[1].formId).to.deep.equal(1);
        expect(res.body[1]).to.have.deep.property('response');
        expect(res.body[1].response).to.deep.equal('12');
        done();
      });
  });
});

describe('editFormResponsesById', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    enableLogging(testApp, 'Test Server');
    enableRoutes(testApp);
    enableErrorHandling(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });

  it('should edit form responses for form id', () => {});
});
