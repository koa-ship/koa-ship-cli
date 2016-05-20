'use strict';

const path = require('path');
const program = require('commander');
const generate = require('./generate');

const FILE_TYPES = [
  'controller',
  'model',
  'view',
  'helper',  
  'service',
  'util',
];

const COMMANDS = [
  'generate', 'g', 
  'console', 'c', 
  'test', 't'
];

module.exports = function(app) {

  program
    .version(app.version);

  program
    .command('generate [type]')
    .alias('g')
    .description(`generate new file (type: ${FILE_TYPES.join('/')})`)
    .option('-s, --skip', 'skip files that already exist')
    .action(function(type, options) {
      if (FILE_TYPES.indexOf(type) == -1) {
        return this.help();
      }

      let opts = {};
      opts.type = type;
      generate(app, opts);
    })
    .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ ship generate controller post');
    console.log('    $ ship generate model user');
    console.log('    $ ship generate view home/index');
    console.log();
    });

  program
    .command('console')
    .alias('c')
    .description(`start the ship console`)
    .action(function(options) {
      
    });

  program
    .command('test')
    .alias('t')
    .description(`run test`)
    .option('-w, --watch', 'watch files change')    
    .action(function(options) {
      
    });  

  program.on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ ship generate controller Post');
    console.log();
    });

  program.parse(process.argv);

  if (typeof program.args[0] != 'object') {
    program.help();
  }
  
};