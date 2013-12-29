module.exports = function(opts) {
  'use strict';
  var Todos = opts.App;
  var Ember = opts.Ember;

  Todos.EditTodoView = Ember.TextField.extend({
    didInsertElement: function() {
      this.$().focus();
    }
  });

  Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);
};
