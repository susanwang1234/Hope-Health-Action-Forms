import http from 'http';
import { Application } from 'express';
import { attemptAuthentication, setupApp, setupHttpServer, Accounts } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

let messageContentArray = ['This is my message from dept id 1.', 'This is my message from dept id 1. Hello world. ', 'This is my message from dept id 1. Testing 1 2 3. ', 'Hello world'];

// Test 1: POST request (Single message from dept id 1)
describe('createNewMessage', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });

  after('Close a working server', () => {
    httpServer.close();
  });

  it('should create a new message successfully', (done) => {
    agent
      .post('/messages')
      .set('Content-Type', 'application/json')
      .send({
        departmentId: 1,
        author: 'admin',
        messageContent: messageContentArray[3]
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('id');
        expect(res.body[0].id).to.deep.equal(7);
        expect(res.body[0]).to.have.deep.property('messageContent');
        expect(res.body[0].messageContent).to.deep.equal('Hello world');
        expect(res.body[0]).to.have.deep.property('author');
        expect(res.body[0].author).to.deep.equal('admin');
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0].departmentId).to.deep.equal(1);
        expect(res.body[0]).to.have.deep.property('createdAt');
        done();
      });
  });
});

//Test 2: GET request (Gets all messages from department id 1)
describe('getMessage', () => {
  let testId = 3;
  let messageContentArrayIndex = 0;
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done, Accounts.ADMIN);
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Should get messages successfully', (done) => {
    agent.get('/messages/1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item.id).to.deep.equal(++testId);
        ++messageContentArrayIndex;
        expect(item).to.have.deep.property('messageContent');
        expect(item.messageContent).to.deep.equal(messageContentArray[messageContentArrayIndex - 1]);
        expect(item).to.have.deep.property('author');
        expect(item.author).to.deep.equal('admin');
        expect(item).to.have.deep.property('departmentId');
        expect(item.departmentId).to.deep.equal(1);
        expect(item).to.have.deep.property('createdAt');
      });
      done();
    });
  });
});
