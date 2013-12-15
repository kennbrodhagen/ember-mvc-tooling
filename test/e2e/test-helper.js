
before(function() {
	'use strict';

	// Setup Selenium WebDriver for use in
	// other test modules
	var WebDriver = require('selenium-webdriver');
	this.WebDriver = WebDriver;
	this.driver = new WebDriver.Builder()
		.withCapabilities(WebDriver.Capabilities.chrome())
		.build();
});

after(function(done) {
	'use strict';
	this.driver.quit().then(done);
});

