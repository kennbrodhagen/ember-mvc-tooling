beforeEach(function() {
	'use strict';
	window.localStorage.clear();

  // Setup test fixtures
  Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
  Todos.Todo.FIXTURES = [
    {
      id: 1,
      title: 'Learn Ember.js',
      isCompleted: true
    },
    {
      id: 2,
      title: '...',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Profit!',
      isCompleted: false
    }
  ];
});
