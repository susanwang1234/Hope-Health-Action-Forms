import http from 'http';
import { createServer, enableRoutes, sendFirstRequest } from '../server';
import { Application } from 'express';
import PORT from './testTools/serverPort';
import { caseStudyNegativeOrNanInputError, caseStudyDNEError, caseStudyQuestionsNegativeOrNanInputError, caseStudyQuestionsDNEError } from 'shared/errorMessages';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Test 1: GET request (List of case studies)
describe('testGetCaseStudiesSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let id = 0;
  const title = ['Case Study Dummy 1', 'Case Study Dummy 2'];
  const response = ['Joe Doe is a 69 year old Canadian man who was stuck at the HCBH for 30 days...', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];
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
  it('Validate case studies request properties', (done) => {
    chai
      .request(testApp)
      .get('/case-studies')
      .end((err: any, res: any) => {
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
        done();
      });
  });
  it('Validate case studies request fields', (done) => {
    chai
      .request(testApp)
      .get('/case-studies')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
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

// Test 2: GET request (Failure, single case study)
describe('testGetCaseStudyFailure', () => {
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
  it('Throw error code 400 for user with a negative number', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/-1')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 400 for invalid URL', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/wow')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 404 for case study yet to be created', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/55')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyDNEError));
        done();
      });
  });
});

// Test 3: GET request (Success, single case study)
describe('testGetCaseStudySuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let count = 0;
  const label = [
    'Staff name',
    'Role/Job Title',
    'What department does this staff member work in?',
    'How long have they been working at HCBH?',
    'What do they enjoy most about working at HCBH',
    'Story'
  ];
  const response = ['Name is staff01', 'Nurse', 'Rehab', 'Long enough', 'I like to help people', 'Staff01 is a nurse from the Rehab Department. She has been working there for long enough'];
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
  it('Validate the case study request properties', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/2')
      .end((err: any, res: any) => {
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
        done();
      });
  });
  it('Validate the case study request fields', (done) => {
    chai
      .request(testApp)
      .get('/case-studies/2')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
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

// Test 4: GET request (List of case study types)
describe('testGetCaseStudyTypesSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  let id = 0;
  const caseStudyTypes = ['Patient Story', 'Staff Recognition', 'Training Session', 'Equipment Received', 'Other Story'];
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
  it('Validate case study types request properties', (done) => {
    chai
      .request(testApp)
      .get('/case-study-types')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((item: any) => {
          expect(item).to.be.an('object');
          expect(item).to.have.deep.property('id');
          expect(item).to.have.deep.property('name');
        });
        done();
      });
  });
  it('Validate case study types request fields', (done) => {
    chai
      .request(testApp)
      .get('/case-study-types')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.body.forEach((item: any) => {
          expect(item.id).to.deep.equal(++id);
          expect(item.name).to.deep.equal(caseStudyTypes[id - 1]);
        });
        done();
      });
  });
});

// Test 5: GET request (Failure, List of case study questions)
describe('testGetCaseStudyQuestionsFailure', () => {
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
  it('Throw error code 400 for user with a negative number', (done) => {
    chai
      .request(testApp)
      .get('/case-study-questions/-1')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyQuestionsNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 400 for invalid URL', (done) => {
    chai
      .request(testApp)
      .get('/case-study-questions/wow')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyQuestionsNegativeOrNanInputError));
        done();
      });
  });
  it('Throw error code 404 for case study questions yet to be created', (done) => {
    chai
      .request(testApp)
      .get('/case-study-questions/6')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.text).to.deep.equal(JSON.stringify(caseStudyQuestionsDNEError));
        done();
      });
  });
});

// Test 6: GET request (Success, List of case study questions)
describe('testGetCaseStudyQuestionsSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  const label = ['Training date?', 'What was the training on?', 'Who conducted the training?', 'Who attended the training?', 'How will the training benefit HCBH and its staff?', 'Story'];
  const caseStudyQuestionId = [13, 14, 15, 16, 17, 7];
  const inputType = ['text', 'text', 'text', 'text', 'text', 'textarea'];
  let id = 13;
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
  it('Validate the case study questions request properties', (done) => {
    chai
      .request(testApp)
      .get('/case-study-questions/3')
      .end((err: any, res: any) => {
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
        done();
      });
  });
  it('Validate the case study questions request fields', (done) => {
    chai
      .request(testApp)
      .get('/case-study-questions/3')
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
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
