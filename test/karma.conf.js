module.exports = function(config) {
  'use strict';
  config.set({
    basePath: '../',

    browserify: {
      extendions: ['js'],
      debug: true
    },

    client: {
      mocha: {
        ui: 'bdd'
      }
    },

    frameworks: ['browserify', 'mocha', 'sinon-chai'],

    files: [
      'public/js/bower.js',
      'public/js/vendor.js',
      'app/application.js',
      'app/common.test.js',
      'app/**/*.js'
    ],

    reporters: ['progress', 'growl'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    reportSlowerThan: 500,

    plugins: [
      'karma-browserify',
      'karma-growl',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sinon-chai'
    ],

    preprocessors: {
      'app/**/*.js' : 'browserify'
    }
  });
};
