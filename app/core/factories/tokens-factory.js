exports.build = (user, request) => {
  return {
    email: user.email,
    orig: request.orig,
    info: request.info,
    headers: request.headers,
    blacklisted: false
  };
};