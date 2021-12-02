import http from 'http';
import { Application } from 'express';
import { emailNegativeOrNanInputError, emailDNEError, pageNotFoundError } from '../shared/errorMessages';
import { attemptAuthentication, setupApp, setupHttpServer, Accounts } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

let emailAddresses = ['chf2@sfu.ca', 'akadiric@sfu.ca'];

// Test 1: GET request
describe('getEmails', () => {
  let id = 0;
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should get all email addresses successfully', (done) => {
    agent.get('/email').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('email');
        expect(item.id).to.deep.equal(++id);
        expect(item.email).to.deep.equal(emailAddresses[id - 1]);
      });
      done();
    });
  });
});

// Test 2: POST request
describe('createEmail', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should not create email successfully', (done) => {
    agent
      .post('/email')
      .set('content-type', 'application/json')
      .send({
        email: 'test@gmail.'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should create email successfully', (done) => {
    agent
      .post('/email')
      .set('content-type', 'application/json')
      .send({
        email: 'test123@gmail.com'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('email');
        expect(res.body[0].id).to.deep.equal(3);
        expect(res.body[0].email).to.deep.equal('test123@gmail.com');
        done();
      });
  });
});

// Test 3: PUT request
describe('editEmailById', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return error code 400 for id that is negative or NaN', (done) => {
    agent
      .put('/email/-1')
      .set('content-type', 'application/json')
      .send({
        email: 'testing222@gmail.com'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(emailNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 400 for invalid URL', (done) => {
    agent
      .put('/email/fdfdfd')
      .set('content-type', 'application/json')
      .send({
        email: 'testing222@gmail.com'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(emailNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 404 for invalid URL', (done) => {
    agent
      .put('/email/')
      .set('content-type', 'application/json')
      .send({
        email: 'testing222@gmail.com'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(pageNotFoundError));
        done();
      });
  });
  it('should return error code 404 for an email yet to be created', (done) => {
    agent
      .put('/email/14')
      .set('content-type', 'application/json')
      .send({
        email: 'testing222@gmail.com'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(emailDNEError));
        done();
      });
  });
  it('should return error code 422 for invalid input', (done) => {
    agent
      .put('/email/1')
      .set('content-type', 'application/json')
      .send({
        email: 'test@gmail.'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(422);
        done();
      });
  });
  it('should edit an email successfully', (done) => {
    agent
      .put('/email/1')
      .set('content-type', 'application/json')
      .send({
        email: 'wowowow@gmail.com'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0]).to.have.deep.property('email');
        expect(res.body[0].id).to.deep.equal(1);
        expect(res.body[0].email).to.deep.equal('wowowow@gmail.com');
        done();
      });
  });
});

// Test 4: DELETE request
describe('deleteEmailById', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return error code 400 for id that is negative or NaN', (done) => {
    agent.delete('/email/-1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(emailNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 400 for invalid URL', (done) => {
    agent.delete('/email/fdfdfd').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(emailNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 404 for invalid URL', (done) => {
    agent.delete('/email/').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(pageNotFoundError));
      done();
    });
  });
  it('should return error code 404 for an email yet to be created', (done) => {
    agent.delete('/email/14').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(emailDNEError));
      done();
    });
  });
  it('should delete an email successfully', (done) => {
    agent.delete('/email/1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(204);
      done();
    });
  });
});
