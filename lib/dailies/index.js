exports.register = function (server, options, next) {
  const Data = require('../../data.json');

  function randomIndex(max) {
      return Math.floor((Math.random() * max) + 1);
  }
  
  server.route({
    method: 'GET',
    path: '/daily',
    handler: function (request, reply) {
      var index = randomIndex(5);
      return reply(Data[index]);
    },
    config: {
        cache: {
            expiresAt: '23:59'
        },
        description: 'Retrieve a random daily task'
    },
  });

  next();
};
exports.register.attributes = {
  name: 'daily'
};
