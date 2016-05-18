'use strict';

require('node-next');

let app = require('./lib/bootstrap');
app.run(() => {
  console.log('=> app is ready!');
});