'use strict';
require('mocha-as-promised')();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');
wd.addPromiseChainMethod('log', function(message) {
  console.log(message);
  return this;
});

// the $ method takes css selector strings
// and returns the first matching element.
wd.addPromiseChainMethod('$', function(selector, timeout) {
  return this
    .waitForElementByCssSelector(selector, timeout)
    .elementByCssSelector(selector);
});

// the $$ method takes css selector strings
// and returns all matching elements.
wd.addPromiseChainMethod('$$', function(selector, timeout) {
  return this
    .waitForElementByCssSelector(selector, timeout)
    .elementsByCssSelector(selector);
});

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

before(function() {
  this.browser = wd.promiseChainRemote(process.env.SELENIUM_HUB);
  this.promiseLog = function() {
    var args = Array.prototype.slice.call(arguments);
    return function(resolved) {
      args.push(resolved);
      console.log.apply(console, args);
      return resolved;
    };
  };

  return this.browser.init({browserName:'chrome'});
});

after(function() {
  return this.browser.quit();
});

