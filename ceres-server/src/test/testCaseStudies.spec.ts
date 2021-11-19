import http from 'http';
import { Application } from 'express';
import {
  caseStudyNegativeOrNanInputError,
  caseStudyDNEError,
  caseStudyQuestionsNegativeOrNanInputError,
  caseStudyQuestionsDNEError,
  caseStudyResponsesNegativeOrNanInputError
} from 'shared/errorMessages';
import { attemptAuthentication, setupApp, setupHttpServer } from './testTools/mochaHooks';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let testApp: Application;
let httpServer: http.Server;
let agent: any;

// Test 1: GET request (List of case studies)
describe('getCaseStudies', () => {
  let id = 0;
  const title = ['Case Study Dummy 1', 'Case Study Dummy 2'];
  const response = ['Joe Doe is a 69 year old Canadian man who was stuck at the HCBH for 30 days...', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should get all case studies successfully', (done) => {
    agent.get('/case-studies').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('caseStudyTypeId');
        expect(item).to.have.deep.property('departmentId');
        expect(item).to.have.deep.property('userId');
        expect(item).to.have.deep.property('title');
        expect(item).to.have.deep.property('createdAt');
        expect(item).to.have.deep.property('response');
      });
      res.body.forEach((item: any) => {
        expect(item.id).to.deep.equal(++id);
        expect(item.caseStudyTypeId).to.deep.equal(id);
        expect(item.departmentId).to.deep.equal(id);
        expect(item.userId).to.deep.equal(id);
        expect(item.title).to.deep.equal(title[id - 1]);
        expect(item.response).to.deep.equal(response[id - 1]);
      });
      done();
    });
  });
});

// Test 2: GET request (Single case study)
describe('getCaseStudyById', () => {
  let count = 0;
  const label = [
    'Staff name?',
    'Role/Job Title?',
    'What department does this staff member work in?',
    'How long have they been working at HCBH?',
    'What do they enjoy most about working at HCBH?',
    'Story'
  ];
  const response = ['Name is staff01', 'Nurse', 'Rehab', 'Long enough', 'I like to help people', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return error code 400 for case study id that is negative or NaN', (done) => {
    agent.get('/case-studies/-1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(caseStudyNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 400 for invalid URL', (done) => {
    agent.get('/case-studies/wow').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(caseStudyNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 404 for case study id yet to be created', (done) => {
    agent.get('/case-studies/55').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(caseStudyDNEError));
      done();
    });
  });
  it('should get a case study by case study id successfully', (done) => {
    agent.get('/case-studies/2').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('title');
        expect(item).to.have.deep.property('name');
        expect(item).to.have.deep.property('createdAt');
        expect(item).to.have.deep.property('label');
        expect(item).to.have.deep.property('response');
      });
      res.body.forEach((item: any) => {
        expect(item.title).to.deep.equal('Case Study Dummy 2');
        expect(item.name).to.deep.equal('Staff Recognition');
        expect(item.label).to.deep.equal(label[count]);
        expect(item.response).to.deep.equal(response[count++]);
      });
      done();
    });
  });
});

// Test 3: GET request (List of case study types)
describe('getCaseStudyTypes', () => {
  let id = 0;
  const caseStudyTypes = ['Patient Story', 'Staff Recognition', 'Training Session', 'Equipment Received', 'Other Story'];
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should get all case study types successfully', (done) => {
    agent.get('/case-study-types').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('id');
        expect(item).to.have.deep.property('name');
      });
      res.body.forEach((item: any) => {
        expect(item.id).to.deep.equal(++id);
        expect(item.name).to.deep.equal(caseStudyTypes[id - 1]);
      });
      done();
    });
  });
});

// Test 4: GET request (List of case study questions)
describe('testGetCaseStudyQuestionsFailure', () => {
  const label = ['Training date?', 'What was the training on?', 'Who conducted the training?', 'Who attended the training?', 'How will the training benefit HCBH and its staff?', 'Story'];
  const caseStudyQuestionId = [13, 14, 15, 16, 17, 7];
  const inputType = ['text', 'text', 'text', 'text', 'text', 'textarea'];
  let id = 13;
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return error code 400 for case study questions id that is negative or NaN', (done) => {
    agent.get('/case-study-questions/-1').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(caseStudyQuestionsNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 400 for invalid URL', (done) => {
    agent.get('/case-study-questions/wow').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.text).to.deep.equal(JSON.stringify(caseStudyQuestionsNegativeOrNanInputError));
      done();
    });
  });
  it('should return error code 404 for case study questions id yet to be created', (done) => {
    agent.get('/case-study-questions/6').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.deep.equal(JSON.stringify(caseStudyQuestionsDNEError));
      done();
    });
  });
  it('should get case study questions by case study questions id successfully', (done) => {
    agent.get('/case-study-questions/3').end((err: any, res: any) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((item: any) => {
        expect(item).to.be.an('object');
        expect(item).to.have.deep.property('name');
        expect(item).to.have.deep.property('caseStudyTypeQuestionId');
        expect(item).to.have.deep.property('caseStudyTypeId');
        expect(item).to.have.deep.property('caseStudyQuestionId');
        expect(item).to.have.deep.property('label');
        expect(item).to.have.deep.property('inputType');
        expect(item).to.have.deep.property('responseType');
      });
      res.body.forEach((item: any) => {
        expect(item.name).to.deep.equal('Training Session');
        expect(item.caseStudyTypeQuestionId).to.deep.equal(++id);
        expect(item.caseStudyTypeId).to.deep.equal(3);
        expect(item.caseStudyQuestionId).to.deep.equal(caseStudyQuestionId[id - 14]);
        expect(item.label).to.deep.equal(label[id - 14]);
        expect(item.inputType).to.deep.equal(inputType[id - 14]);
        expect(item.responseType).to.deep.equal('string');
      });
      done();
    });
  });
});

// Test 5: POST request (Single case study)
describe('addCaseStudy', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should create case study successfully', (done) => {
    agent
      .post('/case-studies')
      .set('content-type', 'application/json')
      .send({
        caseStudyTypeId: 5,
        departmentId: 1,
        userId: 1,
        title: 'Case Study Dummy 3'
      })
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('caseStudyTypeId');
        expect(res.body[0]).to.have.deep.property('departmentId');
        expect(res.body[0]).to.have.deep.property('userId');
        expect(res.body[0]).to.have.deep.property('title');
        expect(res.body[0].caseStudyTypeId).to.deep.equal(5);
        expect(res.body[0].departmentId).to.deep.equal(1);
        expect(res.body[0].userId).to.deep.equal(1);
        expect(res.body[0].title).to.deep.equal('Case Study Dummy 3');
        done();
      });
  });
});

// Test 6: POST request (Single case study response)
describe('addCaseStudyResponsesByCaseStudyId', () => {
  before('Create a working server', (done) => {
    testApp = setupApp();
    httpServer = setupHttpServer(testApp);
    agent = chai.request.agent(testApp);

    attemptAuthentication(agent, done);
  });

  after('Close a working server', () => {
    httpServer.close();
  });
  it('should return error code 400 for case study id that is negative or NaN', (done) => {
    agent
      .post('/case-study-responses/-1')
      .set('content-type', 'application/json')
      .send([{ caseStudyTypeQuestionId: 26, response: 'This is a fascinating story for insert other type of case studies' }])
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyResponsesNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 400 for invalid URL', (done) => {
    agent
      .post('/case-study-responses/fdfsdf')
      .set('content-type', 'application/json')
      .send([{ caseStudyTypeQuestionId: 26, response: 'This is a fascinating story for insert other type of case studies' }])
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyResponsesNegativeOrNanInputError));
        done();
      });
  });
  it('should return error code 500 for case study id yet to be created', (done) => {
    agent
      .post('/case-study-responses/55')
      .set('content-type', 'application/json')
      .send([{ caseStudyTypeQuestionId: 26, response: 'This is a fascinating story for insert other type of case studies' }])
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        done();
      });
  });
  it('should create case study response successfully', (done) => {
    agent
      .post('/case-study-responses/3')
      .set('content-type', 'application/json')
      .send([{ caseStudyTypeQuestionId: 26, response: 'This is a fascinating story for insert other type of case studies' }])
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.deep.property('caseStudyTypeQuestionId');
        expect(res.body[0]).to.have.deep.property('caseStudyId');
        expect(res.body[0]).to.have.deep.property('response');
        expect(res.body[0].caseStudyTypeQuestionId).to.deep.equal(26);
        expect(res.body[0].caseStudyId).to.deep.equal(3);
        expect(res.body[0].response).to.deep.equal('This is a fascinating story for insert other type of case studies');
        done();
      });
  });
});
