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

// Test 1: POST request (Single message from a dept)
const createNewMessage = (departmentId: number, message: string, id: number) => {
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
          departmentId: departmentId,
          author: 'admin',
          messageContent: message
        })
        .end((err: any, res: any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0]).to.have.deep.property('id');
          expect(res.body[0].id).to.deep.equal(id);
          expect(res.body[0].id).to.be.a('number');
          expect(res.body[0]).to.have.deep.property('messageContent');
          expect(res.body[0].messageContent).to.deep.equal(message);
          expect(res.body[0].messageContent).to.be.a('string');
          expect(res.body[0]).to.have.deep.property('author');
          expect(res.body[0].author).to.deep.equal('admin');
          expect(res.body[0].author).to.be.a('string');
          expect(res.body[0]).to.have.deep.property('departmentId');
          expect(res.body[0].departmentId).to.deep.equal(departmentId);
          expect(res.body[0].departmentId).to.be.a('number');
          expect(res.body[0]).to.have.deep.property('createdAt');
          done();
        });
    });
  });
};

//Test 2: GET request (Gets all messages from a department)
const getMessage = (url: string, departmentId: number, msgContentArr: Array<String>) => {
  //beforeLastId = id that comes before the last id of the message you posted from the department
  describe('getMessage', () => {
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
      agent.get(url).end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.forEach((item: any) => {
          expect(item).to.be.an('object');
          expect(item).to.have.deep.property('id');
          expect(item.id).to.be.a('number');
          ++messageContentArrayIndex;
          expect(item).to.have.deep.property('messageContent');
          expect(item.messageContent).to.deep.equal(msgContentArr[messageContentArrayIndex - 1]);
          expect(item.messageContent).to.be.a('string');
          expect(item).to.have.deep.property('author');
          expect(item.author).to.deep.equal('admin');
          expect(item.author).to.be.a('string');
          expect(item).to.have.deep.property('departmentId');
          expect(item.departmentId).to.deep.equal(departmentId);
          expect(item.departmentId).to.be.a('number');
          expect(item).to.have.deep.property('createdAt');
        });
        done();
      });
    });
  });
};

//Tests go here
let messageContentArrayDept1 = ['This is my message from dept id 1.', 'This is my message from dept id 1. Hello world. ', 'This is my message from dept id 1. Testing 1 2 3. ', 'Hello world'];
let messageContentArrayDept2 = [
  'Good evening everyone, this is a friendly reminder that tommorow he have our monthly meeting at 6:00 pm. try to be on time before all snacks are gone. looking forward too seeing you all!',
  'We support and stand by @HaitiCancerCenter in their fight aigains cancer! #go_away_cancer',
  'Goodevening all. I just wanted to remind everyone that the deadline for Rehab forms are due tommorow. lets make sure we have them ready. Thanks!',
  'There is no meeting tommorow. It has been cancellled. Sorry for the inconvenience.'
];

createNewMessage(3, messageContentArrayDept1[3], 7);
getMessage('/messages/3', 3, messageContentArrayDept1);

createNewMessage(2, messageContentArrayDept2[3], 8);
getMessage('/messages/2', 2, messageContentArrayDept2);
