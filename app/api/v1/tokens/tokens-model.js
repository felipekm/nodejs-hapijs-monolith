'use strict';

// Constants
const COLLECTION_NAME = 'tokens';

exports.getByToken = (token) => {
  return new Promise(async(resolve, reject) => {
    try {

      const query = { token };
      const tokensResponse = await global.db.mongodb.find(COLLECTION_NAME, query);

      return resolve(tokensResponse);

    } catch(err) {
      return reject(err);
    }
  });
};

exports.blacklistToken = (token) => {
  return new Promise(async(resolve, reject) => {
    try {
      const query = {
        clause: { token: token },
        update: { $set: {blacklisted: true}}
      };

      const tokenResponse = await global.db.mongodb.updateByQuery(COLLECTION_NAME, query);

      return resolve(tokenResponse);

    } catch(err) {
      return reject(err);
    }
  });
};

exports.insert = (tokenObj) => {
  return new Promise(async(resolve, reject) => {
    try {

      const tokensResponse = await global.db.mongodb.insert(COLLECTION_NAME, tokenObj);

      return resolve(tokensResponse);

    } catch(err) {
      return reject(err);
    }
  });
};