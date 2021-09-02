module.exports = {
  apps : [
    {
      name: 'api',
      script : 'server.js',
      'max_memory_restart': '1G',
      env: {
        ENGINE: 'webapi'
      }
    }
  ]
};
