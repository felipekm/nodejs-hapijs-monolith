'use strict';

const jwt = require('hapi-auth-jwt2');
const validator = require('./jwt-validator');

async function validate (decoded, request) {
  try {
    const token = request.headers.authorization;
    const validation = await validator.check(token);

    return { isValid: true, credentials: validation };
  } catch(err) {
    throw err;
  }
}

const jwtPlugin = {

  register: async (server, options) => {
    try {

      const jwtStrategy = {
        key: options.secret,
        name: 'jwt',
        validate: validate,
        verifyOptions: {
          algorithms: [ options.algorithm ]
        }
      };

      await server.register(jwt);

      server.auth.strategy('jwt', 'jwt', jwtStrategy);
      server.auth.default({
        mode: 'try',
        strategy: 'jwt'
      });

    } catch(err) {
      throw err;
    }
  },

  options: global.config.security.token,
  pkg: require('./jwt-package.json')

};

module.exports = jwtPlugin;
