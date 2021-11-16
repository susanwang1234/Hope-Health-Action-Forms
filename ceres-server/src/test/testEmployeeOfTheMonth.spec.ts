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
