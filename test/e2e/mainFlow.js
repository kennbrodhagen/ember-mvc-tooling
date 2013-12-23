/* jshint maxstatements: false */
var wd = require('wd');

describe('A Busy Person visits the Todo Page', function() {
  'use strict';

  var browser;

  var activeFilter = function() {
    return browser.$('a[href="#/active"]');
  };

  var allFilter = function() {
    return browser.$('a[href="#/"]');
  };

  var addTodo = function(todoName) {
    return function() {
      return newTodoField()
        .click()
        .type(todoName)
        .keys(wd.SPECIAL_KEYS.Return);
    };
  };

  var checkTodo = function(todoIndex) {
    return function() {
      return todoByIndex(todoIndex).click();
    };
  };

  var clearCompletedButton = function() {
    return browser.$('#clear-completed');
  };

  var completedFilter = function() {
    return browser.$('a[href="#/completed"]');
  };

  // Need to delete via injected call to jquery on the page
  // because otherwise we get an item not visible (11) error 
  // from selenium.
  var deleteTodo = function(todoIndex) {
    return browser.safeExecute('$(".destroy")[' + todoIndex + '].click();');
  };

  var newTodoField = function() {
    return browser.$('#new-todo');
  };

  var todoByIndex = function(todoIndex) {
    return browser.$$('#todo-list input[type="checkbox"]')
      .then(function(todos) {
        return todos[todoIndex];
      });
  };

  var todoShouldBecomeChecked = function(todoIndex, checkedState) {
    return function() {
      return todoByIndex(todoIndex)
        .getAttribute('checked')
        .should.eventually.become(checkedState);
    };
  };

  var toggleAllButton = function() {
    return browser.$('#toggle-all');
  };

  var toggleAll = function() {
    return function() {
      return toggleAllButton().click();
    };
  };

  /* jshint camelcase: false */
  var it_sees_X_items = function(number) {
    it('sees ' + number + ' items', function() {
      return browser
        .$$('#todo-list li')
        .should.eventually.have.length(number);
    });
  };

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

    it_sees_X_items(0);

    it('Has a field to enter new todos', function() {
      return newTodoField().should.eventually.exist;
    });

    it('Has a link to filter All todos', function() {
      return allFilter().should.eventually.exist;
    });

    it('Has a link to filter Active todos', function() {
      return activeFilter().should.eventually.exist;
    });

    it('Has a link to filter Completed todos', function() {
      return completedFilter().should.eventually.exist;
    });

    it('Has a display of the count of todo items', function() {
      return browser
        .$('#todo-count')
        .should.eventually.exist;
    });

    it('Has a button to select all items', function() {
      return toggleAllButton()
        .should.eventually.exist;
    });
  });

  describe('She adds several new todos and...', function() {
    before(function() {
      return addTodo('item 1')()
        .then(addTodo('item 2'))
        .then(addTodo('item 3'))
        .then(addTodo('item 4'))
        .then(addTodo('item 5'))
        .then(addTodo('item 6'))
        .then(addTodo('item 7'));
    });

    it('sees the list is no longer empty', function() {
      return browser
        .$$('#todo-list li')
        .should.eventually.have.length(7);
    });

    it('sees one of the items appear in the list.', function() {
      return browser
        .$('#todo-list li')
        .text().should.eventually.become('item 1');
    });

    it('sees they are unchecked', function() {
      return todoShouldBecomeChecked(0, null)()
        .then(todoShouldBecomeChecked(1, null))
        .then(todoShouldBecomeChecked(2, null))
        .then(todoShouldBecomeChecked(3, null))
        .then(todoShouldBecomeChecked(4, null))
        .then(todoShouldBecomeChecked(5, null))
        .then(todoShouldBecomeChecked(6, null));
    });
  });

  describe('She marks several completed and...', function() {
    before(function() {
      return checkTodo(0)()
        .then(checkTodo(2))
        .then(checkTodo(4))
        .then(checkTodo(6));
    });

    it('sees them become checked', function() {
      return todoShouldBecomeChecked(0, 'true')()
        .then(todoShouldBecomeChecked(2, 'true'))
        .then(todoShouldBecomeChecked(4, 'true'))
        .then(todoShouldBecomeChecked(6, 'true'));
    });

    it('sees a button to clear completed items appear', function() {
      return clearCompletedButton().should.eventually.exist;
    });
  });

  describe('She visits the Active view and...', function() {
    before(function() {
      return activeFilter().click();
    });

    it_sees_X_items(3);

    describe('She deletes an item and...', function() {
      before(function() {
        return deleteTodo(0);
      });

      it_sees_X_items(2);
    });
  });

  describe('She visits the Completed view and...', function() {
    before(function() {
      return completedFilter().click();
    });

    it_sees_X_items(4);

    describe('She deletes an item and...', function() {
      before(function() {
        return deleteTodo(0);
      });

      it_sees_X_items(3);

      describe('She chooses Clear Completed and...', function() {
        before(function() {
          return clearCompletedButton().click();
        });

        it_sees_X_items(0);

        it('sees a button to clear completed items disappear', function() {
          return clearCompletedButton().should.eventually.not.exist;
        });
      });
    });
  });

  describe('She visits the All view and...', function() {
    before(function() {
      return allFilter().click();
    });

    it_sees_X_items(2);

    it('toggles the all complete button', function() {
      toggleAll()()
        .then(todoShouldBecomeChecked(0, 'true'))
        .then(todoShouldBecomeChecked(1, 'true'))
        .then(toggleAll())
        .then(todoShouldBecomeChecked(0, null))
        .then(todoShouldBecomeChecked(1, null));
    });

  });
});

