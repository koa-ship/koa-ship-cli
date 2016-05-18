module.exports = {

  key: 'sid',
  prefix: '{{prefix}}:session:',
  ttl: 7200 * 1000,

  // reconnectTimeout: 10 * 1000,
  
  cookie: {
    path: '/',
    maxage: 24 * 3600 * 1000,
    rewrite: true,
    signed: false
  },

  store: 'redis',

  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: env.session.dbIndex
  }

};