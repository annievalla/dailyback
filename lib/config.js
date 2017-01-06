'use strict';

const API_prefix = {
    routes: {
        prefix: '/api/v1'
    }
};

const manifest = {
    server: {},
    connections: [
        { port: 1337, host: '127.0.0.1', routes: { cors: true } }
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
            plugin: './users',
            options: API_prefix
        },
        {
            plugin: './dailies',
            options: API_prefix
        },
        {
            plugin: 'blipp'
        }
    ]
};

module.exports = manifest;
