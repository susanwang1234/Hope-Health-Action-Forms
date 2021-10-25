import request from 'supertest';
import http from 'http';
import { createServer, sendFirstRequest } from '../server';

// Test 1: Create a non-working server
describe('testCreateServerFailure', () => {
  const test1 = createServer();
  it('Server is unsuccessfully instantiated', function (done) {
    request(test1).get('/').expect(404, done);
  });
});

// Test 2: Create a working server
describe('testCreateServerSuccess', () => {
  const test2 = createServer();
  sendFirstRequest(test2);
  const httpServertest2 = http.createServer(test2);
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;
  before('Create a working server', () => {
    httpServertest2.listen(port, () => {
      console.log('server running on port ${port}');
    });
  });
  after('Close a working server', () => {
    httpServertest2.close();
  });
  it('Server is successfully instantiated', (done) => {
    request(httpServertest2).get('/').expect(200, done);
  });
});
