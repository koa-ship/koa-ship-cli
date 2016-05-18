module.exports = {

  domain: 'localhost',

  log: {
    devLog: {{devLog}},
    level: {{logLevel}}, 
  },

  database: {
    type: 'mongoose',
    host: '127.0.0.1',
    dbname: '{{dbname}}'    
  },
  
  assets: {
    minify: {{assetsMinify}},
  },

  session: {
    dbIndex: 1
  }

};