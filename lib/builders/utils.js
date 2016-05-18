'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

var emptyDirectory = function(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
};

var fileExists = function(file) {
  try {
    fs.statSync(file);
    return true;
  } catch (e) {
    return false;
  } 
};

var write = function(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || '0666' });
  console.log('   \u001b[36mcreate\u001b[0m : ' + path);
};

var mkdir = function(path, fn) {
  mkdirp(path, '0755', function(err){
    if (err) throw err;
    console.log('   \u001b[36mcreate\u001b[0m : ' + path);
    fn && fn();
  });
};

var copy = function(src, dest, params = {}) {
  src = path.join(__dirname, '..', 'templates', src);

  if (!fileExists(src)) {
    return false;
  }

  let content = fs.readFileSync(src, 'utf-8');

  for(let key in params) {
    content = content.replace('{{' + key  + '}}', params[key]);
  }
  
  write(dest, content);
};

exports.write = write;
exports.mkdir = mkdir;
exports.copy = copy;
exports.emptyDirectory = emptyDirectory;
