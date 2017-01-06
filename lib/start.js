'use strict';

const Server = require('./index');
const manifest = require('./config');
const options = {
    relativeTo: process.cwd() + '/lib'
};

Server.init(manifest, options, (err, server) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server running at ${server.info.uri}`);
});
