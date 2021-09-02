const cryptoHelper = require('./crypto-helper');
const usersModel = require('../../api/v1/users/users-model');

exports.encryptPassword = (pwd) => {
  const encryptData = cryptoHelper.encrypt(pwd);

  return encryptData;
};

exports.registerLastLogin = (userId) => {
  return new Promise(async(resolve, reject) => {
    try {

      const userData = await usersModel.update(userId, { lastLoginDate: new Date() });

      return resolve(userData);

    } catch(err) {
      return reject(err);
    }
  });
};