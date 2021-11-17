import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { imageNegativeOrNanInputError, imageDNEError, imageMimetypeError } from 'shared/errorMessages';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Test 1: GET request (Single image)
describe('getImageById', () => {
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
  it('should return error code 400 for image id that is negative or NaN', (done) => {
    chai
      .request(testApp)
      .get('/image/-1')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(imageNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 400 for invalid URL', (done) => {
    chai
      .request(testApp)
      .get('/image/wow')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(imageNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 404 for image yet to be created', (done) => {
    chai
      .request(testApp)
      .get('/image/55')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(imageDNEError));
        done();
      });
  });
  it('should get a image by id successfully', (done) => {
    chai
      .request(testApp)
      .get('/image/1')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

// Test 2: POST request (Single image)
describe('addImage', () => {
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
  it('should create image unsuccessfully', (done) => {
    chai
      .request(testApp)
      .post('/image')
      .set('content-type', 'application/json')
      .send({
        message: 'This should fail'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(imageMimetypeError));
        done();
      });
  });
});
