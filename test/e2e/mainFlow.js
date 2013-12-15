describe('Main Flow', function() {
	'use strict';

	var WebDriver;
	var driver;
	var expect = require('expect.js');

	before(function() {
		WebDriver = this.WebDriver;
		driver = this.driver;
	});

	it('fails miserably', function(done) {
		driver.get('http://www.google.com');
    var searchBox = driver.findElement(WebDriver.By.name('q'));
    searchBox.sendKeys('webdriver');
    searchBox.getAttribute('value').then(function(value) {
      expect(value).to.eql('webdriver');
			done();
    });
	});
});

