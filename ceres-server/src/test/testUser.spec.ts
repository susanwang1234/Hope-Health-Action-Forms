'use strict';

import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { userDNEError, userNegativeOrNanInputError, pageNotFoundError } from '../shared/errorMessages';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let usernames = ['admin', 'staff01'];
let passwords = ['$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm', '$2a$12$Es2.DjFL5jKSukJjgXOubuP..MipNRcqM5KfzL49bdymFqAkB62r2'];
let departmentIds = [1, 2];
let roleIds = [1, 4];

const validateUserPropertiesAndFields = (testTitle: string, propertiesTitle: string, fieldsTitle: string) => {
  describe(testTitle, () => {
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
    it(propertiesTitle, (done) => {
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
    it(fieldsTitle, (done) => {
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
};

// Test 1: GET request
validateUserPropertiesAndFields('testGetUserSuccess', 'Validate user request properties', 'Validate user request fields');

// Test 2: POST request
describe('testPostUserSuccess', () => {
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
  it('Validate created user properties and fields', (done) => {
    chai
      .request(testApp)
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        username: 'departmentHead',
        password: '$2a$12$7bWbFzy6wdFRCG3JVp8JFe7PZTJ/X6FjwpY/769gMEVgbc9vvnggu',
        departmentId: 3,
        roleId: 3
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('username');
        expect(res.body[0]).to.have.deep.property('password');
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0]).to.have.deep.property('roleId');
        expect(res.body[0].username).to.deep.equal('departmentHead');
        expect(res.body[0].password).to.deep.equal('$2a$12$7bWbFzy6wdFRCG3JVp8JFe7PZTJ/X6FjwpY/769gMEVgbc9vvnggu');
        expect(res.body[0].departmentId).to.deep.equal(3);
        expect(res.body[0].roleId).to.deep.equal(3);
        done();
      });
  });
});

// Test 3: PUT request (Failure)
describe('testEditUserFailure', () => {
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
  it('Throw error code 404 for user with a negative number', (done) => {
    chai
      .request(testApp)
      .put('/user/-1')
      .set('content-type', 'application/json')
      .send({
        username: 'hospitalAdmin',
        password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm',
        departmentId: 1,
        roleId: 2
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(userNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 404 for invalid URL', (done) => {
    chai
      .request(testApp)
      .put('/user/')
      .set('content-type', 'application/json')
      .send({
        username: 'hospitalAdmin',
        password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm',
        departmentId: 1,
        roleId: 2
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(pageNotFoundError));
        done();
      });
  });
  it('Throw error code 404 for user yet to be created', (done) => {
    chai
      .request(testApp)
      .put('/user/14')
      .set('content-type', 'application/json')
      .send({
        username: 'hospitalAdmin',
        password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm',
        departmentId: 1,
        roleId: 2
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(userDNEError));
        done();
      });
  });
});

// Test 4: PUT request (Success)
describe('testEditUserSuccess', () => {
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
  it('Validate edited user properties and fields', (done) => {
    chai
      .request(testApp)
      .put('/user/3')
      .set('content-type', 'application/json')
      .send({
        username: 'hospitalAdmin',
        password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm',
        departmentId: 1,
        roleId: 2
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('username');
        expect(res.body[0]).to.have.deep.property('password');
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0]).to.have.deep.property('roleId');
        expect(res.body[0].username).to.deep.equal('hospitalAdmin');
        expect(res.body[0].password).to.deep.equal('$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm');
        expect(res.body[0].departmentId).to.deep.equal(1);
        expect(res.body[0].roleId).to.deep.equal(2);
        done();
      });
    usernames[2] = 'hospitalAdmin';
    passwords[2] = '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm';
    departmentIds[2] = 1;
    roleIds[2] = 2;
  });
});

// Test 5: DELETE request (Single user, Failure)
describe('testDeleteUserFailure', () => {
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
  it('Throw error code 404 for user with a negative number', (done) => {
    chai
      .request(testApp)
      .delete('/user/-1')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(userNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 404 for user yet to be created', (done) => {
    chai
      .request(testApp)
      .delete('/user/14')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(userDNEError));
        done();
      });
  });
});

// Test 6: DELETE request (Single user, Success)
describe('testDeleteUserSuccess', () => {
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
  it('Validate error code for deleted user', (done) => {
    chai
      .request(testApp)
      .delete('/user/3')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
      });
  });
});

validateUserPropertiesAndFields('testValidateDeleteUserSuccess', 'Validate there are 2 rows of properties', 'Validate there are 2 rows of fields');

// // Test 7: DELETE request (All users, Success)
// describe('testDeleteUsersSuccess', () => {
//   let testApp: Application;
//   let httpServer: http.Server;
//   before('Create a working server', () => {
//     testApp = createServer();
//     sendFirstRequest(testApp);
//     enableLogging(testApp, 'Test Server');
//     enableRoutes(testApp);
//     enableErrorHandling(testApp);
//     httpServer = http.createServer(testApp);
//     httpServer.listen(PORT);
//   });
//   after('Close a working server', () => {
//     httpServer.close();
//   });
//   it('Validate error code for deleted user', (done) => {
//     chai
//       .request(testApp)
//       .delete('/user')
//       .end((err: any, res: any) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(204);
//         done();
//       });
//   });
//   it('Validate there are no users left', (done) => {
//     chai
//       .request(testApp)
//       .get('/user')
//       .end((err: any, res: any) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('array').with.lengthOf(0);
//         done();
//       });
//   });
// });
