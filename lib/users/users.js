module.exports = function(Users) {
    const Uuid = require('uuid');
    const _ = require('lodash');

    function getUsers(callback) {
        var users = [];
        Users.createReadStream()
        .on('data', (user) => {
            users.push(user);
        })
        .on('error', (err) => {
            return callback(err, null);
        })
        .on('end', () => {
            return callback(null, users);
        });
    }

    function getUser (userId, callback) {
        return Users.get(userId, callback);
    };

    function createUser(userDetails, callback) {
        const userId = Uuid.v4();
        const user = { id: userId };
        _.reduce(userDetails, (user, value, key) => {
            user[key] = value
            return user;
        }, user);

        Users.put(userId, user, (err) => {
            callback(err, user);
        });
    };

    function getUpdateUserDetails(user, changes, callback) {
        var userUpdated = _.clone(user);
        _.reduce(changes, function(userUpdated, value, key) {
            userUpdated[key] = value;
            return userUpdated;
        }, userUpdated);
        return userUpdated;
    }

    function updateUser(userId, changes, callback) {
        const userDetails = Users.get(userId, (err, user) => {
            if (err) {
                return calback(err);
            }
            var userUpdated = getUpdateUserDetails(user, changes);
            Users.put(userId, userUpdated, (err) => {
                callback(err, userUpdated);
            });
        });
    }

    function deleteUser(userId, callback) {
        return Users.del(userId, callback);
    }

    const public_api = {
        getUsers: getUsers,
        getUser: getUser,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    };

    return public_api;
}
