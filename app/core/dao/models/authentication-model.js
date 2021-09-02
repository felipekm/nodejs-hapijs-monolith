const LITERALS = require('../../literals/authentication-literals');

/**
 * @function saveToken
 * @description Saves the user's token
 * @param  {Object} credential Credential to save the token
 * @param  {Object} request    HTTP Request object
 * @param  {String} token      Token to save
 * @return {Promise<String>} User token
 */
exports.saveToken = function saveToken(credential, request, token) {
  return new Promise(async (resolve, reject) => {
    try {

      // Build token tracking obj
      const record = {
        user: credential.usr,
        token: token.token,
        info: request.connection.info,
        headers: request.headers,
        blacklisted: false
      };

      // Convert dates
      record.info.created = new Date(record.info.created);
      record.info.started = new Date(record.info.created);

      // Save token
      await global.db.mongodb.insertAsync(LITERALS.TOKENS_COLLECTION, record);

      return resolve(token);
    } catch (err) {
      return reject(err);
    }
  });
};
