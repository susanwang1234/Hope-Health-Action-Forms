import request from 'supertest';
import http from 'http';
import { createServer, sendFirstRequest } from '../server';
import { Application } from 'express';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Define Test Server Port
const PORT: number = parseInt(<string>process.env.PORT, 10) || 4000;

// Test 1: Create a non-working server
describe('testCreateServerFailure', () => {
  let testApp: Application;
  before('Create a working server', () => {
    testApp = createServer();
  });
  it('Server is unsuccessfully instantiated', (done) => {
    request(testApp).get('/').expect(404, done);
  });
});

// Test 2: Create a working server
describe('testCreateServerSuccess', () => {
  let testApp: Application;
  let httpServer: http.Server;
  before('Create a working server', () => {
    testApp = createServer();
    sendFirstRequest(testApp);
    httpServer = http.createServer(testApp);
    httpServer.listen(PORT, () => {
      console.log('server running on port ${PORT}');
    });
  });
  after('Close a working server', () => {
    httpServer.close();
  });
  it('Server is successfully instantiated', (done) => {
    request(httpServer).get('/').expect(200, done);
  });
});
