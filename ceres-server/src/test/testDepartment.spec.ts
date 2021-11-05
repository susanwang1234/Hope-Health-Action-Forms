import http from 'http';
import { createServer, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let id = 0;

const departments = ['All Departments', 'Rehab', 'NICUPaeds'];

// Test 1: GET request
describe('testGetDepartmentSuccess', () => {
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
  it('Validate department request properties', (done) => {
    chai
      .request(testApp)
      .get('/department')
      .end((err: any, res: any) => {
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
    chai
      .request(testApp)
      .get('/department')
      .end((err: any, res: any) => {
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
