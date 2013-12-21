require('mocha-as-promised')();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

before(function() {
  'use strict';

  // Setup Selenium WebDriver for use in
  // other modules
  var WebDriver = require('selenium-webdriver');
  var driver = new WebDriver.Builder()
    .withCapabilities(WebDriver.Capabilities.chrome())
    .build();

  this.driver = driver;
  this.WebDriver = WebDriver;

  WebDriver.promise.controlFlow().on('uncaughtException', function(err) {
    console.log('*** There was an uncaught exception: ' + err);
    this.driver.quit().then(function() {
      throw err;
    });
  });
});

after(function() {
  'use strict';
  return this.driver.quit();
});

