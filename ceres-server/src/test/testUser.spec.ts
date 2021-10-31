import http from 'http';
import { createServer, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let id = 0;

const usernames = ['admin', 'staff01'];
const passwords = ['$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm', '$2a$12$Es2.DjFL5jKSukJjgXOubuP..MipNRcqM5KfzL49bdymFqAkB62r2'];
const departmentIds = [1, 2];
const roleIds = [1, 4];

// Test 1: GET request
describe('testGetUserSuccess', () => {
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
  it('Validate user request properties', (done) => {
    chai
      .request(testApp)
      .get('/user')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((item: any) => {
          expect(item).to.be.an('object');
          expect(item).to.have.deep.property('id');
          expect(item).to.have.deep.property('username');
          expect(item).to.have.deep.property('password');
          expect(item).to.have.deep.property('departmentId');
          expect(item).to.have.deep.property('roleId');
        });
        done();
      });
  });
  it('Validate user request fields', (done) => {
    chai
      .request(testApp)
      .get('/user')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.forEach((item: any) => {
          expect(item.id).to.deep.equal(++id);
          expect(item.username).to.deep.equal(usernames[id - 1]);
          expect(item.password).to.deep.equal(passwords[id - 1]);
          expect(item.departmentId).to.deep.equal(departmentIds[id - 1]);
          expect(item.roleId).to.deep.equal(roleIds[id - 1]);
        });
        done();
      });
  });
});
