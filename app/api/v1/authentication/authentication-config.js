'use strict';

const Joi = require('joi');

const generalTemplate = {
  tags: [ 'v1', 'authentication' ],
  description: 'Authentication routes',
  auth: 'jwt',
  notes: 'API to perform login/logout.'
};

exports.login = {
  ...generalTemplate,
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};

exports.logout = {
  ...generalTemplate
};
