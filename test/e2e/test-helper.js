/* jshint unused: false */

// expect assert library
var expect = require('expect.js');

// Selenium webdriver
var webdriver = require('selenium-webdriver');

// re-map spec functions to webdriver async versions
(function() {
	'use strict';

	var test = require('selenium-webdriver/testing');
	after = test.after;
	afterEach = test.afterEach;
	before = test.before;
	beforeEach = test.beforeEach;
	ddescribe = test.ddescribe;
	describe = test.describe;
	iit = test.itt;
	it = test.it;
})();

