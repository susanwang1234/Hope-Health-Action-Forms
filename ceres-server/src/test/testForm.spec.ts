import http from 'http';
import { Application } from 'express';
import { attemptAuthentication, setupApp, setupHttpServer } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

describe('createNewForm', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });

  it('should create a new form successfully', (done) => {
    agent
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
