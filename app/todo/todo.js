module.exports = function(opts) {
  'use strict';
  var Todos = opts.App;
  var DS = opts.DS;

  Todos.Todo = DS.Model.extend({
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean')
  });
};
