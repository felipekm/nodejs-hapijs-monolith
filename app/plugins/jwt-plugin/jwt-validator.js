
'use strict';

const tokensHelper = require('../../core/helpers/tokens-helper');

exports.check = (token) => {
  return new Promise(async(resolve, reject) => {
    try {

      const tokenResponse = await tokensHelper.get(token);

      return resolve(tokenResponse ? !tokenResponse.blacklisted : false);

    } catch(err) {
      return reject(err);
    }
  });
};

module.exports = exports;