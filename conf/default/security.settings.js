module.exports = {
  security: {
    passwords: {
      hashed: true,
      format: 'hex',
      algorithm: 'sha1'
    },
    token: {
      secret: 'THE_MOST_103729375_SECRET_OF_ANYTHING_534730472_IS_YOUR',
      algorithm: 'HS256',
      expiration: 14400
    }
  }
};
