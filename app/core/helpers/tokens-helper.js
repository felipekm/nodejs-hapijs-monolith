'use strict';

const jwt = require('jsonwebtoken');
const tokensModel = require('../../api/v1/tokens/tokens-model');

exports.get = (token) => {
  return new Promise(async(resolve, reject) => {
    try {
      const query = { token };
      const tokenResponse = await tokensModel.getByToken(query);

      return resolve(tokenResponse);
    } catch(err) {
      console.error(err);
      return reject(err);
    }
  });
};

module.exports.issueToken = (payload) => {

  const options = global.config.security,

    token = jwt.sign(payload,

      /* string or buffer containing either the secret for HMAC algorithms,
      or the PEM encoded private key for RSA and ECDSA*/
      options.token.secret,

      /* options:
        * algorithm (default: HS256)
        * expiresInMinutes or expiresInSeconds
        * audience
        * subject
        * issuer
        * noTimestamp
        * headers*/
      {
        algorithm: options.token.algorithm,
        expiresIn: options.token.expiration * 60
      }
    );

  return token;
};

module.exports.decodeToken = (token) => {
  return jwt.decode(token);
};
