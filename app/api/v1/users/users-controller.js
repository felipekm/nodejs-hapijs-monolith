const Boom = require('boom');
const usersModel = require('./users-model');
const usersFactory = require('./users-factory');

exports.post = async (request, h) => {
  try {

    const newUserObj = usersFactory.buildFromPayload(request.payload);
    const usersResponse = await usersModel.insert(newUserObj);

    return h.response(usersResponse);

  } catch(err) {
    console.error(err);
    return h.response(Boom.wrap(err));
  }
};

exports.get = async (request, h) => {
  try {

    const userQuery = usersFactory.buildByIdQuery(request.params);
    const usersResponse = await usersModel.getById(userQuery);

    return h.response(usersResponse);

  } catch(err) {
    console.error(err);
    return h.response(Boom.wrap(err));
  }
};

exports.put = async (request, h) => {
  try {

    const updatedUserObj = usersFactory.buildFromPayload(request.payload);
    const usersResponse = await usersModel.update(updatedUserObj);

    return h.response(usersResponse);

  } catch(err) {
    console.error(err);
    return h.response(err);
  }
};

exports.delete = async (request, h) => {
  try {

    const userObj = usersFactory.buildDelete(request.params);
    const usersResponse = await usersModel.delete(userObj);

    return h.response(usersResponse);

  } catch(err) {
    console.error(err);
    return h.response(err);
  }
};
