'use strict';

import path from 'path';
import createApp from 'koa-ship';

var app = createApp(path.dirname(__dirname));

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});

module.exports = app;
