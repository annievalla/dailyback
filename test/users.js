'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const App = require('../lib');
const Path = require('path');

const lab = exports.lab = Lab.script();
const it = lab.test;
const describe = lab.experiment;
const expect = Code.expect;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;

let server = null;
let testUser = {};

describe('Users', () => {
    beforeEach((done) => {
        App.init(manifest, { relativeTo: process.cwd() + '/lib' }, (err, testServer) => {
            server = testServer;
            done();
        });
    });

    afterEach((done) => {
        server.stop(() => {
            server = null;
            done();
        });
    });

    it('creates a user', { parallel: false }, (done) => {
        const options = {
            method: 'POST',
            url: '/user',
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
            testUser = result.id;

            expect(res.statusCode).to.equal(200);
            expect(result.firstname).to.equal(payload.firstname);
            expect(result.lastname).to.equal(payload.lastname);
            expect(result.falsestuff).to.equal(undefined);
            done();
        });
    });

    it('update a user', { parallel: false }, (done) => {
        const options = {
            method: 'PUT',
            url: `/user/${testUser}`,
            payload: {
                password: "newpasswordtest",
                lastConnection: 1483315900
            }
        };

        server.inject(options, (res) => {
            const payload = options.payload;
            const result = res.result;

            expect(res.statusCode).to.equal(200);
            expect(result.password).to.equal(payload.password);
            expect(result.lastConnection).to.equal(payload.lastConnection);
            expect(result.falsestuff).to.equal(undefined);
            done();
        });
    });

    it('get a user', { parallel: false }, (done) => {
        const options = {
            method: 'GET',
            url: `/user/${testUser}`,
        };

        server.inject(options, (res) => {
            const result = res.result;
            expect(res.statusCode).to.equal(200);
            expect(result.firstname).to.equal("Test");
            expect(result.email).to.equal("test@test.ninja");
            done();
        });
    });

    it('delete a user', { parallel: false }, (done) => {
        const options = {
            method: 'DELETE',
            url: `/user/${testUser}`,
        };

        server.inject(options, (res) => {
            const result = res.result;
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('try to get deleted user', { parallel: false }, (done) => {
        const options = {
            method: 'GET',
            url: `/user/${testUser}`,
        };

        server.inject(options, (res) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});

const API_prefix = {
    routes: {
        prefix: '/api/v1'
    }
};

const manifest = {
    connections: [
        {
            port: 5000
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'hapi-level',
                options: {
                    config: { valueEncoding: 'json' }
                }
            }
        },
        {
            plugin: {
                register: './users',
                options: {}
            }
        }
    ]
};
