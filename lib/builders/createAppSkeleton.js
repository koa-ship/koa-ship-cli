'use strict';

const mkdir = require('./utils').mkdir;
const copy = require('./utils').copy;
const keygen = require('keygenerator');

var getConfigByDBType = function(dbType, dbName) {
  if (dbType == 'mongodb') {
    return JSON.stringify({
      type: 'mongoose',
      host: '127.0.0.1',
      dbname: dbName
    }, null, 4);
  } else {
    return JSON.stringify({});
  }
};

module.exports = function(options) {
  if (!options.root) {
    return;
  }

  let appName = options.name || 'app';
  let minMiddleware = options.min;
  let dbType = minMiddleware ? null : (options.database || 'mongodb');  

  let rootDir = options.root;
  let appDir = rootDir + '/app';
  let assetsDir = rootDir + '/assets';
  let dataDir = rootDir + '/data';
  let libDir = rootDir + '/lib';
  let testDir = rootDir + '/test';
  let tmpDir = rootDir + '/tmp';
  let publicDir = rootDir + '/public';

  mkdir(rootDir, function() {
    copy('app.js', rootDir + '/app.js');
    copy('env.js', rootDir + '/env.js');
    copy('repl.js', rootDir + '/repl.js');
    copy('dotfiles/gitignore', rootDir + '/.gitignore');
    copy('nodemon.json', rootDir + '/nodemon.json');
    copy('package.json', rootDir + '/package.json', { projectName: appName });
    copy('README.md', rootDir + '/README.md', { projectName: appName });
  });

  // application files
  mkdir(appDir, function() {
    // configs
    mkdir(appDir + '/configs/env', function() {
      let envTemplate = minMiddleware ? 'configs/env-min.js' : 'configs/env.js';

      copy(envTemplate, appDir + '/configs/env/development.js', {
        devLog: true,
        logLevel: 'debug',
        dbConfig: getConfigByDBType(dbType, appName + 'Dev'),
        assetsMinify: false,
      });

      copy(envTemplate, appDir + '/configs/env/test.js', {
        devLog: false,
        logLevel: 'debug',
        dbConfig: getConfigByDBType(dbType, appName + 'Test'),
        assetsMinify: false,
      });

      copy(envTemplate, appDir + '/configs/env/production.js', {
        devLog: false,
        logLevel: 'notice',
        dbConfig: getConfigByDBType(dbType, appName),
        assetsMinify: true,
      });

      copy('configs/app.js',         appDir + '/configs/app.js', { appName: appName, key: keygen._({length:64}), port: 3000 });
      copy('configs/assets.js',      appDir + '/configs/assets.js');
      copy('configs/log.js',         appDir + '/configs/log.js');
      copy('configs/routes.js',      appDir + '/configs/routes.js');
      copy('configs/upload.js',      appDir + '/configs/upload.js');
      copy('configs/view.js',        appDir + '/configs/view.js');

      if (minMiddleware) {
        copy('configs/middlewares-min.js', appDir + '/configs/middlewares.js');        
      } else {
        copy('configs/database.js',    appDir + '/configs/database.js');
        copy('configs/passport.js',    appDir + '/configs/passport.js');
        copy('configs/redis.js',       appDir + '/configs/redis.js');        
        copy('configs/session.js',     appDir + '/configs/session.js', { prefix: appName });
        copy('configs/middlewares.js', appDir + '/configs/middlewares.js');        
      }
    });

    // controllers
    mkdir(appDir + '/controllers', function() {
      if (minMiddleware) {
        copy('controllers/BaseController-min.js', appDir + '/controllers/BaseController.js');
      } else {
        copy('controllers/BaseController.js', appDir + '/controllers/BaseController.js');
      }
      
      copy('controllers/HomeController.js', appDir + '/controllers/HomeController.js');
    });

    // helpers
    mkdir(appDir + '/helpers', function() {
      copy('helpers/GlobalHelper.js', appDir + '/helpers/GlobalHelper.js');
    });

    // models
    mkdir(appDir + '/models/base', function() {
      if (dbType == 'mongodb') {
        copy('models/MogooseBaseModel.js', appDir + '/models/base/Model.js');
        copy('models/MogooseUser.js', appDir + '/models/User.js');
      }
    });

    // services
    mkdir(appDir + '/services', function() {
      if (!minMiddleware) {
        copy('services/UserService.js', appDir + '/services/UserService.js');
      }
    });

    // views
    mkdir(appDir + '/views/layouts', function() {
      copy('views/layouts/default.ejs', appDir + '/views/layouts/default.ejs', { appName: appName });
      copy('views/layouts/error.ejs', appDir + '/views/layouts/error.ejs', { appName: appName });
      copy('views/index.ejs', appDir + '/views/index.ejs');
    });

    mkdir(appDir + '/views/errors', function() {
      copy('views/errors/404.ejs', appDir + '/views/errors/404.ejs');
      copy('views/errors/500.ejs', appDir + '/views/errors/500.ejs');
      copy('views/errors/common.ejs', appDir + '/views/errors/common.ejs');
    });    
  });

  // assets files
  mkdir(assetsDir, function() {
    mkdir(assetsDir + '/js', function() {
      copy('assets/js/jquery.js', assetsDir + '/js/jquery.js');
      copy('assets/js/bootstrap.js', assetsDir + '/js/bootstrap.js');
      copy('assets/js/app.js', assetsDir + '/js/app.js');
    });

    mkdir(assetsDir + '/css', function() {
      copy('assets/css/bootstrap.css', assetsDir + '/css/bootstrap.css');
      copy('assets/css/app.css', assetsDir + '/css/app.css');
    });    
  });

  // lib
  mkdir(libDir, function() {
    copy('lib/bootstrap.js', libDir + '/bootstrap.js');
  });

  // test
  mkdir(testDir, function() {
    copy('test/boot.js', testDir + '/boot.js');
    copy('test/mocha.opts', testDir + '/mocha.opts');
  });

  // logs
  mkdir(dataDir + '/logs', function() {
    copy('dotfiles/gitignore-dir', dataDir + '/logs/.gitignore');
  });  

  // tmp
  mkdir(tmpDir, function() {
    copy('dotfiles/gitignore-dir', tmpDir + '/.gitignore');
  });  

  // public
  mkdir(publicDir, function() {
    copy('dotfiles/gitkeep', publicDir + '/.gitkeep');
  });
};
