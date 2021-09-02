'use strict';

const ObjectId = require('mongodb').ObjectID;
const COLLECTION_NAME = 'users';

exports.insert = (userObj) => {
  return new Promise(async(resolve, reject) => {
    try {

      const usersResponse =  await global.db.mongodb.insert(COLLECTION_NAME, userObj);

      return resolve(usersResponse);

    } catch(err) {
      return reject(err);
    }
  });
};

exports.update = (userObj) => {
  return new Promise(async(resolve, reject) => {
    try {

      const query = {
        clause: { _id: new ObjectId(userObj._id) },
        update: { $set: userObj }
      };

      delete userObj._id;

      const usersResponse = await global.db.mongodb.updateByQuery(COLLECTION_NAME, query);

      return resolve(usersResponse);

    } catch(err) {
      return reject(err);
    }
  });
};

exports.delete = (userObj) => {
  return new Promise(async(resolve, reject) => {
    try {

      const userId = userObj._id;

      delete userObj._id;

      const usersResponse = await global.db.mongodb.delete(COLLECTION_NAME, userId, userObj);

      return resolve(usersResponse);

    } catch(err) {
      return reject(err);
    }
  });
};

exports.getByEmail = email => {
  return new Promise(async (resolve, reject) => {
    try {

      const query = { email };
      const userData = await global.db.mongodb.find(COLLECTION_NAME, query);

      return resolve(userData);

    } catch (err) {
      return reject(err);
    }
  });
};

exports.getById = (query, projection) => {
  return new Promise(async (resolve, reject) => {
    try {

      const usersList = await global.db.mongodb.find(COLLECTION_NAME, query, null, null, null, projection);

      return resolve(usersList);

    } catch (err) {
      return reject(err);
    }
  });
};
