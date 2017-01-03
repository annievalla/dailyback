exports.register = function (server, options, next) {
  const Boom = require('boom');
  let db;
  var Users;

  server.dependency('hapi-level', (server, after) => {
    db = server.plugins['hapi-level'].db.sublevel('users');
    Users = require('./users')(db);
    return after();
  });

  server.route([
    {
      method: 'GET',
      path: '/user',
      config: {
        handler: function (request, reply) {
          Users.getUsers((err, users) => {
            if(err) {
              return reply(Boom.notFound(err));
            }
            return reply(users);
          });
        },
        description: 'Retrieve all users'
      }
    },
    {
      method: 'GET',
      path: '/user/{userId}',
      config: {
        handler: function (request, reply) {
          const userId = request.params.userId;
          Users.getUser(userId, (err, user) => {
            if(err) {
              return reply(Boom.notFound(err));
            }
            return reply(user);
          });
        },
        description: 'Retrieve a user'
      }
    },
    {
      method: 'POST',
      path: '/user',
      config: {
        handler: function (request, reply) {
          var userDetails = request.payload;
          if (typeof userDetails === 'string') {
            userDetails = JSON.parse(request.payload);
          }

          Users.createUser(userDetails, (err, user) => {
            if(err) {
              return reply(Boom.badRequest(err));
            }
            return reply(user);
          });
        },
        description: 'Create a user'
      }
    },
    {
      method: 'DELETE',
      path: '/user/{userId}',
      config: {
        handler: function (request, reply) {
          const userId = request.params.userId;
          Users.deleteUser(userId, (err, user) => {
            if(err) {
              return reply(Boom.notFound(err));
            }
            return reply(user);
          });
        },
        description: 'Delete a user'
      }
    },
    {
      method: 'PUT',
      path: '/user/{userId}',
      config: {
        handler: function (request, reply) {
          const userId = request.params.userId;
          const changes = request.payload;
          Users.updateUser(userId, changes, (err, user) => {
            if(err) {
              return reply(Boom.notFound(err));
            }
            return reply(user);
          });
        },
        description: 'Update a user'
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  name: 'users'
};
