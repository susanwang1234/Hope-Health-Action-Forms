import request from 'supertest';
import http from 'http';
import { createServer, linkRoutes, sendFirstRequest } from '../server';

// Test 1: Create a working server
const test1 = createServer();
sendFirstRequest(test1);
linkRoutes(test1);
const httpServerTest1 = http.createServer(test1);
const port: number = parseInt(<string>process.env.PORT, 10) || 4000;
httpServerTest1.listen(port, () => {
  console.log('server running on port ${port}');
});

// Test 2: Create a non-working server
const test2 = createServer();

describe('testCreateServerSuccess', function () {
  it('Server is successfully instantiated', function (done) {
    request(test1).get('/').expect(200, done);
  });
});

describe('testCreateServerFailure', function () {
  it('Server is unsuccessfully instantiated', function (done) {
    request(test2).get('/').expect(404, done);
  });
});
