import http from 'http';
import { createServer, enableErrorHandling, enableLogging, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { imageNegativeOrNanInputError, imageDNEError, imageMimetypeError } from 'shared/errorMessages';
import { attemptAuthentication, setupApp, setupHttpServer, Accounts } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

// Test 1: GET request (Single image)
describe('getImageById', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return error code 400 for image id that is negative or NaN', (done) => {
    agent.get('/image/-1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(imageNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 400 for invalid URL', (done) => {
    agent.get('/image/wow').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(imageNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 404 for image yet to be created', (done) => {
    agent.get('/image/55').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(imageDNEError));
      done();
    });
  });
  it('should get a image by id successfully', (done) => {
    agent.get('/image/1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
});

// Test 2: POST request (Single image)
describe('addImage', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should create image unsuccessfully', (done) => {
    agent
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
