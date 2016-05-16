'use strict';

const path = require('path');
const fs = require('fs');
const program = require('commander');

class App {

  constructor(cwd) {
    this.pkg = require('../package.json');
    this.version = this.pkg.version;

    this.cwd = cwd;
  }

  inKoaShipApp() {
    const self = this;
    let dir = this.cwd;
    let found = false;

    while(dir != '/' && !found) {
      if (self.isProjectRoot(dir)) {
        found = true;
      } else {
        dir = path.dirname(dir);
      }
    }

    if (found) {
      self.projectDir = dir;
      return dir;
    } else {
      return false;
    }
  }

  isProjectRoot(dir) {
    try {
      let pkg = require(path.join(dir, 'package.json'));
      return pkg.dependencies['koa-ship'];
    } catch(e) {
      return false;
    }
  }

  fileExists(file) {
    try {
      fs.statSync(file);
      return true;
    } catch (e) {
      return false;
    }    
  }  

  doNew() {
    require('./commands/new')(this);
  }

  doOtherCommands() {
    require('./commands')(this);
  }

}

module.exports = App;