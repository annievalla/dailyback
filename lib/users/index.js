'use strict';

exports.register = function usersIndex(server, options, next) {
    const Boom = require('boom');
    const Validation = require('./validation');
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
                handler: function handlerGetUsers(request, reply) {
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
                handler: function handlerGetUser(request, reply) {
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
                handler: function handlerCreateUser(request, reply) {
                    Users.createUser(request.payload, (err, user) => {
                        if(err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply(user);
                    });
                },
                validate: {
                    payload: Validation.postValidation
                },
                description: 'Create a user'
            }
        },
        {
            method: 'PUT',
            path: '/user/{userId}',
            config: {
                handler: function handlerUpdateUser(request, reply) {
                    const userId = request.params.userId;
                    const changes = request.payload;
                    Users.updateUser(userId, changes, (err, user) => {
                        if(err) {
                            return reply(Boom.notFound(err));
                        }
                        return reply(user);
                    });
                },
                validate: {
                    payload: Validation.putValidation
                },
                description: 'Update a user'
            }
        },
        {
            method: 'DELETE',
            path: '/user/{userId}',
            config: {
                handler: function handlerDeleteUser(request, reply) {
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
        }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'users'
};
