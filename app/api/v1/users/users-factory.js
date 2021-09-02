const ObjectId = require('mongodb').ObjectID;
const usersHelper = require('../../../core/helpers/users-helper');

exports.buildFromPayload = (payload) => {
  try {

    const userObj = { ...payload };

    // New accounts
    if (payload.password) {
      const { saltValue, cryptedValue } = usersHelper.encryptPassword(payload.password);

      userObj.salt = saltValue;
      userObj.password = cryptedValue;
      userObj.createDate = new Date();

    }

    userObj.updateDate = new Date();

    return userObj;

  } catch(err) {
    console.error(err);
    throw err;
  }
};

exports.buildDelete = (payload) => {
  try {

    const userObj = {};

    userObj._id = new ObjectId(payload._id);
    userObj.isActive = false;
    userObj.updateDate = new Date();

    return userObj;

  } catch(err) {
    console.error(err);
    throw err;
  }
};

exports.buildByIdQuery = (payload) => {
  const id = payload._id;

  return id ? { _id: new ObjectId(id)} : {};
};
