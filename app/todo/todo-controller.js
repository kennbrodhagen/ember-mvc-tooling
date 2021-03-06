module.exports = function(opts) {
  'use strict';
  var Todos = opts.App;
  var Ember = opts.Ember;

  Todos.TodoController = Ember.ObjectController.extend({
    actions: {
      acceptChanges: function() {
        this.set('isEditing', false);

        if (Ember.isEmpty(this.get('model.title'))) {
          this.send('removeTodo');
        } else {
          this.get('model').save();
        }
      },

      editTodo: function() {
        this.set('isEditing', true);
      },

      removeTodo: function() {
        var todo = this.get('model');
        todo.deleteRecord();
        todo.save();
      }
    },

    isCompleted: function(key, value) {
      var model = this.get('model');

      if (value === undefined) {
        // property being used as getter
        return model.get('isCompleted');
      } else {
        // property being used as setter
        model.set('isCompleted', value);
        model.save();
        return value;
      }
    }.property('model.isCompleted'),

    isEditing: false
  });
};
