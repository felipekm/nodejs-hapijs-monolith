const crypto = require('crypto');

exports.generateSalt = () => new Date().valueOf().toString();

exports.encrypt = function (value, saltValue) {
  const hmac = global.config.security.passwords.algorithm;
  const format = global.config.security.passwords.format;

  if (!saltValue) {
    saltValue = this.generateSalt();
  }

  const cryptedValue = crypto.createHmac(hmac, saltValue).update(value).digest(format);

  return { cryptedValue, saltValue };
};

exports.decrypt = (value, saltValue) => {
  const emailConfig = global.config.email.security.email;

  let decipher;
  let decryptedValue;

  decipher = crypto.createDecipher(emailConfig.algorithm, `${saltValue}${emailConfig.secret}`);
  decryptedValue  = decipher.update(value, 'base64', 'utf8');
  decryptedValue += decipher.final('utf8');

  return {decryptedValue, saltValue };
};
