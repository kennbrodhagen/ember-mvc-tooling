module.exports = function(config) {
  'use strict';
  config.set({
    basePath: '../',
    client: {
      mocha: {
        ui: 'bdd'
      }
    },

    frameworks: ['expect', 'mocha', 'sinon-chai'],

    files: [
      'bower_components/jquery/jquery.js',
      'bower_components/handlebars/handlebars.js',
      'bower_components/ember/ember.js',
      'bower_components/ember-data/ember-data.js',
      'vendor/localstorage_adapter.js',
      'app/application.js',
      'app/common.test.js',
      'app/**/*.js',
      'app/**/*.hbs'
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
      'karma-ember-preprocessor',
      'karma-expect',
      'karma-growl',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sinon-chai'
    ],

    preprocessors: {
      '**/*.hbs': 'ember'
    }
  });
};
