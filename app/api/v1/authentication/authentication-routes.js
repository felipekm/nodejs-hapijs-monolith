'use strict';

const config = require('./authentication-config');
const controller = require('./authentication-controller');

module.exports = [

  {
    path: '/api/v1/login',
    method: 'POST',
    handler: controller.login,
    options: config.login
  },

  {
    path: '/api/v1/logout',
    method: 'GET',
    handler: controller.logout,
    options: config.logout
  }

];
