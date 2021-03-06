module.exports = {

  domain: 'localhost',

  log: {
    devLog: {{devLog}},
    level: '{{logLevel}}', 
  },

  database: {{dbConfig}},
  
  assets: {
    minify: {{assetsMinify}},
  },

  session: {
    dbIndex: 1
  }

};