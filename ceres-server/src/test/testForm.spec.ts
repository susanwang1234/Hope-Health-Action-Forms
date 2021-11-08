import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('createNewForm', () => {
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

  it('should create a new form successfully', (done) => {
    chai
      .request(testApp)
      .post('/form')
      .set('Content-Type', 'application/json')
      .send({
        departmentId: 1
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0].id).to.deep.equal(1);
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0].departmentId).to.deep.equal(1);
        expect(res.body[0]).to.have.deep.property('createdAt');
        done();
      });
  });
});
