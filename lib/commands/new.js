'use strict';

const path = require('path');
const program = require('commander');
const createAppSkeleton = require('./../builders/createAppSkeleton');

const DB_TYPES = [
  'mongodb',
  'mysql',
  'mariadb',
  'postgres',
  'sqlite',
  'mssql',  
];

module.exports = function(app) {

  program
    .version(app.version)
    .usage('new APP_PATH [options]')
    .option('-d, --database [type]', `preconfigure database (type: ${DB_TYPES.join('/')})`)
    .option('-m, --min', `create application with minimal middlewares`);

  program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ ship new ~/Projects/blog');
    console.log('');
  });

  program.parse(process.argv);

  let cmd = program.args.shift();
  let projectDir = program.args.shift();

  if (cmd != 'new' || !projectDir) {
    program.help();
    return;
  }

  projectDir = path.resolve(projectDir);
  if (app.fileExists(projectDir)) {
    console.log('Directory is exists: ' + projectDir);
    return;
  }

  let name = path.basename(projectDir);
  if (!name.match(/^[a-zA-Z_]{1}[0-9a-zA-Z_\-]*$/)) {
    console.log('Name is illegal: ' + name);
    return;
  }

  let options = {
    root: projectDir,
    name: name,
  };

  if (program.min) {
    options.min = true;
  }

  if (program.database && DB_TYPES.indexOf(program.database) != -1) {
    options.database = program.database;
  }   

  // create app skeleton
  createAppSkeleton(options);
};
