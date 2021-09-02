const Joi = require('joi');

const generalTemplate = {
  tags: [ 'v1', 'users' ],
  description: 'Users routes',
  notes: 'API to manage all users handled by system.',
  auth: 'jwt'
};

exports.post = {
  ...generalTemplate,
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};

exports.get = {
  ...generalTemplate,
  validate: {
    params: {
      _id: Joi.string().optional()
    }
  }
};


exports.put = () => ({
  ...generalTemplate,
  validate: {
    payload: {
      _id: Joi.string().required(),
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
      isActive: Joi.boolean().optional()
    }
  }
});

exports.delete = () => ({
  ...generalTemplate,
  validate: {
    params: {
      _id: Joi.string().required()
    }
  }
});
