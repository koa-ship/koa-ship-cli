#!/usr/bin/env node

'use strict';

const App = require('./../lib');

let app = new App(process.cwd());
if (app.inKoaShipApp()) {
  // do generate or something else commands.
  app.doOtherCommands();
} else {
  // do new command.
  app.doNew();
}
