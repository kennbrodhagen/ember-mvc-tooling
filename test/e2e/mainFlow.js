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

