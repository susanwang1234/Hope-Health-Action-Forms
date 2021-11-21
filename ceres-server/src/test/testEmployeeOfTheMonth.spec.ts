import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { employeeOfTheMonthNegativeOrNanInputError, employeeOfTheMonthDNEError } from 'shared/errorMessages';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Test 1: GET request (Single employee of the month)
describe('getEmployeeOfTheMonth', () => {
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
  it('should get the employee of the month successfully', (done) => {
    chai
      .request(testApp)
      .get('/employee-of-the-month')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('imageId');
        expect(res.body[0]).to.have.deep.property('name');
        expect(res.body[0]).to.have.deep.property('department');
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0]).to.have.deep.property('description');
        expect(res.body[0].id).to.deep.equal(1);
        expect(res.body[0].imageId).to.deep.equal(1);
        expect(res.body[0].name).to.deep.equal('Zack Cody');
        expect(res.body[0].department).to.deep.equal('Maternity');
        expect(res.body[0].departmentId).to.deep.equal(4);
        expect(res.body[0].description).to.deep.equal(
          'Zack works in the maternity department at Hope Health Action delivering children. He is so good at delivering children he delivered 300 children this month ALONE. This is why he is employee of the month. Go Zack!'
        );
        done();
      });
  });
});

// Test 2: PUT request (Single employee of the month)
describe('editEmployeeOfTheMonthById', () => {
  let testApp: Application;
  let httpServer: http.Server;
  const resBody = {
    imageId: 2,
    name: 'Jenny Jennings',
    department: 'Community Health',
    departmentId: 5,
    description: 'Jenny Jennings did a fantastic job this month!'
  };
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
  it('should return error code 400 for id that is negative or NaN', (done) => {
    chai
      .request(testApp)
      .put('/employee-of-the-month/-1')
      .set('content-type', 'application/json')
      .send(resBody)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(employeeOfTheMonthNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 400 for invalid URL', (done) => {
    chai
      .request(testApp)
      .put('/employee-of-the-month/fdfsdf')
      .set('content-type', 'application/json')
      .send(resBody)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(employeeOfTheMonthNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 404 for an employee of the month yet to be created', (done) => {
    chai
      .request(testApp)
      .put('/employee-of-the-month/55')
      .set('content-type', 'application/json')
      .send(resBody)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(employeeOfTheMonthDNEError));
        done();
      });
  });
  it('should edit the employee of the month successfully', (done) => {
    chai
      .request(testApp)
      .put('/employee-of-the-month/1')
      .set('content-type', 'application/json')
      .send(resBody)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('imageId');
        expect(res.body[0]).to.have.deep.property('name');
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0]).to.have.deep.property('description');
        expect(res.body[0].id).to.deep.equal(1);
        expect(res.body[0].imageId).to.deep.equal(2);
        expect(res.body[0].name).to.deep.equal('Jenny Jennings');
        expect(res.body[0].departmentId).to.deep.equal(5);
        expect(res.body[0].description).to.deep.equal('Jenny Jennings did a fantastic job this month!');
        done();
      });
  });
});
