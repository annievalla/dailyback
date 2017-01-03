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
      plugin: {
        register: './users',
        options: {}
      },
      options: API_prefix
    },
    {
      plugin: {
        register: './dailies',
        options: {}
      },
      options: API_prefix
    },
    {
      plugin: {
        register: 'blipp',
        options: {}
      }
    }
  ]
};

module.exports = manifest;
