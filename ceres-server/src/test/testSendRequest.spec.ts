import http from 'http';
import { createServer, sendFirstRequest } from '../server';
import { Application, Request, Response, NextFunction } from 'express';
import PORT from './testConfig/testPort';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Body of dummy request
const result = {
  message: 'Send Request',
  value: 66,
  arr: [1, 2, 3, 4, 5],
  dummyJson: {
    id: 22,
    name: 'Dummy'
  }
};

// Test 1: Send a request with non-json body
describe('testSendNonJsonRequestSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate request property', (done) => {
    chai
      .request(testApp)
      .get('/')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.be.a('string');
        expect(res.text).to.deep.equal('Welcome to Team Ceres');
        done();
      });
  });
});

// Test 2: Send a request with json body
describe('testSendJsonRequestSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    testApp.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send(result);
    });
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT);
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Validate dummy request properties', (done) => {
    chai
      .request(testApp)
      .get('/')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.deep.property('message');
        expect(res.body).to.have.deep.property('value');
        expect(res.body.value).to.be.a('number');
        expect(res.body).to.have.deep.property('arr');
        expect(res.body).to.have.deep.property('dummyJson');
        expect(res.body.dummyJson).to.have.deep.property('id');
        expect(res.body.dummyJson).to.have.deep.property('name');
        done();
      });
  });
  it('Validate dummy request fields', (done) => {
    chai
      .request(testApp)
      .get('/')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep.equal('Send Request');
        expect(res.body.value).to.deep.equal(66);
        expect(res.body.arr).to.be.an('array').with.lengthOf(5);
        expect(res.body.arr).to.be.an('array').that.does.not.include(6);
        expect(res.body.arr).to.be.an('array').that.does.include(5);
        expect(res.body.arr).to.deep.include(5);
        expect(res.body.arr).to.have.ordered.members([1, 2, 3, 4, 5]).but.not.have.ordered.members([3, 1]);
        expect(res.body.dummyJson.id).to.be.a('number');
        expect(res.body.dummyJson.id).to.deep.equal(22);
        expect(res.body.dummyJson.name).to.be.string;
        expect(res.body.dummyJson.name).to.deep.equal('Dummy');
        done();
      });
  });
});
