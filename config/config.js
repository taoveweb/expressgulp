var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'expressblog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodeblogs'
  },

  test: {
    root: rootPath,
    app: {
      name: 'expressblog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodeblogs'
  },

  production: {
    root: rootPath,
    app: {
      name: 'oldku'
    },
    port: process.env.PORT || 8083,
    db: 'mongodb://oldku:oldku@localhost/oldku'
  }
};

module.exports = config[env];


