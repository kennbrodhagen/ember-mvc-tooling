var wd = require('wd');

describe('A Busy Person visits the Todo Page', function() {
  'use strict';

  var browser;

  before(function() {
    // Visit Todo Home Page
    browser = this.browser;
    return browser
      .get('http://localhost:3000/index.html');
  });

  describe('She Examines the UI and sees it...', function() {
    it('Has a title', function() {
      return browser
        .$('h1')
        .text()
        .should.eventually.become('todos');
    });
  });

  describe('She adds a new todo and...', function() {
    before(function() {
      return browser
        .$('#new-todo')
        .click()
        .type('item 1')
        .keys(wd.SPECIAL_KEYS.Return);
    });

    it('sees the list is no longer empty', function() {
      return browser
        .$$('#todo-list li')
        .should.eventually.have.length(1);
    });

    it('sees it appear in the list.', function() {
      return browser
        .$('#todo-list li')
        .text().should.eventually.become('item 1');
    });
  });

  describe('Mark a todo complete', function() {
  });

  describe('Mark all todos', function() {
  });
});

