'use strict';

const Code = require('code');
const Lab = require('lab');

const Glue = require('glue');
const manifest = require('../lib');

const lab = exports.lab = Lab.script();
const it = lab.test;
const describe = lab.experiment;
const expect = Code.expect;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;

const levelPath = './.temp';

let server = null

beforeEach((done) => {

  Glue.compose(manifest, { relativeTo: process.cwd() + '/lib' }, (err, testServer) => {

    server = testServer
    done()
  })
})

afterEach((done) => {

  server.stop(() => {

    server = null
    done()
  })
})

describe('Users', () => {
  it('creates a user', { parallel: false }, (done) => {
        const options = {
          method: 'POST',
          url: '/api/v1/user',
          payload: {
            firstname: "Test",
            lastname: "Test",
            email: "test@test.ninja",
            password: "testpasswordyolo",
            taks: [],
            current: [],
            lastConnection: 1483315200
          }
        };

        server.inject(options, (res) => {
          const payload = options.payload;
          const result = res.result;

          expect(res.statusCode).to.equal(200);
          expect(result.firstname).to.equal(payload.firstname);
          expect(result.lastname).to.equal(payload.lastname);
          done()
        });
  });
});
