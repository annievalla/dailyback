'use strict';

const Glue = require('glue');
const Manifest = require('./lib');

Glue.compose(Manifest, { relativeTo: process.cwd() + '/lib' }, (err, server) => {

  server.start((err) => {

    if (err) {
      return console.log(err);
    }
    console.log(`Server running at ${server.info.uri}`);
  });
});
