'use strict';

module.exports = (function usersValidations() {
    const Joi = require('joi');

    const postValidation = {
        firstname: Joi.string().alphanum().min(3).max(30).required(),
        lastname: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        email: Joi.string().email(),
        tasks: Joi.array().items(Joi.string(), Joi.number().positive()),
        current: Joi.array().items(Joi.string(), Joi.number().positive()),
        lastConnection: Joi.number().positive()
    };
    const putValidation = {
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        tasks: Joi.array().items(Joi.string(), Joi.number().positive()),
        current: Joi.array().items(Joi.string(), Joi.number().positive()),
        lastConnection: Joi.number().positive()
    };

    const public_api = {
        putValidation: putValidation,
        postValidation: postValidation
    };

    return public_api;
})();
