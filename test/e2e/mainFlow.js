var expect = require('expect.js');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

after = test.after;
afterEach = test.afterEach;
before = test.before;
beforeEach = test.beforeEach;
ddescribe = test.ddescribe;
describe = test.describe;
iit = test.itt;
it = test.it;

describe('Main Flow', function() {
	'use strict';

	var driver;
	test.before(function() {
		driver = new webdriver.Builder()
			.withCapabilities(webdriver.Capabilities.chrome())
			.build();
	});

	after(function() {
		driver.quit();
	});

	it('fails miserably', function() {
		driver.get('http://www.google.com');
    var searchBox = driver.findElement(webdriver.By.name('q'));
    searchBox.sendKeys('webdriver');
    searchBox.getAttribute('value').then(function(value) {
      expect(value).to.eql('webdriver');
    });
	});
});

