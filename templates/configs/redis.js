module.exports = {

  host: '127.0.0.1',
  port: 6379,

  // db index
  dbs: {
    main: 0,
    session: env.session.dbIndex,
  },

  keys: {
    session: { prefix: 'session', expire: '1d', db: 'session' },
    assets: { prefix: 'assets', expire: 'forever', db: 'main' },
  }

};