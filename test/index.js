'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const App = require('../lib');
const Path = require('path');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe('Server', () => {
    it('starts server and returns hapi server object', (done) => {
        const manifest = {};
        const options = {};

        App.init(manifest, options, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server on provided port', (done) => {
        const manifest = {
            connections: [
                {
                    port: 5000
                }
            ]
        };
        const options = {};

        App.init(manifest, options, (err, server) => {
            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);
            server.stop(done);
        });
    });
});
