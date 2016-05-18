'use strict';

require('node-next');

const chai = require('chai');

// expose globals
global['assert'] = chai.assert;
global['expect'] = chai.expect;
global['should'] = chai.should();

let app = require('./../lib/bootstrap');
app.setTestEnv();

before((done) => {
  app.boot();
  done();
});

after((done) => {
  done();
});
