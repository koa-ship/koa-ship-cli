'use strict';

const mkdir = require('./utils').mkdir;

module.exports = function(options) {

  if (!options.root) {
    return;
  }

  let rootDir = options.root;
  let appDir = rootDir + '/app';

  mkdir(appDir, function() {

    mkdir(appDir + '/configs/env', function() {

    });


  });

};
