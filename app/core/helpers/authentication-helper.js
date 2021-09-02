const Boom = require('boom');
const usersModel = require('../../api/v1/users/users-model');
const tokensHelper = require('./tokens-helper');
const tokensModel = require('../../api/v1/tokens/tokens-model');
const cryptoHelper = require('./crypto-helper');
const tokensFactory = require('../factories/tokens-factory');

exports.generateToken = (userObj, httpRequest) => {
  return new Promise(async (resolve, reject) => {
    try {

      const tokenObj = tokensFactory.build(userObj, httpRequest);

      tokenObj.token = tokensHelper.issueToken(tokenObj);

      await tokensModel.insert(tokenObj);

      return resolve(tokenObj.token);
    } catch (err) {
      return reject(err);
    }
  });
};

exports.authenticate = (email, pwd) => {
  return new Promise(async(resolve, reject) => {
    try {

      const userData = await usersModel.getByEmail(email);

      if (!userData) {
        throw Boom.notFound();
      }

      const { cryptedValue } = cryptoHelper.encrypt(pwd, userData.salt);

      if (cryptedValue === userData.password) {
        return resolve(userData);
      } else {
        throw Boom.unauthorized();
      }

    } catch(err) {
      return reject(err);
    }
  });
};

exports.logout = (token) => {
  return new Promise(async(resolve, reject) => {
    try {

      const tokenResponse = await tokensModel.blacklistToken(token);

      return resolve(tokenResponse);

    } catch(err) {
      return reject(err);
    }
  });
};

module.exports = exports;
