let assets = env.assets || {};

module.exports = {

  minify: assets.minify,

  js: {
    base: [
      'js/jquery.js',
      'js/bootstrap.js',    
    ],

    app: [
      'js/app.js',
    ],
  },

  css: {
    base: [
      'css/bootstrap.css',
    ],

    app: [
      'css/app.css',
    ],
  }

};