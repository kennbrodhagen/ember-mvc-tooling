'use strict';
require('mocha-as-promised')();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

before(function() {
  this.browser = wd.promiseChainRemote(process.env.SELENIUM_HUB);
  this.promiseLog = function() {
    var args = arguments;
    return function() { console.log.apply(console, args); };
  };

  return this.browser.init({browserName:'chrome'});
});

after(function() {
  return this.browser.quit();
});

