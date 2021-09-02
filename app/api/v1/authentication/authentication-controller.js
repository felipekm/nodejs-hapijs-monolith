'use strict';

const usersHelper = require('../../../core/helpers/users-helper');
const authenticationHelper = require('../../../core/helpers/authentication-helper');

exports.login = async(request, h) => {
  try {

    const userData = await authenticationHelper.authenticate(request.payload.email, request.payload.password);
    const token = await authenticationHelper.generateToken(userData, request);

    await usersHelper.registerLastLogin(userData._id);

    return h.response(token);

  } catch(err) {
    console.error(err);
    return h.response(err);
  }
};

exports.logout = async(request, h) => {
  try {

    const userToken = request.auth.token;
    const logoutResponse = await authenticationHelper.logout(userToken);

    return h.response(logoutResponse);

  } catch(err) {
    console.error(err);
    return h.response(err);
  }
};

