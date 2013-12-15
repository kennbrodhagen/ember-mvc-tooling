describe('A Busy Person visits the Todo Page', function() {
	'use strict';

	var WebDriver;
	var driver;
	var expect = require('expect.js');

	before(function(done) {
		WebDriver = this.WebDriver;
		driver = this.driver;

		// Visit Todo Home Page
		driver
			.get('http://localhost:3000/index.html')
			.then(done);
	});

	describe('She Examines the UI and sees it...', function() {
		it('Has a title', function(done) {
			var title = driver.findElement(WebDriver.By.tagName('h1'));
			title.getText().then(function(value) {
				expect(value).to.be('todos');
			}).then(done);
		});
	});

	describe('She adds a new todo and...', function() {
		before(function(done) {
			var input = driver.findElement(WebDriver.By.id('new-todo'));
			input.click();
			input.sendKeys('item 1').then(done);
		});

		it('sees it appear in the list.', function(done) {
			var list = driver.findElement(WebDriver.By.id('todo-list'));
			list.findElements({tagName:'li'}).then(function(elements) {
				elements.forEach(function(element) {
					element.getText().then(function(itemName) {
						if (itemName === 'item 1')
							done();
					});
				});
			});
		});
	});

	describe('Mark a todo complete', function() {
	});

	describe('Mark all todos', function() {
	});
});

