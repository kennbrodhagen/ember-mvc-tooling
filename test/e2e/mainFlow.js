describe('A Busy Person visits the Todo Page', function() {
  'use strict';

  var WebDriver;
  var driver;
  var expect = require('chai').expect;

  before(function() {
    WebDriver = this.WebDriver;
    driver = this.driver;

    // Visit Todo Home Page
    return driver
      .get('http://localhost:3000/index.html');
  });

  describe('She Examines the UI and sees it...', function() {
    it('Has a title', function() {
      var title = driver.findElement(WebDriver.By.tagName('h1'));
      return expect(title.getText()).to.eventually.equal('todos');
    });
  });

  describe('She adds a new todo and...', function() {
    before(function() {
      var input = driver.findElement(WebDriver.By.id('new-todo'));
      input.click();
      return input.sendKeys('item 1');
    });

    // Convert array of promises to single promise
    // It will resolve when all have fulfilled or at least one rejected.
    var allPromises = function(promises) {
      var result = WebDriver.promise.defer();
      var values = [];
      promises.forEach(function(promise) {
        promise.then(function onSuccess(value){
          values.push(value);
          if (values.length === promises.length)
            result.fulfill(values);
        }, function onError(err) {
          result.reject(err);
        });
      });
      return result.promise;
    };

    var todoElements = function() {
      return driver
        .findElement({id:'todo-list'})
        .findElements({tagName:'li'});
    };

    // Return promise of text values of the elements array passed in.
    var textValuesOf = function(elements) {
      var allElements = [];
      elements.forEach(function(element) {
        allElements.push(element.getText());
      });
      return allPromises(allElements);
    };

    it('sees the list is no longer empty', function() {
      return expect(todoElements()).to.eventually.not.be.empty;
    });

    it('sees it appear in the list.', function() {
      return expect(textValuesOf(todoElements())).to.eventually.contain('item 1');
    });
  });

  describe('Mark a todo complete', function() {
  });

  describe('Mark all todos', function() {
  });
});

