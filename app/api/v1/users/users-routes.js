const usersCfg = require('./users-config');
const usersCtrl = require('./users-controller');

module.exports = [

  {
    path: '/v1/users',
    method: 'POST',
    options: usersCfg.post,
    handler: usersCtrl.post
  },

  {
    path: '/v1/users/{_id?}',
    method: 'GET',
    config: usersCfg.get,
    handler: usersCtrl.get
  },

  {
    path: '/v1/users',
    method: 'PUT',
    config: usersCfg.put,
    handler: usersCtrl.put
  },

  {
    path: '/v1/users/{_id}',
    method: 'DELETE',
    config: usersCfg.delete,
    handler: usersCtrl.delete
  }
];
